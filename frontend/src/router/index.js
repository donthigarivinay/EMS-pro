import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import EmployeeDashboard from '../views/EmployeeDashboard.vue'
import EmployerDashboard from '../views/EmployerDashboard.vue'
import HRDashboard from '../views/HRDashboard.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/forgotpassword', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/resetpassword/:token', name: 'ResetPassword', component: ResetPassword },
  { 
    path: '/employee', 
    name: 'Dashboard',
    component: EmployeeDashboard,
    meta: { requiresAuth: true, role: 'employee' }
  },
  { 
    path: '/employer', 
    name: 'EmployerDashboard',
    component: EmployerDashboard,
    meta: { requiresAuth: true, role: 'employer', title: 'Leave Requests' }
  },
  { 
    path: '/hr', 
    name: 'HRDashboard',
    component: HRDashboard,
    meta: { requiresAuth: true, role: 'hr', title: 'Leave Requests' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  const user = JSON.parse(sessionStorage.getItem('user') || '{}')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.meta.requiresAuth && to.meta.role !== user.role) {
    next(user.role === 'employer' ? '/employer' : user.role === 'hr' ? '/hr' : '/employee')
  } else if ((to.path === '/login' || to.path === '/signup') && token) {
    next(user.role === 'employer' ? '/employer' : user.role === 'hr' ? '/hr' : '/employee')
  } else {
    next()
  }
})

export default router
