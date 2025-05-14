import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';

export interface QuranReciter {
  id: number;
  name: string;
  url: string;
  image?: string;
}

export interface QuranRecitation {
  id: number;
  name: string;
  audioUrl: string;
}

// Mock data for multiple reciters
const recitersData: QuranReciter[] = [
  {
    id: 1,
    name: "Islam Sobhi",
    url: "https://server8.mp3quran.net/islam_sobhi/001.mp3",
    image: "https://i0.wp.com/www.assabile.com/media/person/543-islam-sobhi.jpg"
  },
  {
    id: 2,
    name: "Mishary Rashid Alafasy",
    url: "https://server7.mp3quran.net/mshary/001.mp3",
    image: "https://i0.wp.com/www.assabile.com/media/person/221-mishary-rashid-al-afasy.jpg"
  },
  {
    id: 3,
    name: "Abdul Basit",
    url: "https://server7.mp3quran.net/basit/001.mp3",
    image: "https://i0.wp.com/www.assabile.com/media/person/203-abd-al-basit-abd-al-samad.jpg"
  },
  {
    id: 4,
    name: "Abu Bakr Al Shatri",
    url: "https://server8.mp3quran.net/shatri/001.mp3",
    image: "https://i0.wp.com/www.assabile.com/media/person/201-abu-bakr-al-shatri.jpg"
  },
  {
    id: 5,
    name: "Mahmoud Khalil Al-Husary",
    url: "https://server13.mp3quran.net/husr/001.mp3",
    image: "https://i0.wp.com/www.assabile.com/media/person/219-mahmud-khalil-al-husari.jpg"
  }
];

// Recitations mapping for each reciter
const recitationsMap: { [reciterId: number]: QuranRecitation[] } = {
  1: [
    { id: 1, name: "Surah Al-Fatiha", audioUrl: "https://server8.mp3quran.net/islam_sobhi/001.mp3" },
    { id: 2, name: "Surah Al-Baqarah", audioUrl: "https://server8.mp3quran.net/islam_sobhi/002.mp3" },
    { id: 3, name: "Surah Al-Imran", audioUrl: "https://server8.mp3quran.net/islam_sobhi/003.mp3" },
    { id: 4, name: "Surah An-Nisa", audioUrl: "https://server8.mp3quran.net/islam_sobhi/004.mp3" },
    { id: 5, name: "Surah Al-Ma'idah", audioUrl: "https://server8.mp3quran.net/islam_sobhi/005.mp3" },
    { id: 6, name: "Surah Al-An'am", audioUrl: "https://server8.mp3quran.net/islam_sobhi/006.mp3" },
    { id: 7, name: "Surah Al-A'raf", audioUrl: "https://server8.mp3quran.net/islam_sobhi/007.mp3" },
  ],
  2: [
    { id: 1, name: "Surah Al-Fatiha", audioUrl: "https://server7.mp3quran.net/mshary/001.mp3" },
    { id: 2, name: "Surah Al-Baqarah", audioUrl: "https://server7.mp3quran.net/mshary/002.mp3" },
    { id: 3, name: "Surah Al-Imran", audioUrl: "https://server7.mp3quran.net/mshary/003.mp3" },
    { id: 4, name: "Surah An-Nisa", audioUrl: "https://server7.mp3quran.net/mshary/004.mp3" },
  ],
  3: [
    { id: 1, name: "Surah Al-Fatiha", audioUrl: "https://server7.mp3quran.net/basit/001.mp3" },
    { id: 2, name: "Surah Al-Baqarah", audioUrl: "https://server7.mp3quran.net/basit/002.mp3" },
    { id: 3, name: "Surah Al-Imran", audioUrl: "https://server7.mp3quran.net/basit/003.mp3" },
  ],
  4: [
    { id: 1, name: "Surah Al-Fatiha", audioUrl: "https://server8.mp3quran.net/shatri/001.mp3" },
    { id: 2, name: "Surah Al-Baqarah", audioUrl: "https://server8.mp3quran.net/shatri/002.mp3" },
  ],
  5: [
    { id: 1, name: "Surah Al-Fatiha", audioUrl: "https://server13.mp3quran.net/husr/001.mp3" },
    { id: 2, name: "Surah Al-Baqarah", audioUrl: "https://server13.mp3quran.net/husr/002.mp3" },
  ]
};

const fetchReciters = async (): Promise<QuranReciter[]> => {
  // In a real app, this would be an API call
  return recitersData;
};

const useAudio = () => {
  const { data: reciters = [], isLoading } = useQuery({
    queryKey: ['reciters'],
    queryFn: fetchReciters,
  });
  
  const [currentReciterId, setCurrentReciterId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [currentRecitation, setCurrentRecitation] = useState<QuranRecitation | null>(null);
  const [recitations, setRecitations] = useState<QuranRecitation[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const reciter = reciters.find(r => r.id === currentReciterId) || null;

  // Initialize audio element and set default reciter
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      // Add event listeners
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
      
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setIsPlaying(false);
        setLoading(false);
        toast({
          title: "Playback Error",
          description: "There was an error playing this recitation. Please try another.",
          variant: "destructive"
        });
      });
    }
    
    audioRef.current.volume = volume;
    
    // Set default reciter when data is loaded
    if (reciters.length > 0 && !currentReciterId) {
      const randomIndex = Math.floor(Math.random() * reciters.length);
      const randomReciter = reciters[randomIndex];
      setCurrentReciterId(randomReciter.id);
      
      const reciterRecitations = recitationsMap[randomReciter.id] || [];
      setRecitations(reciterRecitations);
      
      if (reciterRecitations.length > 0) {
        setCurrentRecitation(reciterRecitations[0]);
        if (audioRef.current) {
          audioRef.current.src = reciterRecitations[0].audioUrl;
          audioRef.current.load();
        }
      }
    }
    
    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', () => {});
        audioRef.current.removeEventListener('error', () => {});
        audioRef.current = null;
      }
    };
  }, [reciters, currentReciterId, volume]);

  // Change reciter
  const changeReciter = (reciterId: number) => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    
    setCurrentReciterId(reciterId);
    const reciterRecitations = recitationsMap[reciterId] || [];
    setRecitations(reciterRecitations);
    
    if (reciterRecitations.length > 0) {
      setCurrentRecitation(reciterRecitations[0]);
      if (audioRef.current) {
        audioRef.current.src = reciterRecitations[0].audioUrl;
        audioRef.current.load();
      }
    }
  };

  // Change recitation
  const changeRecitation = (recitation: QuranRecitation) => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    
    setCurrentRecitation(recitation);
    if (audioRef.current) {
      audioRef.current.src = recitation.audioUrl;
      audioRef.current.load();
    }
  };

  // New functions for next and previous recitation
  const nextRecitation = () => {
    if (!currentReciterId || !currentRecitation) return;
    
    const currentIndex = recitations.findIndex(r => r.id === currentRecitation.id);
    if (currentIndex < recitations.length - 1) {
      changeRecitation(recitations[currentIndex + 1]);
    } else {
      // Wrap around to the first recitation
      changeRecitation(recitations[0]);
    }
  };

  const previousRecitation = () => {
    if (!currentReciterId || !currentRecitation) return;
    
    const currentIndex = recitations.findIndex(r => r.id === currentRecitation.id);
    if (currentIndex > 0) {
      changeRecitation(recitations[currentIndex - 1]);
    } else {
      // Wrap around to the last recitation
      changeRecitation(recitations[recitations.length - 1]);
    }
  };

  // Toggle play/pause
  const togglePlay = async () => {
    if (!audioRef.current || !currentRecitation) return;
    
    setLoading(true);
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing audio:', error);
          toast({
            title: "Playback Error",
            description: "Unable to play audio. Please try again.",
            variant: "destructive"
          });
        }
      }
    } finally {
      setLoading(false);
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

  // Select random reciter
  const selectRandomReciter = () => {
    if (reciters.length > 0) {
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      
      const randomIndex = Math.floor(Math.random() * reciters.length);
      changeReciter(reciters[randomIndex].id);
    }
  };

  return {
    reciter,
    reciters,
    isPlaying,
    volume,
    loading,
    togglePlay,
    changeVolume,
    isLoading,
    recitations,
    currentRecitation,
    changeRecitation,
    changeReciter,
    selectRandomReciter,
    nextRecitation,
    previousRecitation
  };
};

export default useAudio;
