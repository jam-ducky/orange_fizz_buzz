import React, { useState, useEffect } from 'react';
import { useBedrockPassport } from "@bedrock_org/passport";
import './App.css';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const { isLoggedIn } = useBedrockPassport();

  useEffect(() => {
    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const handleGameStart = () => {
    if (isLoggedIn) {
      setGameStarted(true);
      setScore(0);
    }
  };

  const handleGameOver = (finalScore) => {
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('highScore', finalScore);
    }
    setGameStarted(false);
  };

  return (
    <ThemeProvider>
      <div className="App">
        {!gameStarted ? (
          <StartScreen onStart={handleGameStart} highScore={highScore} />
        ) : (
          <GameScreen 
            score={score} 
            setScore={setScore} 
            highScore={highScore}
            onGameOver={handleGameOver}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;