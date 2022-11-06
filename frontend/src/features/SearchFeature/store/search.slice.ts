import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ISearchResult from "../../../models/ISearchResult";
import IApiRequest from "../../../models/IAPIRequest";
import IApiResponse from "../../../models/IAPIResponse";

interface ISearchState {
  movies: ISearchResult[];
  loading: boolean;
  total: number;
  error: string;
}

const initialState = {
  movies: [],
  loading: false,
  error: "",
  total: 0
} as ISearchState;



export const searchMoviesThunk = createAsyncThunk<IApiResponse, IApiRequest>(
  "search/movies",
  async (params) => {
    if(params.title.trim() === ""){
      return {
        movies: [],
        error: "",
        total: 0
      }
    }
    //@ts-ignore
    const response = await fetch(`${process.env.REACT_APP_API_URL}/search?${new URLSearchParams(params)}`, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    return result;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      searchMoviesThunk.fulfilled,
      (state, { payload: { error, movies, total } }) => {
        if (error !== "") {
          state.error = error;
        } else if (movies && total > 0) {
          state.movies = movies;
          state.total = total;
        }
        state.loading = false;
      }
    );

    builder.addCase(searchMoviesThunk.rejected, (state) => {
      state.error = "Request error";
      state.loading = false;
      state.movies = [];
      state.total = 0;
    });

    builder.addCase(searchMoviesThunk.pending, (state) => {
      state.loading = true;
      state.movies = [];
      state.total = 0;
      state.error = "";
    });
  },
});

export const { reducer, actions } = searchSlice;
