import React from "react";
import App from "./App.jsx";
import { store } from "./store";
import "./assets/styles/index.scss";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
