import { onMounted, onBeforeUnmount, ref, computed } from 'vue'

export interface AudioTrack {
  id: number
  title: string
  audioUrl: string
}

export interface Station {
  key: 'tahqiq' | 'tartil'
  name: string
  nameArabic: string
  namePersian: string
  description: string
  enabled: boolean
  tracks: AudioTrack[]
}

export function useAudio() {
  const stations = ref<Station[]>([
    {
      key: 'tartil',
      name: 'Tartil Station',
      nameArabic: 'إذاعة الترتيل',
      namePersian: 'ایستگاه ترتیل',
      description: 'Measured, melodious recitation for steady listening.',
      enabled: true,
      tracks: [
        { id: 3, title: '', audioUrl: '/audio/1.mp3' },
        { id: 4, title: '', audioUrl: '/audio/2.mp3' },
        { id: 5, title: '', audioUrl: '/audio/3.mp3' },
        { id: 6, title: '', audioUrl: '/audio/4.mp3' },
        { id: 7, title: '', audioUrl: '/audio/5.mp3' },
        { id: 8, title: '', audioUrl: '/audio/6.mp3' },
        { id: 9, title: '', audioUrl: '/audio/7.mp3' },
        { id: 10, title: '', audioUrl: '/audio/8.mp3' },
        { id: 11, title: '', audioUrl: '/audio/9.mp3' },
        { id: 12, title: '', audioUrl: '/audio/10.mp3' },
      ]
    },
    {
      key: 'tahqiq',
      name: 'Tahqiq Station',
      nameArabic: 'إذاعة التحقيق',
      namePersian: 'ایستگاه تحقیق',
      description: 'Slow, precise recitation for deep reflection.',
      enabled: false,
      tracks: [
        { id: 1, title: 'Surah Al-Fatiha (Tahqiq)', audioUrl: '/audio/1.mp3' },
        { id: 2, title: 'Surah Al-Baqarah (Tahqiq)', audioUrl: '/audio/2.mp3' },
      ]
    }
  ])

  const isLoading = ref(false)
  const isPlaying = ref(false)
  const volume = ref(0.7)
  const loading = ref(false)
  const currentStation = ref<Station | null>(stations.value[0] || null)
  const currentTrack = ref<AudioTrack | null>(stations.value[0]?.tracks[0] || null)
  const audioRef = ref<HTMLAudioElement | null>(null)
  const autoplayAttempted = ref(false)

  const stationTracks = computed(() => currentStation.value?.tracks ?? [])

  onMounted(() => {
    audioRef.value = new Audio()
    audioRef.value.volume = volume.value

    const handleEnded = () => {
      // Auto-advance to next track and keep playing
      next()
      if (audioRef.value && currentTrack.value) {
        audioRef.value.src = currentTrack.value.audioUrl
        audioRef.value.load()
        audioRef.value.play().catch(() => {
      isPlaying.value = false
        })
      }
    }
    const handleError = (e: Event) => {
      console.error('Audio error:', e)
      isPlaying.value = false
      loading.value = false
    }

    audioRef.value.addEventListener('ended', handleEnded)
    audioRef.value.addEventListener('error', handleError)
    
    // Autoplay the first available track
    if (currentTrack.value && !autoplayAttempted.value) {
      autoplayAttempted.value = true
      setTimeout(() => {
        togglePlay()
      }, 1000) // Small delay to ensure everything is loaded
    }

    if (currentTrack.value && audioRef.value) {
      audioRef.value.src = currentTrack.value.audioUrl
        audioRef.value.load()
    }

    onBeforeUnmount(() => {
      if (audioRef.value) {
        audioRef.value.pause()
        audioRef.value.removeEventListener('ended', handleEnded)
        audioRef.value.removeEventListener('error', handleError)
        audioRef.value = null
      }
    })
  })

  const selectStation = async (key: Station['key']) => {
    const station = stations.value.find(s => s.key === key)
    if (!station || !station.enabled) return
    currentStation.value = station
    const first = station.tracks[0]
    if (first) await changeTrack(first)
  }

  const changeTrack = async (track: AudioTrack) => {
    if (isPlaying.value && audioRef.value) {
      audioRef.value.pause()
      isPlaying.value = false
    }
    currentTrack.value = track
    if (audioRef.value) {
      audioRef.value.src = track.audioUrl
      audioRef.value.load()
    }
  }

  const next = () => {
    if (!currentTrack.value) return
    const tracks = stationTracks.value
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.value?.id)
    const nextIndex = currentIndex < tracks.length - 1 ? currentIndex + 1 : 0
    const nextTrack = tracks[nextIndex]
    if (nextTrack) changeTrack(nextTrack)
  }

  const previous = () => {
    if (!currentTrack.value) return
    const tracks = stationTracks.value
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.value?.id)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : tracks.length - 1
    const prevTrack = tracks[prevIndex]
    if (prevTrack) changeTrack(prevTrack)
  }

  const togglePlay = async () => {
    if (!audioRef.value || !currentTrack.value) return
    loading.value = true
    try {
      if (isPlaying.value) {
        audioRef.value.pause()
        isPlaying.value = false
      } else {
        await audioRef.value.play()
        isPlaying.value = true
      }
    } catch (error) {
      console.error('Error playing audio:', error)
    } finally {
      loading.value = false
    }
  }

  const changeVolume = (value: number) => {
    const newVolume = Math.max(0, Math.min(1, value))
    volume.value = newVolume
    if (audioRef.value) {
      audioRef.value.volume = newVolume
    }
  }

  return {
    // state
    isPlaying,
    volume,
    loading,
    isLoading,
    currentStation,
    currentTrack,
    stations,
    stationTracks,
    // controls
    togglePlay,
    changeVolume,
    selectStation,
    changeTrack,
    next,
    previous
  }
}


