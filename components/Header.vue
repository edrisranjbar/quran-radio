<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

defineProps<{
  title: string
  description: string
}>()

const { isRTL } = useI18n()
</script>

<template>
  <header class="text-center mb-8">
    <div class="flex items-center justify-center mb-4">
      <img src="/quran-icon.svg" alt="Quran Radio Logo" class="h-8 w-8 md:h-10 md:w-10 mr-3 pulse mt-6" />
      <h1 class="text-2xl md:text-4xl font-display font-bold text-gradient" :class="{ 'font-arabic': isRTL }">
        {{ title }}
      </h1>
    </div>
    <p class="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
      {{ description }}
    </p>
  </header>
  
</template>


