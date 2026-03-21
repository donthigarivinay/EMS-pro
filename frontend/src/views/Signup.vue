<template>
  <div class="min-h-screen flex items-center justify-center font-sans p-4 sm:p-6 lg:p-8 relative z-10 w-full">
    
    <div class="w-full max-w-5xl glass-panel overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-black/50 border border-white/10 rounded-[20px]">
      
      <!-- Left Pane: Branding -->
      <div class="hidden lg:flex lg:w-1/2 relative bg-slate-900/40 items-center justify-center p-12 border-r border-white/10">
        <!-- Content -->
        <div class="relative z-10 text-center text-white max-w-md">
          <div class="w-16 h-16 glass rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-900/20 border-white/20">
            <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
          </div>
          <h2 class="text-4xl font-bold mb-4 font-heading tracking-tight">Start Your Journey</h2>
          <p class="text-slate-300 text-lg leading-relaxed font-light">Join thousands of companies streamlining their HR workflows with EMS Pro.</p>
          
          <!-- Abstract Illustration -->
          <div class="mt-12 flex justify-center">
            <div class="grid grid-cols-2 gap-4 opacity-70">
              <div class="w-24 h-24 rounded-2xl glass-panel shadow-lg transform -rotate-6 transition hover:-rotate-12 border-white/20 flex justify-end p-2"><div class="w-4 h-4 rounded-full bg-white/30"></div></div>
              <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500/30 to-white/10 backdrop-blur shadow-lg transform -translate-y-4 border border-white/20"></div>
              <div class="w-24 h-24 rounded-full bg-gradient-to-bl from-pink-500/30 to-white/10 backdrop-blur shadow-lg transform translate-x-4 border border-white/20"></div>
              <div class="w-24 h-24 rounded-2xl glass-panel shadow-lg transform rotate-6 transition hover:rotate-12 border-white/20 flex items-end p-2"><div class="w-6 h-2 rounded-full bg-white/30"></div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Pane: Form -->
      <div class="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 bg-[#0F172A]/80 backdrop-blur-sm relative">
        <div class="w-full max-w-md mx-auto relative z-10">
          <!-- Mobile Logo -->
          <div class="lg:hidden w-16 h-16 glass rounded-2xl flex items-center justify-center shadow-lg mb-8 border-white/20">
            <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
          </div>

          <div class="mb-10 text-center lg:text-left">
            <h2 class="text-3xl font-bold text-white tracking-tight font-heading">Create your account</h2>
            <p class="mt-2 text-sm text-slate-400 font-medium">Takes less than a minute to sign up.</p>
          </div>

          <form class="space-y-4" @submit.prevent="handleSignup">
            <div>
              <label for="name" class="block text-sm font-semibold text-slate-300 mb-1.5">Full Name</label>
              <input id="name" v-model="name" type="text" placeholder="John Doe" required class="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium">
            </div>

            <div>
              <label for="email" class="block text-sm font-semibold text-slate-300 mb-1.5">Email address</label>
              <input id="email" v-model="email" type="email" placeholder="name@company.com" required class="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium">
            </div>

            <div>
              <label for="password" class="block text-sm font-semibold text-slate-300 mb-1.5">Password</label>
              <input id="password" v-model="password" type="password" placeholder="••••••••" required class="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium">
            </div>

            <div>
              <label for="role" class="block text-sm font-semibold text-slate-300 mb-1.5">Role</label>
              <div class="relative">
                <select id="role" v-model="role" class="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium cursor-pointer appearance-none">
                  <option value="employee" class="bg-slate-800 text-white">Employee</option>
                  <option value="employer" class="bg-slate-800 text-white">Employer</option>
                  <option value="hr" class="bg-slate-800 text-white">HR Manager</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <transition name="fade">
              <div v-if="error" class="text-[#FB7185] text-sm bg-[#FB7185]/10 p-3.5 rounded-xl flex items-center gap-2 border border-[#FB7185]/20 font-medium">
                <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {{ error }}
              </div>
            </transition>

            <button type="submit" :disabled="loading" class="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-600/30 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F172A] focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 mt-4">
              <span v-if="loading" class="flex items-center gap-2">
                <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Processing...
              </span>
              <span v-else>Complete Signup</span>
            </button>
          </form>

          <div class="mt-8 text-center">
            <p class="text-sm text-slate-400 font-medium">
              Already have an account? 
              <router-link to="/login" class="font-bold text-indigo-400 hover:text-indigo-300 transition-colors ml-1">Sign in instead</router-link>
            </p>
          </div>
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
    const { data } = await axios.post('/api/auth/signup', {
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
