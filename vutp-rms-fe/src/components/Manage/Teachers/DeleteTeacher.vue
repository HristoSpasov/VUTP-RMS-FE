<template>
    <section class="section">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
        <multiselect v-if="!selectedTeacher" track-by="id" placeholder="Select teacher" :options=getTeachers :searchable="true" :allow-empty="false" :custom-label="getTeacherCustomLabel" @select="updateSelectedTeacher"></multiselect>
          <div v-if="selectedTeacher" class="box">          
            <form @submit.prevent="handleSubmit">
              <div class="field">
                <div class="control has-icons-right">
                  <input :disabled="true" class="input" type="text" placeholder="First Name" autofocus="" v-model="selectedTeacher.firstName">
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-right">
                  <input :disabled="true" class="input" type="text" placeholder="Last Name" required v-model="selectedTeacher.lastName">
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-right">
                  <input :disabled="true" class="input" type="text" placeholder="Academic Title" v-model="selectedTeacher.academicTitle">
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
    name: "EditTeacher",
    title: "EditTeacher",
    data: () => ({
        selectedTeacher: null
    }),
    components: {
        Multiselect
    },
    methods: {
        ...mapActions('teachers', {
            deleteTeacher: 'deleteTeacher',
            loadTeachers: 'loadTeachers'
        }),
        ...mapMutations('common', {
            setIsLoadingData: 'SET_ISLOADING'
        }),
        getTeacherCustomLabel({ firstName, lastName, academicTitle }){
            return `${academicTitle} - ${firstName} ${lastName}`;
        },
        handleSubmit() {
            var self = this;
            this.setIsLoadingData(true);
            this.deleteTeacher(this.selectedTeacher.id).then((res) => {
                self.setIsLoadingData(false);
                msg.success(res.replace('<name>', `'${self.selectedTeacher.academicTitle} - ${self.selectedTeacher.firstName} ${self.selectedTeacher.lastName}'`));
                core.go('/manage/teachers')
            }).catch((err) => {
                self.setIsLoadingData(false);
                msg.error(err.response.data.error);
            });
        },       
        updateSelectedTeacher(selectedTeacher) {
            this.selectedTeacher = selectedTeacher;
        },
        cancelDelete() {
            this.selectedTeacher = null;
        }
    },
    mounted() {
        var self = this;
        this.setIsLoadingData(true);
        this.loadTeachers().then(() => {
            self.setIsLoadingData(false);
        }).catch(() => {
            msg.error('Loading teacher data failed.');
            self.setIsLoadingData(false);
        });
    },
    computed: {
        ...mapGetters('teachers', {
             getTeachers: 'getTeachers',
        })
    }
  }
</script>

<style lang="scss" scoped> 
</style>