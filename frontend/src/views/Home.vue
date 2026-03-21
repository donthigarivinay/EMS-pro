<template>
  <div class="min-h-screen bg-transparent font-sans text-slate-100 selection:bg-indigo-500/30 selection:text-white overflow-x-hidden">
    <!-- Navbar -->
    <nav class="fixed w-full z-50 transition-all duration-300 border-b" :class="{ 'glass !border-t-0 !border-l-0 !border-r-0 !rounded-none !bg-[#0F172A]/80 py-3': scrolled, 'border-transparent bg-transparent py-5': !scrolled }">
      <div class="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center gap-2 font-bold text-2xl tracking-tight text-white cursor-pointer font-heading" @click="scrollToTop">
          <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-900/50 border border-white/10">
            <Key class="w-6 h-6"/>
          </div>
          <span class="tracking-tight">EMS Pro</span>
        </div>
        
        <!-- Actions -->
        <div class="flex items-center gap-4">
          <router-link v-if="!isAuthenticated" to="/login" class="text-sm font-semibold text-slate-300 hover:text-white transition-colors hidden sm:block">
            Login
          </router-link>
          <router-link v-if="!isAuthenticated" to="/signup" class="px-5 py-2.5 rounded-full bg-indigo-600 border border-indigo-500 text-white text-sm font-semibold hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 transition-all active:scale-95">
            Get Started
          </router-link>
          <router-link v-else to="/login" class="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 transition-all border border-indigo-500">
            Go to Dashboard
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in-up">
          <Sparkles class="w-4 h-4" /> The Future of Work
        </div>
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 animate-fade-in-up animation-delay-100 font-heading">
          Manage your team with <br class="hidden md:block"/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 bg-[length:300%_300%] animate-gradient">ultimate precision.</span>
        </h1>
        <p class="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          EMS Pro is the complete enterprise management system for leaves, tasks, and team collaboration. Streamline your workflow in one beautiful workspace.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
          <router-link :to="isAuthenticated ? '/login' : '/signup'" class="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 text-white text-base font-bold shadow-xl shadow-indigo-900/50 hover:bg-indigo-500 border border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all">
            {{ isAuthenticated ? 'Open Dashboard' : 'Start for free' }}
          </router-link>
          <a href="#how-it-works" class="w-full sm:w-auto px-8 py-4 rounded-full glass-panel text-white text-base font-bold hover:bg-white/10 hover:-translate-y-1 transition-all inline-flex items-center justify-center gap-2">
            See how it works <ArrowDown class="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-24 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <div class="text-center max-w-2xl mx-auto mb-20">
          <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 font-heading">How it works</h2>
          <p class="text-lg md:text-xl text-slate-400">Four simple steps to transform your team's leave and task management experience.</p>
        </div>

        <div class="space-y-24 md:space-y-32">
          <!-- Step 1: Register -->
          <div class="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div class="md:w-1/2 flex justify-center">
              <div class="relative w-full max-w-[200px] md:max-w-[240px] lg:max-w-[280px] aspect-square rounded-[20px] overflow-hidden glass-panel shadow-2xl shadow-indigo-900/40 group mix-blend-lighten border border-white/20">
                <img src="/images/register.png" alt="Register" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90" />
              </div>
            </div>
            <div class="md:w-1/2">
               <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-xl mb-6 shadow-sm">1</div>
               <h3 class="text-3xl font-bold text-white mb-4 tracking-tight font-heading">Register in seconds</h3>
               <p class="text-lg text-slate-400 leading-relaxed">Create your account as an Employee, HR, or Employer in just a few clicks. Get access to customized dashboards designed specifically to match your role and responsibilities.</p>
            </div>
          </div>

          <!-- Step 2: Submit Leave -->
          <div class="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
            <div class="md:w-1/2 flex justify-center">
              <div class="relative w-full max-w-[200px] md:max-w-[240px] lg:max-w-[280px] aspect-square rounded-[20px] overflow-hidden glass-panel shadow-2xl shadow-purple-900/40 group mix-blend-lighten border border-white/20">
                <img src="/images/leave.png" alt="Submit Leave" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90" />
              </div>
            </div>
            <div class="md:w-1/2 text-left md:text-right flex flex-col items-start md:items-end">
               <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold text-xl mb-6 shadow-sm">2</div>
               <h3 class="text-3xl font-bold text-white mb-4 tracking-tight font-heading">Submit a leave request</h3>
               <p class="text-lg text-slate-400 leading-relaxed max-w-md">No more confusing spreadsheets. Easily select your dates, provide a brief reason, and hit submit. The system automatically accounts for holidays and weekends.</p>
            </div>
          </div>

          <!-- Step 3: Manager Review -->
          <div class="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div class="md:w-1/2 flex justify-center">
              <div class="relative w-full max-w-[200px] md:max-w-[240px] lg:max-w-[280px] aspect-square rounded-[20px] overflow-hidden glass-panel shadow-2xl shadow-teal-900/40 group mix-blend-lighten border border-white/20">
                <img src="/images/manager.png" alt="Manager Review" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90" />
              </div>
            </div>
            <div class="md:w-1/2">
               <div class="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-400 flex items-center justify-center font-bold text-xl mb-6 shadow-sm">3</div>
               <h3 class="text-3xl font-bold text-white mb-4 tracking-tight font-heading">Manager reviews</h3>
               <p class="text-lg text-slate-400 leading-relaxed">Managers and Employers receive instant alerts. They can review team schedules, check project dependencies, and approve or reject the request with a single click.</p>
            </div>
          </div>

          <!-- Step 4: Notifications -->
          <div class="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
            <div class="md:w-1/2 flex justify-center">
              <div class="relative w-full max-w-[200px] md:max-w-[240px] lg:max-w-[280px] aspect-square rounded-[20px] overflow-hidden glass-panel shadow-2xl shadow-rose-900/40 group mix-blend-lighten border border-white/20">
                <img src="/images/notification.png" alt="Notifications" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90" />
              </div>
            </div>
            <div class="md:w-1/2 text-left md:text-right flex flex-col items-start md:items-end">
               <div class="w-12 h-12 rounded-xl bg-[#FB7185]/20 border border-[#FB7185]/30 text-[#FB7185] flex items-center justify-center font-bold text-xl mb-6 shadow-sm">4</div>
               <h3 class="text-3xl font-bold text-white mb-4 tracking-tight font-heading">Track status & receive updates</h3>
               <p class="text-lg text-slate-400 leading-relaxed max-w-md">Stay in the loop automatically. Employees get real-time push notifications once a decision is made, updating their dashboard statistics instantly.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24 border-t border-white/10 relative">
      <div class="absolute inset-0 bg-[#0F172A]/80 -z-10"></div>
      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 font-heading">Everything you need</h2>
          <p class="text-lg text-slate-400">Powerful features built for modern teams.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Feature 1 -->
          <div class="glass-panel p-8 hover:bg-white/10 transition-all group border-white/10 shadow-lg shadow-black/20">
            <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Calendar class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2 font-heading">Leave Management</h3>
            <p class="text-slate-400 text-sm leading-relaxed">Automatically calculate leaves avoiding holidays and weekends. Approve or reject with one click.</p>
          </div>
          <!-- Feature 2 -->
          <div class="glass-panel p-8 hover:bg-white/10 transition-all group border-white/10 shadow-lg shadow-black/20">
            <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BellRing class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2 font-heading">Smart Notifications</h3>
            <p class="text-slate-400 text-sm leading-relaxed">Get real-time push notifications for leave approvals, new tasks, and announcements.</p>
          </div>
          <!-- Feature 3 -->
          <div class="glass-panel p-8 hover:bg-white/10 transition-all group border-white/10 shadow-lg shadow-black/20">
            <div class="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2 font-heading">Role-based Access</h3>
            <p class="text-slate-400 text-sm leading-relaxed">Secure dashboards tailored specifically for Employees, HRs, and Employers.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="glass !border-b-0 !border-l-0 !border-r-0 !rounded-none !bg-[#0F172A]/90 text-slate-400 py-12 relative z-10 border-t border-white/10">
      <div class="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div class="col-span-2 lg:col-span-1">
          <div class="flex items-center gap-2 font-bold text-xl tracking-tight text-white mb-4 font-heading">
            <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 border border-white/10">
              <Key class="w-4 h-4"/>
            </div>
            <span>EMS Pro</span>
          </div>
          <p class="text-sm text-slate-400 mb-4 max-w-sm">The premier enterprise management system for modern teams. Transform how you organize work.</p>
        </div>
        
        <div>
          <h4 class="text-white font-bold mb-4 font-heading">Product</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-white transition-colors">Features</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Security</a></li>
          </ul>
        </div>

        <div>
           <h4 class="text-white font-bold mb-4 font-heading">Company</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-white transition-colors">About</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
           <h4 class="text-white font-bold mb-4 font-heading">Legal</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/10 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {{ new Date().getFullYear() }} EMS Pro. All rights reserved.</p>
        <div class="flex gap-4">
          <a href="#" class="text-slate-500 hover:text-white transition-colors"><Twitter class="w-5 h-5"/></a>
          <a href="#" class="text-slate-500 hover:text-white transition-colors"><Github class="w-5 h-5"/></a>
          <a href="#" class="text-slate-500 hover:text-white transition-colors"><Linkedin class="w-5 h-5"/></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Key, Sparkles, ArrowDown, UserPlus, Network, CheckCircle2, Calendar, BellRing, Shield, Twitter, Github, Linkedin } from 'lucide-vue-next'

const scrolled = ref(false)
const isAuthenticated = computed(() => !!sessionStorage.getItem('token'))

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.animation-delay-100 { animation-delay: 100ms; }
.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-300 { animation-delay: 300ms; }
.animation-delay-400 { animation-delay: 400ms; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-gradient {
  animation: gradient 8s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
