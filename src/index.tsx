import React from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';

import { MaximaFonts, InterRegular, GlobalStyles } from './assets/fonts';

const rootDiv = document.getElementById('root');
const rootNode = createRoot(rootDiv as Element);

rootNode.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <MaximaFonts />
      <InterRegular />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
