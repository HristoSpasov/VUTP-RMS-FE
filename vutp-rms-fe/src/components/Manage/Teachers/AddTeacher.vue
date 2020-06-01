<template>
    <section class="section">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="box">          
            <form @submit.prevent="handleSubmit">
              <div class="field">
                <div class="control has-icons-right">
                  <input @change="validateFirstName" :class="['input', { 'is-danger': teacherInfo.firstName.length !== 0 && !validationStatus.firstName.isValid }, { 'is-success': teacherInfo.firstName.length !== 0 && validationStatus.firstName.isValid }]" type="text" placeholder="First Name" autofocus="" v-model="validationStatus.firstName.value">
                   <span v-show="teacherInfo.firstName.length !== 0 && validationStatus.firstName.isValid" class="icon is-small is-right"><i class="fas fa-check"></i></span>    
                  <span v-show="teacherInfo.firstName.length !== 0 && !validationStatus.firstName.isValid" class="icon is-small is-right"><i class="fas fa-exclamation-circle"></i></span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-right">
                  <input @change="validateLastName" :class="['input', { 'is-danger': teacherInfo.lastName.length !== 0 && !validationStatus.lastName.isValid }, { 'is-success': teacherInfo.lastName.length !== 0 && validationStatus.lastName.isValid }]" type="text" placeholder="Last Name" required v-model="validationStatus.lastName.value">
                  <span v-show="teacherInfo.lastName.length !== 0 && validationStatus.lastName.isValid" class="icon is-small is-right"><i class="fas fa-check"></i></span>    
                  <span v-show="teacherInfo.lastName.length !== 0 && !validationStatus.lastName.isValid" class="icon is-small is-right"><i class="fas fa-exclamation-circle"></i></span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-right">
                  <input @change="validateAcademicTitle" :class="['input', { 'is-danger': teacherInfo.academicTitle.length !== 0 && !validationStatus.academicTitle.isValid }, { 'is-success': teacherInfo.academicTitle.length !== 0 && validationStatus.academicTitle.isValid }]" type="text" placeholder="Academic Title" v-model="validationStatus.academicTitle.value">
                  <span v-show="teacherInfo.academicTitle.length !== 0 && validationStatus.academicTitle.isValid" class="icon is-small is-right"><i class="fas fa-check"></i></span>    
                  <span v-show="teacherInfo.academicTitle.length !== 0 && !validationStatus.academicTitle.isValid" class="icon is-small is-right"><i class="fas fa-exclamation-circle"></i></span>
                </div>
              </div>
              <button :disabled="!canSubmit" class="button is-block is-info is-fullwidth" type="submit">Add Teacher</button>        
            </form>
          </div>
        </div>
      </div>  
  </section> 
</template>

<script lang="js">

import { mapActions, mapMutations } from 'vuex'
import msg from '../../../core/msg';
import core from '../../../core/core'

  export default {
    name: "AddTeacher",
    title: "AddTeacher",
    data: () => ({
        teacherInfo: {
            firstName: '',
            lastName: '',
            academicTitle: ''
        },
        validationStatus: {
            firstName: {
                value: '',
                isValid: false,
                errMessage: 'First name should be between 3 and 20 characters'
            },
            lastName: {
                value: '',
                isValid: false,
                errMessage: 'Last name should be between 3 and 20 characters'
            },
            academicTitle: {
                value: '',
                isValid: false,
                errMessage: 'Academic title should be between 3 and 20 characters'
            }
        }
    }),
    components: {},
    props: {},
    methods: {
        ...mapActions('teachers', {
            createTeacher: 'createTeacher',
        }),
        ...mapMutations('common', {
            setIsLoadingData: 'SET_ISLOADING'
        }),
        handleSubmit() {
            var self = this;
            this.setIsLoadingData(true);
            this.createTeacher(this.teacherInfo).then((res) => {
                self.setIsLoadingData(false);
                msg.success(res);
                core.go('/manage/teachers')
            }).catch((err) => {
                self.setIsLoadingData(false);
                msg.error(err.response.data.error);
            });
        },
        validateFirstName() {
            this.validationStatus.firstName.isValid = this.validationStatus.firstName.value.length >= 3 && this.validationStatus.firstName.value.length <= 20;

            if (!this.validationStatus.firstName.isValid) {
                msg.error(this.validationStatus.firstName.errMessage);
            }

            this.teacherInfo.firstName = this.validationStatus.firstName.value;
        },
        validateLastName() {
            this.validationStatus.lastName.isValid = this.validationStatus.lastName.value.length >= 3 && this.validationStatus.lastName.value.length <= 20;

            if (!this.validationStatus.lastName.isValid) {
                msg.error(this.validationStatus.lastName.errMessage);
            }

            this.teacherInfo.lastName = this.validationStatus.lastName.value;
        },
        validateAcademicTitle() {
            this.validationStatus.academicTitle.isValid = this.validationStatus.academicTitle.value.length >= 3 && this.validationStatus.academicTitle.value.length <= 20;

            if (!this.validationStatus.academicTitle.isValid) {
                msg.error(this.validationStatus.academicTitle.errMessage);
            }

            this.teacherInfo.academicTitle = this.validationStatus.academicTitle.value;
        }
    },
    mounted() {
    },
    computed: {
        canSubmit() {
            return this.validationStatus.firstName.isValid && this.validationStatus.lastName.isValid && this.validationStatus.academicTitle.isValid;
        }
    }
  }
</script>

<style lang="scss" scoped> 
</style>