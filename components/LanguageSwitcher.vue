<script setup lang="ts">
import { Globe } from 'lucide-vue-next'
import { watch } from 'vue'
import { useI18n, type Language } from '@/composables/useI18n'

const { currentLanguage, setLanguage, languages } = useI18n()

const handleLanguageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  setLanguage(target.value as Language)
}

// Watch for changes and update the select value
watch(currentLanguage, (newLang) => {
  console.log('Language changed to:', newLang)
})
</script>

<template>
  <div class="relative">
    <div class="flex items-center gap-2">
      <Globe :size="16" class="text-muted-foreground" />
      <select 
        :value="currentLanguage" 
        @change="handleLanguageChange"
        class="bg-background text-foreground border border-border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
      >
        <option 
          v-for="lang in languages" 
          :key="lang.code" 
          :value="lang.code"
        >
          {{ lang.nativeName }}
        </option>
      </select>
    </div>
  </div>
</template>
