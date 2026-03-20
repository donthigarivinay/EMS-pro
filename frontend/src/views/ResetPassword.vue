<template>
  <div class="min-h-screen flex bg-slate-50 font-sans items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <!-- Header -->
      <div class="px-8 py-6 border-b border-slate-100 bg-slate-50/50 text-center">
        <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock class="w-6 h-6" />
        </div>
        <h2 class="text-2xl font-bold text-slate-900">Create new password</h2>
        <p class="mt-2 text-sm text-slate-500">Your new password must be different from previous used passwords.</p>
      </div>

      <!-- Body -->
      <div class="p-8">
        <div v-if="success" class="text-center">
          <div class="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle class="w-8 h-8" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">Password reset</h3>
          <p class="text-sm text-slate-600 mb-6">Your password has been successfully reset. Click below to log in magically.</p>
          <button @click="navigateLogin" class="inline-flex justify-center items-center py-3 px-4 rounded-xl shadow-sm shadow-indigo-200 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all w-full hover:-translate-y-0.5">
            Continue to Dashboard
          </button>
        </div>

        <form v-else @submit.prevent="handleResetPassword" class="space-y-5">
          <div>
            <label for="password" class="block text-sm font-semibold text-slate-700 mb-1.5">New Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <input id="password" v-model="password" type="password" placeholder="••••••••" required class="block w-full pl-11 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm">
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-semibold text-slate-700 mb-1.5">Confirm Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <input id="confirmPassword" v-model="confirmPassword" type="password" placeholder="••••••••" required class="block w-full pl-11 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm">
            </div>
          </div>

          <transition name="fade">
            <div v-if="error" class="text-rose-600 text-sm bg-rose-50 p-3 rounded-lg flex items-center gap-2 border border-rose-100">
              <AlertCircle class="w-5 h-5 flex-shrink-0" />
              {{ error }}
            </div>
          </transition>

          <button type="submit" :disabled="loading" class="w-full flex justify-center py-3 px-4 rounded-xl shadow-md shadow-indigo-600/20 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5">
            <span v-if="loading" class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Resetting...
            </span>
            <span v-else>Reset password</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { Lock, CheckCircle, AlertCircle } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)

let loggedInUser = null

const handleResetPassword = async () => {
  error.value = ''
  
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match!'
    return
  }
  
  loading.value = true
  try {
    const { data } = await axios.put(`http://localhost:5000/api/auth/resetpassword/${route.params.token}`, { 
      password: password.value 
    })
    
    success.value = true
    loggedInUser = data
    
  } catch (err) {
    error.value = err.response?.data?.message || 'Invalid or expired token.'
  } finally {
    loading.value = false
  }
}

const navigateLogin = () => {
  if (loggedInUser) {
    sessionStorage.setItem('token', loggedInUser.token)
    sessionStorage.setItem('user', JSON.stringify(loggedInUser))
    window.location.href = loggedInUser.role === 'employer' ? '/employer' : '/employee'
  } else {
    router.push('/login')
  }
}
</script>
