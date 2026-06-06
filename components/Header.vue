<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

defineProps<{ title: string; description: string }>()

const { isRTL } = useI18n()
</script>

<template>
  <header class="text-center mb-10 mt-8 animate-fade-in relative">
    <!-- Status pill -->
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
      </span>
      <span>Live · On-Chain Listening</span>
    </div>

    <h1
      class="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-gradient"
      :class="{ 'font-arabic': isRTL }"
    >
      {{ title }}
    </h1>
    <p
      class="text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-muted-foreground"
      :class="{ 'font-arabic': isRTL }"
    >
      {{ description }}
    </p>
  </header>
</template>
