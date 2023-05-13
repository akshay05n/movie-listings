import { createReducer } from "@reduxjs/toolkit";
import { loadRomComMovies } from "../Actions/RomComAction";

const initialState = {
  romComMovies: [],
};

const romComReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadRomComMovies, (state, action) => {
    state.romComMovies = [
      ...action.payload?.previousMovies,
      ...action.payload?.newMovies,
    ];
  });
});

export default romComReducer;
