import React from 'react';
import './App.scss';
import { WSContextProvider } from './contexts/websocket';
import Home from './pages/home/home';

function App() {
  return (
    <div className="content-wrapper">
      <WSContextProvider>
        <Home />
      </WSContextProvider>
    </div>
  );
}

export default App;