
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

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

interface TVQuranReciter {
  id: string;
  name: string;
  relative_path: string;
  server: string;
  suras: string;
  count: string;
  description: string;
  letter: string;
  bio: string;
  style: string;
}

interface TVQuranSurahName {
  id: string;
  name: string;
}

const fetchReciters = async (): Promise<QuranReciter[]> => {
  try {
    // Fetch reciters list from TVQuran API
    const recitersResponse = await fetch('https://api.quran.com/api/v4/resources/recitations');
    const recitersData = await recitersResponse.json();
    
    // Fetch surah names
    const surahsResponse = await fetch('https://api.quran.com/api/v4/chapters?language=en');
    const surahsData = await surahsResponse.json();
    const surahNames: TVQuranSurahName[] = surahsData.chapters;

    // Process and format the data
    const processedReciters: QuranReciter[] = recitersData.recitations
      .slice(0, 10) // Limit to 10 reciters to avoid overwhelming the UI
      .map((reciter: any, index: number) => {
        // Generate surahs for each reciter
        const surahs: QuranSurah[] = surahNames
          .slice(0, 10) // Limit to first 10 surahs for simplicity
          .map((surah: any) => {
            // Format surah number with leading zeros
            const surahId = surah.id.toString().padStart(3, '0');
            return {
              id: parseInt(surah.id),
              name: surah.name_simple,
              url: `https://verses.quran.com/${reciter.id}/${surahId}.mp3`
            };
          });

        return {
          id: parseInt(reciter.id),
          name: reciter.reciter_name_eng || reciter.reciter_name,
          image: `https://quran.com/images/${reciter.id}.jpg`,  // Use generic image path
          surahs: surahs
        };
      });

    return processedReciters;
  } catch (error) {
    console.error("Error fetching TVQuran reciters:", error);
    return []; // Return empty array on error
  }
};

const useAudio = () => {
  const { data: reciters = [], isLoading } = useQuery({
    queryKey: ['reciters'],
    queryFn: fetchReciters,
  });
  
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
    playPreviousSurah,
    isLoading,
  };
};

export default useAudio;
