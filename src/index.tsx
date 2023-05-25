import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './app/App';
import themes from './theme';
import { MaximaFonts, InterRegular, GlobalStyles } from './assets/fonts';
import store from './store/store';

const rootDiv = document.getElementById('root');
const rootNode = createRoot(rootDiv as Element);

rootNode.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles />
        <MaximaFonts />
        <InterRegular />
        <ThemeProvider theme={themes.light}>
          <App />
        </ThemeProvider>

      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
