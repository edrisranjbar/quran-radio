
import { useState, useEffect, useRef } from 'react';

export interface RadioStation {
  id: number;
  name: string;
  reciter: string;
  url: string;
  language: string;
}

const useAudio = () => {
  const [stations, setStations] = useState<RadioStation[]>([
    {
      id: 1,
      name: "Quran Makkah",
      reciter: "Sheikh Maher Al Muaiqly",
      url: "https://stream.radiojar.com/0tpy1h0kxtzuv",
      language: "Arabic"
    },
    {
      id: 2,
      name: "Quran Madinah",
      reciter: "Sheikh Abdul Muhsin Al Qasim",
      url: "https://n12.radiojar.com/2uh8ygneetzuv?rj-ttl=5&rj-tok=AAABi14hLYUA_d69Fi-mcn5n1w",
      language: "Arabic"
    },
    {
      id: 3,
      name: "Holy Quran Radio",
      reciter: "Various Reciters",
      url: "https://stream.radiojar.com/0tpy1h0kxtzuv",
      language: "Arabic"
    },
    {
      id: 4,
      name: "Quran Recitation",
      reciter: "Sheikh Mishary Rashid Al-Afasy",
      url: "https://stream.radiojar.com/0tpy1h0kxtzuv",
      language: "Arabic"
    },
    {
      id: 5,
      name: "Radio Quran Kareem",
      reciter: "Various Reciters",
      url: "https://stream.radiojar.com/0tpy1h0kxtzuv",
      language: "Arabic"
    }
  ]);

  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [loading, setLoading] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle station change
  const playStation = (station: RadioStation) => {
    setLoading(true);
    
    if (audioRef.current) {
      // Stop current audio if playing
      audioRef.current.pause();
      
      // Set new source
      audioRef.current.src = station.url;
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
      
      // Error handling
      audioRef.current.onerror = () => {
        console.error('Error loading audio');
        setIsPlaying(false);
        setLoading(false);
      };
      
      setCurrentStation(station);
      
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
          setLoading(false);
        });
      }
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (!currentStation) {
      if (stations.length > 0) {
        setIsPlaying(true);
        playStation(stations[0]);
      }
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
    stations,
    currentStation,
    isPlaying,
    volume,
    loading,
    playStation,
    togglePlay,
    changeVolume,
  };
};

export default useAudio;
