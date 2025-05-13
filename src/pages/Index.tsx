
import React from 'react';
import Header from '../components/Header';
import RadioPlayer from '../components/RadioPlayer';
import { ThemeProvider } from 'next-themes';

const Index: React.FC = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background islamic-pattern">
        <div className="max-w-4xl mx-auto py-4 px-4">
          <Header />
          <RadioPlayer />
          <footer className="mt-8 text-center text-xs text-muted-foreground pb-4">
            <p>© {new Date().getFullYear()} Quran Radio - Peace and blessings</p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
