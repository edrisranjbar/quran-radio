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
  <div class="flex items-center text-sm text-gray-400 gap-2">
    <template v-if="!isRTL">
      <Users class="h-4 w-4" />
      <span>{{ count }} {{ t.listeningNow }}</span>
    </template>
    <template v-else>
      <span class="font-arabic">{{ count }} {{ t.listeningNow }}</span>
      <Users class="h-4 w-4" />
    </template>
  </div>
  
</template>


