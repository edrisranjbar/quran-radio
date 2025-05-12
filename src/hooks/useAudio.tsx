
import { useState, useEffect, useRef } from 'react';

export interface QuranReciter {
  id: number;
  name: string;
  surahs: QuranSurah[];
  image?: string;
}

export interface QuranSurah {
  id: number;
  name: string;
  url: string;
}

const useAudio = () => {
  const [reciters, setReciters] = useState<QuranReciter[]>([
    {
      id: 1,
      name: "Sheikh Maher Al Muaiqly",
      image: "https://images.unsplash.com/photo-1618677661551-d170e1221a9f?q=80&w=200&auto=format&fit=crop",
      surahs: [
        { id: 1, name: "Al-Fatihah (The Opening)", url: "https://server8.mp3quran.net/afs/001.mp3" },
        { id: 2, name: "Al-Baqarah (The Cow)", url: "https://server8.mp3quran.net/afs/002.mp3" },
        { id: 3, name: "Al-Imran (The Family of Imran)", url: "https://server8.mp3quran.net/afs/003.mp3" },
      ]
    },
    {
      id: 2,
      name: "Sheikh Abdul Muhsin Al Qasim",
      image: "https://images.unsplash.com/photo-1618677661433-2a59e0862dc1?q=80&w=200&auto=format&fit=crop",
      surahs: [
        { id: 1, name: "Al-Fatihah (The Opening)", url: "https://server9.mp3quran.net/qasm/001.mp3" },
        { id: 2, name: "Al-Baqarah (The Cow)", url: "https://server9.mp3quran.net/qasm/002.mp3" },
        { id: 3, name: "Al-Imran (The Family of Imran)", url: "https://server9.mp3quran.net/qasm/003.mp3" },
      ]
    },
    {
      id: 3,
      name: "Sheikh Mishary Rashid Al-Afasy",
      image: "https://images.unsplash.com/photo-1618677661085-b5f03d3ae8b5?q=80&w=200&auto=format&fit=crop",
      surahs: [
        { id: 1, name: "Al-Fatihah (The Opening)", url: "https://server8.mp3quran.net/afs/001.mp3" },
        { id: 2, name: "Al-Baqarah (The Cow)", url: "https://server8.mp3quran.net/afs/002.mp3" },
        { id: 3, name: "Al-Imran (The Family of Imran)", url: "https://server8.mp3quran.net/afs/003.mp3" },
      ]
    },
    {
      id: 4,
      name: "Sheikh Abdur-Rahman As-Sudais",
      image: "https://images.unsplash.com/photo-1618677661091-e2d00d3c7769?q=80&w=200&auto=format&fit=crop",
      surahs: [
        { id: 1, name: "Al-Fatihah (The Opening)", url: "https://server11.mp3quran.net/sds/001.mp3" },
        { id: 2, name: "Al-Baqarah (The Cow)", url: "https://server11.mp3quran.net/sds/002.mp3" },
        { id: 3, name: "Al-Imran (The Family of Imran)", url: "https://server11.mp3quran.net/sds/003.mp3" },
      ]
    }
  ]);
  
  const [currentReciter, setCurrentReciter] = useState<QuranReciter | null>(null);
  const [queue, setQueue] = useState<QuranSurah[]>([]);
  const [currentSurah, setCurrentSurah] = useState<QuranSurah | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [currentSurahIndex, setCurrentSurahIndex] = useState<number>(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    // Add ended event to advance to next track
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', playNextSurah);
    }
    
    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', playNextSurah);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle reciter selection and initialize queue
  const selectReciter = (reciter: QuranReciter) => {
    setCurrentReciter(reciter);
    setQueue(reciter.surahs);
    
    if (reciter.surahs.length > 0) {
      setCurrentSurah(reciter.surahs[0]);
      setCurrentSurahIndex(0);
      loadAndPlaySurah(reciter.surahs[0]);
    }
  };

  // Load and play a specific surah
  const loadAndPlaySurah = (surah: QuranSurah) => {
    setLoading(true);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = surah.url;
      audioRef.current.load();
      
      audioRef.current.oncanplaythrough = () => {
        setLoading(false);
        if (isPlaying) {
          audioRef.current?.play().catch(error => {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
            setLoading(false);
          });
        }
      };
      
      audioRef.current.onerror = () => {
        console.error('Error loading audio');
        setIsPlaying(false);
        setLoading(false);
        playNextSurah(); // Attempt to play next surah on error
      };
      
      setCurrentSurah(surah);
      
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
          setLoading(false);
        });
      }
    }
  };

  // Play the next surah in the queue
  const playNextSurah = () => {
    if (queue.length === 0 || currentSurahIndex >= queue.length - 1) {
      // Reached the end of queue
      setCurrentSurahIndex(0);
      if (queue.length > 0) {
        loadAndPlaySurah(queue[0]);
      }
    } else {
      const nextIndex = currentSurahIndex + 1;
      setCurrentSurahIndex(nextIndex);
      loadAndPlaySurah(queue[nextIndex]);
    }
  };

  // Play the previous surah in the queue
  const playPreviousSurah = () => {
    if (queue.length === 0 || currentSurahIndex <= 0) {
      // At the beginning of queue, go to the last surah
      const lastIndex = queue.length - 1;
      setCurrentSurahIndex(lastIndex);
      loadAndPlaySurah(queue[lastIndex]);
    } else {
      const prevIndex = currentSurahIndex - 1;
      setCurrentSurahIndex(prevIndex);
      loadAndPlaySurah(queue[prevIndex]);
    }
  };

  // Play a specific surah from the queue
  const playSurah = (surah: QuranSurah) => {
    const surahIndex = queue.findIndex(item => item.id === surah.id);
    if (surahIndex !== -1) {
      setCurrentSurahIndex(surahIndex);
      loadAndPlaySurah(surah);
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (!currentSurah && currentReciter && currentReciter.surahs.length > 0) {
      setIsPlaying(true);
      loadAndPlaySurah(currentReciter.surahs[0]);
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Change volume
  const changeVolume = (value: number) => {
    const newVolume = Math.max(0, Math.min(1, value));
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return {
    reciters,
    currentReciter,
    queue,
    currentSurah,
    isPlaying,
    volume,
    loading,
    currentSurahIndex,
    selectReciter,
    togglePlay,
    changeVolume,
    playSurah,
    playNextSurah,
    playPreviousSurah
  };
};

export default useAudio;
