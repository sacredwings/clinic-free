import React from 'react';
import { render } from "react-dom";
import { Provider } from 'react-redux'
//import { Store } from '@virtuous/react-store';

import Test from './js/Test';
import App from './js/App';
import reportWebVitals from './js/reportWebVitals';

import store from './js/store/index'

import 'bootstrap'; // подключаем бутстрап
import "bootstrap/dist/css/bootstrap.min.css";

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
