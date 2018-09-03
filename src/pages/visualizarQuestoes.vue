<template>
  <q-page padding>
   
   

<div v-if="!moduloSelecionado">
 <q-select 
      v-model="moduloSelecionado"
      float-label="Modulo"
      @input="buscarQuestao"
     :options="selectOptions"
    />
</div>
<div v-if="moduloSelecionado && listaQuestoes.length > 0">


<q-card inline style="width: 500px" v-for="item in listaQuestoes" :key="item.id">
  <q-card-media>
   <img slot="media" :src="item.imagem" @click="poeZoom" :style="styleImage"/> 
  </q-card-media>
  <q-card-title>
    
    Questao {{item.id}}
    
  </q-card-title>
  <q-card-main>
    <p>Tipo Resposta:</p> {{item.tipoQuestao}}
    <p>Resposta Certa:</p> {{item.resposta}}
  </q-card-main>
  <q-card-separator />
  <q-card-actions>
    <q-btn flat round dense icon="delete" />
  </q-card-actions>
</q-card>




</div>





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
      moduloSelecionado: null,
      selectOptions: [],
      imagem: null,
      tipoResposta: null,
      resposta: null,
      tipoPergunta: null,
      respostaCerta: null,
      mensagemAlerta: null,
      abreAlertaSalvo: null,
      questao: null,
      zoom: false,
      styleImage: 'width: 30%;',
      listaQuestoes: []
    }
   },
   mounted () {
    let me = this
   
  

 me.$http.get(process.env.URL_API +  '/modulo/getAllModulos')
          .then((response) => {
           
             if (response) {
                for (var i = 0; i < response.data.length; i++) {
                  var item = response.data[i];
                  me.selectOptions.push({label: item.nome, value: item.id, item: item});
                }
              }
          })
          .catch(error => {
                Dialog.create({
                    title: 'Alerta',
                    message: 'Nenhum Topico Cadatrado....'
                  })
          })


  }, 
  methods: {
    poeZoom(){
      this.zoom = !this.zoom
      if (this.zoom){
         this.styleImage = 'width: 100%;'
      }else{
        this.styleImage = 'width: 30%;'
      }
    },
    buscarQuestao (){
    let me = this
         me.$http.get(process.env.URL_API  + '/questao/getQuestaoByModulo/' + this.moduloSelecionado ).then(response => {
        if (response) {
           for (var i = 0; i < response.data.length; i++) {
                  var item = response.data[i];
                   me.listaQuestoes.push({id: item.id,
                    resposta: item.resposta,
                    tipoQuestao: item.tipoQuestao,
                    imagem: 'data:image/png;base64,' + item.imagemQuestao.content});
                }
        }
        console.log(me.listaQuestoes)
  }, response => {
   
  });
     
    },
    responder(){
      let me = this
      if (this.resposta == ''){
         Dialog.create({
                    title: 'Alerta',
                    message: 'Selecione uma Resposta Primeiro...'
                  })
        return
      }
      if (this.resposta == this.respostaCerta){
        this.mensagemAlerta='Resposta Certa'
      }else{
        let respCerta = '';
        if (this.respostaCerta == 'V'){
          respCerta = 'Certo'
        }else if (this.respostaCerta == 'F'){
          respCerta = 'Errado'
        }else{
          respCerta = this.respostaCerta
        }
        this.mensagemAlerta='Resposta Errada... A certa é ' + respCerta;
      }
      this.abreAlertaSalvo = true;
    },
    acaoOk (){
       let me = this
       let usuario = JSON.parse(localStorage.getItem('user'));
      
      me.abreAlertaSalvo = false;
      let param = {
        usuario:{id: usuario[0].id},
        resposta: me.resposta,
        respostaCerta: me.respostaCerta,
        questao : {id: me.questao.id}
      }
      me.$http.post(process.env.URL_API  + '/questao/respostaUsuario/', param).then(response => {
      
        if (response && response.data) {
         
            var item = response.data;
            this.questao = item;
            this.imagem = 'data:image/png;base64,' + item.imagemQuestao.content
            this.tipoPergunta = item.tipoQuestao
            this.respostaCerta = item.resposta
            this.resposta = '';
           
        }
  }, response => {
   
  });
     }
  }
}
</script>

<style>
</style>
