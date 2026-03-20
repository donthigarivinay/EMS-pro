<template>
  <div class="space-y-6">
    <!-- Balanced Cards -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Casual Leaves -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
        <div>
          <p class="text-sm font-medium text-slate-500">Casual Leaves</p>
          <p class="mt-2 text-3xl font-bold text-slate-900">{{ balance.casual }}</p>
        </div>
        <div class="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <Calendar class="w-6 h-6" />
        </div>
      </div>
      <!-- Sick Leaves -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
        <div>
          <p class="text-sm font-medium text-slate-500">Sick Leaves</p>
          <p class="mt-2 text-3xl font-bold text-slate-900">{{ balance.sick }}</p>
        </div>
        <div class="h-12 w-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
          <Stethoscope class="w-6 h-6" />
        </div>
      </div>
      <!-- Total Applied -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
        <div>
          <p class="text-sm font-medium text-slate-500">Total Applications</p>
          <p class="mt-2 text-3xl font-bold text-slate-900">{{ leaves.length }}</p>
        </div>
        <div class="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
          <Layers class="w-6 h-6" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Apply Form -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div class="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
            <h3 class="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Send class="w-5 h-5 text-indigo-500" /> New Application
            </h3>
          </div>
          <div class="p-6">
            <form @submit.prevent="applyLeave" class="space-y-5">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Leave Type</label>
                  <select v-model="form.leaveType" required class="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2.5 bg-slate-50 border outline-none">
                    <option value="Casual">Casual Leave</option>
                    <option value="Sick">Sick Leave</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                  <select v-model="form.duration" required class="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2.5 bg-slate-50 border outline-none">
                    <option value="Full Day">Full Day</option>
                    <option value="Half Day">Half Day</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-4" :class="form.duration === 'Full Day' ? 'sm:grid-cols-2' : ''">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                  <input type="date" v-model="form.startDate" :min="today" required class="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2.5 bg-slate-50 border text-slate-600 outline-none">
                </div>
                <div v-if="form.duration === 'Full Day'">
                  <label class="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                  <input type="date" v-model="form.endDate" :min="form.startDate || today" required class="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2.5 bg-slate-50 border text-slate-600 outline-none">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Reason</label>
                <textarea v-model="form.reason" rows="3" placeholder="Briefly explain your reason..." required class="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 bg-slate-50 border resize-none outline-none"></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Attachment <span class="text-slate-400 font-normal">(Optional medical report, etc.)</span></label>
                <div v-if="!fileAttachment" class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-indigo-400 transition-colors bg-slate-50 relative cursor-pointer" @click="$refs.fileInput.click()">
                  <div class="space-y-1 text-center pointer-events-none">
                    <Paperclip class="mx-auto h-8 w-8 text-slate-400" />
                    <div class="flex text-sm text-slate-600 justify-center mt-2">
                      <span class="relative font-medium text-indigo-600 hover:text-indigo-500">Upload a file</span>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-slate-500">PNG, JPG, PDF up to 10MB</p>
                  </div>
                  <input ref="fileInput" type="file" class="sr-only" @change="handleFileUpload" accept="image/*,.pdf,.doc,.docx">
                </div>
                <div v-else class="mt-1 flex items-center justify-between bg-indigo-50 px-4 py-3 rounded-xl border border-indigo-100 shadow-sm">
                  <div class="flex items-center gap-3 overflow-hidden">
                    <div class="bg-indigo-100 p-2 rounded-lg text-indigo-600 flex-shrink-0">
                      <FileText class="w-5 h-5"/>
                    </div>
                    <span class="text-sm font-medium text-indigo-900 truncate">{{ fileAttachment.name }}</span>
                  </div>
                  <button type="button" @click="clearFile" class="text-indigo-400 hover:text-rose-500 p-1.5 transition-colors bg-white rounded-lg shadow-sm border border-indigo-100"><X class="w-4 h-4"/></button>
                </div>
              </div>
              
              <transition name="fade">
                <div v-if="error" class="text-sm text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-100 flex items-center gap-2">
                  <AlertCircle class="w-4 h-4 flex-shrink-0" /> {{ error }}
                </div>
              </transition>
              <transition name="fade">
                <div v-if="success" class="text-sm text-teal-700 bg-teal-50 p-3 rounded-lg border border-teal-100 flex items-center gap-2">
                  <CheckCircle class="w-4 h-4 flex-shrink-0" /> {{ success }}
                </div>
              </transition>
              
              <button type="submit" :disabled="loading" class="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm shadow-indigo-200 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all hover:-translate-y-0.5">
                <span v-if="loading">Submitting...</span>
                <span v-else class="flex items-center gap-2">Submit Request <ArrowRight class="w-4 h-4" /></span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- History Table -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-full flex flex-col">
          <div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 class="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <History class="w-5 h-5 text-indigo-500" /> Recent History
            </h3>
            <button @click="handleRefresh" :disabled="isRefreshing" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition p-2 hover:bg-indigo-50 rounded-lg flex items-center gap-2 disabled:opacity-75">
              <RefreshCw class="w-4 h-4" :class="{ 'animate-spin': isRefreshing }" /> <span class="hidden sm:inline">Refresh</span>
            </button>
          </div>
          <div class="overflow-x-auto flex-1">
            <table class="min-w-full divide-y divide-slate-200">
              <thead class="bg-white">
                <tr>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Leave Type</th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Duration</th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Applied</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-slate-100">
                <template v-for="(leave, index) in leaves" :key="leave._id">
                  <tr class="hover:bg-slate-50 transition-colors" :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'">
                    <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center" :class="leave.leaveType === 'Sick' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'">
                        <Stethoscope v-if="leave.leaveType === 'Sick'" class="w-4 h-4" />
                        <Calendar v-else class="w-4 h-4" />
                      </div>
                      <div class="ml-3">
                        <p class="text-sm font-medium text-slate-900">{{ leave.leaveType }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-slate-900">{{ formatDate(leave.startDate) }}</div>
                    <div class="text-xs text-slate-500 mb-1">to {{ formatDate(leave.endDate) }}</div>
                    <a v-if="leave.attachmentUrl" :href="leave.attachmentUrl" target="_blank" class="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200 hover:bg-indigo-100 transition-colors uppercase tracking-wider">
                      <Paperclip class="w-2.5 h-2.5" /> Attachment
                    </a>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      leave.status === 'Approved' ? 'bg-teal-100 text-teal-700 border-teal-200' : 
                      leave.status === 'Rejected' ? 'bg-rose-100 text-rose-700 border-rose-200' : 
                      leave.status === 'Pending_HR' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                      'bg-amber-100 text-amber-700 border-amber-200',
                      'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border'
                    ]">
                      {{ leave.status.replace('_', ' ') }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {{ formatDate(leave.appliedAt) }}
                  </td>
                  </tr>
                  
                  <tr v-if="leave.employerComment || leave.hrComment" class="bg-slate-50/80 border-t border-slate-100">
                    <td colspan="4" class="px-6 py-3">
                      <div class="flex flex-col gap-2">
                        <div v-if="leave.employerComment" class="bg-indigo-50/50 px-4 py-3 rounded-xl border border-indigo-100/50 shadow-sm">
                          <p class="text-[10px] font-bold text-indigo-800 mb-1 tracking-wider uppercase flex items-center gap-1.5"><Users class="w-3.5 h-3.5"/> Employer Review</p>
                          <p class="text-sm text-slate-700 italic">"{{ leave.employerComment }}"</p>
                        </div>
                        <div v-if="leave.hrComment" class="bg-purple-50/50 px-4 py-3 rounded-xl border border-purple-100/50 shadow-sm">
                          <p class="text-[10px] font-bold text-purple-800 mb-1 tracking-wider uppercase flex items-center gap-1.5"><Users class="w-3.5 h-3.5"/> HR Review</p>
                          <p class="text-sm text-slate-700 italic">"{{ leave.hrComment }}"</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
                <tr v-if="leaves.length === 0">
                  <td colspan="4" class="px-6 py-16 text-center">
                    <div class="flex flex-col items-center justify-center text-slate-400">
                      <Inbox class="w-12 h-12 mb-3 text-slate-300" />
                      <p class="text-base font-medium text-slate-600">No applications found</p>
                      <p class="text-sm">You haven't submitted any leave requests yet.</p>
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
  // Small delay to make the spin animation noticeable
  setTimeout(() => isRefreshing.value = false, 500)
}

const applyLeave = async () => {
  error.value = ''
  success.value = ''
  
  // Client-side balance validation
  if (form.value.startDate) {
    let days = 0;
    if (form.value.duration === 'Half Day') {
      days = 0.5;
      form.value.endDate = form.value.startDate; // Align endDate
    } else if (form.value.endDate) {
      const start = new Date(form.value.startDate)
      const end = new Date(form.value.endDate)
      
      // Calculate working days manually on client for instant feedback
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
      error.value = 'Selected dates fall only on weekends.'
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
    // Small timeout to clear success message
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
