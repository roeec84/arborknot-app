import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "@arborknot/design-system-v2/dist/bundle.css";
import "@arborknot/design-system-v2/dist/components.css";
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
