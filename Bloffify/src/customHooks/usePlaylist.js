// import { useState, useEffect } from "react";
// import api from "../serverApi/serverConn";
// import useIsFirstRun from "./useIsFirstRun";

// const usePlaylist = () => {
//   const [playlists, setPlaylists] = useState([
//     {
//       name: "",
//       songs: [],
//       img: "https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/CNiQsbatLUiCIbJuVN98_woGXyxQ-i0-M2sahuEKp3ydrN4wq5dhQmjZUzj260V8_5Rn6_CytCHR7nDtKcFk0EVrLfpmq3ZUK1HF68MC-TvuuuT7rwCUQ4f2rvRc4snyHV3DVE1bKSN_URirlCj2mCSaB-dCo_r3dmCnO_LRd9RaRuGOtjW_X5u_Wljlskuv3xDiw6cQcCQCNKBH8mboPQ==/NzU6NjU6NDBUODItMTAtMg==",
//     },
//   ]);
//   const firstRun = useIsFirstRun();

//   useEffect(() => {
//     const getPlaylists = async () => {
//       const res = await api.get("/playlists");
//       const playlistsFromDB = await res.data;
//       playlistsFromDB.map((playlist, playlistIndex) =>
//         playlist.songs.map(async (song, songIndex) => {
//           const _id = song;
//           const songInfo = await api.get(`/songs/${_id}`).data;
//           setPlaylists((playlists)=>({...playlists, playlistsFromDB[playlistIndex].songs[songIndex]}));
//           // setSongsOnList((songsOnList) => [...songsOnList, ...res.data]);
//         })
//       );
//     };
//     getPlaylists();
//     // console.log(playlists);
//     return () => {};
//   });

//   return playlists;
// };

// export default usePlaylist;
