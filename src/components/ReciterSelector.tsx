
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-islamic">Quran Reciters</h2>
        <div className="relative w-64">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReciters.map((reciter) => (
          <div
            key={reciter.id}
            className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md islamic-card ${
              currentReciter?.id === reciter.id ? 'border-islamic border-2' : ''
            }`}
            onClick={() => onSelectReciter(reciter)}
          >
            <Avatar className="h-16 w-16 mr-4 border-2 border-islamic/10">
              {reciter.image ? (
                <AvatarImage src={reciter.image} alt={reciter.name} />
              ) : null}
              <AvatarFallback className="bg-islamic/10 text-islamic">
                <User size={24} />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-lg">{reciter.name}</h3>
              <div className="flex items-center mt-1">
                <Badge variant="secondary" className="bg-islamic/10 text-islamic border-none">
                  {reciter.surahs.length} surahs
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredReciters.length === 0 && (
        <div className="text-center p-8">
          <p className="text-muted-foreground">No reciters found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default ReciterSelector;
