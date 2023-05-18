import React from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './app/App';
import themes from './theme';
import { MaximaFonts, InterRegular, GlobalStyles } from './assets/fonts';

const rootDiv = document.getElementById('root');
const rootNode = createRoot(rootDiv as Element);

rootNode.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <MaximaFonts />
      <InterRegular />
      <ThemeProvider theme={themes.light}>
        <App />
      </ThemeProvider>

    </BrowserRouter>
  </React.StrictMode>,
);
