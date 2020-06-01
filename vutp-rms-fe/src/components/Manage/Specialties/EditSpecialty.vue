<template>
    <section class="section">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
        <multiselect v-if="!selectedSpecialty" track-by="id" placeholder="Select specialty" :options=getSpecialties :searchable="true" :allow-empty="false" :custom-label="getSpecialtyCustomLabel" @select="updateselectedSpecialty"></multiselect>
          <div v-if="selectedSpecialty" class="box">          
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
            <div class="buttons">
                <button :disabled="!canSubmit" class="button is-block is-info is-fullwidth" type="submit">Update</button> 
                <button  @click="cancelUpdate" class="button is-block is-warning is-fullwidth" type="submit">Cancel</button>  
              </div>      
            </form>
          </div>
        </div>
      </div>  
  </section> 
</template>

<script lang="js">
import Multiselect from 'vue-multiselect'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import msg from '../../../core/msg';
import core from '../../../core/core'

  export default {
    name: "EditSpecialty",
    title: "EditSpecialty",
     data: () => ({
        selectedSpecialty: null,
        specialtyInfo: {
            id: '',
            name: '',
            grade: ''
        },
        validationStatus: {
            name: {
                value: '',
                isValid: false,
                errMessage: 'Name should be between 1 and 20 characters'
            },
            grade: {
                value: '',
                isValid: false,
                errMessage: 'Grade should be between 1 and 5'
            }
        }
    }),
    components: {
        Multiselect
    },
    props: {},
    methods: {
        ...mapActions('specialties', {
            updateSpecialty: 'updateSpecialty',
            loadSpecialties: 'loadSpecialties',
        }),
        ...mapMutations('common', {
            setIsLoadingData: 'SET_ISLOADING'
        }),
        getSpecialtyCustomLabel({ name, grade }){
            return `Specialty - Name: ${name}; Grade: ${grade}`;
        },
        handleSubmit() {
            var self = this;
            this.setIsLoadingData(true);
            this.updateSpecialty(this.specialtyInfo).then((res) => {
                self.setIsLoadingData(false);
                msg.success(res.replace('<name>', `'${self.selectedSpecialty.name} - ${self.selectedSpecialty.grade}'`));
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
        },
        updateselectedSpecialty(selectedSpecialty) {
            this.selectedSpecialty = selectedSpecialty;
            this.specialtyInfo.id = selectedSpecialty.id;
            this.validationStatus.name.value = selectedSpecialty.name;
            this.validationStatus.grade.value = selectedSpecialty.grade;
            this.validateName();
            this.validateGrade();
        },
        cancelUpdate() {
            this.selectedSpecialty = null;
        }
    },
    mounted() {
        var self = this;
        this.setIsLoadingData(true);
        this.loadSpecialties().then(() => {
            self.setIsLoadingData(false);
        }).catch(() => {
            msg.error('Loading specialty data failed.');
            self.setIsLoadingData(false);
        });
    },
    computed: {
        ...mapGetters('specialties', {
             getSpecialties: 'getSpecialties',
        }),
        canSubmit() {
            return this.validationStatus.name.isValid && this.validationStatus.grade.isValid && 
            (this.validationStatus.grade.value !== this.selectedSpecialty.grade || this.validationStatus.name.value !== this.selectedSpecialty.name) ;
        }
    }
  }
</script>

<style lang="scss" scoped> 
</style>