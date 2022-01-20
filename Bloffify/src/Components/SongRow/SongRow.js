import React from "react";
import "./SongRow.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function SongRow({ song, playing, removeFromList }) {
  return (
    <div
      className="songRow"
      // onClick={() => playSong(track.id)}
      onClick={() => playing(song.id)}
    >
      <img className="songRow__album" src={song.img} alt="" />
      <div className="songRow__all">
        <div className="songRow__info">
          <h1>{song.name}</h1>
          <p>
            {song.artist} - {song.description}
          </p>
        </div>
        <div className="removeSong" onClick={() => removeFromList(song.id)}>
          <RemoveCircleOutlineIcon />
        </div>
      </div>
    </div>
  );
}

export default SongRow;
