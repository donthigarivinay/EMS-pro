<template>
  <div class="space-y-6 animate-fade-in-up">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-white tracking-tight font-heading">Account Settings</h2>
        <p class="text-sm text-slate-400 mt-1">Manage your profile and security preferences</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile Information -->
      <div class="lg:col-span-1">
        <div class="glass-panel overflow-hidden h-full">
          <div class="px-6 py-5 border-b border-white/10 bg-white/5">
            <h3 class="text-lg font-bold text-white flex items-center gap-2 font-heading">
              <User class="w-5 h-5 text-indigo-400" /> Personal Info
            </h3>
          </div>
          <div class="p-6 space-y-6">
            <div class="flex flex-col items-center">
              <div class="w-24 h-24 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-4xl uppercase border border-indigo-500/30 mb-4 shadow-lg shadow-indigo-900/20">
                {{ user?.name?.charAt(0) || 'U' }}
              </div>
              <h4 class="text-xl font-bold text-white font-heading">{{ user?.name }}</h4>
              <p class="text-sm text-slate-400 mt-0.5">{{ user?.email }}</p>
              <div class="mt-3 inline-flex items-center px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {{ user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'Employee' }}
              </div>
            </div>
            
            <div class="pt-6 border-t border-white/10 space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                <div class="text-sm font-medium text-white bg-black/20 px-3 py-2.5 rounded-xl border border-white/5">{{ user?.name }}</div>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                <div class="text-sm font-medium text-white bg-black/20 px-3 py-2.5 rounded-xl border border-white/5">{{ user?.email }}</div>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Account Role</label>
                <div class="text-sm font-medium text-white bg-black/20 px-3 py-2.5 rounded-xl border border-white/5">{{ user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Security / Change Password -->
      <div class="lg:col-span-2">
         <div class="glass-panel overflow-hidden h-full">
          <div class="px-6 py-5 border-b border-white/10 bg-white/5">
            <h3 class="text-lg font-bold text-white flex items-center gap-2 font-heading">
              <Lock class="w-5 h-5 text-indigo-400" /> Security Settings
            </h3>
          </div>
          <div class="p-6">
            <form @submit.prevent="updatePassword" class="space-y-5 max-w-md">
              <div>
                <label class="block text-sm font-bold text-slate-300 mb-1.5">Current Password</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Key class="h-4 w-4 text-slate-500" />
                  </div>
                  <input v-model="passForm.currentPassword" type="password" required class="block w-full pl-10 px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium" placeholder="••••••••">
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-slate-300 mb-1.5">New Password</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock class="h-4 w-4 text-slate-500" />
                  </div>
                  <input v-model="passForm.newPassword" type="password" required minlength="6" class="block w-full pl-10 px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium" placeholder="••••••••">
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-slate-300 mb-1.5">Confirm New Password</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <CheckCircle class="h-4 w-4 text-slate-500" />
                  </div>
                  <input v-model="passForm.confirmPassword" type="password" required class="block w-full pl-10 px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium" placeholder="••••••••">
                </div>
              </div>
              
              <transition name="fade">
                <div v-if="error" class="text-sm text-[#FB7185] bg-[#FB7185]/10 p-3 rounded-xl border border-[#FB7185]/20 flex items-center gap-2 font-medium">
                  <AlertCircle class="w-4 h-4 flex-shrink-0" /> {{ error }}
                </div>
              </transition>
              <transition name="fade">
                <div v-if="success" class="text-sm text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 flex items-center gap-2 font-medium">
                  <CheckCircle class="w-4 h-4 flex-shrink-0" /> {{ success }}
                </div>
              </transition>

              <button type="submit" :disabled="loading" class="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/30 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F172A] focus:ring-indigo-500 disabled:opacity-50 transition-all hover:-translate-y-0.5 border border-indigo-500 mt-2">
                <span v-if="loading" class="flex items-center gap-2">
                  <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Updating...
                </span>
                <span v-else class="flex items-center gap-2">Update Password <ArrowRight class="w-4 h-4" /></span>
              </button>
            </form>
          </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { User, Lock, Key, CheckCircle, AlertCircle, ArrowRight } from 'lucide-vue-next'

const userStr = sessionStorage.getItem('user')
const user = computed(() => userStr ? JSON.parse(userStr) : {})

const passForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')
const success = ref('')

const updatePassword = async () => {
  error.value = ''
  success.value = ''
  
  if (passForm.value.newPassword !== passForm.value.confirmPassword) {
    error.value = 'New passwords do not match'
    return
  }
  
  loading.value = true
  try {
    const { data } = await axios.put('/api/users/update-password', {
      currentPassword: passForm.value.currentPassword,
      newPassword: passForm.value.newPassword
    })
    success.value = 'Password updated successfully!'
    passForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to update password'
  } finally {
    loading.value = false
  }
}
</script>
