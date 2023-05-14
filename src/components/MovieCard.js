import React, { useState } from "react";

const MovieCard = ({ name, poster }) => {
  const [imgSrc, setImgSrc] = useState(`/images/${poster}`);
  const onError = () =>
    setImgSrc(`/images/placeholder_for_missing_posters.png`);

  return (
    <div>
      <div
        className="max-w-sm overflow-hidden"
        role="presentation"
        aria-label="A Movie Card"
      >
        <img
          src={imgSrc}
          alt="poster"
          className="w-full h-full"
          onError={onError}
        />
        <span className="text-white">{name}</span>
      </div>
    </div>
  );
};

export default MovieCard;
