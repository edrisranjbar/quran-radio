<script setup lang="ts">
import { computed } from 'vue'
import { Play, Pause, Volume2, VolumeX } from 'lucide-vue-next'

const props = defineProps<{
  isPlaying: boolean
  loading: boolean
  volume: number
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'volume', value: number): void
}>()

const isMuted = computed(() => props.volume === 0)
const volumePercent = computed(() => Math.round(props.volume * 100))

function toggleMute() {
  emit('volume', props.volume > 0 ? 0 : 0.7)
}

function onInput(e: Event) {
  const value = Number((e.target as HTMLInputElement).value)
  emit('volume', value)
}
</script>

<template>
  <div class="flex flex-col items-center w-full max-w-sm mx-auto">
    <div class="flex items-center justify-center w-full mb-4">
      <button
        @click="emit('toggle')"
        class="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
        :disabled="props.loading"
      >
        <div v-if="props.loading" class="h-5 w-5 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
        <Pause v-else-if="props.isPlaying" :size="28" />
        <Play v-else :size="28" class="ml-1" />
      </button>
    </div>

    <div class="flex items-center gap-3 w-full justify-center">
      <button class="text-primary hover:text-primary/80 transition-colors" @click="toggleMute" aria-label="Toggle Mute" title="Toggle Mute">
        <VolumeX v-if="isMuted" :size="18" />
        <Volume2 v-else :size="18" />
      </button>
      <label for="volume" class="text-xs text-muted-foreground select-none">Volume</label>
      <input
        id="volume"
        class="w-40 h-1.5 accent-primary cursor-pointer"
        type="range"
        min="0"
        max="1"
        step="0.01"
        :value="props.volume"
        @input="onInput"
        aria-label="Volume"
      />
      <span class="text-xs tabular-nums min-w-10 text-muted-foreground">{{ volumePercent }}%</span>
    </div>
  </div>
</template>


