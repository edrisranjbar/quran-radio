
import React from 'react';
import Header from '../components/Header';
import RadioPlayer from '../components/RadioPlayer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-islamic-light islamic-pattern">
      <div className="max-w-5xl mx-auto py-8">
        <Header />
        <RadioPlayer />
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Quran Radio - Peace and blessings</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
