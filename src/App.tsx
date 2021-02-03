import React from 'react';
import './App.css';
import RouterNavigation from './router/router';
import './../node_modules/antd/dist/antd.css'
import { WSContextProvider } from './contexts/websocket';

function App() {
  return (
    <WSContextProvider>
        <RouterNavigation />
    </WSContextProvider>
  );
}

export default App;