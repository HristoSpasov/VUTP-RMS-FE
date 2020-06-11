<template>
    <section class="section">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
        <multiselect selectLabel="" v-if="!selectedRoom" track-by="id" placeholder="Select room" :options=getRooms :searchable="true" :allow-empty="false" :custom-label="getRoomCustomLabel" @select="updateselectedRoom"></multiselect>
          <div v-if="selectedRoom" class="box">          
            <form @submit.prevent="handleSubmit">
              <div class="field">
                <div :class="['control', 'has-icons-left', 'has-icons-right', { 'is-loading': validationStatus.number.isBusy }]">
                  <input @change="validateNumber" :class="['input', { 'is-danger': roomInfo.number.length !== 0 && !validationStatus.number.isValid }, { 'is-success': roomInfo.number.length !== 0 && validationStatus.number.isValid }]" type="text" placeholder="Number" autofocus="" v-model="validationStatus.number.value">
                   <span class="icon is-left"><i class="fas fa-school"></i></span>
                   <span v-show="roomInfo.number.length !== 0 && validationStatus.number.isValid && !validationStatus.number.isBusy" class="icon is-small is-right"><i class="fas fa-check"></i></span>    
                   <span v-show="roomInfo.number.length !== 0 && !validationStatus.number.isValid && !validationStatus.number.isBusy" class="icon is-small is-right"><i class="fas fa-exclamation-circle"></i></span>
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
    name: "EditRoom",
    title: "EditRoom",
    data: () => ({
        selectedRoom: null,
        roomInfo: {
            id: '',
            number: ''
        },
        validationStatus: {
            number: {
                value: '',
                isValid: false,
                isBusy: false,
                errMessage: 'Room already exists. Number should be between 1 and 20 characters'
            }
        }
    }),
    components: {
        Multiselect
    },
    props: {},
    methods: {
        ...mapActions('rooms', {
            updateRoom: 'updateRoom',
            loadRooms: 'loadRooms',
            validateRoomNumber: 'validateRoomNumber'
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
            this.updateRoom(this.roomInfo).then((res) => {
                self.setIsLoadingData(false);
                msg.success(res.replace('<number>', self.selectedRoom.number));
                core.go('/manage/rooms')
            }).catch((err) => {
                self.setIsLoadingData(false);
                msg.error(err.response.data);
            });
        },
        validateNumber() {
            var self = this;
            this.validationStatus.number.isBusy = true;
            this.validateRoomNumber(this.validationStatus.number.value).then(() => {
                self.validationStatus.number.isBusy = false;
                self.validationStatus.number.isValid = true;
            }).catch((err) => {
                self.validationStatus.number.isBusy = false;
                self.validationStatus.number.isValid = false;
                msg.error(err.response.data);
            })

            this.roomInfo.number = self.validationStatus.number.value;
        },
        updateselectedRoom(selectedRoom) {
            this.selectedRoom = selectedRoom;
            this.roomInfo.id = selectedRoom.id;
            this.validationStatus.number.value = selectedRoom.number;
        },
        cancelUpdate() {
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
        }),
        canSubmit() {
            return this.validationStatus.number.isValid && this.validationStatus.number.value !== this.selectedRoom.number;
        }
    }
  }
</script>

<style lang="scss" scoped> 
</style>