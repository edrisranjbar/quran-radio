
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4">
      <div className="container mx-auto flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-islamic mb-2">
            Quran Radio
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Listen to beautiful recitations from around the world
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
