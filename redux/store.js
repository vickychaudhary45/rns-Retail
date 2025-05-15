import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducer";
import immutableStateInvariantMiddleware from "redux-immutable-state-invariant";
const logger = (store) => (next) => (action) => {
  // console.log(`✉️ [${action.type}]`, action.payload ?? "");
  return next(action);
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: {
        isImmutable: immutableStateInvariantMiddleware,
        warnAfter: 1000,
      },
    }),
  // .concat(logger),
  devTools: true, // Enable Redux DevTools
});

store.subscribe((e) => {});

export default store;
