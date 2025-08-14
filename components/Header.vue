<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

defineProps<{
  title: string
  description: string
}>()

const { isRTL } = useI18n()
</script>

<template>
  <header class="text-center mb-8 mt-6">
    <div class="flex items-center justify-center mb-4" :class="{ 'flex-row-reverse': isRTL }">
      <img 
        src="/quran-icon.svg" 
        alt="Quran Radio Logo" 
        class="h-8 w-8 md:h-10 md:w-10 pulse"
        :class="isRTL ? 'ml-3' : 'mr-3'"
      />
      <h1 class="text-2xl md:text-4xl font-display font-bold text-gradient" :class="{ 'font-arabic': isRTL }">
        {{ title }}
      </h1>
    </div>
    <p class="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4" :class="{ 'font-arabic': isRTL }">
      {{ description }}
    </p>
  </header>
  
</template>


