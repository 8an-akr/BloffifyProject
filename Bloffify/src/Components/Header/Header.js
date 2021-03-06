import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../store/actions/index";

function Header({ search, searchedSongs, addToPlayList, setStorage }) {
  const dispatch = useDispatch();

  function onFormSubmit(event) {
    event.preventDefault();
    search(event.currentTarget[0].value);
  }

  return (
    <div className="header">
      <div
        className="logout-btn"
        onClick={() => {
          dispatch(logoutAction());
          setStorage();
        }}
      >
        LOGOUT
      </div>
      <div className="header__left">
        <form onSubmit={(e) => onFormSubmit(e)}>
          <SearchIcon />
          <input placeholder="Search for Artists or Songs" type="text" />
        </form>
      </div>
      <div className="searchResults">
        {searchedSongs
          ? searchedSongs.map((song) => (
              <div
                className="searchRow"
                key={song.id.videoId}
                onClick={() => addToPlayList(song)}
              >
                <img
                  className="searchRow__album"
                  src={song.snippet.thumbnails.default.url}
                  alt=""
                />
                <div className="searchRow__info">
                  <h1>{song.snippet.title}</h1>
                  <p>{song.snippet.title.split(" ")[0]}</p>
                </div>
              </div>
            ))
          : {}}
      </div>
    </div>
  );
}

export default Header;
