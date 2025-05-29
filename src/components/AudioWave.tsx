import { FC } from 'react';

export const AudioWave: FC = () => {
  // Create an array of bars with different animation delays
  const bars = Array.from({ length: 16 }, (_, i) => ({
    animationDelay: `${i * 0.1}s`,
  }));

  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {bars.map((bar, index) => (
        <div
          key={index}
          className="w-1 bg-emerald-500/70 rounded-full animate-wave"
          style={{
            animationDelay: bar.animationDelay,
            height: `${Math.max(15, Math.floor(Math.random() * 40))}px`,
          }}
        />
      ))}
    </div>
  );
}; 