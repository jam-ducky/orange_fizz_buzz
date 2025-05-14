import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useBedrockPassport } from "@bedrock_org/passport";
import './StartScreen.css';

const StartScreen = ({ onStart, highScore }) => {
  const { isDarkMode } = useTheme();
  const { signIn, connectWallet, isLoggedIn } = useBedrockPassport();

  const handleGoogleLogin = async () => {
    try {
      await signIn('google');
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      await signIn('apple');
    } catch (error) {
      console.error('Apple login failed:', error);
    }
  };

  const handleWalletConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  return (
    <div className={`start-screen ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="game-card">
        <div className="logo-container">
          <img 
            src="https://irp.cdn-website.com/e81c109a/dms3rep/multi/orange-web3-logo-v2a-20241018.svg"
            alt="Orange"
            className="orange-logo"
          />
        </div>
        <h1>FizzBuzz Challenge</h1>
        
        <div className="rules-container">
          <h2>How to Play :</h2>
          <div className="rule-item">Click "Fizz" for numbers divisible by 3</div>
          <div className="rule-item">Click "Buzz" for numbers divisible by 5</div>
          <div className="rule-item">Click "FizzBuzz" for numbers divisible by both 3 and 5</div>
          <div className="rule-item">Click the number if none of the above apply</div>
        </div>
        
        <div className="score-display">High Score: {highScore}</div>
        
        {isLoggedIn ? (
          <button className="play-button" onClick={onStart}>
            <i className="fas fa-play"></i>
            Play Now!
          </button>
        ) : (
          <>
            <button className="auth-button google" onClick={handleGoogleLogin}>
              <i className="fab fa-google"></i>
              google
            </button>
            <button className="auth-button apple" onClick={handleAppleLogin}>
              <i className="fab fa-apple"></i>
              Apple
            </button>
            <button className="auth-button connect-wallet" onClick={handleWalletConnect}>
              <i className="fas fa-wallet"></i>
              connect wallet
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default StartScreen;