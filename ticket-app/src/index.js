import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
window.React1 = import('react');

const dom = document.getElementById("root");
const root =  createRoot(dom);
root.render(
  <React.StrictMode>
    <App/>
   </React.StrictMode>,
    
);