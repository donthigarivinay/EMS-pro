<template>
  <div class="min-h-screen flex bg-slate-50 font-sans items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <!-- Header -->
      <div class="px-8 py-6 border-b border-slate-100 bg-slate-50/50 text-center">
        <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Key class="w-6 h-6" />
        </div>
        <h2 class="text-2xl font-bold text-slate-900">Reset your password</h2>
        <p class="mt-2 text-sm text-slate-500">Enter your email address and we'll send you a link to reset your password.</p>
      </div>

      <!-- Body -->
      <div class="p-8">
        <div v-if="success" class="text-center">
          <div class="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle class="w-8 h-8" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">Check your email</h3>
          <p class="text-sm text-slate-600 mb-6">We've sent a password reset link to <span class="font-medium text-slate-900">{{ email }}</span>.</p>
          <router-link to="/login" class="inline-flex justify-center items-center py-2.5 px-4 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all w-full">
            Return to log in
          </router-link>
        </div>

        <form v-else @submit.prevent="handleForgotPassword" class="space-y-5">
          <div>
            <label for="email" class="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
              </div>
              <input id="email" v-model="email" type="email" placeholder="name@company.com" required class="block w-full pl-11 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm">
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
              Sending link...
            </span>
            <span v-else>Send reset link</span>
          </button>

          <div class="text-center mt-6">
            <router-link to="/login" class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center gap-1">
              <ArrowLeft class="w-4 h-4" /> Back to log in
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { Key, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-vue-next'

const email = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)

const handleForgotPassword = async () => {
  error.value = ''
  loading.value = true
  try {
    await axios.post('http://13.53.103.92:5000/api/auth/forgotpassword', { email: email.value })
    success.value = true
  } catch (err) {
    error.value = err.response?.data?.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
