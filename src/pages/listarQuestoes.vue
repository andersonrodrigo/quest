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
  <img slot="media" :src="imagem" style="width: 30%;">
  <BR/>
   <BR/>
<q-field v-if="tipoPergunta == 'M'"
    label="Qual é a resposta Certa?"
    >
      <q-radio v-model="resposta"  val="A" label="A" />
      <q-radio v-model="resposta"   val="B" label="B" />
      <q-radio v-model="resposta"   val="C" label="C" />
      <q-radio v-model="resposta"   val="D" label="D" />
      <q-radio v-model="resposta"   val="E" label="E" />

</q-field>
 <BR/>
<q-field v-if="tipoPergunta == 'V'"
    label="Qual é a resposta Certa?"
    >
      <q-radio v-model="resposta" v-if="tipoResposta == 'V'" val="V" label="Verdadeiro" />
      <q-radio v-model="resposta" v-if="tipoResposta == 'V'" val="F" label="Falso" />

</q-field>
<BR/>
 <q-btn  
     color="primary"
    		@click="$router.push('/listarQuestoes')">Desistir</q-btn>
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

import VueResource from 'vue-resource'
import Vue from 'vue'
 
 Vue.use(VueResource)
 Vue.http.options.root = process.env.CONTEXTO
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
      abreAlertaSalvo: null
    }
   },
   mounted () {
    let me = this
    Vue.http.get('http://192.168.0.11:8070/api/modulo/getAllModulos').then(response => {
      
        if (response) {
          for (var i = 0; i < response.body.length; i++) {
            var item = response.body[i];
            me.selectOptions.push({label: item.nome, value: item.id, item: item});
          }
        }
  }, response => {
   
  });
  
  }, 
  methods: {
    buscarQuestao (){
    
        Vue.http.get('http://192.168.0.11:8070/api/questao/getQuestaoByModulo/' + this.moduloSelecionado ).then(response => {
       
        if (response) {
          for (var i = 0; i < response.body.length; i++) {
            var item = response.body[i];
            this.imagem = 'data:image/png;base64,' + item.imagemQuestao.content
            this.tipoPergunta = item.tipoQuestao
            this.respostaCerta = item.resposta
            break
          }
        }
  }, response => {
   
  });
     
    },
    responder(){
      debugger
      if (this.resposta == this.respostaCerta){
        this.mensagemAlerta='Resposta Certa'
      }else{
          this.mensagemAlerta='Resposta Errada... A certa é ' + this.respostaCerta;
      }
      this.abreAlertaSalvo = true;
    },
    acaoOk (){
      this.abreAlertaSalvo = false
     }
  }
}
</script>

<style>
</style>
