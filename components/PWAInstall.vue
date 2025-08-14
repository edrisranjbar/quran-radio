<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Download, X } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const showInstallPrompt = ref(false)
const deferredPrompt = ref<any>(null)
const isInstalled = ref(false)

onMounted(() => {
  // Check if already installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    isInstalled.value = true
    return
  }

  // Listen for beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('PWA: Install prompt available')
    e.preventDefault()
    deferredPrompt.value = e
    showInstallPrompt.value = true
  })

  // Listen for app installed event
  window.addEventListener('appinstalled', () => {
    console.log('PWA: App installed')
    isInstalled.value = true
    showInstallPrompt.value = false
    deferredPrompt.value = null
  })

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('PWA: Service Worker registered', registration)
      })
      .catch((error) => {
        console.log('PWA: Service Worker registration failed', error)
      })
  }
})

const installApp = async () => {
  if (!deferredPrompt.value) return

  try {
    // Show install prompt
    deferredPrompt.value.prompt()
    
    // Wait for user choice
    const { outcome } = await deferredPrompt.value.userChoice
    console.log('PWA: User choice', outcome)
    
    if (outcome === 'accepted') {
      console.log('PWA: User accepted install')
    } else {
      console.log('PWA: User dismissed install')
    }
    
    // Clear the prompt
    deferredPrompt.value = null
    showInstallPrompt.value = false
  } catch (error) {
    console.error('PWA: Install failed', error)
  }
}

const dismissPrompt = () => {
  showInstallPrompt.value = false
  // Don't show again for this session
  sessionStorage.setItem('pwa-install-dismissed', 'true')
}

// Check if user already dismissed
onMounted(() => {
  if (sessionStorage.getItem('pwa-install-dismissed')) {
    showInstallPrompt.value = false
  }
})
</script>

<template>
  <!-- Install Banner -->
  <div
    v-if="showInstallPrompt && !isInstalled"
    class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-background border border-border rounded-lg p-4 shadow-lg z-50"
  >
    <div class="flex items-start gap-3">
      <div class="h-10 w-10 grid place-items-center rounded-md bg-primary/10 text-primary flex-shrink-0">
        <Download :size="18" />
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-medium text-sm mb-1">{{ t.installApp }}</h4>
        <p class="text-xs text-muted-foreground mb-3">{{ t.installAppDescription }}</p>
        <div class="flex gap-2">
          <button
            @click="installApp"
            class="px-3 py-1.5 bg-primary text-primary-foreground text-xs rounded-md hover:bg-primary/90 transition-colors"
          >
            {{ t.install }}
          </button>
          <button
            @click="dismissPrompt"
            class="px-3 py-1.5 border border-border text-xs rounded-md hover:bg-muted transition-colors"
          >
            {{ t.notNow }}
          </button>
        </div>
      </div>
      <button
        @click="dismissPrompt"
        class="text-muted-foreground hover:text-foreground flex-shrink-0"
      >
        <X :size="16" />
      </button>
    </div>
  </div>
</template>
