import { useState, useEffect, useContext } from "react";
import ContextPage from "../ContextPage";
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";
function Search() {
  const { searchTerm, page, setPage, totalPages, setTotalPages } =
    useContext(ContextPage);

  const [searchMovies, setSearchMovies] = useState([]);

  async function getSearchMovies() {
    const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=d1558c2053b50ca988813f778c01bae4&with_origin_country=IN&language=en-US&query=${searchTerm}&${page}&include_adult=false`;

    const response = await fetch(searchURL);

    const responseJson = await response.json();

    setSearchMovies(responseJson.results);
    setTotalPages(responseJson.total_pages);
  }

  useEffect(() => {
    getSearchMovies();
  }, [searchTerm, page]);

  if (!searchMovies?.length) return <Loader />;

  return (
    <div className="hero">
      <div className="feed">
        <h1 className="feedCategoryHeading">Search results for </h1>

        <div className="movies">
          {searchMovies.map(function (mymovie, index) {
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

export default Search;
