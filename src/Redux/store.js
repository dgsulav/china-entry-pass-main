import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import rootReducer from "./index";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const middleware = [thunk];
const initialState = {};
const persistConfig = {
  key: "entryPass",
  storage: storage,
  whitelist: ["auth", "sidebar"],
};

const reducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  reducer,
  initialState,
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware)
);
const persistor = persistStore(store);
export { store, persistor };
// export {store}
