import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRomComMovies } from "./stores/Actions/RomComAction";

function App() {
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const { romComMovies } = useSelector((state) => ({
    romComMovies: state?.romComReducer?.romComMovies,
  }));

  const handleDataChange = (newData) => {
    setMovies(newData);
  };

  useEffect(() => {
    dispatch(fetchRomComMovies(movies, page));
    handleDataChange(romComMovies);
    console.log(romComMovies);
  }, [JSON.stringify(romComMovies), page]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Page number {page}</h1>
      <div className="inline-flex">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={() => setPage(page - 1)}
        >
          Prev Page
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={() => setPage(page + 1)}
        >
          Next Page
        </button>
      </div>
      <div>
        <ul>
          {movies &&
            movies.map((movie, index) => {
              return (
                <li key={`${movie?.name}${index + 1}`}>
                  {index + 1} {movie?.name}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default App;
