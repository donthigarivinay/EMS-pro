<template>
  <div class="min-h-screen flex bg-white font-sans">
    <!-- Left Pane: Branding -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-purple-900 items-center justify-center overflow-hidden">
      <!-- Decorative background -->
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-fuchsia-900"></div>
      <div class="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      
      <!-- Content -->
      <div class="relative z-10 p-12 text-center text-white max-w-lg">
        <div class="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20 shadow-xl shadow-purple-900/20">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
        </div>
        <h2 class="text-4xl font-bold mb-4">Start Your Journey</h2>
        <p class="text-purple-100 text-lg leading-relaxed font-light">Join thousands of companies streamlining their HR workflows with EMS Pro.</p>
        
        <!-- Abstract Illustration -->
        <div class="mt-12 flex justify-center">
          <div class="grid grid-cols-2 gap-4 opacity-70">
            <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur shadow-lg transform -rotate-6 transition hover:-rotate-12 flex justify-end p-2"><div class="w-4 h-4 rounded-full bg-white/30"></div></div>
            <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-400/30 to-white/10 backdrop-blur shadow-lg transform -translate-y-4"></div>
            <div class="w-24 h-24 rounded-full bg-gradient-to-bl from-pink-400/30 to-white/10 backdrop-blur shadow-lg transform translate-x-4"></div>
            <div class="w-24 h-24 rounded-2xl bg-gradient-to-tl from-white/20 to-white/5 backdrop-blur shadow-lg transform rotate-6 transition hover:rotate-12 flex items-end p-2"><div class="w-6 h-2 rounded-full bg-white/30"></div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Pane: Form -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 xl:p-24 relative overflow-hidden">
      <!-- Decorative blurry blob for mobile -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-purple-50 blur-3xl lg:hidden"></div>
      
      <div class="w-full max-w-md mx-auto relative z-10">
        <!-- Mobile Logo -->
        <div class="lg:hidden w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200 mb-8">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
        </div>

        <div class="mb-10 text-center lg:text-left">
          <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Create your account</h2>
          <p class="mt-2 text-sm text-slate-500 font-medium">Takes less than a minute to sign up.</p>
        </div>

        <form class="space-y-5" @submit.prevent="handleSignup">
          <div>
            <label for="name" class="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
            <input id="name" v-model="name" type="text" placeholder="John Doe" required class="block w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all shadow-sm shadow-slate-100">
          </div>

          <div>
            <label for="email" class="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
            <input id="email" v-model="email" type="email" placeholder="name@company.com" required class="block w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all shadow-sm shadow-slate-100">
          </div>

          <div>
            <label for="password" class="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
            <input id="password" v-model="password" type="password" placeholder="••••••••" required class="block w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all shadow-sm shadow-slate-100">
          </div>

          <div>
            <label for="role" class="block text-sm font-semibold text-slate-700 mb-1.5">Role</label>
            <div class="relative">
              <select id="role" v-model="role" class="block w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all shadow-sm shadow-slate-100 cursor-pointer appearance-none">
                <option value="employee">Employee</option>
                <option value="employer">Employer</option>
                <option value="hr">HR Manager</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <transition name="fade">
            <div v-if="error" class="text-rose-600 text-sm bg-rose-50 p-3.5 rounded-xl flex items-center gap-2 border border-rose-100">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {{ error }}
            </div>
          </transition>

          <button type="submit" :disabled="loading" class="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-md shadow-purple-600/20 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-600/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 mt-2">
            <span v-if="loading" class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Processing...
            </span>
            <span v-else>Complete Signup</span>
          </button>
        </form>

        <div class="mt-10 text-center">
          <p class="text-sm text-slate-500 font-medium">
            Already have an account? 
            <router-link to="/login" class="font-bold text-purple-600 hover:text-purple-800 transition-colors ml-1">Sign in instead</router-link>
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
const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('employee')
const error = ref('')
const loading = ref(false)

const handleSignup = async () => {
  error.value = ''
  loading.value = true
  try {
    const { data } = await axios.post('http://localhost:5000/api/auth/signup', {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value
    })
    
    sessionStorage.setItem('token', data.token)
    sessionStorage.setItem('user', JSON.stringify(data))
    
    window.location.href = data.role === 'employer' ? '/employer' : data.role === 'hr' ? '/hr' : '/employee'
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to create account'
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
