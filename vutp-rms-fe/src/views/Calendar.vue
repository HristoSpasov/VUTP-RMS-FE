<template>
  <div id="callendar">
      <FullCalendar 
      defaultView="dayGridMonth" 
      :plugins="calendarPlugins"
      :header="header"
      :editable="true"
      slotDuration="00:45:00"
      :events="events" />
  </div>
</template>

<script>

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
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

</style>