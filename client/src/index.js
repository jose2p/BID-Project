import React from 'react';
import ReactDOM from 'react-dom/client';
import DataProvider from '../src/components/Context/DataContext';
import ContextProvider from './components/Context/FirstContext';
import './index.css';
import App from './routes/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <ContextProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </ContextProvider>
  </React.StrictMode>
  
);
