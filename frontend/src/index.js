import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux-js/store/index";
// import { loginUser } from "./redux-js/actions/index";

ReactDOM.render(
  <Provider store={store}>
    <App ></App>
  </Provider>,
  document.getElementById('root')
);