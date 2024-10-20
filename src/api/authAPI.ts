import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.error = null;
    },
    logout(state) {
      state.token = null;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    refreshToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { loginSuccess, logout, loginFailure, refreshToken } =
  authSlice.actions;

export default authSlice.reducer;
