<template>
    <section class="section">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
        <multiselect v-if="!selectedDiscipline" track-by="id" placeholder="Select discipline" :options=getDisciplines :searchable="true" :allow-empty="false" :custom-label="getDisciplineCustomLabel" @select="updateselectedDiscipline"></multiselect>
          <div v-if="selectedDiscipline" class="box">          
            <form @submit.prevent="handleSubmit">
              <div class="field">
                <div class="control has-icons-left">
                  <input :disabled="true" class="input" v-model="selectedDiscipline.name">
                   <span class="icon is-left"><i class="fas fa-school"></i></span>
                </div>
            </div>
            <div class="buttons">
                <button  class="button is-block is-info is-fullwidth" type="submit">Delete</button> 
                <button  @click="cancelDelete" class="button is-block is-warning is-fullwidth" type="submit">Cancel</button>  
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
    name: "DeleteDiscipline",
    title: "DeleteDiscipline",
    data: () => ({
        selectedDiscipline: null
    }),
    components: {
        Multiselect
    },
    props: {},
    methods: {
        ...mapActions('disciplines', {
            deleteDiscipline: 'deleteDiscipline',
            loadDisciplines: 'loadDisciplines'
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
            this.deleteDiscipline(this.selectedDiscipline.id).then((res) => {
                self.setIsLoadingData(false);
                msg.success(res.replace('<name>', `'${self.selectedDiscipline.name}'`));
                core.go('/manage/disciplines')
            }).catch((err) => {
                self.setIsLoadingData(false);
                msg.error(err.response.data.error);
            });
        },
        updateselectedDiscipline(selectedDiscipline) {
            this.selectedDiscipline = selectedDiscipline;
        },
        cancelDelete() {
            this.selectedDiscipline = null;
        }
    },
    mounted() {
        var self = this;
        this.setIsLoadingData(true);
        this.loadDisciplines().then(() => {
            self.setIsLoadingData(false);
        }).catch(() => {
            msg.error('Loading disciplines data failed.');
            self.setIsLoadingData(false);
        });
    },
    computed: {
        ...mapGetters('disciplines', {
             getDisciplines: 'getDisciplines',
        })
    }
  }
</script>

<style lang="scss" scoped> 
</style>