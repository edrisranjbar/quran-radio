<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { Users } from 'lucide-vue-next'
import { io, Socket } from 'socket.io-client'

const count = ref(0)
let socket: Socket | null = null

const config = useRuntimeConfig()

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
  <div class="flex items-center space-x-2 text-sm text-gray-400">
    <Users class="h-4 w-4" />
    <span>{{ count }} listening now</span>
  </div>
  
</template>


