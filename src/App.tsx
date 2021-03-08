import React from 'react';
import './App.scss';
import './../node_modules/antd/dist/antd.css'
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