<template>
    <section class="section">
      <div class="container has-text-centered">
        <div class="column is-12 is-offset-0">
          <multiselect v-if="!selectedEvent" deselect-label="Can't remove this value" track-by="id" :show-labels="false" placeholder="Select event" :options="getEvents" :searchable="true" :allow-empty="false" :custom-label="getEventCustomLabel" @select="updateSelectedEvent"></multiselect>
          <div v-if="selectedEvent" class="box">          
            <form @submit.prevent="handleSubmit">  
              <div class="field">
                <datetime    
                  input-id="startTime"   
                  class="theme-orange"
                  type="datetime"
                  v-model="selectedEvent.startTime"
                  input-class="date-time"
                  value-zone="UTC"
                  zone="local"
                  :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'}"
                  :phrases="{ok: 'Continue', cancel: 'Exit'}"
                  :hour-step="1"
                  :minute-step="15"
                  :week-start="1"
                  use24-hour
                  auto
                  title="Start Time">
                  <label for="startTime" slot="before">Start Time</label>
                </datetime>
              </div>
              <div class="field">
                <datetime    
                  input-id="endTime"   
                  class="theme-orange"
                  type="datetime"
                  v-model="selectedEvent.endTime"
                  input-class="date-time"
                  value-zone="UTC"
                  zone="local"
                  :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'}"
                  :phrases="{ok: 'Continue', cancel: 'Exit'}"
                  :hour-step="1"
                  :minute-step="15"
                  :week-start="1"
                  use24-hour
                  auto
                  title="End Time">
                  <label for="endTime" slot="before">End Time</label>
                </datetime>
              </div>
              <div class="field">
                <multiselect :multiple="true" v-model="selectedEvent.rooms" select-label="Select" deselect-label="Remove selection" track-by="id" placeholder="Select rooms" :options="getRooms" :searchable="true" :allow-empty="true" :custom-label="getRoomCustomLabel"></multiselect>
              </div>
              <div class="field">
                <multiselect :multiple="true" v-model="selectedEvent.teachers" select-label="Select" deselect-label="Remove selection" track-by="id" placeholder="Select teachers" :options="getTeachers" :searchable="true" :allow-empty="true" :custom-label="getTeacherCustomLabel"></multiselect>
              </div>
              <div class="field">
                <multiselect :multiple="true" v-model="selectedEvent.disciplines" select-label="Select" deselect-label="Remove selection" track-by="id" placeholder="Select disciplines" :options="getDisciplines" :searchable="true" :allow-empty="true" :custom-label="getDisciplineCustomLabel"></multiselect>
              </div>
              <div class="field">
                <multiselect :multiple="true" v-model="selectedEvent.specialties" select-label="Select" deselect-label="Remove selection" track-by="id" placeholder="Select specialties" :options="getSpecialties" :searchable="true" :allow-empty="true" :custom-label="getSpecialtyCustomLabel"></multiselect>
              </div>
              <div class="buttons">
              </div>
              <div class="buttons">
                <button :disabled="!canSubmit" class="button is-block is-info is-fullwidth" type="submit">Edit Event</button>
                <button  @click="cancelUpdate" class="button is-block is-warning is-fullwidth" type="submit">Cancel</button>  
              </div>  
            </form>
          </div>
        </div>
      </div>  
  </section> 
</template>

<script lang="js">

import { mapActions, mapMutations, mapGetters } from 'vuex'
import msg from '../../../core/msg';
import core from '../../../core/core'
import _ from 'lodash'

  export default {
    name: "EditEvent",
    title: "EditEvent",
    data: () => ({
      selectedEvent: null
    }),
    components: {
    },
    props: {},
    methods: {
        ...mapActions('events', {
            loadEvents: 'loadEvents',
            updateEvent: 'updateEvent'
        }),
        ...mapActions('teachers', {
            loadTeachers: 'loadTeachers'
        }),
        ...mapActions('rooms', {
            loadRooms: 'loadRooms'
        }),
        ...mapActions('disciplines', {
            loadDisciplines: 'loadDisciplines'
        }),
        ...mapActions('specialties', {
            loadSpecialties: 'loadSpecialties'
        }),
        ...mapMutations('common', {
            setIsLoadingData: 'SET_ISLOADING'
        }),
        getEventCustomLabel({rooms, disciplines, teachers, specialties, startTime, endTime}) {
          var roomsString = rooms.map(r => r.number).join('/');
          var disciplinesString = disciplines.map(d => d.name).join('/');
          var teachersString = teachers.map(t => t.academicTitle + " " + t.firstName + " " + t.lastName).join('/');
          var specialtiesString = specialties.map(s => s.name + "-" + s.grade);
          return `R: ${roomsString}; D: ${disciplinesString}; T: ${teachersString}; S: ${specialtiesString}; ST: ${new Date(startTime).toLocaleString('bg')}; ET: ${new Date(endTime).toLocaleString('bg')};`
        },
        getRoomCustomLabel({ number }){
            return `Room - ${number}`;
        },
        getTeacherCustomLabel({ firstName, lastName, academicTitle }){
            return `${academicTitle} - ${firstName} ${lastName}`;
        },
        getDisciplineCustomLabel({ name }){
            return `Discipline - ${name}`;
        },
        getSpecialtyCustomLabel({ name, grade }){
            return `Specialty - Name: ${name}; Grade: ${grade}`;
        },
        handleSubmit() {
          var self = this;
          this.setIsLoadingData(true);

          var eventSendModel = _.cloneDeep(this.selectedEvent);

          // Send to BE only the entites ids
          eventSendModel.rooms = eventSendModel.rooms.map(r => r.id);
          eventSendModel.teachers = eventSendModel.teachers.map(t => t.id);
          eventSendModel.disciplines = eventSendModel.disciplines.map(d => d.id);
          eventSendModel.specialties = eventSendModel.specialties.map(s => s.id);

          this.updateEvent(eventSendModel).then((res) => {
              self.setIsLoadingData(false);
              msg.success(res);
              core.go('/manage/events')
          }).catch((err) => {
              self.setIsLoadingData(false);
              msg.error(err.response.data);
          });
        },
        updateSelectedEvent(selectedEvent) {
          this.selectedEvent = _.cloneDeep(selectedEvent);
        },
        cancelUpdate() {
            this.selectedEvent = null;
        }
    },
    mounted() {
      this.setIsLoadingData(true)
      Promise.all([this.loadRooms(), this.loadSpecialties(), this.loadTeachers(), this.loadDisciplines(), this.loadEvents()]).then(() => {
        this.setIsLoadingData(false);
      }).catch(() => {
        msg.error('Loading data failed.');
        this.setIsLoadingData(false);
      })
    },
    computed: {
        ...mapGetters('teachers', {
            getTeachers: 'getTeachers',
        }),
        ...mapGetters('rooms', {
            getRooms: 'getRooms',
        }),
        ...mapGetters('disciplines', {
            getDisciplines: 'getDisciplines',
        }),
        ...mapGetters('specialties', {
            getSpecialties: 'getSpecialties',
        }),
        ...mapGetters('events', {
            getEvents: 'getEvents',
        }),
        canSubmit() {
            return this.selectedEvent.startTime && this.selectedEvent.startTime.length > 0 && this.selectedEvent.endTime && this.selectedEvent.endTime.length > 0 && this.selectedEvent.rooms.length > 0 && this.selectedEvent.teachers.length > 0 && this.selectedEvent.disciplines.length > 0 && this.selectedEvent.specialties.length > 0;
        }
    }
  }
</script>

<style lang="scss"> 
</style>