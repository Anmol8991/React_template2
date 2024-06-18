import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { UserContextProvider } from "./context/UserContext";
import { DataContextProvider } from "./context/DataContext";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={configureStore({})}>
      <BrowserRouter>
        <UserContextProvider>
          <DataContextProvider>
            <App />
          </DataContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </Provider>
  </>
);
