<template>
    <section class="section">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="box">          
            <form @submit.prevent="handleSubmit">
              <div class="field">
                <div :class="['control', 'has-icons-left', 'has-icons-right', { 'is-loading': validationStatus.number.isBusy }]">
                  <input @change="validateNumber" :class="['input', { 'is-danger': roomInfo.number.length !== 0 && !validationStatus.number.isValid }, { 'is-success': roomInfo.number.length !== 0 && validationStatus.number.isValid }]" type="text" placeholder="Number" autofocus="" required v-model="validationStatus.number.value">
                   <span class="icon is-left"><i class="fas fa-school"></i></span>
                   <span v-show="roomInfo.number.length !== 0 && validationStatus.number.isValid && !validationStatus.number.isBusy" class="icon is-small is-right"><i class="fas fa-check"></i></span>    
                   <span v-show="roomInfo.number.length !== 0 && !validationStatus.number.isValid && !validationStatus.number.isBusy" class="icon is-small is-right"><i class="fas fa-exclamation-circle"></i></span>
                </div>
              </div>
              <button :disabled="!canSubmit" class="button is-block is-info is-fullwidth" type="submit">Add Room</button>        
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
    name: "AddRoom",
    title: "AddRoom",
    data: () => ({
        roomInfo: {
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
    components: {},
    props: {},
    methods: {
        ...mapActions('rooms', {
            createRoom: 'createRoom',
            validateRoomNumber: 'validateRoomNumber'
        }),
        ...mapMutations('common', {
            setIsLoadingData: 'SET_ISLOADING'
        }),
        handleSubmit() {
            var self = this;
            this.setIsLoadingData(true);
            this.createRoom(this.roomInfo).then((res) => {
                self.setIsLoadingData(false);
                msg.success(res)
                core.go('/manage/rooms')
            }).catch((err) => {
                self.setIsLoadingData(false);
                msg.error(err.response.data.error);
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
        }
    },
    mounted() {
    },
    computed: {
        canSubmit() {
            return this.validationStatus.number.isValid;
        }
    }
  }
</script>

<style lang="scss" scoped> 
</style>