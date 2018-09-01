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
          <q-btn
                color="primary"
                @click.native="modalCadastraUsuario = true"
                label="Novo Cadastro"
              />
               
            </div>
          </div>
        </div>
      </div>


<q-modal v-model="modalCadastraUsuario" no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}">
  <q-modal-layout>
    <q-toolbar slot="header">
       
      <q-toolbar-title>
        Novo Usuario
      </q-toolbar-title>
    </q-toolbar>
    <q-toolbar slot="footer">
      <q-toolbar-title>
        
      </q-toolbar-title>
    </q-toolbar>

    <div class="layout-padding">
      <q-input v-model="nomeCadastro" type="text" float-label="Nome" />
   <q-input v-model="loginCadastro" type="text" float-label="Login" />
   <q-input v-model="senhaCadastro" type="password" float-label="Senha" />
      <q-btn
      color="primary"
      @click.native="modalCadastraUsuario = false"
      label="Cancelar"
    />
    <q-btn
      color="primary" style="margin-left:20px"
      @click="salvarNovoUsuario"
      label="Salvar"
    />
    </div>
  </q-modal-layout>
</q-modal>


  </q-layout>
</q-layout>		
 
</template>

<script>
import Vue from 'vue'
import { Dialog } from 'quasar'
 import VueResource from 'vue-resource'
 
 
export default {
  
  data () {
    return {
      snackbar: false,
      error: 'Usuário e/ou senha inválidos',
      loading: false,
      username: '',
      password: '',
      firstLogin: true,
      isCordovaApp: !!window.cordova,
      modalCadastraUsuario: false,
      senhaCadastro: '',
      loginCadastro: '',
      nomeCadastro: ''
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
    salvarNovoUsuario (){
      let me = this
     if (me.loginCadastro == ''){
        Dialog.create({
                    title: 'Alerta',
                    message: 'Informe o login.'
                  })
       return
     }
     if (me.senhaCadastro == ''){
        Dialog.create({
                    title: 'Alerta',
                    message: 'Informe a senha.'
                  })
       return
     }
     if (me.nomeCadastro == ''){
        Dialog.create({
                    title: 'Alerta',
                    message: 'Informe o Nome.'
                  })
       return
     }
      let parametros = {
        login: me.loginCadastro,
        senha: me.senhaCadastro,
        nome: me.nomeCadastro
      }
       
       this.$http.post(process.env.URL_API  + '/auth/salvarUsuario', parametros).then(response => {
     
        if (response && response.data && response.data == 'OK'){
                me.loginCadastro = ''
                me.senhaCadastro = ''
                me.nomeCadastro = ''
                this.modalCadastraUsuario = false
                  Dialog.create({
                    title: 'Alerta',
                    message: 'Salvo com sucesso'
                  })
              }else{
            Dialog.create({
                title: 'Alerta',
                message: response.data
              })
              }
  }, response => {
    Dialog.create({
                    title: 'Alerta',
                    message: 'Erro ao cadastrar'
                  })
  });
       
 
    },
    login () {
       
      this.$auth.login({
        data: {
          username: this.username,
          password: this.password
        },
        success: function () {
          this.snackbar = false
          this.loading = false
          localStorage.setItem('USER_QUEST', this.username)
         },
        error: function (e) {
          let mensagemFinal = ''
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