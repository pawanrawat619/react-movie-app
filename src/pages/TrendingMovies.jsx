import MovieCard from "../components/MovieCard";
import ContextPage from "../ContextPage";
import Loader from "../components/Loader";
import { useState, useEffect, useContext } from "react";
function TrendingMovies() {
  const { page, setPage, totalPages, setTotalPages } = useContext(ContextPage);
  const [trendingMovies, setTrendingMovies] = useState([]);

  async function getTrendingMovies() {
    const trendingURL = `https://api.themoviedb.org/3/trending/movie/day?api_key=d1558c2053b50ca988813f778c01bae4&with_origin_country=IN&page=${page}`;

    const response = await fetch(trendingURL);

    const responseJson = await response.json();

    setTrendingMovies(responseJson.results);
    setTotalPages(responseJson.total_pages);
  }

  useEffect(() => {
    getTrendingMovies();
  }, [page]);

  if (!trendingMovies?.length) return <Loader />;

  return (
    <div className="hero">
      <div className="feed">
        <h1 className="feedCategoryHeading"> Trending Movies </h1>

        <div className="movies">
          {trendingMovies.map(function (mymovie, index) {
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

export default TrendingMovies;
