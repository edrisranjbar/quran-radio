
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

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

// Mock data for Islam Sobhi's recitations
const islamSobhiRecitations: QuranRecitation[] = [
  { id: 1, name: "Surah Al-Fatiha", audioUrl: "https://server8.mp3quran.net/islam_sobhi/001.mp3" },
  { id: 2, name: "Surah Al-Baqarah", audioUrl: "https://server8.mp3quran.net/islam_sobhi/002.mp3" },
  { id: 3, name: "Surah Al-Imran", audioUrl: "https://server8.mp3quran.net/islam_sobhi/003.mp3" },
  { id: 4, name: "Surah An-Nisa", audioUrl: "https://server8.mp3quran.net/islam_sobhi/004.mp3" },
  { id: 5, name: "Surah Al-Ma'idah", audioUrl: "https://server8.mp3quran.net/islam_sobhi/005.mp3" },
  { id: 6, name: "Surah Al-An'am", audioUrl: "https://server8.mp3quran.net/islam_sobhi/006.mp3" },
  { id: 7, name: "Surah Al-A'raf", audioUrl: "https://server8.mp3quran.net/islam_sobhi/007.mp3" },
];

const fetchIslamSobhiRecitations = async (): Promise<QuranReciter> => {
  // Return a properly formed reciter object with working image URL
  return {
    id: 7,
    name: "Islam Sobhi",
    url: islamSobhiRecitations[0].audioUrl, // Default to first recitation
    image: "https://i0.wp.com/www.assabile.com/media/person/543-islam-sobhi.jpg"
  };
};

const useAudio = () => {
  const { data: reciter, isLoading } = useQuery({
    queryKey: ['islamSobhi'],
    queryFn: fetchIslamSobhiRecitations,
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [currentRecitation, setCurrentRecitation] = useState<QuranRecitation | null>(null);
  const [recitations] = useState<QuranRecitation[]>(islamSobhiRecitations);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    // Set default recitation when reciter data is available
    if (reciter && !currentRecitation) {
      setCurrentRecitation(islamSobhiRecitations[0]);
      if (audioRef.current) {
        audioRef.current.src = islamSobhiRecitations[0].audioUrl;
        audioRef.current.load();
      }
    }
    
    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [reciter, currentRecitation]);

  // Change recitation
  const changeRecitation = (recitation: QuranRecitation) => {
    setCurrentRecitation(recitation);
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.src = recitation.audioUrl;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
          });
      }
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      setLoading(true);
      
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setLoading(false);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.error('Error playing audio:', error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
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
    reciter,
    isPlaying,
    volume,
    loading,
    togglePlay,
    changeVolume,
    isLoading,
    recitations,
    currentRecitation,
    changeRecitation
  };
};

export default useAudio;
