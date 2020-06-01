import Vue from 'vue'

export class Notify {
  constructor() {
  }

  success(msg) {
    Vue.notify({
      group: 'success',
      title: 'Success!',
      text: msg,
      type:'success'
    });
  }

  warn(msg) {
    Vue.notify({
      group: 'warn',
      title: 'Warning!',
      text: msg,
      type:'warn',
      duration: -1
    });
  }

  error(msg) {
    Vue.notify({
      group: 'error',
      title: 'Error!',
      text: msg,
      type:'error',
      duration: -1
    });
  }
}

export default new Notify();
