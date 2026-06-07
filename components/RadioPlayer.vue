<script setup lang="ts">
import { Loader2, Radio, X, Sparkles } from 'lucide-vue-next'
import { watch, ref } from 'vue'
import { useAudio } from '@/composables/useAudio'
import { useI18n } from '@/composables/useI18n'
import AudioControls from '@/components/AudioControls.vue'
import AudioWave from '@/components/AudioWave.vue'
import ListenerCount from '@/components/ListenerCount.client.vue'
import SleepTimer from '@/components/SleepTimer.vue'

const {
  isPlaying, volume, loading, togglePlay, changeVolume, isLoading,
  currentStation, stations, selectStation, next, previous
} = useAudio()

const { t, isRTL, currentLanguage } = useI18n()
const containerRef = ref<HTMLElement>()
const showSleepTimerModal = ref(false)
const sleepTimerRef = ref<InstanceType<typeof SleepTimer> | null>(null)

watch(isRTL, (newIsRTL) => {
  if (containerRef.value) containerRef.value.dir = newIsRTL ? 'rtl' : 'ltr'
  if (process.client) {
    document.documentElement.dir = newIsRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = currentLanguage.value
  }
}, { immediate: true })

const handleSleepTimeout = () => {
  if (isPlaying.value) {
    const fadeOutInterval = setInterval(() => {
      if (volume.value > 0.1) changeVolume(volume.value - 0.1)
      else { clearInterval(fadeOutInterval); togglePlay(); changeVolume(0.7) }
    }, 300)
  }
}
</script>

<template>
  <div ref="containerRef" class="container mx-auto px-4 max-w-6xl animate-fade-in" dir="ltr">
    <div v-if="isLoading" class="glass-card flex flex-col items-center justify-center p-16">
      <Loader2 class="h-10 w-10 animate-spin text-primary" />
      <p class="mt-4 text-muted-foreground mono text-xs tracking-widest uppercase">Preparing Streams…</p>
    </div>

    <div v-else class="grid gap-5 md:grid-cols-[1fr_320px]">
      <!-- Main Player -->
      <section class="glass-card aurora-bg p-8 md:p-10 relative">
        <div class="relative z-10">
          <!-- Header row -->
          <div class="flex items-center justify-end mb-8">
            <ListenerCount />
          </div>


          <!-- Now playing -->
          <div class="text-center mb-8">
            <p class="mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">{{ t.nowPlaying }}</p>
            <h2
              class="text-3xl md:text-5xl font-bold tracking-tight mb-2"
              :class="{ 'font-arabic': isRTL, 'text-gradient': isPlaying, 'text-foreground': !isPlaying }"
            >
              {{ currentStation ? t[currentStation.key].name : t.selectStation }}
            </h2>
            <p v-if="currentStation" class="text-sm text-muted-foreground" :class="{ 'font-arabic': isRTL }">
              {{ t[currentStation.key].description }}
            </p>
          </div>

          <!-- Wave -->
          <div class="mb-8">
            <AudioWave :active="isPlaying" />
          </div>

          <!-- Controls -->
          <AudioControls
            :is-playing="isPlaying"
            :loading="loading"
            :volume="volume"
            @toggle="togglePlay"
            @volume="changeVolume"
            @previous="previous()"
            @next="next()"
          />

          <!-- Sleep timer -->
          <div class="mt-8 flex items-center justify-center">
            <SleepTimer
              ref="sleepTimerRef"
              @timeout="handleSleepTimeout"
              @show-modal="showSleepTimerModal = true"
              @hide-modal="showSleepTimerModal = false"
            />
          </div>
        </div>
      </section>

      <!-- Stations Sidebar -->
      <aside class="glass-card p-5">
        <div class="flex items-center justify-between mb-4 px-1">
          <p class="mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{{ t.stations }}</p>
          <Sparkles :size="14" class="text-primary/60" />
        </div>
        <div class="space-y-3">
          <button
            v-for="s in stations"
            :key="s.key"
            class="station-chip w-full text-left group"
            :class="{
              'active': currentStation?.key === s.key,
              'opacity-40 cursor-not-allowed': !s.enabled,
              'text-right': isRTL
            }"
            @click="selectStation(s.key)"
            :disabled="!s.enabled"
          >
            <div class="relative z-10 flex items-center gap-3" :class="{ 'flex-row-reverse': isRTL }">
              <div
                class="h-11 w-11 grid place-items-center rounded-xl shrink-0 transition-all"
                :class="currentStation?.key === s.key
                  ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground'
                  : 'bg-muted/50 text-foreground/70 group-hover:bg-primary/20 group-hover:text-primary'"
              >
                <Radio :size="18" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold truncate" :class="{ 'font-arabic': isRTL }">{{ t[s.key].name }}</p>
                <p class="text-[11px] text-muted-foreground mt-0.5 line-clamp-1" :class="{ 'font-arabic': isRTL }">
                  {{ s.enabled ? t[s.key].description : t.comingSoon }}
                </p>
              </div>
              <div v-if="currentStation?.key === s.key && isPlaying" class="flex items-end gap-[2px] h-4">
                <span class="w-[2px] bg-primary animate-wave" style="animation-delay: 0s; height: 100%;" />
                <span class="w-[2px] bg-primary animate-wave" style="animation-delay: 0.2s; height: 60%;" />
                <span class="w-[2px] bg-primary animate-wave" style="animation-delay: 0.4s; height: 80%;" />
              </div>
            </div>
          </button>
        </div>
      </aside>
    </div>

    <!-- Sleep Timer Modal -->
    <div
      v-if="showSleepTimerModal"
      class="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in"
      @click.self="showSleepTimerModal = false"
    >
      <div class="glass-card p-6 max-w-sm w-full mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold" :class="{ 'font-arabic': isRTL }">{{ t.sleepTimer }}</h3>
          <button @click="showSleepTimerModal = false" class="text-muted-foreground hover:text-foreground transition-colors">
            <X :size="20" />
          </button>
        </div>
        <p class="text-sm text-muted-foreground mb-5" :class="{ 'font-arabic': isRTL }">
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
            class="p-3 glass rounded-xl hover:border-primary/40 hover:bg-primary/10 transition-all text-center text-sm font-medium"
            :class="{ 'font-arabic': isRTL }"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
