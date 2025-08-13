<script setup lang="ts">
import { Globe } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const { currentLanguage, setLanguage, languages } = useI18n()
</script>

<template>
  <div class="relative">
    <div class="flex items-center gap-2">
      <Globe :size="16" class="text-muted-foreground" />
      <select 
        v-model="currentLanguage" 
        @change="(e) => setLanguage(e.target.value)"
        class="bg-background text-foreground border border-border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
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
