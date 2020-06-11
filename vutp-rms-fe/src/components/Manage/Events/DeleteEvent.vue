<template>
    <section class="section">
      <div class="container has-text-centered">
        <div class="column is-12 is-offset-0">
          <multiselect selectLabel="" v-if="!selectedEvent" deselect-label="Can't remove this value" track-by="id" :show-labels="false" placeholder="Select event" :options="getEvents" :searchable="true" :allow-empty="false" :custom-label="getEventCustomLabel" @select="updateSelectedEvent"></multiselect>
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
                  disabled="true"
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
                  disabled="true"
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
                <multiselect :disabled="true" :multiple="true" v-model="selectedEvent.rooms" select-label="Select" deselect-label="Remove selection" track-by="id" placeholder="Select rooms" :options="[]" :custom-label="getRoomCustomLabel" :searchable="false" :allow-empty="false"></multiselect>
              </div>
              <div class="field">
                <multiselect  :disabled="true" :multiple="true" v-model="selectedEvent.teachers" select-label="Select" deselect-label="Remove selection" track-by="id" placeholder="Select teachers" :options="[]" :custom-label="getTeacherCustomLabel" :searchable="false" :allow-empty="false"></multiselect>
              </div>
              <div class="field">
                <multiselect :disabled="true" :multiple="true" v-model="selectedEvent.disciplines" select-label="Select" deselect-label="Remove selection" track-by="id" placeholder="Select disciplines" :options="[]" :custom-label="getDisciplineCustomLabel" :searchable="false" :allow-empty="false"></multiselect>
              </div>
              <div class="field">
                <multiselect  :disabled="true" :multiple="true" v-model="selectedEvent.specialties" select-label="Select" deselect-label="Remove selection" track-by="id" placeholder="Select specialties" :options="[]" :custom-label="getSpecialtyCustomLabel" :searchable="false" :allow-empty="false"></multiselect>
              </div>
              <div class="buttons">
              </div>
              <div class="buttons">
                <button  class="button is-block is-info is-fullwidth" type="submit">Delete Event</button>
                <button  @click="cancelDelete" class="button is-block is-warning is-fullwidth" type="submit">Cancel</button>  
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
    name: "DeleteEvent",
    title: "DeleteEvent",
    data: () => ({
      selectedEvent: null
    }),
    components: {
    },
    props: {},
    methods: {
      ...mapActions('events', {
        loadEvents: 'loadEvents',
        deleteEvent: 'deleteEvent'
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

        this.deleteEvent(this.selectedEvent.id).then((res) => {
            self.setIsLoadingData(false);
            msg.success(res);
            core.go('/manage/events')
        }).catch((err) => {
            self.setIsLoadingData(false);
            msg.error(err.response.data.error);
        });
      },
      updateSelectedEvent(selectedEvent) {
        this.selectedEvent = _.cloneDeep(selectedEvent);
      },
      cancelDelete() {
          this.selectedEvent = null;
      }
    },
    mounted() {
      this.setIsLoadingData(true);
      this.loadEvents().then(() => {
        this.setIsLoadingData(false);
      }).catch(() => {
        msg.error('Loading event data failed.');
        this.setIsLoadingData(false);
      });
    },
    computed: {
      ...mapGetters('events', {
          getEvents: 'getEvents',
      })
    }
  }
</script>

<style lang="scss"> 
</style>