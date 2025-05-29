import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="py-6 text-center text-gray-400 text-sm w-full">
      <div className="max-w-7xl mx-auto px-4">
        <p>© {new Date().getFullYear()} Quran Radio. All rights reserved.</p>
      </div>
    </footer>
  );
}; 