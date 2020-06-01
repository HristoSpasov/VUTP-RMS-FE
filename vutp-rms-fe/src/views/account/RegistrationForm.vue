<template>
  <section class="section">    
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Register</h3>
          <p class="subtitle has-text-grey">Please enter your information</p>
          <div class="box">     
             <!-- @submit handles any form of submission. -->
             <!-- .prevent keeps the event from bubbling around and doing anything else. -->  
            <form @submit.prevent="handleSubmit">
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input @change="validateFirstName" :class="['input', { 'is-danger': user.firstName.length !== 0 && !validationStatus.firstName.isValid }, { 'is-success': user.firstName.length !== 0 && validationStatus.firstName.isValid }]" type="text" placeholder="First Name" required v-model="validationStatus.firstName.value">
                  <span class="icon is-left"><i class="fas fa-user"></i> </span> 
                  <span v-show="user.firstName.length !== 0 && validationStatus.firstName.isValid" class="icon is-small is-right"><i class="fas fa-check"></i></span>    
                  <span v-show="user.firstName.length !== 0 && !validationStatus.firstName.isValid" class="icon is-small is-right"><i class="fas fa-exclamation-circle"></i></span>
                </div>
              </div>

              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input @change="validateLastName" :class="['input', { 'is-danger': user.lastName.length !== 0 && !validationStatus.lastName.isValid }, { 'is-success': user.lastName.length !== 0 && validationStatus.lastName.isValid }]" type="text" placeholder="Last Name" required v-model="validationStatus.lastName.value">
                  <span class="icon is-left"><i class="fas fa-user"></i> </span> 
                  <span v-show="user.lastName.length !== 0 && validationStatus.lastName.isValid" class="icon is-small is-right"><i class="fas fa-check"></i></span>    
                  <span v-show="user.lastName.length !== 0 && !validationStatus.lastName.isValid" class="icon is-small is-right"><i class="fas fa-exclamation-circle"></i></span>
                </div>
              </div>
              
              <div class="field">
                <div :class="['control', 'has-icons-left', 'has-icons-right', { 'is-loading': validationStatus.userName.isBusy }]">
                  <input @change="validateUser" :class="['input', { 'is-danger': user.userName.length !== 0 && !validationStatus.userName.isValid  }, { 'is-success': user.userName.length !== 0 && validationStatus.userName.isValid  }]" type="text" placeholder="Username" required v-model="validationStatus.userName.value">
                  <span class="icon is-left"><i class="fas fa-user"></i> </span>
                  <span v-show="user.userName.length !== 0 && validationStatus.userName.isValid && !validationStatus.userName.isBusy" class="icon is-small is-right"><i class="fas fa-check"></i></span>    
                  <span v-show="user.userName.length !== 0 && !validationStatus.userName.isValid && !validationStatus.userName.isBusy" class="icon is-small is-right"><i class="fas fa-exclamation-circle"></i></span>   
                </div>
              </div>

              <div class="field">
                <div :class="['control', 'has-icons-left', 'has-icons-right', { 'is-loading': validationStatus.email.isBusy }]">
                  <input @change="validateEmail" :class="['input', { 'is-danger': user.email.length !== 0 && !validationStatus.email.isValid  }, { 'is-success': user.email.length !== 0 && validationStatus.email.isValid  }]" type="email" placeholder="Email" required v-model="validationStatus.email.value">
                  <span class="icon is-left"><i class="fas fa-envelope"></i> </span>
                  <span v-show="user.email.length !== 0 && validationStatus.email.isValid && !validationStatus.email.isBusy" class="icon is-small is-right"><i class="fas fa-check"></i></span>    
                  <span v-show="user.email.length !== 0 && !validationStatus.email.isValid && !validationStatus.email.isBusy" class="icon is-small is-right"><i class="fas fa-exclamation-circle"></i></span>     
                </div>
              </div>
            
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input @change="validatePassword" :class="['input', { 'is-danger': user.password.length !== 0 && !validationStatus.password.isValid }, { 'is-success': user.password.length !== 0 && validationStatus.password.isValid }]" type="password" placeholder="Password" required v-model="validationStatus.password.value">
                  <span class="icon is-left"><i class="fas fa-lock"></i></span>   
                  <span v-show="user.password.length !== 0 && validationStatus.password.isValid" class="icon is-small is-right"><i class="fas fa-check"></i></span>    
                  <span v-show="user.password.length !== 0 && !validationStatus.password.isValid" class="icon is-small is-right"><i class="fas fa-exclamation-circle"></i></span>      
                </div>
              </div>

              <button :disabled="!canSubmit" class="button is-block is-info is-fullwidth" type="submit">Submit</button>
              <div class='errors-container' v-for='err in errors' :key="err">
                 {{err}}
              </div>
            </form>
          </div>
          <p class="has-text-grey">
             <router-link to="/login">Login</router-link>
          </p>        
        </div>
      </div>   
  </section>
</template>

<script lang="js">
import core from '../../core/core';

import { mapActions, mapMutations } from 'vuex'
import msg from '../../core/msg';

  export default {
    name: "Register",
    title: "Register",
    data: () => ({
        user: {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: ''
        },
        errors: [],
        validationStatus: {
            firstName: {
                value: '',
                isValid: false,
                errMessage: 'First name should be more than 2 characters.'
            },
            lastName: {
                value: '',
                isValid: false,
                errMessage: 'Last name should be more than 2 characters.'
            },
            userName: {
                value: '',
                isValid: false,
                isBusy: false,
                errMessage: 'Invalid username or username already in use. Username should be between 3 and 50 characters.',          
            },
            email: {
                value: '',
                isValid: false,
                isBusy: false,
                errMessage: 'Invalid email or email already in use',          
            },
            password: {
                value: '',
                isValid: false,
                errMessage: 'Password length should be between 6 and 25 characters.'
            }           
        }
    }),
    components: {},
    props: {},
    methods: {
        ...mapActions('auth', {
            register: 'register',
            validateEmailAddress: 'validateEmailAddress',
            validateUserName: 'validateUserName'
        }),
        ...mapMutations('common', {
            setIsLoadingData: 'SET_ISLOADING'
        }),
        handleSubmit() {
            var self = this;
            if (!this.canSubmit) {
                msg.error("Invalid registration inforamation. Plesase check your inputs.");
                return;
            }

            this.setIsLoadingData(true);
            this.register(this.user).then(() => {
                self.setIsLoadingData(false);
                core.go('login', {firstName: this.user.firstName, new: this.user.userName });
            }).catch(err => {
                console.log(err.response);
                self.setIsLoadingData(false);
            });
        },
        validateFirstName() {
            this.validationStatus.firstName.isValid = this.validationStatus.firstName.value.length >= 3
            if (!this.validationStatus.firstName.isValid) {
                msg.error(this.validationStatus.firstName.errMessage);
            } 

            this.user.firstName = this.validationStatus.firstName.value;
        },
        validateLastName() {
            this.validationStatus.lastName.isValid = this.validationStatus.lastName.value.length >= 3
            if (!this.validationStatus.lastName.isValid) {
                msg.error(this.validationStatus.lastName.errMessage);
            } 

            this.user.lastName = this.validationStatus.lastName.value;
        },
        validateUser() {
            var self = this;
            this.validationStatus.userName.isBusy = true;
            this.validateUserName(this.validationStatus.userName.value).then(() => {
                self.validationStatus.userName.isBusy = false;
                self.validationStatus.userName.isValid = true;
            }).catch(() => {
                self.validationStatus.userName.isBusy = false;
                self.validationStatus.userName.isValid = false;
                msg.error(self.validationStatus.userName.errMessage);
            })

            this.user.userName = self.validationStatus.userName.value;
        },
        validateEmail() {
            var self = this;
            this.validationStatus.email.isBusy = true;
            this.validateEmailAddress(this.validationStatus.email.value).then(() => {
                self.validationStatus.email.isBusy = false;
                self.validationStatus.email.isValid = true;
            }).catch(() => {
                self.validationStatus.email.isBusy = false;
                self.validationStatus.email.isValid = false;
                msg.error(self.validationStatus.email.errMessage);
            })

            this.user.email = self.validationStatus.email.value;
        },
        validatePassword() {
            this.validationStatus.password.isValid = this.validationStatus.password.value.length >= 6 && this.validationStatus.password.value.length <= 25
            if (!this.validationStatus.password.isValid) {
                msg.error(this.validationStatus.password.errMessage);
            } 

            this.user.password = this.validationStatus.password.value;
        }
    },
    mounted() {},
    computed: {
        canSubmit: function() {
            return this.validationStatus.firstName.isValid && this.validationStatus.lastName.isValid && this.validationStatus.userName.isValid && this.validationStatus.email.isValid && this.validationStatus.password.isValid;
        }
    }
  }
</script>

<style lang="scss" scoped> 
</style>