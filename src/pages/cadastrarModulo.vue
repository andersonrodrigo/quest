<template>
  <q-page padding>
  <q-input v-model="nomeModulo" float-label="Informe o nome do Novo Modulo para Cadastrar"/>

 



<q-table
  :data="selectOptions"
  :columns="columns"
  
  :title="title"
  row-key="label"
>
  <q-tr slot="body" slot-scope="props" :props="props">
    <q-td key="value" :props="props">
      {{ props.row.value }}
       
    </q-td>
    <q-td key="label" :props="props">
      {{ props.row.label }}
       
    </q-td>
    
     
  </q-tr>
</q-table>

  <q-btn  
   
    color="primary"
    		@click="$router.push('/')">CANCELAR</q-btn>
    	<q-btn  
      
    
    color="primary"
      style="margin-left: 15px;" @click="salvar()">SALVAR</q-btn>
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
      nomeModulo: null,
      selectOptions:[],
      title: 'Existentes',
      columns: [
        {
          name: 'value',
        },
         {
          name: 'label',
        }
      ]
    }
   },
   mounted () {
    this.carregarExistentes()
  },
   methods: {
      carregarExistentes () {
        let me = this
            let usuario = JSON.parse(localStorage.getItem('user'));
            me.selectOptions = [];
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
      salvar (){
       
       if (this.nomeModulo == ''){
          Dialog.create({
                    title: 'Alerta',
                    message: 'Informe o nome do modulo'
                  })
         return
       }
        let parametros = {
          nome : this.nomeModulo
        }
        this.$http.post(process.env.URL_API  + '/modulo/salvar', parametros, {}).then(response => {
    
        if (response && response.data && response.data.id){
            Dialog.create({
                    title: 'Alerta',
                    message: 'Modulo Salvo Com Sucesso'
                  })
                   this.carregarExistentes()
          }
        
        },  response => {
          Dialog.create({
                    title: 'Alerta',
                    message: 'Erro ao salvar modulo'
                  })

      })
      }
   }


}
 
</script>

<style>
</style>
