import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App/App';
import store from './store/index.js';
import { ChakraProvider } from '@chakra-ui/provider';
import theme from './theme';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Could not find root element');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </Provider>,
);
