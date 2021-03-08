import React from 'react';
import './App.scss';
import { WSContextProvider } from './contexts/websocket';
import Home from './pages/home/home';

function App() {
  return (
    <WSContextProvider>
        <Home/>
    </WSContextProvider>
  );
}

export default App;