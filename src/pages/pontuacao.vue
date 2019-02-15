<template>
  <q-page padding>
   
   <h1 v-if="usuarioLogado">{{usuarioLogado.userName}}</h1>
<h4>Até o momento:</h4>
 <BR/>
 <b>{{certas}}</b>: Respostas Certas
 <BR/>
 <b>{{erradas}}</b>: Respostas Erradas
  </q-page>
</template>

<script>
 import Vue from 'vue'
import { Dialog } from 'quasar'
 import VueResource from 'vue-resource'
export default {
  // name: 'PageName',
   data () {
    return {
      usuarioLogado: null,
      certas: 0,
      erradas: 0
       
    }
   },
   mounted () {
    let me = this
    let usuario = JSON.parse(localStorage.getItem('user'));
    me.usuarioLogado = usuario[0];
    let param = {
        id: me.usuarioLogado.id
    }
    me.$http.post(process.env.URL_API +  '/questao/pontuacao', param).then((response) => {
      if (response) {
          me.erradas = response.data.erradas;
          me.certas = response.data.certas;
      }
    }).catch(error => {
                
    })


  }
}
 
</script>

<style>
</style>
