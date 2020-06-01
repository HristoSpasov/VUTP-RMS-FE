<template>
  <div id="app">
    <div id="nav">
      <navbar></navbar> 
    </div>
    <notifications  group="success" width="50%" position="center" animation-type="velocity" />
    <notifications  group="warn" width="50%" position="center"  animation-type="velocity" />
    <notifications  group="error" width="50%" position="center" animation-type="velocity" />
    <div class="vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="true"></loading>
    </div>
    <router-view/>
  </div>
</template>

<script>
import navbar from  '@/views/Navbar.vue';

import loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import { mapGetters } from 'vuex'

export default {
  components:{
    navbar,
    loading
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('common', {
      isLoading: 'isLoading'
    })
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: whitesmoke;
}

</style>
