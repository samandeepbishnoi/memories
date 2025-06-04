import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import App from "./App";
import "./index.css";

const store = configureStore({ reducer: reducers });
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
       <App />
    </Provider>,
    
  </BrowserRouter>,
  document.getElementById("root")
);