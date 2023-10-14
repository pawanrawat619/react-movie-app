import ContextPage from "../ContextPage";
import { useState, useEffect, useContext } from "react";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

function UpcomingMovies() {
  const { page, setPage, totalPages, setTotalPages } = useContext(ContextPage);

  const [upcomingMovies, setUpcomingMovies] = useState([]);

  async function getUpcomingMovies() {
    const upcomingURL = ` https://api.themoviedb.org/3/movie/upcoming?api_key=d1558c2053b50ca988813f778c01bae4&with_origin_country=IN&language=en-US&page=${page}`;

    const response = await fetch(upcomingURL);

    const responseJson = await response.json();

    setUpcomingMovies(responseJson.results);
    setTotalPages(responseJson.total_pages);
  }

  useEffect(() => {
    getUpcomingMovies();
  }, [page]);

  if (!upcomingMovies?.length) return <Loader />;

  return (
    <div className="hero">
      <div className="feed">
        <h1 className="feedCategoryHeading">Upcoming Movies </h1>

        <div className="movies">
          {upcomingMovies.map(function (mymovie, index) {
            return <MovieCard key={index} mymovie={mymovie} />;
          })}
        </div>

        <div className="nextPageButtons">
          <button
            className="nextPageButton"
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            Previous page
          </button>
          <button
            className="nextPageButton"
            onClick={() => {
              if (page < totalPages) {
                setPage(page + 1);
              }
            }}
          >
            Next page
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpcomingMovies;
