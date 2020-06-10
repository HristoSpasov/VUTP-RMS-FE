import axios from 'axios';
import * as _ from 'lodash'
import store from '../store/index';
import core from '../core/core';

class Api {

  constructor() {
    this.defaultHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  setHeaders(data, headers){
    data = data || {};
    headers = headers ? headers : {};
    headers = _.assign({}, this.defaultHeaders, headers)
    
    return headers;
  }

  send(method, url, data, headers, options) {
    // set default options
  options = _.assign({error: true, getAll: false, wait: true, ajax: {}}, options || {});
    var self = this

    headers = self.setHeaders(data, headers)
    //headers.Authorization = `Basic ${btoa(process.env.VUE_APP_APIKEY)}`;

    var authToken = store.getters['auth/isAuthenticated'] ? store.getters['auth/getToken'] : null;

    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    var promise = new Promise((resolve, reject) => { 
      axios({
        url: this.url(url),
        method, headers, data,
        ...options.ajax,
      })
      .then((res) => {
        resolve(_.get(options, 'getAll') ? res : res.data);
      },
      err => {
        this.handleErrors(err);
        reject(err);     
      })
    });
  
    return promise;
  }

  url(url) {
    return process.env.VUE_APP_SERVERURL + url;
  }

  get(url, query, headers, options) {
    return this.send('GET', url, query, headers, options);
  }

  post(url, data, headers, options) {
    return this.send('POST', url, data, headers, options);
  }

  put(url, data, headers, options) {
    return this.send('PUT', url, data, headers, options);
  }

  patch(url, data, headers, options) {
    return this.send('PATCH', url, data, headers, options);
  }

  remove(url, headers, options) {
    return this.send('DELETE', url, {}, headers, options);
  }

  handleErrors(err) {
    if (err.response.status === 401 && err.response.data.error === "Not authorized") {
      localStorage.removeItem('auth-info');
      core.go('/login');
    }
  }
}

export default new Api()
