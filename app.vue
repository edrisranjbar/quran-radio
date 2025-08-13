<script setup lang="ts">
useHead({
  htmlAttrs: { class: 'dark' }
})
</script>

<template>
  <div class="min-h-dvh bg-background text-foreground">
    <NuxtLoadingIndicator />
    <NuxtPage />
  </div>
</template>


