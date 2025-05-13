
import React from 'react';
import { QuranRecitation } from '../hooks/useAudio';
import { Scroll, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RecitationsListProps {
  recitations: QuranRecitation[];
  currentRecitation: QuranRecitation | null;
  onSelectRecitation: (recitation: QuranRecitation) => void;
}

const RecitationsList: React.FC<RecitationsListProps> = ({ 
  recitations, 
  currentRecitation, 
  onSelectRecitation 
}) => {
  return (
    <div className="w-full space-y-4 mt-6">
      <h2 className="text-xl font-medium text-primary">Recitations by Islam Sobhi</h2>
      
      <div className="grid grid-cols-1 gap-2">
        {recitations.map((recitation) => (
          <div
            key={recitation.id}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all islamic-card ${
              currentRecitation?.id === recitation.id ? 'border-primary' : 'border-transparent'
            }`}
            onClick={() => onSelectRecitation(recitation)}
          >
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center mr-3">
              {currentRecitation?.id === recitation.id ? (
                <Play size={18} className="text-primary ml-1" />
              ) : (
                <Scroll size={18} className="text-primary" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{recitation.name}</h3>
            </div>
            {currentRecitation?.id === recitation.id && (
              <Badge variant="secondary" className="ml-2">
                Selected
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecitationsList;
