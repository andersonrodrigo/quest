(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{brKq:function(t,e,a){"use strict";var n=a("dUli"),o=a.n(n);o.a},dUli:function(t,e,a){},jz6p:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-layout",{attrs:{view:"lHh Lpr lFf"}},[a("q-layout-header",[a("q-toolbar",{attrs:{color:"primary",glossy:"mat"===t.$q.theme,inverted:"ios"===t.$q.theme}},[a("q-btn",{attrs:{flat:"",dense:"",round:"","aria-label":"Menu"},on:{click:function(e){t.leftDrawerOpen=!t.leftDrawerOpen}}},[a("q-icon",{attrs:{name:"menu"}})],1),a("q-toolbar-title",[t._v("\n       Ensino Inteligente\n        "),a("div",{attrs:{slot:"subtitle"},slot:"subtitle"})])],1)],1),a("q-layout-drawer",{attrs:{"content-class":"mat"===t.$q.theme?"bg-grey-2":null},model:{value:t.leftDrawerOpen,callback:function(e){t.leftDrawerOpen=e},expression:"leftDrawerOpen"}},[a("q-list",{attrs:{"no-border":"",link:"","inset-delimiter":""}},[a("q-list-header",[t._v("Menu")]),a("q-item",{nativeOn:{click:function(e){t.openPage("/cadastrarModulo")}}},[a("q-item-side",{attrs:{icon:"book"}}),a("q-item-main",{attrs:{label:"Cadastrar Modulo",sublabel:"Cadastro de Modulos"}})],1),a("q-item",{nativeOn:{click:function(e){t.openPage("/cadastrarQuestao")}}},[a("q-item-side",{attrs:{icon:"school"}}),a("q-item-main",{attrs:{label:"Cadastrar Questao",sublabel:"Envie uma nova questão"}})],1),a("q-item",{nativeOn:{click:function(e){t.openPage("/listarQuestoes")}}},[a("q-item-side",{attrs:{icon:"code"}}),a("q-item-main",{attrs:{label:"Responder Questões",sublabel:"Vamos testar seus conhecimentos"}})],1),a("q-item",{nativeOn:{click:function(e){t.openPage("/pontuacao")}}},[a("q-item-side",{attrs:{icon:"shop"}}),a("q-item-main",{attrs:{label:"Pontuação Atual",sublabel:"Já Acertou quanto ate agora?"}})],1),a("q-item",{nativeOn:{click:function(e){return t.logout(e)}}},[a("q-item-side",{attrs:{icon:"logout"}}),a("q-item-main",{attrs:{label:"Logout",sublabel:"Sair"}})],1)],1)],1),a("q-page-container",[a("router-view")],1)],1)},o=[];n._withStripped=!0;a("XSLa");var i={name:"MyLayout",data:function(){return{leftDrawerOpen:this.$q.platform.is.desktop}},methods:{openPage:function(t){this.$router.push(t)},logout:function(){this.$auth.logout({makeRequest:!0,params:{},success:function(){},error:function(){},redirect:"/login"}),this.openPage("/login")}}},r=i,s=(a("brKq"),a("psIG")),l=Object(s["a"])(r,n,o,!1,null,null,null);e["default"]=l.exports}}]);