
import React, { useState } from 'react';
import { QuranReciter } from '../hooks/useAudio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface ReciterSelectorProps {
  reciters: QuranReciter[];
  currentReciter: QuranReciter | null;
  onSelectReciter: (reciter: QuranReciter) => void;
}

const ReciterSelector: React.FC<ReciterSelectorProps> = ({ reciters, currentReciter, onSelectReciter }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const filteredReciters = reciters.filter(reciter => 
    reciter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between flex-col sm:flex-row gap-3">
        <h2 className="text-xl font-medium text-primary">Quran Reciters</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search reciters..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredReciters.map((reciter) => (
          <div
            key={reciter.id}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all islamic-card ${
              currentReciter?.id === reciter.id ? 'border-primary' : 'border-transparent'
            }`}
            onClick={() => onSelectReciter(reciter)}
          >
            <Avatar className="h-12 w-12 mr-3">
              {reciter.image ? (
                <AvatarImage src={reciter.image} alt={reciter.name} />
              ) : null}
              <AvatarFallback className="bg-accent text-primary">
                <User size={18} />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{reciter.name}</h3>
              <Badge variant="secondary" className="mt-1 text-xs">
                {reciter.surahs.length} surahs
              </Badge>
            </div>
          </div>
        ))}
      </div>
      
      {filteredReciters.length === 0 && (
        <div className="text-center p-6">
          <p className="text-muted-foreground">No reciters found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default ReciterSelector;
