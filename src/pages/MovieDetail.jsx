import Loader from "../components/Loader";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
function MovieDetail() {
  const [movieDetail, setMovieDetail] = useState(null);
  const [castDetail, setCastDetail] = useState([]);
  const [videoDetail, setVideoDetail] = useState([]);
  const params = useParams();

  const movieID = params.id;

  async function getMovieDetail() {
    const movieDetailURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=d1558c2053b50ca988813f778c01bae4&language=en-US`;

    const response = await fetch(movieDetailURL);

    const responseJson = await response.json();

    setMovieDetail(responseJson);
  }
  async function getCastDetail() {
    const castDetailURL = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=d1558c2053b50ca988813f778c01bae4&language`;

    const response = await fetch(castDetailURL);

    const responseJson = await response.json();

    setCastDetail(responseJson.cast);
  }
  async function getVideoDetail() {
    const videoDetailURL = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=d1558c2053b50ca988813f778c01bae4&language=en-US`;

    const response = await fetch(videoDetailURL);

    const responseJson = await response.json();

    setVideoDetail(responseJson.results);
  }
  useEffect(() => {
    getMovieDetail();
    getCastDetail();
    getVideoDetail();
  }, [movieID]);

  if (movieDetail === null) {
    return <Loader />;
  }

  return (
    <div className="hero">
      <div className="feed">
        <div className="moviedetail">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`}
            alt=""
            className="movie-detail-poster"
          />
          <h1
            style={{
              fontSize: "48px",
              margin: "10px 0",
            }}
          >
            {movieDetail.title}
          </h1>
          <p
            style={{
              maxWidth: "800px",
              wordWrap: "break-word",
              fontSize: "18px",
              lineHeight: 1.2,
            }}
          >
            {movieDetail.overview}
          </p>

          <button className="releasedate">
            Release date : {movieDetail.release_date}
          </button>
          <div className="moviedetailgenre">
            {movieDetail.genres.map(function (moviegenre) {
              return (
                <button className="movieDetailGenreButton">
                  {moviegenre.name}
                </button>
              );
            })}
          </div>
          <div className="trailers">
            {videoDetail
              .filter(function (myfilteredvideo) {
                return (
                  myfilteredvideo.site === "Youtube" ||
                  myfilteredvideo.type === "Trailer"
                );
              })
              .map(function (myvideo, index) {
                return (
                  <a
                    href={`https://www.youtube.com/watch?v=${myvideo.key}`}
                    className="watch-trailer-link"
                  >
                    Watch Trailer {index + 1}
                  </a>
                );
              })}
          </div>
          <div className="watchmovie">
            <Link
              className="watch-movie-link"
              to={`/player/${movieID}/${slugify(movieDetail.title)}`}
            >
              Watch Movie
            </Link>
          </div>
          <h1>Cast</h1>
          <div className="cast">
            {castDetail
              .filter(function (cast) {
                return cast.profile_path;
              })
              .map(function (mycast) {
                return (
                  <div className="cast-details">
                    <div className="cast-info">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${mycast.profile_path}`}
                        alt=""
                        className="cast-photo"
                      />
                      <h1 style={{ color: "white", fontSize: "20px" }}>
                        {mycast.original_name}
                      </h1>
                      <h1 style={{ color: "#2563eb", fontSize: "18px" }}>
                        ({mycast.character})
                      </h1>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
