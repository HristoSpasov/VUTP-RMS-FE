import router from '../router';
import _ from 'lodash'

class Core {
  // go to the specified route
  go(name, params = {}) {
    router.push({
      path: name,
      query: params
    });
  }

  // return true if the value is [], {}, "", null, undefined
  empty(val) {
    return _.isEmpty(val) && !_.isNumber(val) && !_.isDate(val);
  }

  // save to local storage
  saveLocal(prop, val) {
    val = !_.isString(val) ? JSON.stringify(val) : val;
    localStorage.setItem(prop, val);
  }

  // get from local storage
  getLocal(prop) {
    let res;
    // maybe it is json?
    try {
      res = JSON.parse(localStorage.getItem(prop));
    } catch (err) {
      res = localStorage.getItem(prop);
    }

    return res;
  }

  // remove from local storage
  removeLocal(prop) {
    localStorage.removeItem(prop);
  }

  // remove all props from local storage
  resetLocal() {
    localStorage.clear();
  }
}

export default new Core();
