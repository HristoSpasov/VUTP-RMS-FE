<template>
  <div id="callendar">
      <FullCalendar 
      defaultView="dayGridMonth" 
      :plugins="calendarPlugins"
      :header="header"
      :editable="true"
      slotDuration="00:15:00"
      :eventOverlap="false"
      :events="events"
      @dateClick="handleDateClick" />

    <mdb-container>
      <mdb-modal v-if="modal" @close="modal = false">
        <mdb-modal-header>
          <mdb-modal-title tag="h4" class="w-100 text-center font-weight-bold">Add new event</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <div>
            <datetime 
              class="theme-orange"
              type="time"
              v-model="startDatetime"
              input-class="date-time"
              value-zone="UTC"
              zone="local"
              :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }"
              :phrases="{ok: 'Continue', cancel: 'Exit'}"
              :hour-step="1"
              :minute-step="15"
              :week-start="1"
              use24-hour
              auto>
            </datetime>
            <span>Start time</span>
          </div>
          <div>
            <datetime 
              class="theme-orange"
              type="time"
              v-model="endDatetime"
              input-class="date-time"
              zone="local"
              :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }"
              :phrases="{ok: 'Continue', cancel: 'Exit'}"
              :hour-step="1"
              :minute-step="15"
              :week-start="1"
              use24-hour
              auto>
            </datetime>
            <span>End time</span>
          </div>
          <dropdown :config="teachersDropdownConfig"></dropdown>
        </mdb-modal-body>
        <mdb-modal-footer class="justify-content-center">
        <mdb-btn @click="handleDateClick" color="info">Add</mdb-btn>
        </mdb-modal-footer>
      </mdb-modal>
    </mdb-container>
  </div>
</template>

<script>

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';

import dropdown from '../components/dropdown/Dropdown';
import _ from 'lodash';
import { mdbContainer, mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from "mdbvue";

import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  components: { FullCalendar, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbContainer, dropdown  },
  mounted() {
  },
  methods: {
    ...mapActions('rooms', {
      loadRooms: 'getRooms',
    }),
    ...mapActions('teachers', {
      loadTeachers: 'getTeachers'
    }),
     ...mapActions('specialties', {
      loadSpecialties: 'getSpecialties',
    }),
    ...mapMutations('common', {
      setIsLoadingData: 'SET_ISLOADING'
    }),
    handleDateClick(info) {
      this.setIsLoadingData(true)
      Promise.all([this.loadRooms(), this.loadSpecialties(), this.loadTeachers()]).then(() => {
        this.startDatetime = this.endDatetime = info.date.toISOString()

        this.teachersDropdownConfig = this.getTeachersDropdownConfig(this.getTeachers)
        this.modal = true
        this.setIsLoadingData(false)
      })

      
    },
    getTeachersDropdownConfig(teachers) {
      let teachersDropdownConfig = _.cloneDeep(this.getDropDownConfig);
      teachersDropdownConfig.placeholder = this.getTeachersDropdownPlaceholder;
      teachers.forEach(teacher => {
        let dropdownOption = { id: teacher.id, value: this.getTeacherInfo(teacher) };
        teachersDropdownConfig.options.push(dropdownOption);
      })

      return teachersDropdownConfig;
    },
    getTeacherInfo(teacher)
    {
      return `${teacher.academicTitle} - ${teacher.firstName} ${teacher.lastName}`;
    }
  },
  computed: {
    ...mapGetters('teachers', {
      getTeachers: 'teachers',
      getTeachersDropdownPlaceholder: 'dropdownPlaceholder'
    }),
    ...mapGetters('specialties', {
      getSpecialties: 'specialties'
    }),
    ...mapGetters('rooms', {
      getRooms: 'rooms'
    }),
    ...mapGetters('common', {
      getDropDownConfig: 'dropdownConfig'
    })
  },
  data() {
    return {
      teachersDropdownConfig: {}, 
      startDatetime: "",
      endDatetime: "",
      modal: false,
      calendarPlugins: [ timelinePlugin, dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      header: {
      left: 'prev,next today',
      center: 'title',
      right: 'timelineWeek,dayGridMonth,timeGridWeek,timeGridDay,list'
    },
    events: [{
    id:"32rsm3h04dsuoikk2r1arfc3m0_20170624T160000Z",
    "title":"Car payment $330.00 28th",
    "start":"2019-10-21T09:00:00-07:00",
    "end":"2019-10-21T09:00:00-07:45",
    "allDay":false,
    backgroundColor:"#0092D0"
  },{
    id:"32rsm3h04dsuoikk2r1arfc3m0_20170624T160000a",
    "title":"Bill payment $25.00 28th",
    "start":"2019-10-21T09:00:00-03:00",
    "end":"2019-10-21T09:00:00-04:45",
    "allDay":false,
    backgroundColor:"#0092D0"
  }]

    }
  }
}

</script>

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