"use client";
import { Rubik_Wet_Paint } from "next/font/google";
import { useEffect, useState } from "react";

export function BreatheAnimation() {
  const [timerMs, setTimerMs] = useState(0);
  const [isInhaling, setIsInhaling] = useState(true);
  const inhaleBreathLength = 5500;
  const exhaleBreathLength = 6500;
  const currentBreathLength = isInhaling ? inhaleBreathLength : exhaleBreathLength;

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerMs >= currentBreathLength) {
        setIsInhaling(!isInhaling);
        setTimerMs(0);
      } else {
        setTimerMs(timerMs + 100);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [timerMs]);

  const percentage = timerMs / currentBreathLength;


  const redIntensity = isInhaling ? percentage * 0.5 : (1 - percentage);
  const blueIntensity = isInhaling ? 1 - percentage : percentage;
  const greenIntensity = isInhaling ? 1 - percentage : percentage;

  const intensity = isInhaling ? percentage : (1 - percentage);

  const red = Math.floor(150 * redIntensity);
  const green = Math.floor(0 + 10 * greenIntensity);
  const blue = Math.floor(215 * blueIntensity + 40);
  console.log(red, green, blue);

  // Display a number that counts from 1 to 5
  const count = (Math.ceil(percentage * 5) || 1).toString();

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <div style={{
        backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        opacity: 0.2 + (intensity * 0.4),
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        transition: 'background-color 100ms, opacity 100ms',
      }}></div>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '2rem',
        color: 'white',
      }}>
        <p>
          {isInhaling ? 'Inhale' : 'Exhale'} {count.toString()}
        </p>
      </div>
    </div>
  );
}

