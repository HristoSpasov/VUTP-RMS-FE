<template>
    <section class="section">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="box">          
            <form @submit.prevent="handleSubmit">
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input @change="validateName" :class="['input', { 'is-danger': specialtyInfo.name.length !== 0 && !validationStatus.name.isValid }, { 'is-success': specialtyInfo.name.length !== 0 && validationStatus.name.isValid }]" type="text" required placeholder="Name" autofocus="" v-model="validationStatus.name.value">
                   <span class="icon is-left"><i class="fas fa-school"></i></span>
                   <span v-show="specialtyInfo.name.length !== 0 && validationStatus.name.isValid" class="icon is-small is-right"><i class="fas fa-check"></i></span>    
                   <span v-show="specialtyInfo.name.length !== 0 && !validationStatus.name.isValid" class="icon is-small is-right"><i class="fas fa-exclamation-circle"></i></span>
                </div>               
              </div>
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input @change="validateGrade" :class="['input', { 'is-danger': specialtyInfo.grade.length !== 0 && !validationStatus.grade.isValid }, { 'is-success': specialtyInfo.grade.length !== 0 && validationStatus.grade.isValid }]" type="text"  required placeholder="Grade" autofocus="" v-model="validationStatus.grade.value">
                   <span class="icon is-left"><i class="fas fa-school"></i></span>
                   <span v-show="specialtyInfo.grade.length !== 0 && validationStatus.grade.isValid" class="icon is-small is-right"><i class="fas fa-check"></i></span>    
                   <span v-show="specialtyInfo.grade.length !== 0 && !validationStatus.grade.isValid" class="icon is-small is-right"><i class="fas fa-exclamation-circle"></i></span>
                </div>
              </div>
              <button :disabled="!canSubmit" class="button is-block is-info is-fullwidth" type="submit">Add Specialty</button>        
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
    name: "AddSpecialty",
    title: "AddSpecialty",
    data: () => ({
        specialtyInfo: {
            name: '',
            grade: ''
        },
        validationStatus: {
            name: {
                value: '',
                isValid: false,
                errMessage: 'Name should be between 2 and 20 characters'
            },
            grade: {
                value: '',
                isValid: false,
                errMessage: 'Grade should be between 1 and 5'
            }
        }
    }),
    components: {},
    props: {},
    methods: {
        ...mapActions('specialties', {
            createSpecialty: 'createSpecialty',
        }),
        ...mapMutations('common', {
            setIsLoadingData: 'SET_ISLOADING'
        }),
        handleSubmit() {
            var self = this;
            this.setIsLoadingData(true);
            this.createSpecialty(this.specialtyInfo).then((res) => {
                self.setIsLoadingData(false);
                msg.success(res);
                core.go('/manage/specialties')
            }).catch((err) => {
                self.setIsLoadingData(false);
                msg.error(err.response.data.error);
            });
        },
        validateName() {
           this.validationStatus.name.isValid = this.validationStatus.name.value.length >= 2 && this.validationStatus.name.value.length <= 20;

            if (!this.validationStatus.name.isValid) {
                msg.error(this.validationStatus.name.errMessage);
            }

            this.specialtyInfo.name = this.validationStatus.name.value;
        },
        validateGrade() {
          this.validationStatus.grade.isValid = !isNaN(this.validationStatus.grade.value) && parseInt(this.validationStatus.grade.value) >= 1 && parseInt(this.validationStatus.grade.value) <= 5;

            if (!this.validationStatus.grade.isValid) {
                msg.error(this.validationStatus.grade.errMessage);
            }

            this.specialtyInfo.grade = this.validationStatus.grade.value = parseInt(this.validationStatus.grade.value);
        }
    },
    mounted() {
    },
    computed: {
      canSubmit() {
        return this.validationStatus.name.isValid && this.validationStatus.grade.isValid;
      }
    }
  }
</script>

<style lang="scss" scoped> 
</style>