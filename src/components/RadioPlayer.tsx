
import React, { useState } from 'react';
import AudioControls from './AudioControls';
import RecitationsList from './RecitationsList';
import ReciterSelector from './ReciterSelector';
import useAudio from '../hooks/useAudio';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RadioPlayer: React.FC = () => {
  const {
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
    selectRandomReciter
  } = useAudio();

  const [activeTab, setActiveTab] = useState<string>("recitations");

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      {isLoading ? (
        <div className="islamic-card flex flex-col items-center justify-center p-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-foreground">Loading Quran Reciters...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Player Section */}
          <section className="islamic-card">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-medium text-primary">{reciter?.name || "Select a Reciter"}</h2>
              <p className="text-muted-foreground">
                {currentRecitation ? `Playing: ${currentRecitation.name}` : 'Select a recitation'}
              </p>
            </div>
            
            <AudioControls
              isPlaying={isPlaying}
              loading={loading}
              volume={volume}
              onPlayPause={togglePlay}
              onVolumeChange={changeVolume}
            />
          </section>
          
          {/* Tabs for Recitations and Reciters */}
          <div className="islamic-card p-4">
            <Tabs defaultValue="recitations" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full mb-4">
                <TabsTrigger value="recitations">Recitations</TabsTrigger>
                <TabsTrigger value="reciters">Reciters</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recitations">
                <RecitationsList 
                  recitations={recitations}
                  currentRecitation={currentRecitation}
                  onSelectRecitation={changeRecitation}
                />
              </TabsContent>
              
              <TabsContent value="reciters">
                <ReciterSelector 
                  reciters={reciters}
                  currentReciter={reciter}
                  onSelectReciter={changeReciter}
                  onRandomReciter={selectRandomReciter}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default RadioPlayer;
