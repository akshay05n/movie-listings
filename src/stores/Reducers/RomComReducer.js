import { createReducer } from "@reduxjs/toolkit";
import { loadRomComMovies } from "../Actions/RomComAction";

const initialState = {
  romComMovies: [],
  totalMovieItems: 0,
};

const romComReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadRomComMovies, (state, action) => {
    state.romComMovies = [
      ...action.payload?.previousMovies,
      ...action.payload?.newMovies,
    ];
    state.totalMovieItems = action.payload?.totalMovieItems;
  });
});

export default romComReducer;
