import React from "react";
import "./Body.css";
import SongRow from "../SongRow/SongRow";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Header from "../Header/Header";
import useIsFirstRun from "../../customHooks/useIsFirstRun";

function Body({
  playlists,
  playing,
  search,
  searchedSongs,
  addToPlayList,
  songsOnList,
  removeFromList,
  changeSong,
  setStorage,
}) {
  const firstRun = useIsFirstRun();
  try {
    return (
      <div className="body">
        <Header />

        <div className="body__info">
          <img src={playlists[0].img} alt="" />
          <div className="body__infoText">
            <strong>PLAYLIST</strong>
            <h2>{playlists[0].name}</h2>
          </div>
        </div>

        <div className="body__songs">
          <div className="body__icons">
            <PlayCircleFilledIcon
              className="body__shuffle"
              onClick={() => changeSong("rndm")}
            />
            <FavoriteIcon fontSize="large" />
            <MoreHorizIcon />
          </div>
          {firstRun ? (
            <></>
          ) : (
            songsOnList.map((song) => (
              <SongRow
                playing={playing}
                song={song}
                key={song.id}
                removeFromList={removeFromList}
              />
            ))
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Body;
