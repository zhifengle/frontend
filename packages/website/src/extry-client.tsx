import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import 'reset-css';
import './index.css';
import { SWRConfig } from 'swr';
import React from 'react';

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <SWRConfig
    value={{
      refreshWhenHidden: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SWRConfig>
);
