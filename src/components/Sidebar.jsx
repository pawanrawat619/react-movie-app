import React from "react";
import SiteLogo from "../images/movie-logo.png";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <img className="site-logo" src={SiteLogo} alt="" />

      <div className="categories">
        <Link to="/" className="category">
          <h1>Genres</h1>
        </Link>
        <Link to="/trendingmovies" className="category">
          <h1>Trending</h1>
        </Link>
        <Link to="/upcomingmovies" className="category">
          <h1>Upcoming</h1>
        </Link>
        <Link to="/favoritemovies" className="category">
          <h1>Favorites</h1>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
