import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Books from '../views/Books.vue'
import Account from '../views/Account.vue'
import Basket from '../views/Basket.vue'
import Logs from '../views/Logs.vue'
import About from '../views/About.vue'
import ManageBooks from '../views/ManageBooks.vue'
import RenderedBooks  from '../views/RenderedBooks.vue'
import LendBooks  from '../views/LendBooks.vue'
import ReturnedBooks  from '../views/ReturnedBooks.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/books',
    name: 'Books',
    component: Books
  },
  {
    path: '/managebooks',
    name: 'ManageBooks',
    component: ManageBooks
  },
  {
    path: '/renderedBooks',
    name: 'RenderedBooks',
    component: RenderedBooks
  },
  {
    path: '/lendbooks',
    name: 'LendBooks',
    component: LendBooks
  },
  {
    path: '/returnedbooks',
    name: 'ReturnedBooks',
    component: ReturnedBooks
  },
  {
    path: '/basket',
    name: 'Basket',
    component: Basket
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs
  },
  {
    path: '/*',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  routes
})

export default router
