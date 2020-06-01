<template>
    <section class="section">
      <div class="container has-text-centered">
        <div class="column is-6 is-offset-3">      
          <div class="box">          
            <form @submit.prevent="handleSubmit">  
              <div class="field">
                <datetime    
                  input-id="startTime"   
                  class="theme-orange"
                  type="datetime"
                  v-model="eventInfo.startTime"
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
                  input-id="endtDatetime"   
                  class="theme-orange"
                  type="datetime"
                  v-model="eventInfo.endTime"
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
                <multiselect :multiple="true" v-model="eventInfo.rooms" select-label="Select" deselect-label="Remove selection" track-by="id" placeholder="Select rooms" :options="getRooms" :searchable="true" :allow-empty="true" :custom-label="getRoomCustomLabel"></multiselect>
              </div>
              <div class="field">
                <multiselect :multiple="true" v-model="eventInfo.teachers" select-label="Select" deselect-label="Remove selection" track-by="id" placeholder="Select teachers" :options="getTeachers" :searchable="true" :allow-empty="true" :custom-label="getTeacherCustomLabel"></multiselect>
              </div>
              <div class="field">
                <multiselect :multiple="true" v-model="eventInfo.disciplines" select-label="Select" deselect-label="Remove selection" track-by="id" placeholder="Select disciplines" :options="getDisciplines" :searchable="true" :allow-empty="true" :custom-label="getDisciplineCustomLabel"></multiselect>
              </div>
              <div class="field">
                <multiselect :multiple="true" v-model="eventInfo.specialties" select-label="Select" deselect-label="Remove selection" track-by="id" placeholder="Select specialties" :options="getSpecialties" :searchable="true" :allow-empty="true" :custom-label="getSpecialtyCustomLabel"></multiselect>
              </div>
              <button :disabled="!canSubmit" class="button is-block is-info is-fullwidth" type="submit">Add Event</button>        
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
    name: "AddEvent",
    title: "AddEvent",
    data: () => ({
      eventInfo: {
        startTime: null,
        endTime: null,
        rooms: [],
        teachers: [],
        disciplines: [],
        specialties: []
      }
    }),
    components: {
    },
    props: {},
    methods: {
      ...mapActions('events', {
            createEvent: 'createEvent'
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

            var eventSendModel = _.cloneDeep(this.eventInfo);

            // Send to BE only the entites ids
            eventSendModel.rooms = eventSendModel.rooms.map(r => r.id);
            eventSendModel.teachers = eventSendModel.teachers.map(t => t.id);
            eventSendModel.disciplines = eventSendModel.disciplines.map(d => d.id);
            eventSendModel.specialties = eventSendModel.specialties.map(s => s.id);

            this.createEvent(eventSendModel).then((res) => {
                self.setIsLoadingData(false);
                msg.success(res);
                core.go('/manage/events')
            }).catch((err) => {
                self.setIsLoadingData(false);
                err.response.data.forEach(element => {
                  msg.error(element);
                });
            });
        }
    },
    mounted() {
      this.setIsLoadingData(true)
      Promise.all([this.loadRooms(), this.loadSpecialties(), this.loadTeachers(), this.loadDisciplines()]).then(() => {
        this.setIsLoadingData(false);
      }).catch(() => {
        this.setIsLoadingData(false);
        msg.error('Loading event data failed.');
      });
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
        canSubmit() {
            return this.eventInfo.startTime && this.eventInfo.startTime.length > 0 && this.eventInfo.endTime && this.eventInfo.endTime.length > 0 && this.eventInfo.rooms.length > 0 && this.eventInfo.teachers.length > 0 && this.eventInfo.disciplines.length > 0 && this.eventInfo.specialties.length > 0;
        }
    }
  }
</script>

<style lang="scss"> 
</style>