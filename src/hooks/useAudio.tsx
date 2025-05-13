
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

export interface QuranReciter {
  id: number;
  name: string;
  url: string;
  image?: string;
}

const fetchIslamSobhiRecitations = async (): Promise<QuranReciter> => {
  // For simplicity, we'll return a hardcoded reciter for Islam Sobhi
  return {
    id: 7, // Islam Sobhi's ID in the API
    name: "Islam Sobhi",
    url: "https://verses.quran.com/Alafasy/mp3/001.mp3", // Default to Surah Al-Fatiha
    image: "https://quran.com/images/7.jpg"
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
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    if (reciter) {
      audioRef.current.src = reciter.url;
      audioRef.current.load();
    }
    
    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [reciter]);

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
  };
};

export default useAudio;
