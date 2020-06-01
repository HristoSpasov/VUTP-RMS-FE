<template>
  <div>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <figure class="image is-64x64"> 
      <a  href="/">
        <img class="" src="../img/logo.png"> 
      </a>       
    </figure>
    

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start" v-if="isAuthenticated">
      <a @click="navigateManage('/')" class="navbar-item">Home</a>
      <div v-if="isAdmin" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Admin</a>
          <div class="navbar-dropdown">
          <a @click="navigateManage('/manage/rooms')" class="navbar-item">Manage Rooms</a>
          <a @click="navigateManage('/manage/teachers')" class="navbar-item">Manage Teachers</a>
          <a @click="navigateManage('/manage/specialties')" class="navbar-item">Manage Specialties</a>
          <a @click="navigateManage('/manage/disciplines')" class="navbar-item">Manage Disciplines</a>
          <a @click="navigateManage('/manage/events')" class="navbar-item">Manage Events</a>
        </div>
      </div>     
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons" v-if="!isAuthenticated">
          <a class="button is-primary"><router-link to="/login"><strong>Log in</strong></router-link></a>
          <a class="button is-primary"><router-link to="/register"><strong>Sign up</strong></router-link></a>   
        </div>
        <div class="buttons" v-else>
          <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">Profile</a>
              <div class="navbar-dropdown">
                <!-- <hr class="navbar-divider"> -->
                <a @click="logouthHandler" class="navbar-item">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
  </div>
</template>

<script>
  import core from '../core/core'

  import { mapActions, mapMutations, mapGetters } from 'vuex'
  export default {
    name: "Navbar",
    title: "Navbar",
    data: () => ({

    }),
    methods: {
      ...mapActions('auth', {
          logout: 'logout'
        }),
        ...mapMutations('common', {
            setIsLoadingData: 'SET_ISLOADING'
        }),
        logouthHandler() {
          this.logout();
          core.go('/login')
        },
        navigateManage(route) {
          core.go(route);
        }
    },
    computed: {
      ...mapGetters('auth', {
        isAuthenticated: 'isAuthenticated',
        isAdmin: 'isAdmin'
      })
    },
    components: {}
  }
</script>

<style lang="css" scoped>
    .nav-item.ripple-parent a {
        color: whitesmoke;
    }
</style>