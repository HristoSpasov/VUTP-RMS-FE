<template>
    <section class="section">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
        <multiselect selectLabel="" v-if="!selectedSpecialty" track-by="id" placeholder="Select specialty" :options=getSpecialties :searchable="true" :allow-empty="false" :custom-label="getSpecialtyCustomLabel" @select="updateselectedSpecialty"></multiselect>
          <div v-if="selectedSpecialty" class="box">          
            <form @submit.prevent="handleSubmit">
              <div class="field">
                <div class="control has-icons-left">
                  <input :disabled="true"  class="input" type="text" required placeholder="Name" autofocus="" v-model="selectedSpecialty.name">
                   <span class="icon is-left"><i class="fas fa-school"></i></span>
                </div>               
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input :disabled="true" class="input" type="text"  required placeholder="Grade" autofocus="" v-model="selectedSpecialty.grade">
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
    name: "DeleteSpecialty",
    title: "DeleteSpecialty",
     data: () => ({
        selectedSpecialty: null,
    }),
    components: {
        Multiselect
    },
    props: {},
    methods: {
        ...mapActions('specialties', {
            deleteSpecialty: 'deleteSpecialty',
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
            this.deleteSpecialty(this.selectedSpecialty.id).then((res) => {
                self.setIsLoadingData(false);
                msg.success(res.replace('<name>', `'${self.selectedSpecialty.name} - ${self.selectedSpecialty.grade}'`));
                core.go('/manage/specialties')
            }).catch((err) => {
                self.setIsLoadingData(false);
                msg.error(err.response.data.error);
            });
        },
        updateselectedSpecialty(selectedSpecialty) {
            this.selectedSpecialty = selectedSpecialty;
        },
        cancelDelete() {
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
        })
    }
  }
</script>

<style lang="scss" scoped> 
</style>