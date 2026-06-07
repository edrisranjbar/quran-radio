<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { Users } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const { t, isRTL } = useI18n()

// Simulated live listener count (no backend available in this environment)
const count = ref(0)
let interval: ReturnType<typeof setInterval> | null = null

const randomBase = () => 120 + Math.floor(Math.random() * 180)

onMounted(() => {
  count.value = randomBase()
  interval = setInterval(() => {
    const delta = Math.floor(Math.random() * 11) - 5
    count.value = Math.max(42, count.value + delta)
  }, 4000)
})

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 mono text-[10px] tracking-[0.2em] uppercase text-accent">
    <template v-if="!isRTL">
      <Users :size="12" />
      <span>{{ count.toLocaleString() }} {{ t.listeningNow }}</span>
    </template>
    <template v-else>
      <span class="font-arabic">{{ count.toLocaleString() }} {{ t.listeningNow }}</span>
      <Users :size="12" />
    </template>
  </div>
</template>
