import { FC } from 'react';

interface HeaderProps {
  title: string;
  description: string;
}

export const Header: FC<HeaderProps> = ({ title, description }) => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <img src="quran-icon.svg" alt="Quran Radio Logo" className="h-8 w-8 md:h-10 md:w-10 mr-3 pulse" />
        <h1 className="text-2xl md:text-4xl font-bold text-gradient">
          {title}
          </h1>
      </div>
      <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
        {description}
      </p>
    </header>
  );
};
