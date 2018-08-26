import Vue from 'vue'
import {Dialog} from 'quasar'
 

export default {

  contentType: {json: 'application/json', xml: 'text/xml', file: 'application/octet-stream'},

  get (endPoint, parametros, formato, callback, callbackErro) {
    let errorCallback = callbackErro || callback
    Vue.http.get(endPoint, parametros, {}).then(this.sucessHandler(callback), this.errorHandler(errorCallback))
  },

  post (endPoint, parametros, formato, callback, callbackErro) {
    let errorCallback = callbackErro || callback
    Vue.http.post(endPoint, parametros, {}).then(this.sucessHandler(callback), this.errorHandler(errorCallback))
  },
 
  getDireto (endPoint, callback) {
    let url = (endPoint.indexOf('http') === -1) ? Vue.http.options.root + '/' + endPoint : endPoint
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'json'
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // eslint-disable-next-line
          callback(xhr.response)
        }
        else {
          // eslint-disable-next-line
          callback()
        }
      }
    }
    xhr.send()
  }
}
