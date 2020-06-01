<template>
  <div id="callendar">
      <FullCalendar 
      defaultView="dayGridMonth" 
      :plugins="calendarPlugins"
      :header="header"
      :editable="false"
      slotDuration="00:15:00"
      :eventOverlap="false"
      :events="events"
      @eventClick="handleEventClick" />

    <mdb-container>
      <mdb-modal v-if="modal" @close="modal = false">
        <mdb-modal-header>
          <mdb-modal-title tag="h4" class="w-100 text-center font-weight-bold">Event information</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
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
            </form>
          </div>
        </div>
      </div>  
  </section> 
        </mdb-modal-body>
        <!-- <mdb-modal-footer class="justify-content-center">
        <mdb-btn color="info">Add</mdb-btn>
        </mdb-modal-footer> -->
      </mdb-modal>
    </mdb-container>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';

import { mdbContainer, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody } from "mdbvue"; // mdbBtn, mdbModalFooter
import { mapActions, mapMutations, mapGetters } from 'vuex'
import core from '../core/core'
import msg from '../core/msg'

export default {
    name: "Calendar",
    title: "Calendar",
    props: {
      type: {
          type: String,
          default: null
      },
      id: {
          id: String,
          default: null
      }
  },
  components: { Multiselect, FullCalendar, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbContainer  }, //mdbBtn, mdbModalFooter
  methods: {
    ...mapActions('events', {
      loadFilteredEvents: 'loadFilteredEvents'
    }),
    ...mapMutations('common', {
      setIsLoadingData: 'SET_ISLOADING'
    }),
    handleEventClick(info) {
      var eventId = info.event.id;
      this.selectedEvent = this.getFilteredEventById(eventId);

      if (!this.selectedEvent) {
        msg.error("Selected event cannot be shown.");
      } else {
        this.modal = true;
      }
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
  },
  mounted() {
    if (!this.type || !this.id) {
      core.go('/');
    }

    var self = this;
    var filterParams = { type: this.type, id: this.id };
    
    this.setIsLoadingData(true);
    this.loadFilteredEvents(filterParams).then((res) => {
      this.setIsLoadingData(false);
      if (res.length === 0) {
        msg.warn("No events found.");
        core.go('/');
      }

      self.events = res.map(e =>{
        return {
          id: e.id,
          end: e.endTime,
          start: e.startTime,
          title: e.disciplines.map(d => d.name).join(' / '),
          allDay: false
        }
      });
    }).catch((err) => {
      msg.error(err.response.data.error);
      this.setIsLoadingData(false);
    });
  },
  computed: {
    ...mapGetters('events', {
      getFilteredEventById: 'getFilteredEventById'
    }),
  },
  data() {
    return {
      selectedEvent: null,
      value: null,
      startDatetime: "",
      endDatetime: "",
      modal: false,
      calendarPlugins: [ timelinePlugin, dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        header: {
        left: 'prev,next today',
        center: 'title',
        right: 'timelineWeek,dayGridMonth,timeGridWeek,timeGridDay,list'
      },
      // This are test events. Upon load they are replaced. Check 'mounted' hook
      events: [{
        id:"32rsm3h04dsuoikk2r1arfc3m0_20170624T160000Z",
        "title":"Car payment $330.00 28th",
        "start":"2020-05-29T09:00:00-07:00",
        "end":"2020-05-29T09:00:00-07:45",
        "allDay":false,
        backgroundColor:"#0092D0"
      },{
        id:"32rsm3h04dsuoikk2r1arfc3m0_20170624T160000a",
        "title":"Bill payment $25.00 28th",
        "start":"2020-05-29T09:00:00-03:00",
        "end":"2020-05-29T09:00:00-04:45",
        "allDay":false,
        backgroundColor:"#0092D0"
      }]
    }
  }
}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang='scss'>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';
@import '~@fullcalendar/timeline/main.css';
@import '~@fullcalendar/list/main.css';

.theme-orange .vdatetime-popup__header,
.theme-orange .vdatetime-calendar__month__day--selected > span > span,
.theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #FF9800;
}

.theme-orange .vdatetime-year-picker__item--selected,
.theme-orange .vdatetime-time-picker__item--selected,
.theme-orange .vdatetime-popup__actions__button {
  color: #ff9800;
}

.date-time {
  border: 3px solid blue;
  display: inline-flex;
}

</style>