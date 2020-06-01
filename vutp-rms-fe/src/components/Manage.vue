<template>
  <div>
    <section class="section">
        <h1 class="title">Manage {{$route.params.asset}}</h1>
        <manage-menu></manage-menu>
    </section>
    <add-teacher v-if="asset === 'teachers' && action === 'add'"></add-teacher>
    <edit-teacher v-if="$route.params.asset === 'teachers' && action === 'edit'"></edit-teacher>
    <delete-teacher v-if="$route.params.asset === 'teachers' && action === 'delete'"></delete-teacher>
    <add-room v-if="$route.params.asset === 'rooms' && action === 'add'"></add-room>
    <edit-room v-if="$route.params.asset === 'rooms' && action === 'edit'"></edit-room>
    <delete-room v-if="$route.params.asset === 'rooms' && action === 'delete'"></delete-room>
    <add-specialty v-if="$route.params.asset === 'specialties' && action === 'add'"></add-specialty>
    <edit-specialty v-if="$route.params.asset === 'specialties' && action === 'edit'"></edit-specialty>
    <delete-specialty v-if="$route.params.asset === 'specialties' && action === 'delete'"></delete-specialty>
    <add-discipline v-if="$route.params.asset === 'disciplines' && action === 'add'"></add-discipline>
    <edit-discipline v-if="$route.params.asset === 'disciplines' && action === 'edit'"></edit-discipline>
    <delete-discipline v-if="$route.params.asset === 'disciplines' && action === 'delete'"></delete-discipline>
    <add-event v-if="$route.params.asset === 'events' && action === 'add'"></add-event>
    <edit-event v-if="$route.params.asset === 'events' && action === 'edit'"></edit-event>
    <delete-event v-if="$route.params.asset === 'events' && action === 'delete'"></delete-event>
  </div>
</template>

<script lang="js">
import ManageMenu from './Manage/ManageMenu'
import AddTeacher from './Manage/Teachers/AddTeacher'
import EditTeacher from './Manage/Teachers/EditTeacher'
import DeleteTeacher from './Manage/Teachers/DeleteTeacher'
import AddRoom from './Manage/Rooms/AddRoom'
import EditRoom from './Manage/Rooms/EditRoom'
import DeleteRoom from './Manage/Rooms/DeleteRoom'
import AddSpecialty from './Manage/Specialties/AddSpecialty'
import EditSpecialty from './Manage/Specialties/EditSpecialty'
import DeleteSpecialty from './Manage/Specialties/DeleteSpecialty'
import AddDiscipline from './Manage/Disciplines/AddDiscipline'
import EditDiscipline from './Manage/Disciplines/EditDiscipline'
import DeleteDiscipline from './Manage/Disciplines/DeleteDiscipline'
import AddEvent from './Manage/Events/AddEvent'
import EditEvent from './Manage/Events/EditEvent'
import DeleteEvent from './Manage/Events/DeleteEvent'

import { mapActions, mapMutations } from 'vuex'
  export default {
    name: "Manage",
    title: "Manage",
    props: [ 'asset', 'action' ],
    data: () => ({  
    }),
    components: {
      ManageMenu,
      AddTeacher,
      EditTeacher,
      DeleteTeacher,
      AddRoom,
      EditRoom,
      DeleteRoom,
      AddSpecialty,
      EditSpecialty,
      DeleteSpecialty,
      AddDiscipline,
      EditDiscipline,
      DeleteDiscipline,
      AddEvent,
      EditEvent,
      DeleteEvent
    },
    methods: {
      ...mapActions('rooms', {
      }),
      ...mapMutations('common', {
          setIsLoadingData: 'SET_ISLOADING'
      })
    },
    watch: {
    },
    mounted() {
    },
    computed: { }
  }
</script>

<style lang="scss" scoped> 

</style>