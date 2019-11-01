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
          <dropdown @setSelectedOption="setSelectedTeacher" :config="teachersDropdownConfig"></dropdown>
        </mdb-modal-body>
        <mdb-modal-footer class="justify-content-center">
        <mdb-btn color="info">Add</mdb-btn>
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
      loadTeachers: 'loadTeachers',
      loadTeacherInfoById: 'loadTeacherInfoById'
    }),
    ...mapMutations('teachers', {
      setSelectedTeacher: 'SET_SELECTED_TEACHER'
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

        this.loadTeachersDropdownOptions(this.getTeachers).then(teachersDropdownConfig => {
          this.teachersDropdownConfig = teachersDropdownConfig;
          this.modal = true;
          this.setIsLoadingData(false);
        }) 
      }) 
    },
    setSelectedTeacher(selectedTeacher) {
      debugger
      this.setSelectedTeacher(selectedTeacher.id);
      this.teachersDropdownConfig.placeholder = selectedTeacher.value
    },
    loadTeachersDropdownOptions(teachers) {
      const self = this;
      return new Promise((resolve) => {
        let teachersDropdownConfig = _.cloneDeep(self.getDropDownConfig);
        teachersDropdownConfig.placeholder = self.getTeachersDropdownPlaceholder;
        teachers.forEach(teacher => {
          this.loadTeacherInfoById(teacher.id).then(teacherInfo => {
            let dropdownOption = { id: teacher.id, value: teacherInfo };
            teachersDropdownConfig.options.push(dropdownOption);
            resolve(teachersDropdownConfig)
          })
        })
      })     
    }
  },
  computed: {
    ...mapGetters('teachers', {
      getTeachers: 'getTeachers',
      getSelectedTeacher: 'getSelectedTeacher',
      getTeachersDropdownPlaceholder: 'getDropdownPlaceholder',
      getSelectedTeacherInfo: 'getSelectedTeacherInfo'
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