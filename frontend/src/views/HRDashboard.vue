<template>
  <div class="space-y-6">
    <!-- Header & Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-1 flex flex-col justify-center">
        <h2 class="text-2xl font-bold text-slate-900 tracking-tight">HR Escalations</h2>
        <p class="text-sm text-slate-500 mt-1">Manage >4 days leave approvals</p>
      </div>
      
      <div class="md:col-span-2 grid grid-cols-2 gap-4">
        <!-- Total Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div class="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
            <Users class="w-6 h-6" />
          </div>
          <div>
            <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Escalations</p>
            <p class="mt-1 text-2xl font-bold text-slate-900">{{ totalLeaves }}</p>
          </div>
        </div>
        <!-- Pending Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div class="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
            <Clock class="w-6 h-6" />
          </div>
          <div>
            <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending HR</p>
            <p class="mt-1 text-2xl font-bold text-purple-600">{{ pendingLeaves }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col min-h-[500px]">
      <!-- Filters Bar -->
      <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <Filter class="w-4 h-4 text-slate-400" />
          <select v-model="filterStatus" class="block w-40 rounded-lg border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 pl-3 pr-10 bg-white border outline-none text-slate-700 font-medium cursor-pointer transition-colors hover:border-indigo-300">
            <option value="All">All Statuses</option>
            <option value="Pending_HR">Pending HR</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div class="flex items-center gap-4 w-full sm:w-auto">
          <div class="relative w-full sm:max-w-xs flex-1">
            <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <Search class="h-4 w-4 text-slate-400" />
            </div>
            <input type="text" v-model="searchQuery" placeholder="Search employee..." class="block w-full rounded-lg border-slate-200 pl-10 pr-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white border outline-none transition-shadow hover:border-indigo-300">
          </div>
          <button @click="handleRefresh" :disabled="isRefreshing" class="flex-shrink-0 text-indigo-600 hover:text-indigo-800 text-sm font-medium transition p-2 hover:bg-indigo-50 rounded-lg flex items-center gap-2 disabled:opacity-75 border border-indigo-100 bg-white shadow-sm hover:shadow">
            <RefreshCw class="w-4 h-4" :class="{ 'animate-spin': isRefreshing }" /> <span class="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto flex-1">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-white">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Duration</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Reason</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-slate-100">
            <transition-group name="fade">
              <tr v-for="(leave, index) in filteredLeaves" :key="leave._id" class="hover:bg-slate-50 transition-colors group" :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs uppercase flex-shrink-0">
                      {{ leave.userId?.name?.charAt(0) || 'U' }}
                    </div>
                    <div>
                      <button @click="openUserProfile(leave.userId?._id)" class="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline text-left transition-colors">
                        {{ leave.userId?.name || 'Unknown' }}
                      </button>
                      <div class="text-xs text-slate-500">{{ leave.userId?.email || 'N/A' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium" :class="leave.leaveType === 'Sick' ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-blue-700'">
                    <Stethoscope v-if="leave.leaveType === 'Sick'" class="w-3 h-3" />
                    <Calendar v-else class="w-3 h-3" />
                    {{ leave.leaveType }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">{{ leave.duration || 'Full Day' }}</span>
                  </div>
                  <div class="text-sm text-slate-900">{{ formatDate(leave.startDate) }}</div>
                  <div class="text-xs text-slate-500" v-if="leave.duration !== 'Half Day'">to {{ formatDate(leave.endDate) }}</div>
                  <a v-if="leave.attachmentUrl" :href="'http://localhost:5000' + leave.attachmentUrl" target="_blank" class="inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200 hover:bg-indigo-100 transition-colors uppercase tracking-wider">
                    <Paperclip class="w-2.5 h-2.5" /> Attachment
                  </a>
                </td>
                <td class="px-6 py-4 text-sm text-slate-600 max-w-[200px] truncate" :title="leave.reason">
                  {{ leave.reason }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    leave.status === 'Approved' ? 'bg-teal-100 text-teal-700 border-teal-200' : 
                    leave.status === 'Rejected' ? 'bg-rose-100 text-rose-700 border-rose-200' : 
                    leave.status === 'Pending_HR' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                    'bg-amber-100 text-amber-700 border-amber-200',
                    'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border'
                  ]">
                    {{ (leave.status || 'Pending').replace('_', ' ') }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div v-if="leave.status === 'Pending_HR'" class="flex justify-end gap-2">
                    <button @click="openReviewModal(leave)" class="text-indigo-700 hover:text-white bg-indigo-50 hover:bg-indigo-600 px-4 py-1.5 font-semibold rounded-lg transition-colors border border-indigo-200 hover:border-transparent flex items-center gap-1.5 focus:outline-none">
                      Review Request <ArrowRight class="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span v-else class="text-slate-400 text-xs flex items-center justify-end gap-1">
                    <Check class="w-3 h-3" /> Processed
                  </span>
                </td>
              </tr>
            </transition-group>
            <tr v-if="filteredLeaves.length === 0">
              <td colspan="6" class="px-6 py-20 text-center">
                <div class="flex flex-col items-center justify-center text-slate-400">
                  <SearchX class="w-12 h-12 mb-3 text-slate-300" />
                  <p class="text-base font-medium text-slate-600">No matching requests found</p>
                  <p class="text-sm max-w-sm mt-1">Try adjusting your filters or search query to find what you're looking for.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Review Request Modal -->
    <transition name="fade">
      <div v-if="reviewLeave !== null" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col ring-1 ring-slate-900/5">
          <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <h3 class="text-lg font-bold text-slate-800">Review HR Escalation</h3>
            <button @click="reviewLeave = null" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition">
              <X class="w-5 h-5" />
            </button>
          </div>
          <div class="p-6">
            <div class="mb-5">
              <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Request Details</p>
              <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-700 space-y-2">
                <p><span class="font-medium">Employee:</span> {{ reviewLeave.userId?.name }}</p>
                <p><span class="font-medium">Leave Type:</span> {{ reviewLeave.leaveType }} ({{ reviewLeave.duration }})</p>
                <p><span class="font-medium">Dates:</span> {{ formatDate(reviewLeave.startDate) }} <span v-if="reviewLeave.duration !== 'Half Day'">to {{ formatDate(reviewLeave.endDate) }}</span></p>
                <p><span class="font-medium">Reason:</span> {{ reviewLeave.reason }}</p>
                <div v-if="reviewLeave.employerComment" class="mt-3 p-3 bg-indigo-50/50 border border-indigo-100 rounded-lg">
                  <p class="text-xs font-semibold text-indigo-800 mb-1">Employer Notes:</p>
                  <p class="text-xs text-slate-700">{{ reviewLeave.employerComment }}</p>
                </div>
              </div>
            </div>

            <div v-if="reviewLeave.attachmentUrl" class="mb-5">
              <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Attached Document</p>
              <a :href="'http://localhost:5000' + reviewLeave.attachmentUrl" target="_blank" class="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-xl border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 transition-colors">
                <FileText class="w-4 h-4" /> View Medical Report / Attachment
              </a>
            </div>

            <div class="mb-6">
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">HR Comment (Optional)</label>
              <textarea v-model="reviewComment" rows="3" placeholder="Add your HR final notes for the employee..." class="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 bg-slate-50 border resize-none outline-none"></textarea>
            </div>

            <div class="flex gap-3 pt-2 border-t border-slate-100">
              <button @click="submitReview('Rejected')" :disabled="isSubmittingReview" class="flex-1 bg-white text-rose-700 font-semibold py-2.5 px-4 rounded-xl border border-rose-200 hover:bg-rose-50 hover:border-rose-300 transition focus:outline-none flex items-center justify-center gap-2">
                <XCircle class="w-4 h-4" /> Reject
              </button>
              <button @click="submitReview('Approved')" :disabled="isSubmittingReview" class="flex-1 bg-indigo-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm hover:bg-indigo-700 transition focus:outline-none flex items-center justify-center gap-2 disabled:opacity-50">
                <span v-if="isSubmittingReview" class="flex items-center gap-2">
                  <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </span>
                <span v-else class="flex items-center gap-2"><CheckCircle class="w-4 h-4" /> Approve Full Request</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- User Profile Modal -->
    <transition name="fade">
      <div v-if="selectedUser !== null" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-slate-900/5">
          <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <h3 class="text-lg font-bold text-slate-800">Employee Profile</h3>
            <button @click="selectedUser = null" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition">
              <X class="w-5 h-5" />
            </button>
          </div>
          <div class="p-6 overflow-y-auto">
            <div v-if="userProfileLoading" class="flex justify-center py-8">
              <svg class="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            </div>
            <div v-else-if="selectedUser.user" class="space-y-6">
              <!-- Header Profile -->
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-2xl uppercase border border-indigo-200">
                  {{ selectedUser.user.name.charAt(0) }}
                </div>
                <div>
                  <h4 class="text-xl font-bold text-slate-900">{{ selectedUser.user.name }}</h4>
                  <p class="text-sm text-slate-500">{{ selectedUser.user.email }}</p>
                </div>
              </div>

              <!-- Balance Cards -->
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-sm">
                  <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1"><Calendar class="w-3 h-3 text-blue-500"/> Remaining Casual</p>
                  <p class="mt-1 text-2xl font-bold text-slate-900">{{ selectedUser.user.leaveBalance?.casual || 0 }}</p>
                  <p class="text-xs text-slate-500 mt-1">Leaves Used: <span class="font-medium text-slate-700">{{ calculateUsed(selectedUser.leaves, 'Casual') }}</span></p>
                </div>
                <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-sm">
                  <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1"><Stethoscope class="w-3 h-3 text-rose-500"/> Remaining Sick</p>
                  <p class="mt-1 text-2xl font-bold text-slate-900">{{ selectedUser.user.leaveBalance?.sick || 0 }}</p>
                  <p class="text-xs text-slate-500 mt-1">Leaves Used: <span class="font-medium text-slate-700">{{ calculateUsed(selectedUser.leaves, 'Sick') }}</span></p>
                </div>
              </div>

              <!-- Mini History -->
              <div>
                <h5 class="text-sm font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Recent Leaves</h5>
                <div class="space-y-3">
                  <div v-for="l in selectedUser.leaves.slice(0, 5)" :key="l._id" class="flex items-start justify-between bg-white p-3 rounded-xl border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                    <div>
                      <p class="text-sm font-semibold text-slate-700 flex items-center gap-1">
                        <Stethoscope v-if="l.leaveType === 'Sick'" class="w-3 h-3 text-rose-500" />
                        <Calendar v-else class="w-3 h-3 text-blue-500" />
                        {{ l.leaveType }} Leave
                      </p>
                      <p class="text-xs text-slate-500 mt-0.5">{{ formatDate(l.startDate) }} to {{ formatDate(l.endDate) }}</p>
                      <a v-if="l.attachmentUrl" :href="'http://localhost:5000' + l.attachmentUrl" target="_blank" class="inline-flex items-center gap-1 mt-1 text-[8px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200 hover:bg-indigo-100 transition-colors uppercase tracking-wider">
                        <Paperclip class="w-2 h-2" />
                      </a>
                    </div>
                    <span :class="[
                      l.status === 'Approved' ? 'text-teal-700 bg-teal-50 border-teal-200' : 
                      l.status === 'Rejected' ? 'text-rose-700 bg-rose-50 border-rose-200' : 
                      'text-amber-700 bg-amber-50 border-amber-200',
                      'px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border'
                    ]">
                      {{ l.status }}
                    </span>
                  </div>
                  <p v-if="selectedUser.leaves.length === 0" class="text-sm text-slate-500 text-center py-4 bg-slate-50 rounded-lg">No past leaves found.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { Users, Clock, Filter, Search, Calendar, Stethoscope, CheckCircle, XCircle, Check, SearchX, RefreshCw, X, Paperclip, ArrowRight, FileText } from 'lucide-vue-next'

const leaves = ref([])
const filterStatus = ref('Pending_HR')
const searchQuery = ref('')
const isRefreshing = ref(false)
const processingId = ref(null)
const reviewLeave = ref(null)
const reviewComment = ref('')
const isSubmittingReview = ref(false)
const holidays = ref([])

const selectedUser = ref(null)
const userProfileLoading = ref(false)

const openReviewModal = (leave) => {
  reviewLeave.value = leave
  reviewComment.value = ''
}

const submitReview = async (status) => {
  if (!reviewLeave.value) return
  isSubmittingReview.value = true
  try {
    await axios.put(`http://localhost:5000/api/leaves/${reviewLeave.value._id}`, { status, comment: reviewComment.value })
    await fetchLeaves()
    reviewLeave.value = null
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to update leave status')
  } finally {
    isSubmittingReview.value = false
  }
}

const openUserProfile = async (userId) => {
  if (!userId) return
  selectedUser.value = {}
  userProfileLoading.value = true
  try {
    const { data } = await axios.get(`http://localhost:5000/api/users/${userId}/profile`)
    selectedUser.value = data
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to load user profile')
    selectedUser.value = null
  } finally {
    userProfileLoading.value = false
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

const calculateUsed = (leavesArr, type) => {
  if (!leavesArr) return 0
  return leavesArr
    .filter(l => l.leaveType === type && l.status === 'Approved')
    .reduce((acc, l) => {
      if (l.duration === 'Half Day') return acc + 0.5
      let count = 0
      let cur = new Date(l.startDate)
      const end = new Date(l.endDate)
      while(cur <= end) {
        const dayOfWeek = cur.getDay();
        const dateString = cur.toISOString().split('T')[0];
        if(dayOfWeek !== 0 && dayOfWeek !== 6 && !holidays.value.includes(dateString)) {
          count++;
        }
        cur.setDate(cur.getDate() + 1);
      }
      return acc + count
    }, 0)
}

const fetchLeaves = async () => {
  try {
    const { data } = await axios.get('http://localhost:5000/api/leaves/all')
    leaves.value = data
  } catch (err) {
    console.error('Failed to fetch leaves', err)
  }
}

const handleRefresh = async () => {
  isRefreshing.value = true
  await fetchLeaves()
  setTimeout(() => isRefreshing.value = false, 500)
}

const filteredLeaves = computed(() => {
  let result = leaves.value

  if (filterStatus.value !== 'All') {
    result = result.filter(l => l.status === filterStatus.value)
  }

  if (searchQuery.value.trim()) {
    const sq = searchQuery.value.toLowerCase()
    result = result.filter(l => l.userId?.name?.toLowerCase().includes(sq))
  }

  return result
})

const totalLeaves = computed(() => leaves.value.length)
const pendingLeaves = computed(() => leaves.value.filter(l => l.status === 'Pending_HR').length)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

onMounted(() => {
  fetchLeaves()
  fetchPublicHolidays()
})
</script>
