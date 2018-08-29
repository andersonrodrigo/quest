
const routes = [
  
  
  { name: 'login', path: '/login', component: () => import('pages/login'), meta: { requiresAuth: false } },

  { name: 'logout', path: '/logout', component: () => import('pages/logout'), meta: { requiresAuth: false } },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/Index.vue') , meta: { requiresAuth: true }},
      { path: '/cadastrarQuestao', component: () => import('pages/cadastrarQuestao.vue'), meta: { requiresAuth: true } },
      { path: '/listarQuestoes', component: () => import('pages/listarQuestoes.vue') , meta: { requiresAuth: true }}
     
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
