<template>
  <div class="min-h-screen flex items-center justify-center font-sans p-4 sm:p-6 lg:p-8 relative z-10 w-full">
    <div class="w-full max-w-lg glass-panel overflow-hidden flex flex-col shadow-2xl shadow-black/50 border border-white/10 rounded-[20px] p-8 sm:p-12">
      <div class="w-16 h-16 glass rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-900/20 border-white/20">
        <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
      </div>
      
      <div class="mb-10 text-center">
        <h2 class="text-3xl font-bold text-white tracking-tight font-heading">Reset password</h2>
        <p class="mt-2 text-sm text-slate-400 font-medium">Enter your email and we'll send you a link to reset your password.</p>
      </div>

      <form @submit.prevent="handleForgotPassword" class="space-y-5">
        <div>
          <label for="email" class="block text-sm font-semibold text-slate-300 mb-1.5">Email address</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
            </div>
            <input id="email" v-model="email" type="email" placeholder="name@company.com" required class="block w-full pl-11 px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium">
          </div>
        </div>

        <transition name="fade">
          <div v-if="success" class="text-emerald-400 text-sm bg-emerald-500/10 p-3.5 rounded-xl flex items-center gap-2 border border-emerald-500/20 font-medium">
            <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {{ success }}
          </div>
        </transition>

        <transition name="fade">
          <div v-if="error" class="text-[#FB7185] text-sm bg-[#FB7185]/10 p-3.5 rounded-xl flex items-center gap-2 border border-[#FB7185]/20 font-medium">
            <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {{ error }}
          </div>
        </transition>

        <button type="submit" :disabled="loading || !!success" class="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-600/30 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F172A] focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 mt-2">
          <span v-if="loading" class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Sending...
          </span>
          <span v-else>Send Reset Link</span>
        </button>
      </form>
      
      <div class="mt-8 text-center">
        <p class="text-sm text-slate-400 font-medium">
          Remember your password? 
          <router-link to="/login" class="font-bold text-indigo-400 hover:text-indigo-300 transition-colors ml-1">Sign in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

const handleForgotPassword = async () => {
  error.value = ''
  success.value = ''
  loading.value = true
  
  try {
    const { data } = await axios.post('/api/auth/forgotpassword', { email: email.value })
    success.value = data.message || 'Password reset link sent to your email'
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to process request'
  } finally {
    loading.value = false
  }
}
</script>
