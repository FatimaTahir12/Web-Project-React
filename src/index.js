import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {SpeechProvider} from '@speechly/react-client';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Monthly from './pages/Monthly'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <SpeechProvider appId='06a8c019-0238-475d-8874-038468f6d31e' language='en-US' >
 
{ <BrowserRouter>
    <App />
</BrowserRouter>} 
  </SpeechProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
