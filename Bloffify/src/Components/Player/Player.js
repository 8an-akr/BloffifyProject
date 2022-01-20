import React from "react";
import "./Player.css";
import YouTube from "react-youtube";
import Draggable from "react-draggable";

function Player({ currentSong, playerRef }) {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Draggable>
      <div className="drag">
        <YouTube playerRef={playerRef} videoId={currentSong.url} opts={opts} />
      </div>
    </Draggable>
  );
}

export default Player;
