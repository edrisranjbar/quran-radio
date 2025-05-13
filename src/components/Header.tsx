
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-4">
      <div className="container mx-auto flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-1">
            Quran Radio
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Listen to beautiful recitations
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
