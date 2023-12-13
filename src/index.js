import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import appStore from './redux/appStore';

import './assets/css/bootstrap.css';
import './assets/css/index.scss';
// theme
import 'primereact/resources/themes/lara-light-indigo/theme.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'primeicons/primeicons.css';

// core
import 'primereact/resources/primereact.min.css';
import App from './App';

import reportWebVitals from './reportWebVitals';

const { store, persistor } = appStore;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div className="p-40"><center>Loading...</center></div>} persistor={persistor}>
      <BrowserRouter>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>

      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
