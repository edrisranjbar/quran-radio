<script setup lang="ts">
import { Loader2, Music2, X } from 'lucide-vue-next'
import { watch, ref } from 'vue'
import { useAudio } from '@/composables/useAudio'
import { useI18n } from '@/composables/useI18n'
import AudioControls from '@/components/AudioControls.vue'
import ListenerCount from '@/components/ListenerCount.client.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import SleepTimer from '@/components/SleepTimer.vue'

const {
  isPlaying,
  volume,
  loading,
  togglePlay,
  changeVolume,
  isLoading,
  currentStation,
  currentTrack,
  stations,
  selectStation,
  next,
  previous
} = useAudio()

const { t, isRTL, currentLanguage } = useI18n()
const containerRef = ref<HTMLElement>()
const showSleepTimerModal = ref(false)
const sleepTimerRef = ref<InstanceType<typeof SleepTimer> | null>(null)

// Update direction when language changes
watch(isRTL, (newIsRTL) => {
  if (containerRef.value) {
    containerRef.value.dir = newIsRTL ? 'rtl' : 'ltr'
  }
  // Also update document direction for full RTL support
  if (process.client) {
    document.documentElement.dir = newIsRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = currentLanguage.value
  }
}, { immediate: true })

// Handle sleep timer timeout
const handleSleepTimeout = () => {
  if (isPlaying.value) {
    // Fade out audio over 3 seconds
    const fadeOutInterval = setInterval(() => {
      if (volume.value > 0.1) {
        changeVolume(volume.value - 0.1)
      } else {
        clearInterval(fadeOutInterval)
        togglePlay() // Stop playback
        changeVolume(0.7) // Reset volume for next time
      }
    }, 300)
  }
}
</script>

<template>
  <div ref="containerRef" class="container mx-auto px-4 max-w-6xl" dir="ltr">
    <!-- Language Switcher at Top -->
    <div class="flex justify-end mb-4">
      <LanguageSwitcher />
    </div>
    
    <div v-if="isLoading" class="islamic-card flex flex-col items-center justify-center p-10">
      <Loader2 class="h-10 w-10 animate-spin text-primary" />
      <p class="mt-4 text-foreground">Preparing stations...</p>
    </div>
    <div v-else class="islamic-card p-0 overflow-hidden">
      <!-- Mobile Layout: Player First, Stations Below -->
      <div class="block md:hidden">
        <!-- Main Player (Mobile) -->
        <main class="p-6">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-display font-bold text-primary mb-2" :class="{ 'font-arabic': isRTL }">{{ t.title }}</h2>
            <p class="text-base text-muted-foreground">
              {{ currentTrack ? `${t.nowPlaying}: ${currentTrack.title}` : t.selectStation }}
            </p>
          </div>

          <AudioControls
            :is-playing="isPlaying"
            :loading="loading"
            :volume="volume"
            @toggle="togglePlay"
            @volume="changeVolume"
          />

          <div class="flex flex-col items-center gap-3 mt-4">
            <ListenerCount />
            <SleepTimer 
              ref="sleepTimerRef"
              @timeout="handleSleepTimeout"
              @show-modal="showSleepTimerModal = true"
              @hide-modal="showSleepTimerModal = false"
            />
          </div>
        </main>

        <!-- Stations (Mobile) -->
        <section class="border-t border-border bg-gradient-to-b from-background to-muted/20">
          <div class="p-4">
            <p class="text-xs uppercase tracking-wider text-muted-foreground mb-3">{{ t.stations }}</p>
            <div class="grid grid-cols-1 gap-3">
              <button
                v-for="s in stations"
                :key="s.key"
                class="w-full text-left rounded-lg p-3 transition-all card-hover"
                :class="{ 
                  'border-primary/50 bg-primary/5 ring-1 ring-primary/20': currentStation?.key === s.key,
                  'opacity-50 cursor-not-allowed grayscale': !s.enabled
                }"
                @click="selectStation(s.key)"
                :disabled="!s.enabled"
              >
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 grid place-items-center rounded-lg bg-primary/10 text-primary">
                    <Music2 :size="18" />
                  </div>
                  <div>
                    <p class="text-sm font-medium">{{ t[s.key].name }}</p>
                    <p class="text-xs text-muted-foreground mt-1">{{ t[s.key].description }}</p>
                    <p v-if="!s.enabled" class="text-xs text-destructive/80 mt-1">{{ t.comingSoon }}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>
      </div>

      <!-- Desktop Layout: Sidebar + Player -->
      <div class="hidden md:grid md:grid-cols-[260px_1fr] gap-0">
        <!-- Sidebar: Stations (Desktop) -->
        <aside class="border-r border-border bg-gradient-to-b from-background to-muted/20">
          <div class="p-4">
            <p class="text-xs uppercase tracking-wider text-muted-foreground mb-3">{{ t.stations }}</p>
            <div class="space-y-3">
              <button
                v-for="s in stations"
                :key="s.key"
                class="w-full text-left rounded-lg p-4 transition-all card-hover"
                :class="{ 
                  'border-primary/50 bg-primary/5 ring-1 ring-primary/20': currentStation?.key === s.key,
                  'opacity-50 cursor-not-allowed grayscale': !s.enabled
                }"
                @click="selectStation(s.key)"
                :disabled="!s.enabled"
              >
                <div class="flex items-center gap-4">
                  <div class="h-12 w-12 grid place-items-center rounded-lg bg-primary/10 text-primary">
                    <Music2 :size="20" />
                  </div>
                  <div>
                    <p class="text-base font-medium">{{ t[s.key].name }}</p>
                    <p class="text-xs text-muted-foreground mt-1">{{ t[s.key].description }}</p>
                    <p v-if="!s.enabled" class="text-xs text-destructive/80 mt-1">{{ t.comingSoon }}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </aside>

        <!-- Main Player (Desktop) -->
        <main class="p-8">
          <div class="text-center mb-8">
            <h2 class="text-4xl font-display font-bold text-primary mb-4" :class="{ 'font-arabic': isRTL }">{{ t.title }}</h2>
            <p class="text-lg text-muted-foreground">
              {{ currentTrack ? `${t.nowPlaying}: ${currentTrack.title}` : t.selectStation }}
            </p>
          </div>

          <AudioControls
            :is-playing="isPlaying"
            :loading="loading"
            :volume="volume"
            @toggle="togglePlay"
            @volume="changeVolume"
            @previous="previous"
            @next="next"
          />

          <div class="flex flex-col items-center gap-3 mt-4">
            <ListenerCount />
            <SleepTimer 
              ref="sleepTimerRef"
              @timeout="handleSleepTimeout"
              @show-modal="showSleepTimerModal = true"
              @hide-modal="showSleepTimerModal = false"
            />
          </div>
        </main>
      </div>
    </div>

    <!-- Sleep Timer Modal -->
    <div
      v-if="showSleepTimerModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showSleepTimerModal = false"
    >
      <div class="bg-background border border-border rounded-lg p-6 max-w-sm w-full mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold" :class="{ 'font-arabic': isRTL }">{{ t.sleepTimer }}</h3>
          <button
            @click="showSleepTimerModal = false"
            class="text-muted-foreground hover:text-foreground"
          >
            <X :size="20" />
          </button>
        </div>
        
        <p class="text-sm text-muted-foreground mb-4" :class="{ 'font-arabic': isRTL }">
          {{ t.sleepTimerDescription }}
        </p>

        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="preset in [
              { label: t.timerDurations['15min'], value: 15 },
              { label: t.timerDurations['30min'], value: 30 },
              { label: t.timerDurations['1hour'], value: 60 },
              { label: t.timerDurations['2hours'], value: 120 }
            ]"
            :key="preset.value"
            @click="sleepTimerRef?.startTimer(preset.value); showSleepTimerModal = false"
            class="p-3 border border-border rounded-md hover:bg-muted transition-colors text-center"
            :class="{ 'font-arabic': isRTL }"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


