<template>
    <section class="section">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="box">          
            <form @submit.prevent="handleSubmit">
              <div class="field">
                <div :class="['control', 'has-icons-left', 'has-icons-right', { 'is-loading': validationStatus.name.isBusy }]">
                  <input @change="validateName" :class="['input', { 'is-danger': disciplineInfo.name.length !== 0 && !validationStatus.name.isValid }, { 'is-success': disciplineInfo.name.length !== 0 && validationStatus.name.isValid }]" type="text" placeholder="Name" autofocus="" required v-model="validationStatus.name.value">
                   <span class="icon is-left"><i class="fas fa-school"></i></span>
                   <span v-show="disciplineInfo.name.length !== 0 && validationStatus.name.isValid && !validationStatus.name.isBusy" class="icon is-small is-right"><i class="fas fa-check"></i></span>    
                   <span v-show="disciplineInfo.name.length !== 0 && !validationStatus.name.isValid && !validationStatus.name.isBusy" class="icon is-small is-right"><i class="fas fa-exclamation-circle"></i></span>
                </div>
              </div>
              <button :disabled="!canSubmit" class="button is-block is-info is-fullwidth" type="submit">Add Discipline</button>        
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
    name: "AddDiscipline",
    title: "AddDiscipline",
    data: () => ({
        disciplineInfo: {
            name: ''
        },
        validationStatus: {
            name: {
                value: '',
                isValid: false,
                isBusy: false,
                errMessage: 'Discipline already exists. Name should be between 3 and 20 characters'
            }
        }
    }),
    components: {},
    props: {},
    methods: {
        ...mapActions('disciplines', {
            createDiscipline: 'createDiscipline',
            validateDisciplineName: 'validateDisciplineName'
        }),
        ...mapMutations('common', {
            setIsLoadingData: 'SET_ISLOADING'
        }),
        handleSubmit() {
            var self = this;
            this.setIsLoadingData(true);
            this.createDiscipline(this.disciplineInfo).then((res) => {
                self.setIsLoadingData(false);
                msg.success(res);
                core.go('/manage/disciplines')
            }).catch((err) => {
                self.setIsLoadingData(false);
                msg.error(err.response.data.error);
            });
        },
        validateName() {
            var self = this;
            this.validationStatus.name.isBusy = true;
            this.validateDisciplineName(this.validationStatus.name.value).then(() => {
                self.validationStatus.name.isBusy = false;
                self.validationStatus.name.isValid = true;
            }).catch((err) => {
                self.validationStatus.name.isBusy = false;
                self.validationStatus.name.isValid = false;
                msg.error(err.response.data);
            })

            this.disciplineInfo.name = self.validationStatus.name.value;
        }
    },
    mounted() {
    },
    computed: {
        canSubmit() {
            return this.validationStatus.name.isValid;
        }
    }
  }
</script>

<style lang="scss" scoped> 
</style>