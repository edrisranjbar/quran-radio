
import React from 'react';
import { QuranRecitation } from '../hooks/useAudio';
import { Play, List } from 'lucide-react';
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
  if (recitations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Select a reciter to view recitations</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Available Recitations</h3>
      
      <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
        {recitations.map((recitation) => (
          <div
            key={recitation.id}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all islamic-card ${
              currentRecitation?.id === recitation.id ? 'border-primary bg-accent/30' : ''
            }`}
            onClick={() => onSelectRecitation(recitation)}
          >
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center mr-3">
              {currentRecitation?.id === recitation.id ? (
                <Play size={18} className="text-primary ml-1" />
              ) : (
                <List size={18} className="text-primary" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{recitation.name}</h3>
            </div>
            {currentRecitation?.id === recitation.id && (
              <Badge variant="outline" className="ml-2">
                Playing
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecitationsList;
