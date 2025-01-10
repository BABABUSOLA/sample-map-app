import React, { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";

export default function RangeInput({
  min = 0,
  max = 100,
  value = [0, 100],
  animationSpeed,
  onChange,
  formatLabel,
}: {
  min: number;
  max: number;
  value: [start: number, end: number];
  animationSpeed: number;
  onChange: (value: [start: number, end: number]) => void;
  formatLabel: (value: number) => string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationId, setAnimationId] = useState<number | null>(null);

  // Fallback for invalid value
  const safeValue = [
    isNaN(value[0]) ? min : value[0],
    isNaN(value[1]) ? max : value[1],
  ];

  useEffect(() => {
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [animationId]);

  useEffect(() => {
    if (isPlaying && !animationId) {
      const span = safeValue[1] - safeValue[0];
      let nextValueMin = safeValue[0] + animationSpeed;

      if (nextValueMin + span >= max) {
        nextValueMin = min;
      }

      const id = requestAnimationFrame(() => {
        setAnimationId(null);
        onChange([nextValueMin, nextValueMin + span]);
      });

      setAnimationId(id);
    }
  }, [isPlaying, safeValue, animationSpeed, max, min, onChange, animationId]);

  const isButtonEnabled = safeValue[0] > min || safeValue[1] < max;

  return (
    <div className="absolute z-10 bottom-10 w-full flex justify-center items-center space-x-4">
      <button
        className={`p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-opacity ${
          !isButtonEnabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!isButtonEnabled}
        onClick={() => setIsPlaying(!isPlaying)}
        title={isPlaying ? "Stop Animation" : "Start Animation"}
      >
        {isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6" />
        )}
      </button>

      <div className="flex flex-col w-2/5">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-700">
            {formatLabel(safeValue[0])}
          </span>
          <span className="text-sm text-gray-700">
            {formatLabel(safeValue[1])}
          </span>
        </div>

        <div className="relative h-2 bg-gray-200 rounded-lg">
          <div
            className="absolute h-2 bg-blue-500 rounded-lg"
            style={{
              left: `${((safeValue[0] - min) / (max - min)) * 100}%`,
              width: `${((safeValue[1] - safeValue[0]) / (max - min)) * 100}%`,
            }}
          ></div>

          <input
            type="range"
            min={min}
            max={max}
            value={safeValue[0]}
            onChange={(e) => {
              const newMin = Number(e.target.value);
              if (newMin <= safeValue[1]) {
                onChange([newMin, safeValue[1]]);
              }
            }}
            className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none"
          />

          <input
            type="range"
            min={min}
            max={max}
            value={safeValue[1]}
            onChange={(e) => {
              const newMax = Number(e.target.value);
              if (newMax >= safeValue[0]) {
                onChange([safeValue[0], newMax]);
              }
            }}
            className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
