import { Loading } from 'quasar'

export default {
  show: function (message) {
    Loading.show({
      message: message !== undefined ? message : 'Carregando...',
      messageColor: 'white',
      spinnerColor: 'white'
    })
  },
  hide: function () {
    Loading.hide()
  }
}
