import { createAction } from "@reduxjs/toolkit";
import * as page1 from "./../../api/CONTENTLISTINGPAGE-PAGE1.json";
import * as page2 from "./../../api/CONTENTLISTINGPAGE-PAGE2.json";
import * as page3 from "./../../api/CONTENTLISTINGPAGE-PAGE3.json";

export const loadRomComMovies = createAction("fetchMovies");

export const fetchRomComMovies =
  (previousMovies, pageNumber) => async (dispatch) => {
    let fileData;
    if (pageNumber === 1) {
      fileData = page1;
    } else if (pageNumber === 2) {
      fileData = page2;
    } else if (pageNumber === 3) {
      fileData = page3;
    }

    const newMovies = fileData["page"]["content-items"]["content"];
    const totalContentItems = fileData["page"]["total-content-items"];
    dispatch(
      loadRomComMovies({
        previousMovies,
        newMovies,
        totalContentItems,
      })
    );
  };
