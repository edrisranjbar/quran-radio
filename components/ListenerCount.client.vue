<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { Users } from 'lucide-vue-next'
import { io, Socket } from 'socket.io-client'
import { useI18n } from '@/composables/useI18n'

const count = ref(0)
let socket: Socket | null = null

const config = useRuntimeConfig()
const { t, isRTL } = useI18n()

onMounted(() => {
  socket = io(config.public.socketUrl)
  socket.on('listenerCount', (newCount: number) => {
    count.value = newCount
  })
})

onBeforeUnmount(() => {
  socket?.off('listenerCount')
  socket?.disconnect()
})
</script>

<template>
  <div 
    class="flex items-center text-sm text-gray-400"
    :class="isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'"
  >
    <Users class="h-4 w-4" />
    <span :class="{ 'font-arabic': isRTL }">{{ count }} {{ t.listeningNow }}</span>
  </div>
  
</template>


