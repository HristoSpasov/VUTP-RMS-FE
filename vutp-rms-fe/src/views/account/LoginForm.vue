<template>
    <section class="section">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Login</h3>
          <p class="subtitle has-text-grey">Please login to proceed</p>         
          <article class="message is-success" v-if="$route.query.new">
          <div class="message-body">
            <strong>You're all set {{$route.query.firstName}}!</strong> Login with your password to continue.
          </div>
          </article>
          <div class="box">          
            <form @submit.prevent="handleSubmit">
              <div class="field">
                <div class="control">
                  <input class="input is-large" type="text" placeholder="Username" autofocus="" v-model="credentials.userName">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large" type="password" placeholder="Password" v-model="credentials.password">
                </div>
              </div>
              <button class="button is-block is-info is-large is-fullwidth" type="submit">Login</button>
              <div class="errors-container" v-if="errors">
                 {{errors}}
              </div>
            </form>
          </div>
          <p class="has-text-grey">
             <router-link to="/register">Sign Up</router-link>
          </p>
        </div>
      </div>  
  </section> 
</template>

<script lang="js">
import core from '../../core/core';

import { mapActions, mapMutations } from 'vuex'

  export default {
    name: "Login",
    title: "Login",
    data: () => ({
        credentials: {
            userName: "",
            password: ""
        },
        errors: ''
    }),
    components: {},
    props: {},
    methods: {
        ...mapActions('auth', {
            login: 'login',
        }),
        ...mapMutations('common', {
            setIsLoadingData: 'SET_ISLOADING'
        }),
        handleSubmit() {
            var self = this;
            this.setIsLoadingData(true);
            this.login(this.credentials).then(() => {
                self.setIsLoadingData(false);
                core.go('/');
            });
        }
    },
    mounted() {
      this.credentials.userName = this.$route.query.new || ''
    }
  }
</script>

<style lang="scss" scoped> 
</style>