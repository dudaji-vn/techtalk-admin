import React, { useState, useEffect } from 'react';

interface TimedProgressBarProps {
  time: number;
}

const ProgressBar: React.FC<TimedProgressBarProps> = ({ time }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    const animateProgress = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsedTime = timestamp - startTime;
      const calculatedProgress = Math.min((elapsedTime / time) * 100, 100);

      setProgress(calculatedProgress);

      if (calculatedProgress < 100) {
        requestAnimationFrame(animateProgress);
      }
    };

    requestAnimationFrame(animateProgress);

    return () => {
      startTime = null;
    };
  }, [time]);

  return (
    <div className="w-3/4 mx-auto my-8 bg-error border border-gray-300 rounded overflow-hidden h-6">
      <div
        className="h-full bg-error text-white text-center leading-6 transition-width duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      >
        {progress.toFixed(2)}%
      </div>
    </div>
  );
};

export default ProgressBar;
