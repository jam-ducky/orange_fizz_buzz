import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import './GameScreen.css';

const GameScreen = ({ score, setScore, highScore, onGameOver }) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(3);
  const { isDarkMode } = useTheme();
  
  const correctSound = new Audio('/correct.mp3');
  const wrongSound = new Audio('/wrong.mp3');

  const checkAnswer = useCallback((answer) => {
    const isCorrect = (
      (currentNumber % 3 === 0 && currentNumber % 5 === 0 && answer === 'FizzBuzz') ||
      (currentNumber % 3 === 0 && currentNumber % 5 !== 0 && answer === 'Fizz') ||
      (currentNumber % 3 !== 0 && currentNumber % 5 === 0 && answer === 'Buzz') ||
      (currentNumber % 3 !== 0 && currentNumber % 5 !== 0 && answer === currentNumber.toString())
    );

    if (isCorrect) {
      correctSound.play();
      setScore(prev => prev + 1);
      setCurrentNumber(prev => prev + 1);
      setTimeLeft(3);
    } else {
      wrongSound.play();
      onGameOver(score);
    }
  }, [currentNumber, score, setScore, onGameOver]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          onGameOver(score);
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentNumber, score, onGameOver]);

  return (
    <div className={`game-screen ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="score-container">
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
      </div>
      
      <div className="timer-bar">
        <div 
          className="timer-progress" 
          style={{ width: `${(timeLeft / 3) * 100}%` }}
        />
      </div>

      <div className="number-display">{currentNumber}</div>
      
      <div className="buttons-container">
        <button onClick={() => checkAnswer('Fizz')}>Fizz</button>
        <button onClick={() => checkAnswer('Buzz')}>Buzz</button>
        <button onClick={() => checkAnswer('FizzBuzz')}>FizzBuzz</button>
        <button onClick={() => checkAnswer(currentNumber.toString())}>{currentNumber}</button>
      </div>
    </div>
  );
};

export default GameScreen;