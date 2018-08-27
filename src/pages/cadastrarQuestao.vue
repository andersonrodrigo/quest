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
      <q-radio v-model="tipoResposta" val="M" label="Multipla" />
      <q-radio v-model="tipoResposta" val="V" label="Verdadeiro/Falso" />
</q-field>
 <BR/>
<q-field v-if="tipoResposta == 'M'"
    label="Resposta Certa"
    >
      <q-radio v-model="resposta"  val="A" label="A" />
      <q-radio v-model="resposta"   val="B" label="B" />
      <q-radio v-model="resposta"   val="C" label="C" />
      <q-radio v-model="resposta"   val="D" label="D" />
      <q-radio v-model="resposta"   val="E" label="E" />

</q-field>
 <BR/>
<q-field v-if="tipoResposta == 'V'"
    label="Resposta Certa"
    >
      <q-radio v-model="resposta" v-if="tipoResposta == 'V'" val="V" label="Verdadeiro" />
      <q-radio v-model="resposta" v-if="tipoResposta == 'V'" val="F" label="Falso" />

</q-field>

   <BR/>

     <img slot="media" :src="imagem" style="width: 30%;">

<BR/>
     <q-btn  
   
    color="primary"
    		@click="$router.push('/cadastrarQuestao')">CANCELAR</q-btn>
    	<q-btn  
      
    
    color="primary"
      style="margin-left: 15px;" @click="salvar()">SALVAR</q-btn>
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
      return  "http://192.168.0.11:8070/api/questao/salvarImagemQuestao";
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
      Vue.http.post('http://192.168.0.11:8070/api/questao/salvar', parametros, {}).then(response => {
        
          if (response && response.body && response.body.id){
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
