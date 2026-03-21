<template>
  <div class="h-full flex items-center justify-center p-6 lg:p-12 animate-fade-in-up mt-10">
    <div class="glass-panel text-center max-w-lg w-full p-10 relative overflow-hidden group">
      <div class="absolute -right-10 -top-10 text-indigo-500/5 group-hover:text-indigo-500/10 transition-colors pointer-events-none">
        <ClipboardList class="w-64 h-64" />
      </div>
      
      <div class="relative z-10 flex flex-col items-center">
        <div class="w-20 h-20 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shadow-xl shadow-indigo-900/30 border border-indigo-500/30">
          <ClipboardList class="w-10 h-10" />
        </div>
        <h2 class="text-3xl font-bold text-white tracking-tight font-heading mb-3">Tasks Coming Soon</h2>
        <p class="text-slate-400 text-base leading-relaxed mb-8">
          We're building a dedicated workspace for you to easily track, manage, and collaborate on your daily assignments. Stay tuned!
        </p>
        
        <button class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30 border border-indigo-500 hover:-translate-y-0.5 flex items-center gap-2" @click="$router.push('/employee')">
          <ArrowLeft class="w-4 h-4" /> Back to Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ClipboardList, ArrowLeft } from 'lucide-vue-next'
</script>
