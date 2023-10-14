import { Link } from "react-router-dom";
import noimage from "../images/no-image.jpg";
import { useContext, useState, useEffect } from "react";
import ContextPage from "../ContextPage";
import StarIcon from "@mui/icons-material/Star";

import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
function MovieCard({ mymovie }) {
  const { favoriteMovies, addFav, removeFav } = useContext(ContextPage);

  const isMovieInFavorites = favoriteMovies.some(
    (movie) => movie.id === mymovie.id
  );

  const [isBookmarked, setIsBookmarked] = useState(isMovieInFavorites);

  const handleBookmarkAddRemoveToggle = () => {
    if (isBookmarked) {
      removeFav(mymovie);
      setIsBookmarked(false);
    } else {
      addFav(mymovie);
      setIsBookmarked(true);
    }
  };

  useEffect(() => {
    if (isMovieInFavorites) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }, [mymovie.id]);

  return (
    <div className="moviecard">
      <button className="star-icon" onClick={handleBookmarkAddRemoveToggle}>
        {isBookmarked ? <StarIcon /> : <StarBorderOutlinedIcon />}
      </button>
      <Link to={`/moviedetails/${mymovie.id}`}>
        {mymovie.poster_path === null ? (
          <img className="movieposter" src={noimage} />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w500${mymovie.poster_path}`}
            alt="Movie Poster"
            className="movieposter"
          />
        )}
      </Link>
      <div className="movie-info">
        <div className="movie-title">{mymovie.title}</div>

        <div className="movie-rating">{mymovie.vote_average.toFixed(1)}</div>
      </div>
    </div>
  );
}

export default MovieCard;
