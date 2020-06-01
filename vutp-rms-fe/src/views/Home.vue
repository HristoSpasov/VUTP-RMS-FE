<template>
  <div class="home">
    <img alt="UTP logo" src="../assets/logo.png" width="200">
    <div class="home">
      <section class="section">
        <h1 class="title">Select events to display</h1>
        <div class="container has-text-centered">
          <div v-if="getDisciplines.length > 0" class="column is-4 is-offset-4">
            <multiselect  track-by="id" placeholder="Select discipline" :options=getDisciplines :searchable="true" :allow-empty="false" :custom-label="getDisciplineCustomLabel" @select="filterDisciplineEvents"></multiselect>
          </div>
          <div v-if="getRooms.length > 0" class="column is-4 is-offset-4">
            <multiselect track-by="id" placeholder="Select room" :options=getRooms :searchable="true" :allow-empty="false" :custom-label="getRoomCustomLabel" @select="filterRoomEvents"></multiselect>
          </div>
          <div v-if="getTeachers.length > 0" class="column is-4 is-offset-4">
            <multiselect track-by="id" placeholder="Select teacher" :options=getTeachers :searchable="true" :allow-empty="false" :custom-label="getTeacherCustomLabel" @select="filterTeacherEvent"></multiselect>
          </div>
          <div v-if="getSpecialties.length > 0" class="column is-4 is-offset-4">
            <multiselect track-by="id" placeholder="Select specialty" :options=getSpecialties :searchable="true" :allow-empty="false" :custom-label="getSpecialtyCustomLabel" @select="filterSpecialtyEvents"></multiselect>
          </div>
        </div>  
      </section> 
    </div>
  </div>
</template>
<script lang="js">
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  import msg from '../core/msg';
  import core from '../core/core'
  
  export default {
    name: "Home",
    title: "Home",
    data: () => ({
    }),
    components: {
    },
    props: {   
    },
    methods: {
      ...mapActions('events', {
        loadEvents: 'loadEvents'
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
      filterSpecialtyEvents(selectedSpecialty) {
        core.go('/calendar', { type: "specialty", id: selectedSpecialty.id });
      },
      filterTeacherEvent(selectedTeacher) {
        core.go('/calendar', { type: "teacher", id: selectedTeacher.id });
      },
      filterRoomEvents(selectedRoom) {
        core.go('/calendar', { type: "room", id: selectedRoom.id });
      },
      filterDisciplineEvents(selectedDiscipline) {
        core.go('/calendar', { type: "discipline", id: selectedDiscipline.id });
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
      })
    }
  }
</script>
<style>
  
</style>