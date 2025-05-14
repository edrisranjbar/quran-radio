
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';

export interface QuranRecitation {
  id: number;
  name: string;
  audioUrl: string;
}

// Default reciter's recitations
const recitations: QuranRecitation[] = [
  { id: 1, name: "Surah Al-Fatiha", audioUrl: "https://server8.mp3quran.net/islam_sobhi/001.mp3" },
  { id: 2, name: "Surah Al-Baqarah", audioUrl: "https://server8.mp3quran.net/islam_sobhi/002.mp3" },
  { id: 3, name: "Surah Al-Imran", audioUrl: "https://server8.mp3quran.net/islam_sobhi/003.mp3" },
  { id: 4, name: "Surah An-Nisa", audioUrl: "https://server8.mp3quran.net/islam_sobhi/004.mp3" },
  { id: 5, name: "Surah Al-Ma'idah", audioUrl: "https://server8.mp3quran.net/islam_sobhi/005.mp3" },
  { id: 6, name: "Surah Al-An'am", audioUrl: "https://server8.mp3quran.net/islam_sobhi/006.mp3" },
  { id: 7, name: "Surah Al-A'raf", audioUrl: "https://server8.mp3quran.net/islam_sobhi/007.mp3" },
];

const fetchRecitations = async (): Promise<QuranRecitation[]> => {
  // In a real app, this would be an API call
  return recitations;
};

const useAudio = () => {
  const { data: availableRecitations = [], isLoading } = useQuery({
    queryKey: ['recitations'],
    queryFn: fetchRecitations,
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [currentRecitation, setCurrentRecitation] = useState<QuranRecitation | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element and set default recitation
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
    
    // Set default recitation when data is loaded
    if (availableRecitations.length > 0 && !currentRecitation) {
      const defaultRecitation = availableRecitations[0];
      setCurrentRecitation(defaultRecitation);
      if (audioRef.current) {
        audioRef.current.src = defaultRecitation.audioUrl;
        audioRef.current.load();
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
  }, [availableRecitations, currentRecitation, volume]);

  // Change recitation
  const changeRecitation = async (recitation: QuranRecitation) => {
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

  // Next and previous recitation functions
  const nextRecitation = () => {
    if (!currentRecitation) return;
    
    const currentIndex = availableRecitations.findIndex(r => r.id === currentRecitation.id);
    if (currentIndex < availableRecitations.length - 1) {
      changeRecitation(availableRecitations[currentIndex + 1]);
    } else {
      // Wrap around to the first recitation
      changeRecitation(availableRecitations[0]);
    }
  };

  const previousRecitation = () => {
    if (!currentRecitation) return;
    
    const currentIndex = availableRecitations.findIndex(r => r.id === currentRecitation.id);
    if (currentIndex > 0) {
      changeRecitation(availableRecitations[currentIndex - 1]);
    } else {
      // Wrap around to the last recitation
      changeRecitation(availableRecitations[availableRecitations.length - 1]);
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

  return {
    isPlaying,
    volume,
    loading,
    togglePlay,
    changeVolume,
    isLoading,
    recitations: availableRecitations,
    currentRecitation,
    changeRecitation,
    nextRecitation,
    previousRecitation
  };
};

export default useAudio;
