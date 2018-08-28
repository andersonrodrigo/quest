<template >
  


<q-layout
    ref="layout"
    view="lHh Lpr fff"
    class="" 
    :left-class="{'bg-grey-2': true}">
    
   
    
    <q-layout class="layout-page-login" row wrap >
      <div xs12>
        <div class="area-login">
          <div id="box-login">
            <div id="logo-geosite"> </div>
            <div id="formulario">
              <div xs12>
                <q-input
                  label="Usuário"
                  v-model="username"
                  dark
                  stack-label="usuário"></q-input>
              </div>
              <div xs12>
                <q-input
                  label="Senha"
                  v-model="password"
                  type="password"
                  dark
                  stack-label="Senha"></q-input>
              </div>
              
              <div xs12>
                <q-btn
                  :loading="loading" 
                  warning 
                  dark
                  color="white"
                  @click.native="login"
                  class="text-black full-width">Entrar</q-btn>
              </div>

               
            </div>
          </div>
        </div>
      </div>
  </q-layout>
</q-layout>		
 
</template>

<script>
 
export default {
  
  data () {
    return {
      snackbar: false,
      error: 'Usuário e/ou senha inválidos',
      loading: false,
      username: '',
      password: '',
      firstLogin: true,
      isCordovaApp: !!window.cordova
    }
  },
  mounted () {
    if (this.isCordovaApp) {
      this.verificaPermissaoGps()
    }
  },
  created () {
    let username = localStorage.getItem('USER_QUEST')
    if (username !== undefined || username !== null) {
      this.username = username
    }
  },
  methods: {
    
    login () {
      Loading.show({
        spinner: QSpinnerGears,
        message: 'Carregando...',
        messageColor: 'blue',
        spinnerSize: 250, // in pixels blabla
        spinnerColor: 'white',
        customClass: 'bg-primary'
      })
      if (this.isCordovaApp) {
        if (this.firstLogin) {
          this.username = this.username.charAt(0).toLowerCase() + this.username.slice(1)
        }
      }
      this.$auth.login({
        params: {
          username: this.username,
          password: this.password
        },
        success: function () {
          this.snackbar = false
          this.loading = false
          localStorage.setItem('USER_QUEST', this.username)
           
          Loading.hide()
        },
        error: function (e) {
          let mensagemFinal = ''
          
              Loading.hide()
               
                mensagemFinal = 'Usuário ou Senha Inválidos'
            
              Dialog.create({
                title: 'Alerta',
                message: mensagemFinal
              })
              
            },
       rememberMe: true,
        redirect: '/'
      })
    },
    verificaPermissaoGps () {
      var permissions = cordova.plugins.permissions
      var list = [
        permissions.ACCESS_COARSE_LOCATION,
        permissions.ACCESS_FINE_LOCATION,
        permissions.ACCESS_LOCATION_EXTRA_COMMANDS,
        permissions.ACCESS_NOTIFICATION_POLICY,
        permissions.VIBRATE,
        permissions.REQUEST_INSTALL_PACKAGES,
        permissions.INTERNET,
        permissions.ACCESS_NETWORK_STATE,
        permissions.WRITE_EXTERNAL_STORAGE,
        permissions.READ_EXTERNAL_STORAGE
      ]
      permissions.hasPermission(list, function (status) {
        if (status.hasPermission) {
          console.log('Possui as permissoes')
        }
        else {
          permissions.requestPermissions(list, function () {
            console.log('Liberado!')
          }, null)
        }
      })
    }
  }
}
</script>

<style>
  .login-page.application{
    background-color: #28679d;
  }
  .login-page .input-group__details:after{
    background-color: white !important;
  }
  .login-page .input-group--text-field label{
    color: white !important;
  }
  .footerLogin{
    position:absolute;
    bottom: 0;
    width: 100%;
  }
  .layout-page-login{
		background-color: #004a90;
     
    background-repeat: no-repeat;
		background-position: center top;
  }
  .area-login {
    padding: 20px;
    box-sizing: border-box;
  }
  #box-login {
		width: 320px;
    display: block;
		margin-left: auto;margin-right: auto;
		background-color: rgba(255,255,255,.13);;
		webkit-box-shadow: 0 3px 6px rgba(0,0,0,.5);
		box-shadow: 0 3px 6px rgba(0,0,0,.5);
		border-radius: 10px;
		padding: 20px;
		box-sizing: border-box;
	}
	#logo-geosite {
		width: 100%;
		display: block;
		text-align: center;
		margin: 0px 0px 20px 0px;
	}
   #formulario button {
    margin: 20px;
  }
  @media (max-width: 768px) {
    #box-login {
      width: 100%;
    }
  }
  
</style>