import React from "react";
import { useParams } from "react-router";
import Iframe from "react-iframe";
function Player() {
  const params = useParams();
  const movieURL = `https://embed.smashystream.com/playere.php?tmdb=${params.id}`;

  return (
    <>
      <h1 className="playerHeading">My Player</h1>

      <Iframe className="player" allowFullScreen src={movieURL}></Iframe>
    </>
  );
}

export default Player;
