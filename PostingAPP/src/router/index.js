import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForgotPassword from '../views/ForgotPasswordView.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/', component: PostsView }, // pagina principal apos login

]

const router = createRouter({
  history: createWebHistory({
    history: createWebHistory(),
    routes,
  })
})

export default router
