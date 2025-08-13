<script setup lang="ts">
const bars = Array.from({ length: 16 }, (_, i) => ({
  animationDelay: `${i * 0.1}s`
}))
</script>

<template>
  <div class="flex items-center justify-center gap-1 h-16">
    <div
      v-for="(bar, index) in bars"
      :key="index"
      class="w-1 bg-emerald-500/70 rounded-full animate-wave"
      :style="{ animationDelay: bar.animationDelay, height: `${Math.max(15, Math.floor(Math.random() * 40))}px` }"
    />
  </div>
</template>


