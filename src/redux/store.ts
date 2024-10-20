import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import rootReducer from "./slices/rootReducer";
import baseCreateApi from "src/api/baseCreateApi";

const persistConfig = {
  key: "root",
  version: 4,
  storage,
  whitelist: ["auth", "theme"],
};

const reducers = combineReducers({
  [baseCreateApi.reducerPath]: baseCreateApi.reducer,
  ...rootReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseCreateApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch;

export default store;
