<script setup lang="ts">
defineProps<{ active?: boolean }>()
const bars = Array.from({ length: 32 }, (_, i) => ({
  delay: `${(i % 8) * 0.08}s`,
  height: `${20 + ((i * 17) % 60)}%`
}))
</script>

<template>
  <div class="flex items-center justify-center gap-[3px] h-16 w-full">
    <div
      v-for="(bar, i) in bars"
      :key="i"
      class="w-[3px] rounded-full bg-gradient-to-t from-primary via-accent to-secondary"
      :class="active ? 'animate-wave' : 'opacity-30'"
      :style="{ animationDelay: bar.delay, height: bar.height }"
    />
  </div>
</template>
