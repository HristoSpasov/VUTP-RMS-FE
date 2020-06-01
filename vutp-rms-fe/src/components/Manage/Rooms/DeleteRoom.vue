<template>
    <section class="section">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
        <multiselect v-if="!selectedRoom" track-by="id" placeholder="Select room" :options=getRooms :searchable="true" :allow-empty="false" :custom-label="getRoomCustomLabel" @select="updateselectedRoom"></multiselect>
          <div v-if="selectedRoom" class="box">          
            <form @submit.prevent="handleSubmit">
              <div class="field">
                <div class="control has-icons-left">
                  <input :disabled="true" class="input" v-model="selectedRoom.number">
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
    name: "DeleteRoom",
    title: "DeleteRoom",
    data: () => ({
        selectedRoom: null
    }),
    components: {
        Multiselect
    },
    props: {},
    methods: {
        ...mapActions('rooms', {
            deleteRoom: 'deleteRoom',
            loadRooms: 'loadRooms'
        }),
        ...mapMutations('common', {
            setIsLoadingData: 'SET_ISLOADING'
        }),
        getRoomCustomLabel({ number }){
            return `Room - ${number}`;
        },
        handleSubmit() {
            var self = this;
            this.setIsLoadingData(true);
            this.deleteRoom(this.selectedRoom.id).then((res) => {
                self.setIsLoadingData(false);
                msg.success(res.replace('<number>', self.selectedRoom.number));
                core.go('/manage/rooms')
            }).catch(() => {
                self.setIsLoadingData(false);
                msg.error('Room delete failed.');
            });
        },
        updateselectedRoom(selectedRoom) {
            this.selectedRoom = selectedRoom;
        },
        cancelDelete() {
            this.selectedRoom = null;
        }
    },
    mounted() {
        var self = this;
        this.setIsLoadingData(true);
        this.loadRooms().then(() => {
            self.setIsLoadingData(false);
        }).catch(() => {
            msg.error('Loading room data failed.');
            self.setIsLoadingData(false);
        });
    },
    computed: {
        ...mapGetters('rooms', {
             getRooms: 'getRooms',
        })
    }
  }
</script>

<style lang="scss" scoped> 
</style>