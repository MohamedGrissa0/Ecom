import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index"
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { AuthContextProvider } from './redux/user';

ReactDOM.render(
    <AuthContextProvider>

    <Provider store={store}>  
          <App />
    </Provider>
    </AuthContextProvider>

    , document.getElementById('root')
);
