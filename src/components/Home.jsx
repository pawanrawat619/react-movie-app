import { useState, useEffect, useContext } from "react";
import ContextPage from "../ContextPage";
import Loader from "./Loader";
import Header from "./Header";
import MovieCard from "./MovieCard";

function Home() {
  const {
    genres,
    page,
    setPage,
    totalPages,
    setTotalPages,
    currentGenre,
    setCurrentGenre,
  } = useContext(ContextPage);

  const [defaultMovies, setDefaultMovies] = useState([]);

  async function getDefaultMovies() {
    const defaultURL = ` https://api.themoviedb.org/3/discover/movie?with_genres=${currentGenre}&api_key=51124fce5e9f32da2805ef46757e72be&with_origin_country=IN&page=${page}`;
    const response = await fetch(defaultURL);

    const responseJson = await response.json();
    setDefaultMovies(responseJson.results);
    setTotalPages(responseJson.total_pages);
  }

  useEffect(() => {
    getDefaultMovies();
  }, [currentGenre, page]);

  if (!defaultMovies?.length) return <Loader />;

  return (
    <div className="hero">
      <div className="feed">
        <Header />

        <div className="genres">
          {genres.map(function (mygenre) {
            return (
              <button
                key={mygenre.id}
                onClick={() => {
                  setCurrentGenre(mygenre.id);
                }}
                className={
                  mygenre.id == currentGenre
                    ? "genreButton"
                    : "genreButtonNotSelected"
                }
              >
                {mygenre.name}
              </button>
            );
          })}
        </div>

        <h1 className="feedCategoryHeading"> Genres </h1>

        <div className="movies">
          {defaultMovies.map(function (mymovie, index) {
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

export default Home;
