
import React from 'react';
import { QuranReciter } from '../hooks/useAudio';
import { Radio, Shuffle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ReciterSelectorProps {
  reciters: QuranReciter[];
  currentReciter: QuranReciter | null;
  onSelectReciter: (reciterId: number) => void;
  onRandomReciter: () => void;
}

const ReciterSelector: React.FC<ReciterSelectorProps> = ({ 
  reciters, 
  currentReciter, 
  onSelectReciter,
  onRandomReciter
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-primary">Reciters</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={onRandomReciter}
        >
          <Shuffle size={16} />
          <span>Random</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
        {reciters.map((reciter) => (
          <div
            key={reciter.id}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all islamic-card ${
              currentReciter?.id === reciter.id ? 'border-primary bg-accent/30' : ''
            }`}
            onClick={() => onSelectReciter(reciter.id)}
          >
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center mr-3">
              <Radio size={18} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{reciter.name}</h3>
            </div>
            {currentReciter?.id === reciter.id && (
              <Badge variant="outline" className="ml-2">
                Selected
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReciterSelector;
