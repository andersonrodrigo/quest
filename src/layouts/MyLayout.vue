<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
         Ensino Inteligente
          <div slot="subtitle"> </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Menu</q-list-header>
        <q-item @click.native="openPage('/cadastrarModulo')">
          <q-item-side icon="book" />
          <q-item-main label="Cadastrar Modulo" sublabel="Cadastro de Modulos" />
        </q-item>
         <q-item @click.native="openPage('/visualizarQuestoes')">
          <q-item-side icon="note" />
          <q-item-main label="Visualizar Questões" sublabel="Manutenção de questões já cadastradas" />
        </q-item>
        <q-item @click.native="openPage('/cadastrarQuestao')">
          <q-item-side icon="school" />
          <q-item-main label="Cadastrar Questao" sublabel="Envie uma nova questão" />
        </q-item>
        <q-item @click.native="openPage('/listarQuestoes')">
          <q-item-side icon="code" />
          <q-item-main label="Responder Questões" sublabel="Vamos testar seus conhecimentos" />
        </q-item>

          <q-item @click.native="openPage('/pontuacao')">
          <q-item-side icon="shop" />
          <q-item-main label="Pontuação Atual" sublabel="Já Acertou quanto ate agora?"   />
        </q-item>


        <q-item @click.native="logout">
          <q-item-side icon="logout" />
          <q-item-main label="Logout" sublabel="Sair" />
        </q-item>
      
        
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openPage (url){
      this.$router.push(url)
    },
    logout (){
    
      this.$auth.logout({
        makeRequest: true,
        params: {}, // data: {} in axios
        success: function () {},
        error: function () {},
        redirect: '/login'
        
    });
    this.openPage('/login')
    }
  }
}
</script>

<style>
</style>
