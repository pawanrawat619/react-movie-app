import React, { useContext, useEffect } from "react";
import ContextPage from "../ContextPage";
import MovieCard from "../components/MovieCard";

function FavoriteMovies() {
  const { favoriteMovies, setFavoriteMovies } = useContext(ContextPage);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favorites")
    );

    if (movieFavourites) {
      setFavoriteMovies(movieFavourites);
    }
  }, []);

  return (
    <div className="hero">
      <div className="feed">
        <h1 className="feedCategoryHeading">Favorite Movies</h1>

        {favoriteMovies.length === 0 ? (
          <h1
            style={{
              color: "#ffffff",
              fontSize: "18px",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            No Bookmarks Yet!
          </h1>
        ) : (
          <div className="movies">
            {favoriteMovies.map(function (mymovie, index) {
              return <MovieCard key={index} mymovie={mymovie} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoriteMovies;
