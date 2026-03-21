<template>
  <div class="h-full flex items-center justify-center p-6 lg:p-12 animate-fade-in-up mt-10">
    <div class="glass-panel text-center max-w-lg w-full p-10 relative overflow-hidden group">
      <div class="absolute -right-10 -top-10 text-cyan-500/5 group-hover:text-cyan-500/10 transition-colors pointer-events-none">
        <BarChart class="w-64 h-64" />
      </div>
      
      <div class="relative z-10 flex flex-col items-center">
        <div class="w-20 h-20 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 shadow-xl shadow-cyan-900/30 border border-cyan-500/30">
          <BarChart class="w-10 h-10" />
        </div>
        <h2 class="text-3xl font-bold text-white tracking-tight font-heading mb-3">Advanced Reports</h2>
        <p class="text-slate-400 text-base leading-relaxed mb-8">
          A powerful new analytics dashboard is coming soon! You'll be able to visualize company-wide leave trends, absenteeism rates, and deeply analyze employee attendance.
        </p>
        
        <button class="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-600/30 border border-cyan-500 hover:-translate-y-0.5 flex items-center gap-2" @click="$router.back()">
          <ArrowLeft class="w-4 h-4" /> Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BarChart, ArrowLeft } from 'lucide-vue-next'
</script>
