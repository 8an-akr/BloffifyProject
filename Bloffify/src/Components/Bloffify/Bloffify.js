import { useState, useRef, useEffect } from "react";
import "./Bloffify.css";
import Sidebar from "../Sidebar/Sidebar";
import Body from "../Body/Body";
import Footer from "../Footer/Footer";
import Player from "../Player/Player";
import youtube from "../../youtube";
import api from "../../serverApi/serverConn";

function Bloffify({ setStorage, storage }) {
  const playerRef = useRef(null);

  const [playlists, setPlaylists] = useState([
    {
      name: "",
      songs: [],
      img: "https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/CNiQsbatLUiCIbJuVN98_woGXyxQ-i0-M2sahuEKp3ydrN4wq5dhQmjZUzj260V8_5Rn6_CytCHR7nDtKcFk0EVrLfpmq3ZUK1HF68MC-TvuuuT7rwCUQ4f2rvRc4snyHV3DVE1bKSN_URirlCj2mCSaB-dCo_r3dmCnO_LRd9RaRuGOtjW_X5u_Wljlskuv3xDiw6cQcCQCNKBH8mboPQ==/NzU6NjU6NDBUODItMTAtMg==",
    },
  ]);

  const [songsOnList, setSongsOnList] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState(false);
  const [currentSong, setcurrentSong] = useState(false);
  const [searchedSongs, setsearchedSongs] = useState([]);

  const getPlaylists = async () => {
    console.log(localStorage.getItem("bluffifyUser"));
    const res = await api.get("/playlists");
    setPlaylists(res.data);
  };

  useEffect(() => {
    getPlaylists();
  }, [storage]);

  useEffect(() => {
    playlists[0].name !== ""
      ? changePlaylist(playlists[0]._id)
      : console.log(playlists);
  }, [playlists]);

  useEffect(() => {
    console.log(playlists);
    console.log(currentPlaylist);
    console.log(songsOnList);
  }, [currentPlaylist, playlists, songsOnList]);

  useEffect(() => {
    try {
      setSongsOnList([
        ...playlists.filter((playlist) => playlist._id === currentPlaylist)[0]
          .songs,
      ]);
    } catch (error) {
      console.log("No songs on playlist");
    }
  }, [currentPlaylist, playlists]);

  const playing = (id) => {
    setcurrentSong(songsOnList.filter((song) => song.id === id)[0]);
  };

  async function search(input) {
    const res = await youtube.get("/search", { params: { q: input } });
    setsearchedSongs(res.data.items);
  }

  const changePlaylist = (id) => {
    setCurrentPlaylist(id);
  };

  const addToPlayList = async (song) => {
    const newSong = {
      name: song.snippet.title,
      artist: song.snippet.title.split(" ")[0],
      description: song.snippet.description,
      img: song.snippet.thumbnails.default.url,
      url: song.id.videoId,
    };
    songsOnList
      ? setSongsOnList((songsOnList) => [...songsOnList, newSong])
      : setSongsOnList([newSong]);
    const savedSong = await api.post("/songs/add/", newSong);
    console.log(currentPlaylist);
    const saveToPlaylist = await api.put(
      `/playlists/${currentPlaylist}/${savedSong.data._id}`
    );
    console.log(saveToPlaylist.data);
    console.log(songsOnList);
    setsearchedSongs([]);
  };

  const removeFromList = (id) => {
    setSongsOnList(songsOnList.filter((song) => song.id !== id));
  };

  const changeSong = (where) => {
    const songId = currentSong.id;
    const songsIds = songsOnList.map((song) => song.id);
    const songsIndex = songsIds.indexOf(songId);

    switch (where) {
      case "next":
        let nextIdIndex = songsIds[songsIndex] + 1;
        if (nextIdIndex > songsIds.length - 1) {
          nextIdIndex = 0;
        }
        setcurrentSong(
          songsOnList.filter((song) => song.id === songsIds[nextIdIndex])[0]
        );
        break;
      case "prev":
        let prevIdIndex = songsIds[songsIndex] - 1;
        if (prevIdIndex > songsIds.length + 1) {
          nextIdIndex = 0;
        }
        setcurrentSong(
          songsOnList.filter((song) => song.id === songsIds[prevIdIndex])[0]
        );
        break;
      case "close":
        setcurrentSong(false);
        break;
      case "rndm":
        const rndmIdIndex = Math.floor(
          Math.random() * (songsIds.length - 1 - 0) - 0
        );
        setcurrentSong(
          songsOnList.filter((song) => song.id === songsIds[rndmIdIndex])[0]
        );
        break;

      default:
        break;
    }
  };

  return (
    <div className="player">
      <div className="player__body">
        <Sidebar
          changePlaylist={changePlaylist}
          playlists={playlists}
          setPlaylists={setPlaylists}
          songsOnList={songsOnList}
          setSongsOnList={setSongsOnList}
          setCurrentPlaylist={setCurrentPlaylist}
        />
        <div className="playerContainer">
          {currentSong && (
            <Player playerRef={playerRef} currentSong={currentSong} />
          )}
        </div>
        <Body
          addToPlayList={addToPlayList}
          playlists={playlists}
          songsOnList={songsOnList}
          playing={playing}
          search={search}
          removeFromList={removeFromList}
          searchedSongs={searchedSongs}
          changeSong={changeSong}
          setStorage={setStorage}
        />
      </div>
      <Footer changeSong={changeSong} currentSong={currentSong} />
    </div>
  );
}

export default Bloffify;
