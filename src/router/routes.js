
const routes = [
  { path: '/', component: () => import('pages/Login.vue') , meta: { auth: false } },
  
  {
    path: '/home',
    component: () => import('layouts/MyLayout.vue'),
    meta: { auth: true },
    children: [
      { path: '', component: () => import('pages/Index.vue') , meta: { auth: true }},
      { path: '/cadastrarQuestao', component: () => import('pages/cadastrarQuestao.vue'), meta: { auth: true } },
      { path: '/listarQuestoes', component: () => import('pages/listarQuestoes.vue') , meta: { auth: true }}
     
     ]
  }
  
   
 
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
