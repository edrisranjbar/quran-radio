<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <div class="min-h-dvh islamic-pattern">
    <div class="max-w-4xl mx-auto py-4 px-4">
      <Header title="Quran Radio" description="Stream beautiful Quran recitations online with Tahqiq and Tartil stations" />
      <RadioPlayer />
      <footer class="mt-8 text-center text-xs text-muted-foreground pb-4">
        <p>© {{ year }} Quran Radio - Peace and blessings</p>
      </footer>
    </div>
  </div>
</template>

