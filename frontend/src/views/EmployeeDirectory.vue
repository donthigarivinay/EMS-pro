<template>
  <div class="space-y-6 animate-fade-in-up">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-white tracking-tight font-heading">Employee Directory</h2>
        <p class="text-sm text-slate-400 mt-1">Manage and view all employee details</p>
      </div>
      <div class="glass-panel px-5 py-3 flex items-center gap-3">
        <Users class="w-5 h-5 text-indigo-400" />
        <div>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Active</p>
          <p class="text-xl font-bold text-white leading-none">{{ employees.length }} Employees</p>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="glass-panel overflow-hidden flex flex-col min-h-[500px]">
      <!-- Filters -->
      <div class="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <div class="relative w-full max-w-md">
          <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <Search class="h-4 w-4 text-slate-400" />
          </div>
          <input type="text" v-model="searchQuery" placeholder="Search by name or email..." class="block w-full rounded-xl border border-white/10 bg-black/20 text-white pl-10 pr-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder-slate-500">
        </div>
        <button @click="fetchEmployees" :disabled="loading" class="flex-shrink-0 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition p-2 hover:bg-white/10 rounded-lg flex items-center gap-2">
          <RefreshCw class="w-4 h-4" :class="{ 'animate-spin': loading }" /> <span class="hidden sm:inline">Refresh</span>
        </button>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto flex-1 custom-scrollbar">
        <table class="min-w-full divide-y divide-white/10">
          <thead class="bg-black/20">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Employee</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Leave Balance</th>
              <th scope="col" class="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="(emp, index) in filteredEmployees" :key="emp._id" class="hover:bg-white/5 transition-colors group" :class="index % 2 === 0 ? 'bg-transparent' : 'bg-black/10'">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-sm uppercase flex-shrink-0 border border-indigo-500/30">
                    {{ emp.name?.charAt(0) || 'E' }}
                  </div>
                  <div>
                    <div class="text-sm font-bold text-white">{{ emp.name }}</div>
                    <div class="text-xs text-slate-400">{{ emp.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border bg-blue-500/20 text-blue-300 border-blue-500/30">
                  {{ emp.role.charAt(0).toUpperCase() + emp.role.slice(1) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-4 text-sm font-medium">
                  <div class="flex items-center gap-1.5" title="Casual Leaves">
                    <Calendar class="w-4 h-4 text-slate-400" />
                    <span class="text-white">{{ emp.leaveBalance?.casual || 0 }}</span>
                  </div>
                  <div class="flex items-center gap-1.5" title="Sick Leaves">
                    <Stethoscope class="w-4 h-4 text-slate-400" />
                    <span class="text-white">{{ emp.leaveBalance?.sick || 0 }}</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active
                </span>
              </td>
            </tr>
            <tr v-if="filteredEmployees.length === 0">
              <td colspan="4" class="px-6 py-20 text-center">
                <div class="flex flex-col items-center justify-center text-slate-400">
                  <Search class="w-12 h-12 mb-3 opacity-50" />
                  <p class="text-base font-bold text-white">No employees found</p>
                  <p class="text-sm mt-1">Try a different search query.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { Users, Search, RefreshCw, Calendar, Stethoscope } from 'lucide-vue-next'

const employees = ref([])
const loading = ref(false)
const searchQuery = ref('')

const fetchEmployees = async () => {
  loading.value = true
  try {
    const { data } = await axios.get('/api/users/all')
    employees.value = data
  } catch (err) {
    console.error('Failed to fetch employees')
  } finally {
    setTimeout(() => { loading.value = false }, 500)
  }
}

const filteredEmployees = computed(() => {
  if (!searchQuery.value) return employees.value
  const q = searchQuery.value.toLowerCase()
  return employees.value.filter(e => 
    e.name?.toLowerCase().includes(q) || e.email?.toLowerCase().includes(q)
  )
})

onMounted(() => {
  fetchEmployees()
})
</script>
