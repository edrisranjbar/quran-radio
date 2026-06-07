<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

defineProps<{ title: string; description: string }>()

const { isRTL } = useI18n()
</script>

<template>
  <header class="text-center mb-10 mt-8 animate-fade-in relative">

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
