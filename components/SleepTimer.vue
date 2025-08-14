<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { Clock, X } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const emit = defineEmits<{
  (e: 'timeout'): void
}>()

const { t } = useI18n()

// Timer state
const isActive = ref(false)
const selectedDuration = ref(0) // in minutes
const remainingTime = ref(0) // in seconds
const intervalId = ref<NodeJS.Timeout | null>(null)
const hasWarned = ref(false) // Track if we've shown the 1-minute warning

// Preset durations in minutes
const presetDurations = computed(() => [
  { label: t.timerDurations['15min'], value: 15 },
  { label: t.timerDurations['30min'], value: 30 },
  { label: t.timerDurations['1hour'], value: 60 },
  { label: t.timerDurations['2hours'], value: 120 }
])

// Computed values
const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60)
  const seconds = remainingTime.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const progressPercentage = computed(() => {
  if (selectedDuration.value === 0) return 0
  const totalSeconds = selectedDuration.value * 60
  return ((totalSeconds - remainingTime.value) / totalSeconds) * 100
})

// Start timer
const startTimer = (duration: number) => {
  selectedDuration.value = duration
  remainingTime.value = duration * 60
  isActive.value = true
  hasWarned.value = false
  
  intervalId.value = setInterval(() => {
    remainingTime.value--
    
    // Show warning at 1 minute remaining
    if (remainingTime.value === 60 && !hasWarned.value) {
      hasWarned.value = true
      // Create a subtle notification sound
      if ('AudioContext' in window) {
        const audioContext = new AudioContext()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.5)
      }
    }
    
    if (remainingTime.value <= 0) {
      stopTimer()
      emit('timeout')
    }
  }, 1000)
}

// Stop timer
const stopTimer = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
  isActive.value = false
  remainingTime.value = 0
  selectedDuration.value = 0
  hasWarned.value = false
}

// Cleanup on unmount
onBeforeUnmount(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})

// Expose methods to parent
defineExpose({
  startTimer,
  stopTimer,
  isActive: computed(() => isActive.value)
})
</script>

<template>
  <div class="sleep-timer">
    <!-- Timer Button -->
    <button
      v-if="!isActive"
      class="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
      @click="$emit('show-modal')"
    >
      <Clock :size="16" />
      <span>{{ t.sleepTimer }}</span>
    </button>

    <!-- Active Timer Display -->
    <div v-else class="relative">
      <!-- Pulsing Background -->
      <div class="absolute inset-0 bg-primary/5 rounded-lg animate-pulse"></div>
      
      <!-- Timer Content -->
      <div class="relative flex items-center gap-3 px-4 py-3 bg-primary/10 border-2 border-primary/30 rounded-lg shadow-md">
        <!-- Animated Clock Icon -->
        <div class="relative">
          <Clock :size="18" class="text-primary animate-pulse" />
          <!-- Rotating Ring -->
          <div class="absolute inset-0 border-2 border-transparent border-t-primary/50 rounded-full animate-spin"></div>
        </div>
        
        <div class="flex flex-col flex-1">
          <!-- Large Countdown Display -->
          <div class="flex items-center gap-2 mb-1">
            <span class="text-lg font-bold text-primary tabular-nums">{{ formattedTime }}</span>
            <span class="text-xs text-primary/70 font-medium">{{ t.remaining }}</span>
          </div>
          
          <!-- Enhanced Progress Bar -->
          <div class="relative w-full h-2 bg-muted rounded-full overflow-hidden">
            <!-- Background glow -->
            <div class="absolute inset-0 bg-primary/20 rounded-full"></div>
            <!-- Progress bar with animation -->
            <div 
              class="relative h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-1000 ease-linear rounded-full"
              :style="{ width: `${progressPercentage}%` }"
            >
              <!-- Shimmer effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-full"></div>
            </div>
          </div>
          
          <!-- Timer Status Text -->
          <p class="text-xs text-primary/70 mt-1 font-medium">
            {{ t.sleepTimerActive }} - {{ Math.ceil(remainingTime / 60) }} {{ t.minLeft }}
          </p>
        </div>
        
        <!-- Cancel Button -->
        <button
          @click="stopTimer"
          class="flex items-center justify-center h-8 w-8 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
          :title="t.cancel"
        >
          <X :size="16" />
        </button>
      </div>
      
      <!-- Countdown Pulse Effect -->
      <div 
        v-if="remainingTime <= 60"
        class="absolute inset-0 border-2 border-orange-500/50 rounded-lg animate-ping pointer-events-none"
      ></div>
    </div>


  </div>
</template>

<style scoped>
.sleep-timer {
  position: relative;
}
</style>
