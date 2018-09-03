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
<div v-if="imagem">
  <img slot="media" :src="imagem" @click="poeZoom" :style="styleImage">
  <BR/>
   <BR/>
<q-field v-if="tipoPergunta == 'M'"
    label="Qual é a resposta Certa?"
    >
      <q-radio v-model="resposta"  val="A" label="A" /><BR/>
      <q-radio v-model="resposta"   val="B" label="B" /><BR/>
      <q-radio v-model="resposta"   val="C" label="C" /><BR/>
      <q-radio v-model="resposta"   val="D" label="D" /><BR/>
      <q-radio v-model="resposta"   val="E" label="E" /><BR/>

</q-field>
 <BR/>
<q-field v-if="tipoPergunta == 'V'"
    label="Qual é a resposta Certa?"
    >
      <q-radio v-model="resposta"  val="V" label="Certo" /><BR/>
      <q-radio v-model="resposta"   val="F" label="Errado" />

</q-field>
<BR/>
 <q-btn  
     color="primary"
    		@click="$router.push('/')">Desistir</q-btn>
    	<q-btn  
      color="primary"
      style="margin-left: 15px;" @click="responder()">Responder</q-btn>
</div>


<q-modal v-model="abreAlertaSalvo" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
  <q-modal-layout>
    <q-toolbar slot="header">
       
      <q-toolbar-title>
        Atenção
      </q-toolbar-title>
    </q-toolbar>

    <q-toolbar slot="footer">
      <q-toolbar-title>
        
      </q-toolbar-title>
    </q-toolbar>

    <div class="layout-padding">
     <p>{{mensagemAlerta}}</p>
    <q-btn
      color="primary"
      @click="acaoOk"
      label="OK"
    />
    </div>
  </q-modal-layout>
</q-modal>

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
      styleImage: 'width: 30%;'
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
          
            let indice = Math.floor((Math.random() * response.data.length) + 1);
            if (response.data.length == 1){
              indice = 0;
            }
            var item = response.data[indice];
            this.questao = item;
            this.imagem = 'data:image/png;base64,' + item.imagemQuestao.content
            this.tipoPergunta = item.tipoQuestao
            this.respostaCerta = item.resposta
           
          
        }
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
