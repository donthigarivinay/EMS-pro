<template>
  <div class="h-screen bg-[#0F172A] flex overflow-hidden font-sans text-slate-100 relative">
    <!-- Ambient Organic Mesh Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-600/20 mix-blend-screen blur-[120px] opacity-60"></div>
      <div class="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-teal-600/20 mix-blend-screen blur-[120px] opacity-60"></div>
    </div>

    <!-- Unauthenticated Layout (Login/Signup) -->
    <template v-if="!isAuthenticated">
      <main class="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </template>

    <!-- Authenticated Layout -->
    <template v-else>
      <!-- Fixed Sidebar -->
      <aside class="w-64 glass !border-t-0 !border-b-0 !border-l-0 !rounded-none !bg-[#0F172A]/80 hidden md:flex flex-col z-20 h-full shadow-2xl shadow-black/50">
        <div class="h-16 flex items-center px-6 border-b border-white/10 flex-shrink-0">
          <div class="flex items-center gap-2 font-bold text-xl bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-heading cursor-pointer" @click="$router.push(user?.role === 'employer' ? '/employer' : user?.role === 'hr' ? '/hr' : '/employee')">
            <div class="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-900/40 border border-indigo-500/30">
              <Key class="w-5 h-5"/>
            </div>
            <span class="tracking-tight">EMS Pro</span>
          </div>
        </div>
        <nav class="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          <template v-if="user?.role === 'employer'">
            <router-link to="/employer" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors font-medium">
              <LayoutDashboard class="w-5 h-5" /> Dashboard
            </router-link>
            <router-link to="/employees" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors font-medium">
              <Users class="w-5 h-5" /> Employees
            </router-link>
            <router-link to="/reports" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors font-medium">
              <BarChart class="w-5 h-5" /> Reports
            </router-link>
          </template>
          
          <template v-else-if="user?.role === 'hr'">
            <router-link to="/hr" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors font-medium">
              <LayoutDashboard class="w-5 h-5" /> HR Dashboard
            </router-link>
            <router-link to="/employees" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors font-medium">
              <Users class="w-5 h-5" /> Employees
            </router-link>
            <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors font-medium">
              <Calendar class="w-5 h-5" /> Leaves
            </a>
            <router-link to="/reports" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors font-medium">
              <BarChart class="w-5 h-5" /> Reports
            </router-link>
          </template>

          <template v-else>
            <router-link to="/employee" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors font-medium">
              <LayoutDashboard class="w-5 h-5" /> My Portal
            </router-link>
            <router-link to="/leave-balances" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors font-medium">
              <Calendar class="w-5 h-5" /> Leave Balances
            </router-link>
            <router-link to="/my-tasks" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors font-medium">
              <ClipboardList class="w-5 h-5" /> My Tasks
            </router-link>
          </template>

          <router-link to="/settings" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors font-medium mt-4">
            <Settings class="w-5 h-5" /> Settings
          </router-link>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col overflow-hidden relative z-10 w-full">
        <!-- Top Navbar -->
        <header class="h-16 glass !border-t-0 !border-l-0 !border-r-0 !rounded-none !bg-slate-900/40 flex items-center justify-between px-4 sm:px-6 z-20 sticky top-0 shadow-sm shadow-black/20">
          <div class="flex items-center gap-4">
            <!-- Mobile Menu Toggle -->
            <button class="md:hidden text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition">
              <Menu class="w-6 h-6" />
            </button>
            <div class="h-6 w-px bg-white/20 mx-1 hidden sm:block" v-if="$route.meta?.title"></div>
            <h1 class="text-base font-semibold text-slate-300 truncate hidden sm:block font-heading" v-if="$route.meta?.title">
              {{ $route.meta.title }}
            </h1>
          </div>
          <div class="ml-4 flex items-center md:ml-6 gap-3">
            <!-- Notifications Dropdown -->
            <div class="relative notif-container">
              <button @click="showNotifications = !showNotifications" class="p-2 text-slate-300 hover:text-white transition-colors relative rounded-full hover:bg-white/10">
                <span v-if="unreadCount > 0" class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#FB7185] rounded-full border-2 border-[#1E293B] animate-pulse"></span>
                <Bell class="w-[22px] h-[22px]" />
              </button>
              
              <!-- Dropdown Panel -->
              <transition name="fade">
                <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 sm:w-96 glass-panel !bg-[#1E293B] !backdrop-blur-xl border border-white/10 overflow-hidden z-50 shadow-2xl shadow-black/50">
                  <div class="px-5 py-3.5 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 class="text-sm font-bold text-white tracking-tight font-heading">Notifications <span v-if="unreadCount > 0" class="ml-1 bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full text-xs border border-blue-500/30">{{ unreadCount }} new</span></h3>
                    <button v-if="unreadCount > 0" @click="markAllRead" class="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors">Mark all read</button>
                  </div>
                  <div class="max-h-[28rem] overflow-y-auto divide-y divide-white/5 custom-scrollbar">
                    <div v-if="notifications.length === 0" class="p-8 text-center text-sm text-slate-400 flex flex-col items-center justify-center">
                      <Bell class="w-8 h-8 text-slate-200 mb-2" />
                      You're all caught up!
                    </div>
                    <div v-for="notif in notifications" :key="notif._id" 
                         @click="!notif.isRead && markAsRead(notif._id)"
                         :class="['p-4 cursor-pointer transition-colors relative flex items-start', !notif.isRead ? 'bg-blue-500/10 hover:bg-blue-500/20' : 'bg-transparent hover:bg-white/5']">
                      <div v-if="!notif.isRead" class="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-3 flex-shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                      <div v-else class="w-2 h-2 bg-transparent mt-1.5 mr-3 flex-shrink-0"></div>
                      <div class="flex-1">
                        <p class="text-sm text-slate-200 leading-snug" :class="{'font-semibold text-white': !notif.isRead}">{{ notif.message }}</p>
                        <p class="text-[10px] text-slate-400 mt-1.5 uppercase font-medium tracking-wider flex items-center gap-1"><Clock class="w-3 h-3" /> {{ formatDate(notif.createdAt) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            <!-- Profile Dropdown -->
            <div class="relative profile-container">
              <button @click="showProfile = !showProfile" class="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 text-white font-bold flex items-center justify-center shadow-md shadow-black/20 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F172A] focus:ring-blue-500 select-none ml-2 border border-white/20">
                {{ user?.name ? user.name.charAt(0).toUpperCase() : 'U' }}
              </button>
              
              <transition name="fade">
                <div v-if="showProfile" class="absolute right-0 mt-2 w-64 glass-panel !bg-[#1E293B] !backdrop-blur-xl border border-white/10 overflow-hidden z-50 shadow-2xl shadow-black/50">
                  <div class="p-5 border-b border-white/10 bg-white/5 flex flex-col items-center text-center">
                    <div class="h-14 w-14 rounded-full bg-slate-800 text-blue-400 font-bold flex items-center justify-center text-2xl shadow-inner mb-3 border border-white/10">
                      {{ user?.name ? user.name.charAt(0).toUpperCase() : 'U' }}
                    </div>
                    <div class="w-full min-w-0">
                      <p class="font-bold text-white truncate text-base font-heading">{{ user?.name || 'User' }}</p>
                      <p class="text-sm text-slate-400 truncate mt-0.5">{{ user?.email || 'user@example.com' }}</p>
                    </div>
                    <div class="mt-3 inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {{ user?.role ? user.role.replace(/([A-Z])/g, ' $1').trim() : 'Employee' }}
                    </div>
                  </div>
                  <div class="p-2">
                    <button @click="logout" class="w-full text-left flex items-center justify-center gap-2.5 text-sm font-semibold text-[#FB7185] hover:bg-white/10 px-3 py-2.5 rounded-xl transition-colors">
                      <LogOut class="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-12 relative z-10 custom-scrollbar">
          <div class="max-w-7xl mx-auto w-full">
            <router-view v-slot="{ Component }">
              <transition name="slide-up" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </main>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Menu, Bell, LogOut, LayoutDashboard, Key, Clock, User, Users, Calendar, BarChart, Settings, ClipboardList } from 'lucide-vue-next'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const userStr = sessionStorage.getItem('user')
const user = computed(() => userStr ? JSON.parse(userStr) : {})
const isAuthenticated = computed(() => !!sessionStorage.getItem('token'))

const logout = () => {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')
  window.location.href = '/login'
}

// Notifications state
const notifications = ref([])
const showNotifications = ref(false)
const unreadCount = computed(() => notifications.value.filter(n => !n.isRead).length)
let notifInterval = null

// Profile state
const showProfile = ref(false)

const fetchNotifications = async () => {
  if (!isAuthenticated.value) return
  try {
    const { data } = await axios.get('/api/notifications')
    notifications.value = data
  } catch (err) {
    console.error('Failed to fetch notifications')
  }
}

const markAsRead = async (id) => {
  try {
    await axios.put(`/api/notifications/${id}/read`)
    const n = notifications.value.find(x => x._id === id)
    if (n) n.isRead = true
  } catch (err) { }
}

const markAllRead = async () => {
  try {
    await axios.put('/api/notifications/read-all')
    notifications.value.forEach(n => n.isRead = true)
  } catch (err) { }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const closeDropdown = (e) => {
  if (!e.target.closest('.notif-container')) {
    showNotifications.value = false
  }
  if (!e.target.closest('.profile-container')) {
    showProfile.value = false
  }
}

onMounted(() => {
  if (isAuthenticated.value) {
    fetchNotifications()
    notifInterval = setInterval(fetchNotifications, 15000) // Poll every 15s to feel fast
  }
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  if (notifInterval) clearInterval(notifInterval)
  document.removeEventListener('click', closeDropdown)
})
</script>

<style>
/* Base typography */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

html, body {
  font-family: 'Poppins', sans-serif;
}

/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
