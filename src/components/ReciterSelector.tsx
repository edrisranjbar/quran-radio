
import React from 'react';
import { RadioStation } from '../hooks/useAudio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Radio } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ReciterSelectorProps {
  stations: RadioStation[];
  currentStation: RadioStation | null;
  onSelectStation: (station: RadioStation) => void;
}

const ReciterSelector: React.FC<ReciterSelectorProps> = ({ stations, currentStation, onSelectStation }) => {
  const [open, setOpen] = React.useState(false);
  
  const handleSelectReciter = (station: RadioStation) => {
    onSelectStation(station);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 border-islamic/20 hover:border-islamic">
          <Avatar className="h-8 w-8">
            {currentStation?.reciterImage ? (
              <AvatarImage src={currentStation.reciterImage} alt={currentStation?.reciter || "Reciter"} />
            ) : null}
            <AvatarFallback className="bg-islamic/10 text-islamic">
              <Radio size={16} />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">
            {currentStation ? currentStation.reciter : "Choose Reciter"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Reciter</DialogTitle>
          <DialogDescription>
            Select your preferred Quran reciter below
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {stations.map((station) => (
            <div
              key={station.id}
              className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-accent ${
                currentStation?.id === station.id ? 'bg-accent/50 border border-islamic/40' : ''
              }`}
              onClick={() => handleSelectReciter(station)}
            >
              <Avatar className="h-16 w-16 mr-4">
                {station.reciterImage ? (
                  <AvatarImage src={station.reciterImage} alt={station.reciter} />
                ) : null}
                <AvatarFallback className="bg-islamic/10 text-islamic">
                  <Radio size={24} />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{station.reciter}</h3>
                <p className="text-sm text-muted-foreground">{station.name}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReciterSelector;
