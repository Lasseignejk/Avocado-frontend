import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { store } from "./components/reducers/store";
import { createStore, compose, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import rootReducer from "../src/components/reducers/DashboardSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store2 = createStore(
  persistedReducer,
  compose(
    applyMiddleware(reduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

let persistor = persistStore(store2);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store2}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
