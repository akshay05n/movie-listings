import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchRomComMovies } from "./stores/Actions/RomComAction";
import MovieCard from "./components/MovieCard";
import NavBar from "./components/NavBar";

function App() {
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isSeaching, setIsSearching] = useState(false);

  const { romComMovies, totalMovieItems } = useSelector((state) => ({
    romComMovies: state?.romComReducer?.romComMovies,
    totalMovieItems: state?.romComReducer?.totalMovieItems,
  }));

  const handleDataChange = (newData) => {
    setMovies(newData);
  };

  const handleSearchInputClick = (dataFromNavBar) => {
    setIsSearching(dataFromNavBar);
  };

  useEffect(() => {
    dispatch(fetchRomComMovies(movies, page));
    handleDataChange(romComMovies);
  }, [JSON.stringify(romComMovies), page]);

  return (
    <div>
      <NavBar
        onDataChange={handleDataChange}
        onSearchInputClick={handleSearchInputClick}
      ></NavBar>
      <div
        id="scrollTarget"
        className="bg-black max-h-screen overflow-auto pt-12"
      >
        <InfiniteScroll
          dataLength={movies?.length}
          next={() => setPage(page + 1)}
          hasMore={
            !isSeaching && movies?.length < totalMovieItems ? true : false
          }
          scrollableTarget="scrollTarget"
        >
          <div className="grid grid-cols-3 gap-3 p-3 overflow-auto ">
            {movies &&
              movies.map((movie, index) => {
                return (
                  <MovieCard
                    key={`${movie?.["name"]}${index + 1}`}
                    name={movie?.["name"]}
                    poster={movie?.["poster-image"]}
                  />
                );
              })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
