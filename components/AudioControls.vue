<script setup lang="ts">
import { computed } from 'vue'
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const props = defineProps<{ isPlaying: boolean; loading: boolean; volume: number }>()
const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'volume', value: number): void
  (e: 'previous'): void
  (e: 'next'): void
}>()

const isMuted = computed(() => props.volume === 0)
const volumePercent = computed(() => Math.round(props.volume * 100))
const { t } = useI18n()

function toggleMute() { emit('volume', props.volume > 0 ? 0 : 0.7) }
function onInput(e: Event) { emit('volume', Number((e.target as HTMLInputElement).value)) }
</script>

<template>
  <div class="flex flex-col items-center w-full space-y-8">
    <!-- Play Controls -->
    <div class="flex items-center justify-center gap-5">
      <button
        @click="emit('previous')"
        class="group relative flex items-center justify-center h-12 w-12 rounded-full glass hover:scale-105 transition-all"
        :disabled="props.loading"
        :title="t.previous"
      >
        <SkipBack :size="18" class="text-foreground/80 group-hover:text-primary transition-colors" />
      </button>

      <button
        @click="emit('toggle')"
        class="group relative flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-primary via-accent to-secondary text-primary-foreground animate-pulse-glow hover:scale-105 active:scale-95 transition-transform"
        :disabled="props.loading"
      >
        <div v-if="props.loading" class="h-6 w-6 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
        <Pause v-else-if="props.isPlaying" :size="32" :stroke-width="2.5" />
        <Play v-else :size="32" :stroke-width="2.5" class="ml-1" />
      </button>

      <button
        @click="emit('next')"
        class="group relative flex items-center justify-center h-12 w-12 rounded-full glass hover:scale-105 transition-all"
        :disabled="props.loading"
        :title="t.next"
      >
        <SkipForward :size="18" class="text-foreground/80 group-hover:text-primary transition-colors" />
      </button>
    </div>

    <!-- Volume -->
    <div class="flex items-center gap-3 w-full max-w-xs">
      <button
        class="text-foreground/70 hover:text-primary transition-colors"
        @click="toggleMute"
        :aria-label="t.toggleMute"
      >
        <VolumeX v-if="isMuted" :size="18" />
        <Volume2 v-else :size="18" />
      </button>
      <input
        id="volume"
        class="flex-1"
        type="range" min="0" max="1" step="0.01"
        :value="props.volume" @input="onInput"
        :aria-label="t.volume"
      />
      <span class="mono text-[10px] tabular-nums min-w-[3ch] text-muted-foreground tracking-wider">{{ volumePercent }}%</span>
    </div>
  </div>
</template>
