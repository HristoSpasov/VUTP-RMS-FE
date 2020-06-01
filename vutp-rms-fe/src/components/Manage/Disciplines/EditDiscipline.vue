<template>
    <section class="section">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
        <multiselect v-if="!selectedDiscipline" track-by="id" placeholder="Select discipline" :options=getDisciplines :searchable="true" :allow-empty="false" :custom-label="getDisciplineCustomLabel" @select="updateSelectedDiscipline"></multiselect>
          <div v-if="selectedDiscipline" class="box">          
            <form @submit.prevent="handleSubmit">
              <div class="field">
                <div :class="['control', 'has-icons-left', 'has-icons-right', { 'is-loading': validationStatus.name.isBusy }]">
                  <input @change="validateNumber" :class="['input', { 'is-danger': disciplineInfo.name.length !== 0 && !validationStatus.name.isValid }, { 'is-success': disciplineInfo.name.length !== 0 && validationStatus.name.isValid }]" type="text" placeholder="Name" autofocus="" v-model="validationStatus.name.value">
                   <span class="icon is-left"><i class="fas fa-school"></i></span>
                   <span v-show="disciplineInfo.name.length !== 0 && validationStatus.name.isValid && !validationStatus.name.isBusy" class="icon is-small is-right"><i class="fas fa-check"></i></span>    
                   <span v-show="disciplineInfo.name.length !== 0 && !validationStatus.name.isValid && !validationStatus.name.isBusy" class="icon is-small is-right"><i class="fas fa-exclamation-circle"></i></span>
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
    name: "EditDiscipline",
    title: "EditDiscipline",
    data: () => ({
        selectedDiscipline: null,
        disciplineInfo: {
            id: '',
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
    components: {
        Multiselect
    },
    props: {},
    methods: {
        ...mapActions('disciplines', {
            updateDiscipline: 'updateDiscipline',
            loadDisciplines: 'loadDisciplines',
            validateDisciplineName: 'validateDisciplineName'
        }),
        ...mapMutations('common', {
            setIsLoadingData: 'SET_ISLOADING'
        }),
        getDisciplineCustomLabel({ name }){
            return `Discipline - ${name}`;
        },
        handleSubmit() {
            var self = this;
            this.setIsLoadingData(true);
            this.updateDiscipline(this.disciplineInfo).then((res) => {
                self.setIsLoadingData(false);
                msg.success(res.replace('<name>', `'${self.selectedDiscipline.name}'`));
                core.go('/manage/disciplines')
            }).catch((err) => {
                self.setIsLoadingData(false);
                msg.error(err.response.data.error);
            });
        },
        validateNumber() {
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
        },
        updateSelectedDiscipline(selectedDiscipline) {
            this.selectedDiscipline = selectedDiscipline;
            this.disciplineInfo.id = selectedDiscipline.id;
            this.validationStatus.name.value = selectedDiscipline.name;
        },
        cancelUpdate() {
            this.selectedDiscipline = null;
        }
    },
    mounted() {
        var self = this;
        this.setIsLoadingData(true);
        this.loadDisciplines().then(() => {
            self.setIsLoadingData(false);
        }).catch(() => {
            msg.error('Loading room data failed.');
            self.setIsLoadingData(false);
        });
    },
    computed: {
        ...mapGetters('disciplines', {
             getDisciplines: 'getDisciplines',
        }),
        canSubmit() {
            return this.validationStatus.name.isValid && this.validationStatus.name.value !== this.selectedDiscipline.name;
        }
    }
  }
</script>

<style lang="scss" scoped> 
</style>