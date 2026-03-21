<template>
  <div class="space-y-6 animate-fade-in-up">
    <!-- Balanced Cards -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Casual Leaves -->
      <div class="glass-panel p-6 flex items-center justify-between hover:bg-white/5 transition-all group">
        <div>
          <p class="text-sm font-medium text-slate-400 font-heading">Casual Leaves</p>
          <p class="mt-2 text-3xl font-bold text-white">{{ balance.casual }}</p>
        </div>
        <div class="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30 group-hover:scale-110 transition-transform">
          <Calendar class="w-6 h-6" />
        </div>
      </div>
      <!-- Sick Leaves -->
      <div class="glass-panel p-6 flex items-center justify-between hover:bg-white/5 transition-all group">
        <div>
          <p class="text-sm font-medium text-slate-400 font-heading">Sick Leaves</p>
          <p class="mt-2 text-3xl font-bold text-white">{{ balance.sick }}</p>
        </div>
        <div class="h-12 w-12 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 border border-rose-500/30 group-hover:scale-110 transition-transform">
          <Stethoscope class="w-6 h-6" />
        </div>
      </div>
      <!-- Total Applied -->
      <div class="glass-panel p-6 flex items-center justify-between hover:bg-white/5 transition-all sm:col-span-2 lg:col-span-1 group">
        <div>
          <p class="text-sm font-medium text-slate-400 font-heading">Total Applications</p>
          <p class="mt-2 text-3xl font-bold text-white">{{ leaves.length }}</p>
        </div>
        <div class="h-12 w-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30 group-hover:scale-110 transition-transform">
          <Layers class="w-6 h-6" />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Apply Form -->
      <div class="lg:col-span-1">
        <div class="glass-panel overflow-hidden h-full">
          <div class="px-6 py-5 border-b border-white/10 bg-white/5">
            <h3 class="text-lg font-bold text-white flex items-center gap-2 font-heading">
              <Send class="w-5 h-5 text-indigo-400" /> New Application
            </h3>
          </div>
          <div class="p-6">
            <form @submit.prevent="applyLeave" class="space-y-5">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-slate-300 mb-1.5">Leave Type</label>
                  <select v-model="form.leaveType" required class="block w-full rounded-xl border border-white/10 bg-white/5 text-white px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all appearance-none cursor-pointer">
                    <option value="Casual" class="bg-slate-800 text-white">Casual Leave</option>
                    <option value="Sick" class="bg-slate-800 text-white">Sick Leave</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-300 mb-1.5">Duration</label>
                  <select v-model="form.duration" required class="block w-full rounded-xl border border-white/10 bg-white/5 text-white px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all appearance-none cursor-pointer">
                    <option value="Full Day" class="bg-slate-800 text-white">Full Day</option>
                    <option value="Half Day" class="bg-slate-800 text-white">Half Day</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-4" :class="form.duration === 'Full Day' ? 'sm:grid-cols-2' : ''">
                <div>
                  <label class="block text-sm font-semibold text-slate-300 mb-1.5">Start Date</label>
                  <input type="date" v-model="form.startDate" :min="today" required class="block w-full rounded-xl border border-white/10 bg-white/5 text-white px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all">
                </div>
                <div v-if="form.duration === 'Full Day'">
                  <label class="block text-sm font-semibold text-slate-300 mb-1.5">End Date</label>
                  <input type="date" v-model="form.endDate" :min="form.startDate || today" required class="block w-full rounded-xl border border-white/10 bg-white/5 text-white px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all">
                </div>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-300 mb-1.5">Reason</label>
                <textarea v-model="form.reason" rows="3" placeholder="Briefly explain your reason..." required class="block w-full rounded-xl border border-white/10 bg-white/5 text-white px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all resize-none placeholder-slate-500"></textarea>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-300 mb-1.5">Attachment <span class="text-slate-500 font-normal">(Optional)</span></label>
                <div v-if="!fileAttachment" class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600/50 border-dashed rounded-xl hover:border-indigo-400/50 transition-colors bg-white/5 relative cursor-pointer group" @click="$refs.fileInput.click()">
                  <div class="space-y-1 text-center pointer-events-none">
                    <Paperclip class="mx-auto h-8 w-8 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                    <div class="flex text-sm text-slate-300 justify-center mt-2">
                      <span class="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Upload a file</span>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-slate-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                  </div>
                  <input ref="fileInput" type="file" class="sr-only" @change="handleFileUpload" accept="image/*,.pdf,.doc,.docx">
                </div>
                <div v-else class="mt-1 flex items-center justify-between bg-indigo-500/10 px-4 py-3 rounded-xl border border-indigo-500/30 shadow-sm transition-all hover:bg-indigo-500/20">
                  <div class="flex items-center gap-3 overflow-hidden">
                    <div class="bg-indigo-500/20 p-2 rounded-lg text-indigo-400 flex-shrink-0">
                      <FileText class="w-5 h-5"/>
                    </div>
                    <span class="text-sm font-medium text-indigo-100 truncate">{{ fileAttachment.name }}</span>
                  </div>
                  <button type="button" @click="clearFile" class="text-indigo-400 hover:text-[#FB7185] p-1.5 transition-colors bg-black/20 rounded-lg"><X class="w-4 h-4"/></button>
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
                  Submitting
                </span>
                <span v-else class="flex items-center gap-2">Submit Request <ArrowRight class="w-4 h-4" /></span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <!-- History Table -->
      <div class="lg:col-span-2">
        <div class="glass-panel overflow-hidden h-full flex flex-col">
          <div class="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-white/5">
            <h3 class="text-lg font-bold text-white flex items-center gap-2 font-heading">
              <History class="w-5 h-5 text-indigo-400" /> Recent History
            </h3>
            <button @click="handleRefresh" :disabled="isRefreshing" class="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition py-1.5 px-3 hover:bg-white/10 rounded-lg flex items-center gap-2 disabled:opacity-75">
              <RefreshCw class="w-4 h-4" :class="{ 'animate-spin': isRefreshing }" /> <span class="hidden sm:inline">Refresh</span>
            </button>
          </div>
          <div class="overflow-x-auto flex-1 custom-scrollbar">
            <table class="min-w-full divide-y divide-white/10">
              <thead class="bg-black/20">
                <tr>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Leave Type</th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Duration</th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Applied</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                <template v-for="(leave, index) in leaves" :key="leave._id">
                  <tr class="hover:bg-white/5 transition-colors group" :class="index % 2 === 0 ? 'bg-transparent' : 'bg-black/10'">
                    <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-8 w-8 rounded-xl flex items-center justify-center border" :class="leave.leaveType === 'Sick' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'">
                        <Stethoscope v-if="leave.leaveType === 'Sick'" class="w-4 h-4" />
                        <Calendar v-else class="w-4 h-4" />
                      </div>
                      <div class="ml-3">
                         <p class="text-sm font-bold text-white">{{ leave.leaveType }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-slate-200 font-medium">{{ formatDate(leave.startDate) }}</div>
                    <div class="text-xs text-slate-400 mb-1">to {{ formatDate(leave.endDate) }}</div>
                    <a v-if="leave.attachmentUrl" :href="leave.attachmentUrl" target="_blank" class="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-md border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors uppercase tracking-wider">
                      <Paperclip class="w-2.5 h-2.5" /> Attachment
                    </a>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      leave.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 
                      leave.status === 'Rejected' ? 'bg-[#FB7185]/20 text-[#FB7185] border-[#FB7185]/30' : 
                      leave.status === 'Pending_HR' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                      'bg-amber-500/20 text-amber-300 border-amber-500/30',
                      'px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border tracking-wide uppercase'
                    ]">
                      {{ (leave.status || 'Pending').replace('_', ' ') }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-400 font-medium">
                    {{ formatDate(leave.appliedAt) }}
                  </td>
                  </tr>
                  
                  <tr v-if="leave.employerComment || leave.hrComment" class="bg-black/20 border-t border-white/5">
                    <td colspan="4" class="px-6 py-3">
                      <div class="flex flex-col gap-2">
                        <div v-if="leave.employerComment" class="bg-indigo-500/10 px-4 py-3 rounded-xl border border-indigo-500/20">
                          <p class="text-[10px] font-bold text-indigo-300 mb-1 tracking-wider uppercase flex items-center gap-1.5"><Users class="w-3.5 h-3.5"/> Employer Review</p>
                          <p class="text-sm text-slate-300 italic">"{{ leave.employerComment }}"</p>
                        </div>
                        <div v-if="leave.hrComment" class="bg-purple-500/10 px-4 py-3 rounded-xl border border-purple-500/20">
                          <p class="text-[10px] font-bold text-purple-300 mb-1 tracking-wider uppercase flex items-center gap-1.5"><Users class="w-3.5 h-3.5"/> HR Review</p>
                          <p class="text-sm text-slate-300 italic">"{{ leave.hrComment }}"</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
                <tr v-if="leaves.length === 0">
                  <td colspan="4" class="px-6 py-16 text-center">
                    <div class="flex flex-col items-center justify-center text-slate-400/70">
                      <Inbox class="w-12 h-12 mb-3 opacity-50" />
                      <p class="text-base font-bold text-slate-300">No applications found</p>
                      <p class="text-sm mt-1">You haven't submitted any leave requests yet.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Calendar, Stethoscope, Layers, Send, AlertCircle, CheckCircle, ArrowRight, History, RefreshCw, Inbox, Paperclip, X, FileText, Users } from 'lucide-vue-next'

const balance = ref({ casual: 0, sick: 0 })
const leaves = ref([])
const error = ref('')
const success = ref('')
const loading = ref(false)
const isRefreshing = ref(false)
const holidays = ref([])

const today = new Date().toISOString().split('T')[0]

const form = ref({
  leaveType: 'Casual',
  duration: 'Full Day',
  startDate: '',
  endDate: '',
  reason: ''
})

const fileAttachment = ref(null)

const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      error.value = 'File size must be strictly less than 10MB'
      return
    }
    fileAttachment.value = file
  }
}

const clearFile = () => {
  fileAttachment.value = null
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const fetchBalance = async () => {
  try {
    const { data } = await axios.get('/api/users/balance')
    balance.value = data
  } catch (err) {
    console.error('Failed to fetch balance', err)
  }
}

const fetchPublicHolidays = async () => {
  const year = new Date().getFullYear();
  try {
    const { data } = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/IN`);
    holidays.value = data.map(h => h.date);
  } catch (err) {
    console.error('Failed to fetch holidays for UI preview');
  }
}

const fetchLeaves = async () => {
  try {
    const { data } = await axios.get('/api/leaves/my-leaves')
    leaves.value = data
  } catch (err) {
    console.error('Failed to fetch leaves', err)
  }
}

const handleRefresh = async () => {
  isRefreshing.value = true
  await Promise.all([fetchBalance(), fetchLeaves()])
  setTimeout(() => isRefreshing.value = false, 500)
}

const applyLeave = async () => {
  error.value = ''
  success.value = ''
  
  if (form.value.startDate) {
    let days = 0;
    if (form.value.duration === 'Half Day') {
      days = 0.5;
      form.value.endDate = form.value.startDate;
    } else if (form.value.endDate) {
      const start = new Date(form.value.startDate)
      const end = new Date(form.value.endDate)
      
      let count = 0;
      let cur = new Date(start);
      while(cur <= end) {
        const dayOfWeek = cur.getDay();
        const dateString = cur.toISOString().split('T')[0];
        if(dayOfWeek !== 0 && dayOfWeek !== 6 && !holidays.value.includes(dateString)) {
          count++;
        }
        cur.setDate(cur.getDate() + 1);
      }
      days = count;
    }
    
    const type = form.value.leaveType.toLowerCase()
    
    if (days === 0 && form.value.duration === 'Full Day') {
      error.value = 'Selected dates fall only on weekends or holidays.'
      return
    }

    if (days > balance.value[type]) {
      error.value = `Insufficient Balance: You requested ${days} working days but only have ${balance.value[type]} ${form.value.leaveType} leaves.`
      return
    }
  }
  
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('leaveType', form.value.leaveType)
    formData.append('duration', form.value.duration)
    formData.append('startDate', form.value.startDate)
    if (form.value.endDate) formData.append('endDate', form.value.endDate)
    formData.append('reason', form.value.reason)
    if (fileAttachment.value) {
      formData.append('attachment', fileAttachment.value)
    }

    await axios.post('/api/leaves/apply', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    success.value = 'Application submitted successfully'
    form.value = { leaveType: 'Casual', duration: 'Full Day', startDate: '', endDate: '', reason: '' }
    clearFile()
    fetchLeaves()
    fetchBalance()
    setTimeout(() => success.value = '', 5000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to submit application'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchBalance()
  fetchLeaves()
  fetchPublicHolidays()
})
</script>
