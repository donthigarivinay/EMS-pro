<template>
  <div class="space-y-6 animate-fade-in-up">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-white tracking-tight font-heading">Leave Balances</h2>
        <p class="text-sm text-slate-400 mt-1">Detailed overview of your yearly leave allocations</p>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Casual Leaves Card -->
      <div class="glass-panel p-8 relative overflow-hidden group">
        <div class="absolute -right-10 -top-10 text-blue-500/5 group-hover:text-blue-500/10 transition-colors pointer-events-none">
          <Calendar class="w-48 h-48" />
        </div>
        <div class="flex items-center gap-4 mb-6 relative z-10">
          <div class="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shadow-lg shadow-blue-900/40 border border-blue-500/30">
            <Calendar class="w-6 h-6" />
          </div>
          <div>
             <h3 class="text-xl font-bold text-white font-heading">Casual Leaves</h3>
             <p class="text-sm text-slate-400">Total yearly allocation: 10 days</p>
          </div>
        </div>
        <div class="space-y-4 relative z-10">
          <div>
            <div class="flex justify-between text-sm font-bold text-white mb-2">
              <span>Remaining</span>
              <span class="text-blue-400">{{ Object.keys(balance).length ? balance.casual : 0 }} Days</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-3 border border-white/5 overflow-hidden">
               <div class="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full transition-all duration-1000 ease-out" 
                    :style="`width: ${(balance.casual / 10) * 100}%`"></div>
            </div>
          </div>
          <div class="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-white/5">
            <span class="text-sm text-slate-400 font-medium">Used this year</span>
            <span class="text-lg font-bold text-white">{{ 10 - (balance.casual || 0) }} Days</span>
          </div>
        </div>
      </div>

      <!-- Sick Leaves Card -->
      <div class="glass-panel p-8 relative overflow-hidden group">
        <div class="absolute -right-10 -top-10 text-rose-500/5 group-hover:text-rose-500/10 transition-colors pointer-events-none">
          <Stethoscope class="w-48 h-48" />
        </div>
        <div class="flex items-center gap-4 mb-6 relative z-10">
          <div class="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shadow-lg shadow-rose-900/40 border border-rose-500/30">
            <Stethoscope class="w-6 h-6" />
          </div>
          <div>
             <h3 class="text-xl font-bold text-white font-heading">Sick Leaves</h3>
             <p class="text-sm text-slate-400">Total yearly allocation: 10 days</p>
          </div>
        </div>
        <div class="space-y-4 relative z-10">
          <div>
            <div class="flex justify-between text-sm font-bold text-white mb-2">
              <span>Remaining</span>
              <span class="text-rose-400">{{ Object.keys(balance).length ? balance.sick : 0 }} Days</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-3 border border-white/5 overflow-hidden">
               <div class="bg-gradient-to-r from-rose-500 to-orange-400 h-3 rounded-full transition-all duration-1000 ease-out" 
                    :style="`width: ${(balance.sick / 10) * 100}%`"></div>
            </div>
          </div>
          <div class="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-white/5">
            <span class="text-sm text-slate-400 font-medium">Used this year</span>
            <span class="text-lg font-bold text-white">{{ 10 - (balance.sick || 0) }} Days</span>
          </div>
        </div>
      </div>

      <!-- Unpaid Leaves / Policy Info (Optional feature spot) -->
      <div class="glass-panel p-6 sm:col-span-2 overflow-hidden flex flex-col sm:flex-row items-center justify-between border-l-4 border-l-indigo-500">
        <div class="mb-4 sm:mb-0">
          <h4 class="text-lg font-bold text-white font-heading mb-1">Company Leave Policy</h4>
          <p class="text-sm text-slate-400 max-w-xl">
            Leaves automatically reset on January 1st every year. Unused leaves do not roll over to the next year. Need additional time off? Unpaid leaves must be communicated to HR directly.
          </p>
        </div>
        <button class="px-5 py-2.5 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-300 text-sm font-bold transition-colors rounded-xl flex-shrink-0 flex items-center gap-2" @click="$router.push('/employee')">
          <ArrowRight class="w-4 h-4"/> Apply Now
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Calendar, Stethoscope, ArrowRight } from 'lucide-vue-next'

const balance = ref({ casual: 10, sick: 10 })

const fetchBalance = async () => {
  try {
    const { data } = await axios.get('/api/users/balance')
    // Wait for the next tick naturally or just assign to trigger animation
    setTimeout(() => {
      balance.value = data
    }, 100)
  } catch (err) {
    console.error('Failed to fetch balance', err)
  }
}

onMounted(() => {
  // reset to 0 to show animation filling up to actual balance
  balance.value = { casual: 0, sick: 0 }
  fetchBalance()
})
</script>
