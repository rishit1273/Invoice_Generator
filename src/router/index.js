import { createRouter, createWebHashHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import CreateInvoice from '../views/CreateInvoice.vue'
import EditInvoice from '../views/EditInvoice.vue'
import History from '../views/History.vue'

const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/Create', name: 'CreateInvoice', component: CreateInvoice },
  { path: '/edit/:id', name: 'EditInvoice', component: EditInvoice },
  { path: '/history', name: 'InvoiceHistory', component: History }
]

const router = createRouter({
  history: createWebHashHistory(), 
  routes
})

export default router



