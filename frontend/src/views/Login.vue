<template>
  <div class="min-h-screen flex bg-white font-sans">
    <!-- Left Pane: Branding -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-indigo-900 items-center justify-center overflow-hidden">
      <!-- Decorative background -->
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900"></div>
      <div class="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      
      <!-- Content -->
      <div class="relative z-10 p-12 text-center text-white max-w-lg">
        <div class="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20 shadow-xl shadow-indigo-900/20">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>
        <h2 class="text-4xl font-bold mb-4">Welcome to EMS Pro</h2>
        <p class="text-indigo-100 text-lg leading-relaxed font-light">The modern solution to manage your workforce leaves seamlessly and efficiently from anywhere.</p>
        
        <!-- Abstract Illustration -->
        <div class="mt-12 flex justify-center">
          <div class="grid grid-cols-2 gap-4 opacity-70">
            <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur shadow-lg transform rotate-6 transition hover:rotate-12"></div>
            <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-400/30 to-white/10 backdrop-blur shadow-lg transform -translate-y-4"></div>
            <div class="w-24 h-24 rounded-full bg-gradient-to-bl from-indigo-400/30 to-white/10 backdrop-blur shadow-lg transform translate-x-4"></div>
            <div class="w-24 h-24 rounded-2xl bg-gradient-to-tl from-white/20 to-white/5 backdrop-blur shadow-lg transform -rotate-6 transition hover:-rotate-12"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Pane: Form -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 xl:p-24 relative overflow-hidden">
      <!-- Decorative blurry blob for mobile -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-50 blur-3xl lg:hidden"></div>
      
      <div class="w-full max-w-md mx-auto relative z-10">
        <!-- Mobile Logo -->
        <div class="lg:hidden w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 mb-8">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>

        <div class="mb-10">
          <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Sign in</h2>
          <p class="mt-2 text-sm text-slate-500 font-medium">Please enter your details to proceed.</p>
        </div>

        <form class="space-y-5" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
              </div>
              <input id="email" v-model="email" type="email" placeholder="name@company.com" required class="block w-full pl-11 px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm shadow-slate-100">
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label for="password" class="block text-sm font-semibold text-slate-700">Password</label>
              <router-link to="/forgotpassword" class="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">Forgot password?</router-link>
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <input id="password" v-model="password" type="password" placeholder="••••••••" required class="block w-full pl-11 px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm shadow-slate-100">
            </div>
          </div>

          <transition name="fade">
            <div v-if="error" class="text-rose-600 text-sm bg-rose-50 p-3.5 rounded-xl flex items-center gap-2 border border-rose-100">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {{ error }}
            </div>
          </transition>

          <button type="submit" :disabled="loading" class="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-md shadow-indigo-600/20 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 mt-2">
            <span v-if="loading" class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Signing in...
            </span>
            <span v-else>Sign in</span>
          </button>
        </form>
        
        <div class="mt-10 text-center">
          <p class="text-sm text-slate-500 font-medium">
            Don't have an account? 
            <router-link to="/signup" class="font-bold text-indigo-600 hover:text-indigo-800 transition-colors ml-1">Sign up for free</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    const { data } = await axios.post('http://13.53.103.92:5000/api/auth/login', {
      email: email.value,
      password: password.value
    })
    
    sessionStorage.setItem('token', data.token)
    sessionStorage.setItem('user', JSON.stringify(data))
    
    window.location.href = data.role === 'employer' ? '/employer' : data.role === 'hr' ? '/hr' : '/employee'
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to login'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
