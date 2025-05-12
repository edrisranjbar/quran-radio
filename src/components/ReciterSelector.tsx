
import React from 'react';
import { QuranReciter } from '../hooks/useAudio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ReciterSelectorProps {
  reciters: QuranReciter[];
  currentReciter: QuranReciter | null;
  onSelectReciter: (reciter: QuranReciter) => void;
}

const ReciterSelector: React.FC<ReciterSelectorProps> = ({ reciters, currentReciter, onSelectReciter }) => {
  const [open, setOpen] = React.useState(false);
  
  const handleSelectReciter = (reciter: QuranReciter) => {
    onSelectReciter(reciter);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 border-islamic/20 hover:border-islamic">
          <Avatar className="h-8 w-8">
            {currentReciter?.image ? (
              <AvatarImage src={currentReciter.image} alt={currentReciter?.name || "Reciter"} />
            ) : null}
            <AvatarFallback className="bg-islamic/10 text-islamic">
              <User size={16} />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">
            {currentReciter ? currentReciter.name : "Choose Reciter"}
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
          {reciters.map((reciter) => (
            <div
              key={reciter.id}
              className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-accent ${
                currentReciter?.id === reciter.id ? 'bg-accent/50 border border-islamic/40' : ''
              }`}
              onClick={() => handleSelectReciter(reciter)}
            >
              <Avatar className="h-16 w-16 mr-4">
                {reciter.image ? (
                  <AvatarImage src={reciter.image} alt={reciter.name} />
                ) : null}
                <AvatarFallback className="bg-islamic/10 text-islamic">
                  <User size={24} />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{reciter.name}</h3>
                <p className="text-sm text-muted-foreground">{reciter.surahs.length} surahs available</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReciterSelector;
