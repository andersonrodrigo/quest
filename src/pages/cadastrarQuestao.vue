<template>
  <q-page padding>
   Cadastrar Questao

<div v-if="exibeSubirArquivo">
   <q-uploader
  :url="urlSalvarArquivo"
  method="POST"
  :send-raw="false"
  @uploaded="postUpload"
/>
</div>
<div v-if="!exibeSubirArquivo">
 <q-select required
      v-model="modulo"
      float-label="Modulo"
     :options="selectOptions"
    />



<q-field
    label="Tipo Questao"
     >
      <q-radio v-model="tipoResposta" val="M" label="Multipla" /><BR/>
      <q-radio v-model="tipoResposta" val="V" label="Certo/Errado" />
</q-field>
 <BR/>
<q-field v-if="tipoResposta == 'M'"
    label="Resposta Certa"
    >
      <q-radio v-model="resposta"  val="A" label="A" /><BR/>
      <q-radio v-model="resposta"   val="B" label="B" /><BR/>
      <q-radio v-model="resposta"   val="C" label="C" /><BR/>
      <q-radio v-model="resposta"   val="D" label="D" /><BR/>
      <q-radio v-model="resposta"   val="E" label="E" /><BR/>

</q-field>
 <BR/>
<q-field v-if="tipoResposta == 'V'"
    label="Resposta Certa"
    >
      <q-radio v-model="resposta" v-if="tipoResposta == 'V'" val="V" label="Certo" /><BR/>
      <q-radio v-model="resposta" v-if="tipoResposta == 'V'" val="F" label="Errado" />

</q-field>

   <BR/>

     <img slot="media" :src="imagem" style="width: 30%;">

<BR/>
     <q-btn  
   
    color="primary"
    		@click="$router.push('/')">CANCELAR</q-btn>
    	<q-btn  
      
    
    color="primary"
      style="margin-left: 15px;" @click="salvar()">SALVAR</q-btn>
</div>


 



<q-modal v-model="abreAlertaSalvo" :content-css="{minWidth: '40vw', minHeight: '40vh'}">
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
 
 
 
export default {
  // name: 'PageName',
   data () {
    return {
      idArquivoSalvo: null,
      selectOptions: [],
      tipoResposta: null,
      resposta: null,
      tipoResposta: null,
      exibeSubirArquivo: true,
      modulo: null,
      imagem: null,
      abreAlertaSalvo: false,
      mensagemAlerta: '',
      redireciona: false
    };
  },
  computed: {
    urlSalvarArquivo(){
      return  process.env.URL_API  + "/questao/salvarImagemQuestao";
    }
  },
  mounted () {
    let me = this
    me.$http.get(process.env.URL_API  + '/modulo/getAllModulos').then(response => {
       
        if (response) {
          for (var i = 0; i < response.data.length; i++) {
            var item = response.data[i];
            me.selectOptions.push({label: item.nome, value: item.id, item: item});
          }
        }
  }, response => {
   
  });
  
  },
  created () {
    if (!XMLHttpRequest.overrided) {
      let token = this.$auth.token();
      let open = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(...args) {
        let response = open.apply(this, args);
        let url = args[1];
        if (url.indexOf('questao/salvarImagemQuestao') > -1
             ) {
          this.setRequestHeader('Authorization', 'Bearer ' + token);
        }
        return response;
      };
    };
    XMLHttpRequest.overrided = true;
  },
  methods: {
    acaoOk (){
        this.abreAlertaSalvo = false
       if (this.redireciona ){
           this.$router.push('/')
           this.redireciona=false
       }
     
    },
    postUpload (file, xhr) {
      console.log(file) // event is just the file name! The full response would be more useful
      console.log(xhr);
      if (xhr && xhr.response){
        let resp =  JSON.parse(xhr.response);
        this.idArquivoSalvo = resp.id
        this.exibeSubirArquivo = false
        this.imagem = 'data:image/png;base64,' + resp.content
      }
    },

    salvar() {
      let me = this;
      if (!me.modulo || me.modulo == '' ){
          me.abreAlertaSalvo = true
          me.mensagemAlerta = 'Informe o modulo'
        return
      }
      if (!me.tipoResposta || me.tipoResposta == '' ){
          me.abreAlertaSalvo = true
          me.mensagemAlerta = 'Informe o Tipo da Resposta'
        return
      }
      if (!me.resposta || me.resposta == '' ){
          me.abreAlertaSalvo = true
          me.mensagemAlerta = 'Informe a Resposta'
        return
      }
      
      let parametros ={
        modulo: {id:me.modulo},
        imagemQuestao: {id:me.idArquivoSalvo},
        resposta: me.resposta,
        tipoQuestao: me.tipoResposta
      }
      me.$http.post(process.env.URL_API  + '/questao/salvar', parametros, {}).then(response => {
        
          if (response && response.data && response.data.id){
              me.abreAlertaSalvo = true
              me.mensagemAlerta = 'Salvo com sucesso'
              me.redireciona = true
            }
          
        },  response => {
   
      })
 
  
    }
  }
}
</script>

<style>
</style>
