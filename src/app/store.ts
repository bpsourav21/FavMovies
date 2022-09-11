import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { commonReducer } from "./reducers/commonReducer";
import { movieReducer } from "./reducers/movieReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,
    movie: movieReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
