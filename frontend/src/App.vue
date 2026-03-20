<template>
  <div class="h-screen bg-slate-50 flex overflow-hidden font-sans text-slate-800">
    <!-- Unauthenticated Layout (Login/Signup) -->
    <template v-if="!isAuthenticated">
      <main class="flex-1 overflow-y-auto bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </template>

    <!-- Authenticated Layout -->
    <template v-else>
      <!-- Main Content Area (Sidebar removed for all roles) -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Top Navbar -->
        <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0 shadow-sm">
          <div class="flex items-center gap-4">
            <!-- Branding moved from Sidebar -->
            <div class="flex items-center gap-2 font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mr-2">
              <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                <Key class="w-5 h-5"/>
              </div>
              <span class="tracking-tight">EMS Pro</span>
            </div>
            
            <div class="h-6 w-px bg-slate-200 mx-1 hidden sm:block" v-if="$route.meta?.title"></div>
            <h1 class="text-base font-semibold text-slate-500 truncate hidden sm:block" v-if="$route.meta?.title">
              {{ $route.meta.title }}
            </h1>
          </div>
          <div class="ml-4 flex items-center md:ml-6 gap-3">
            <!-- Notifications Dropdown -->
            <div class="relative notif-container">
              <button @click="showNotifications = !showNotifications" class="p-2 text-slate-400 hover:text-slate-600 transition-colors relative rounded-full hover:bg-slate-100">
                <span v-if="unreadCount > 0" class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
                <Bell class="w-[22px] h-[22px]" />
              </button>
              
              <!-- Dropdown Panel -->
              <transition name="fade">
                <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden z-50">
                  <div class="px-5 py-3.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
                    <h3 class="text-sm font-bold text-slate-800 tracking-tight">Notifications <span v-if="unreadCount > 0" class="ml-1 bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full text-xs">{{ unreadCount }} new</span></h3>
                    <button v-if="unreadCount > 0" @click="markAllRead" class="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">Mark all read</button>
                  </div>
                  <div class="max-h-[28rem] overflow-y-auto divide-y divide-slate-50 custom-scrollbar">
                    <div v-if="notifications.length === 0" class="p-8 text-center text-sm text-slate-500 flex flex-col items-center justify-center">
                      <Bell class="w-8 h-8 text-slate-200 mb-2" />
                      You're all caught up!
                    </div>
                    <div v-for="notif in notifications" :key="notif._id" 
                         @click="!notif.isRead && markAsRead(notif._id)"
                         :class="['p-4 cursor-pointer transition-colors hover:bg-slate-50 relative flex items-start', !notif.isRead ? 'bg-indigo-50/30' : 'bg-white']">
                      <div v-if="!notif.isRead" class="w-2 h-2 bg-indigo-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                      <div v-else class="w-2 h-2 bg-transparent mt-1.5 mr-3 flex-shrink-0"></div>
                      <div class="flex-1">
                        <p class="text-sm text-slate-800 leading-snug" :class="{'font-semibold': !notif.isRead}">{{ notif.message }}</p>
                        <p class="text-[10px] text-slate-500 mt-1.5 uppercase font-medium tracking-wider flex items-center gap-1"><Clock class="w-3 h-3" /> {{ formatDate(notif.createdAt) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            <!-- Profile Dropdown -->
            <div class="relative profile-container">
              <button @click="showProfile = !showProfile" class="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-bold flex items-center justify-center shadow-md shadow-indigo-200 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none ml-2">
                {{ user?.name ? user.name.charAt(0).toUpperCase() : 'U' }}
              </button>
              
              <transition name="fade">
                <div v-if="showProfile" class="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden z-50">
                  <div class="p-5 border-b border-slate-100 bg-slate-50/80 flex flex-col items-center text-center">
                    <div class="h-14 w-14 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-2xl shadow-inner mb-3">
                      {{ user?.name ? user.name.charAt(0).toUpperCase() : 'U' }}
                    </div>
                    <div class="w-full min-w-0">
                      <p class="font-bold text-slate-800 truncate text-base">{{ user?.name || 'User' }}</p>
                      <p class="text-sm text-slate-500 truncate mt-0.5">{{ user?.email || 'user@example.com' }}</p>
                    </div>
                    <div class="mt-3 inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700">
                      {{ user?.role ? user.role.replace(/([A-Z])/g, ' $1').trim() : 'Employee' }}
                    </div>
                  </div>
                  <div class="p-2">
                    <button @click="logout" class="w-full text-left flex items-center justify-center gap-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 px-3 py-2.5 rounded-xl transition-colors">
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
        <main class="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-12 bg-slate-50/50">
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
import { Menu, Bell, LogOut, LayoutDashboard, Key, Clock, User } from 'lucide-vue-next'
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
