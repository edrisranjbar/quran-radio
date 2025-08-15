<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const year = new Date().getFullYear()
const { t } = useI18n()
</script>

<template>
  <div class="min-h-dvh islamic-pattern">
    <div class="max-w-4xl mx-auto py-4 px-4">
      <Header :title="t.title" :description="t.description" />
      <RadioPlayer />
      <PWAInstall />
      <footer class="mt-8 text-center text-xs text-muted-foreground pb-4 space-y-2">
        <p>© {{ year }} {{ t.title }} - {{ t.footerText }}</p>
        <div class="flex items-center justify-center gap-4">
          <a 
            href="https://github.com/edrisranjbar/quran-radio" 
            target="_blank" 
            rel="noopener noreferrer"
            class="hover:text-primary transition-colors"
          >
            {{ t.github }}
          </a>
          <span>•</span>
          <a 
            href="https://edrisranjbar.ir/donation" 
            target="_blank" 
            rel="noopener noreferrer"
            class="hover:text-primary transition-colors"
          >
            {{ t.donate }}
          </a>
          <span>•</span>
          <a 
            href="mailto:edrisranjbar.dev@gmail.com"
            class="hover:text-primary transition-colors"
          >
            {{ t.contact }}
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>

