import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import TrendingMovies from "./pages/TrendingMovies";
import UpcomingMovies from "./pages/UpcomingMovies";
import FavoriteMovies from "./pages/FavoriteMovies";
import MovieDetail from "./pages/MovieDetail";
import Layout from "./components/Layout";
import Search from "./pages/Search";
import Player from "./pages/Player";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="/trendingmovies" element={<TrendingMovies />} />
            <Route path="/upcomingmovies" element={<UpcomingMovies />} />
            <Route path="/favoritemovies" element={<FavoriteMovies />} />
            <Route path="/moviedetails/:id" element={<MovieDetail />} />
            <Route path="/search/:searchTerm" element={<Search />} />
          </Route>
          <Route path="/player/:id/:title" element={<Player />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
