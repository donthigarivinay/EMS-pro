import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import EmployeeDashboard from '../views/EmployeeDashboard.vue'
import EmployerDashboard from '../views/EmployerDashboard.vue'
import HRDashboard from '../views/HRDashboard.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
import EmployeeDirectory from '../views/EmployeeDirectory.vue'
import Settings from '../views/Settings.vue'
import LeaveBalances from '../views/LeaveBalances.vue'
import MyTasks from '../views/MyTasks.vue'
import Reports from '../views/Reports.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
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
  },
  { 
    path: '/employees', 
    name: 'EmployeeDirectory',
    component: EmployeeDirectory,
    meta: { requiresAuth: true, title: 'Employee Directory' }
  },
  { 
    path: '/settings', 
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true, title: 'Settings' }
  },
  {
    path: '/leave-balances',
    name: 'LeaveBalances',
    component: LeaveBalances,
    meta: { requiresAuth: true, role: 'employee', title: 'Leave Balances' }
  },
  {
    path: '/my-tasks',
    name: 'MyTasks',
    component: MyTasks,
    meta: { requiresAuth: true, role: 'employee', title: 'My Tasks' }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
    meta: { requiresAuth: true, title: 'Reports' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard
router.beforeEach((to, from) => {
  const token = sessionStorage.getItem('token')
  const user = JSON.parse(sessionStorage.getItem('user') || '{}')
  
  if (to.meta.requiresAuth && !token) {
    return '/login'
  } else if (to.meta.requiresAuth && to.meta.role && to.meta.role !== user.role) {
    return user.role === 'employer' ? '/employer' : user.role === 'hr' ? '/hr' : '/employee'
  } else if ((to.path === '/login' || to.path === '/signup' || to.path === '/') && token) {
    return user.role === 'employer' ? '/employer' : user.role === 'hr' ? '/hr' : '/employee'
  }
})

export default router
