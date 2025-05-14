import React from 'react';
import ReactDOM from 'react-dom/client';
import { BedrockPassportProvider } from "@bedrock_org/passport";
import './App.css';
import AppRouter from './AppRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BedrockPassportProvider
      baseUrl="https://api.bedrockpassport.com"
      authCallbackUrl="http://localhost:3000/auth/callback"
      tenantId="orange-ubvycb0q92"
      subscriptionKey="7fdf2694e1c240f0af16447aee78b2f7"
    >
      <AppRouter />
    </BedrockPassportProvider>
  </React.StrictMode>
);