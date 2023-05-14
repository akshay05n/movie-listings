import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const NavBar = ({ onDataChange, onSearchInputClick }) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { romComMovies } = useSelector((state) => ({
    romComMovies: state?.romComReducer?.romComMovies,
  }));

  const handleSearchInputClick = (isSearching) => {
    setShowSearchInput(isSearching);
    onSearchInputClick(isSearching);
  };

  const onEscape = function (action) {
    window &&
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          action();
        }
      });
  };

  onEscape(() => {
    setSearchValue("");
    handleSearchInputClick(false);
  });

  useEffect(() => {
    if (searchValue !== "") {
      const filteredData = romComMovies.filter((value) => {
        return value?.name?.toLowerCase()?.includes(searchValue.toLowerCase());
      });
      onDataChange(filteredData);
    } else {
      onDataChange(romComMovies);
    }
  }, [searchValue]);

  return (
    <div className="navbar" role="navigation">
      <div className="grid grid-cols-2 p-4 text-white">
        <div className="flex justify-start">
          <span>
            <img
              src="/images/Back.png"
              alt="back"
              className="w-4 mt-1 mr-1.5"
              onClick={() => {
                setSearchValue("");
                handleSearchInputClick(false);
              }}
            ></img>
          </span>
          <span className="text-base">Romantic Comedy</span>
        </div>

        <div className="flex justify-end">
          {!showSearchInput && (
            <img
              src="/images/search.png"
              alt="search"
              className="w-6 h-6"
              onClick={() => handleSearchInputClick(true)}
            ></img>
          )}

          {showSearchInput && (
            <input
              type="text"
              role="search"
              className="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full ml-4 pr-10"
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
            ></input>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
