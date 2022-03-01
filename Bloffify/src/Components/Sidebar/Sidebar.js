import React from "react";
import "./Sidebar.css";
import SidebarOption from "../SidebarOption/SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import api from "../../serverApi/serverConn";
import RemoveIcon from "@mui/icons-material/Remove";

function Sidebar({
  playlists,
  setCurrentPlaylist,
  changePlaylist,
  songsOnList,
  setSongsOnList,
}) {
  const onFormSubmit = async (event) => {
    event.preventDefault();
    const playlistName = event.currentTarget[0].value;
    const res = await api.post("playlists/new", { name: playlistName });
    changePlaylist(res.data._id);
  };

  const deletePlaylist = async (_id) => {
    const res = await api.delete(`playlists/${_id}`);
    console.log(res.data);
    changePlaylist(_id);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img
          className="sidebar__logo"
          src="https://i.pinimg.com/originals/f0/5c/bc/f05cbc8c0f8b075d2b4f1f68fee49649.jpg"
          alt=""
        />
        <h2>Bloffify</h2>
      </div>
      <SidebarOption Icon={HomeIcon} option="Home" />
      <SidebarOption Icon={SearchIcon} option="Search" />
      <SidebarOption Icon={LibraryMusicIcon} option="Your Library" />
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {playlists?.map((playlist) => {
        if (playlist._id) {
          return (
            <div className="sidebar__songs" key={playlist._id}>
              <SidebarOption
                option={playlist.name}
                onClick={() => changePlaylist(playlist._id)}
              />
              <RemoveIcon
                onClick={() => deletePlaylist(playlist._id)}
                className="add-btn"
              />
            </div>
          );
        }
      })}
      <form onSubmit={(e) => onFormSubmit(e)}>
        <input
          className="sidebar-input"
          placeholder="Add Playlist"
          type="text"
        />
      </form>
    </div>
  );
}

export default Sidebar;
