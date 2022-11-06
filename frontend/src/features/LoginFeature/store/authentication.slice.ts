import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMainState {
  logged_in: boolean;
  loading: boolean;
  error: string;
  initialAuthenticationCheck: boolean;
}

const initialState = {
  logged_in: false,
  loading: false,
  error: "",
  initialAuthenticationCheck: false
} as IMainState;

export const loginThunk = createAsyncThunk<
  boolean,
  { username: string; password: string }
>("authentication/login", async ({ username, password }) => {
  const headers = new Headers();
  headers.append("Authorization", `Basic ${btoa(`${username}:${password}`)}`);
  const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    headers,
    method: "GET",
    credentials: "include"
  });
  const result = await response.json();
  return result && result.Authenticated === true;
});

export const sessionAuthenticatedThunk = createAsyncThunk<boolean>(
  "authentication/check",
  async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: "GET",
      credentials: "include"
    });
    return response.status !== 401;
  }
);

const mainSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.logged_in = action.payload;
      state.loading = false;
      state.error = !action.payload ? "Invalid credentials" : "";
    });
    builder.addCase(loginThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.logged_in = false;
      state.error = "request failed";
    });

    builder.addCase(sessionAuthenticatedThunk.fulfilled, (state, action) => {
      state.logged_in = action.payload;
      state.initialAuthenticationCheck = true;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(sessionAuthenticatedThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sessionAuthenticatedThunk.rejected, (state) => {
      state.loading = false;
      state.logged_in = false;
      state.error = "Could not make server http request";
    });
  },
});

export const { reducer, actions } = mainSlice;
