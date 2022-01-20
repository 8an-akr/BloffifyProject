import React from "react";
import "./Footer.css";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";

function Footer({ currentSong, changeSong }) {
  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={
            currentSong.img
              ? currentSong.img
              : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTEhMWFRUXGBcXFxcVFxgXFxcXFxgYFx0VFxcYHSggGholGxgXITEhJSkrLi4uGB8zODMtNygtLisBCgoKBwcHDgcHDisZHxkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAJkBSQMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAAIDB//EACgQAQEBAAECAwkBAQEAAAAAAAABEfACITFRkRJBYXGBobHB0fHhMv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A8asR3wCgw9MSBJEAurpSAYisBIxQAfZ7b9PX/EgSqVAWKm0YCxSc5zskCSjUBk9V3v5moBikCBJIEtUQJLVAMZK0EkQWIagR6s9yQJrFIcBzxA2AkogVUWGwFaFiAwJQElpgIhaBnxFQoJBUCkgVIazn6BQFABKZRYCUndTmLAWogAqUCiWIFUqrzn0BINUFCMIH2hqGgMWc5zuaLARy/P8AUCoKqU5vgASUh0Apec53NEBGKKQEUZ5gAVYDMiznOdlVYCN3x+4iBUyLPIA3ICpt+IAGq9QM2qrUBwXnPRRaARl+H8X1BT0OCoFTnPD1CAyoqgDiO6AGc7Gj2QGpRdVBfpWCkFIqsVBdVUB0FF3GtdIDTOoUg1J5gUgbWK1BQEqxRWgvirAe4LFKsMBHUAOsNTnoAXT0qmsgdiBBaIdQKJCgdVgrW+4BIemjDAa24NBgK+DDdXsgJ8Q1enw58P6zQFM1GAMFJBZfAaV1AzEVANnhz6LspEC1RH8/rmfcBKQqCGNdXSzQGGRUznOeIDFYUAas57voDgMlU737+ngDKakZAWNWdlECGGIFJ+WW5WcANS4qsBRbfPlNAJVYeq+YJeynXngDiuqjUCIOgqWdOgbGVqBRqCXnzGgfa5z6IGAQtQGDqOi0COqjVQUIWgTGDoFapUCUM5/1gGgpN/4tAxDFQUalZxX1A0JA1nOc7Ci1UFpg04CSIHn4W8wIGV1EAkoQFO/SBYCSIKTy57xFYs5zncA1Oc9UtBHBTICgsNFgBWkc+IKkQ2+oA7/kCgHpiaFACk4DNizOc5ErAM39KwRQEt9x9kAlVOx0BarqPPQBIVIQBqwgFk84joMWq1GzOfQBVQ1aAlV5i0WA1c5/BFTAGqIyb4TnmChjGGA1Fql8uyA1m0xmgt5+lvkpDfLn3AIaeqgtPO38GmQDq56rBoFnuRgJeHPAy4yDWAHASlqwAjUvaBYtDVz6gPaandmHpgGqDTd94I/X8i1jQanNrLQsAVdjYenp59wFDQBLDPEdXSAhlE6ec52OAjJ8ORW87+CwEkc538b/AJfQFoStBMmq88wFPZWHpnOe/wDlAKU4gVSkNve0BL8OWYqsMnfn5BmqmQYAOeawgMU0oALW+nn+fNkAZ48/aqoFXOfZT7oFqR6vgCrm3R7INVdUVQDDh9691Aeysanv+X7gniDJw9XPuKAxTpXU3PGAzJnOYsan/m/OfjqY/gHFnmefYT3fOgoRT7p8wQsI6f4Aw4ob4fUB7KxqfwT388wWJX+rqBUKfxdX8/EAxZvPL/k+x6fD6X9MQCV0+Pr+BQaxmQ3+qc9QWCnrVAYZfIIDVi6fE9HPWABT1NeXyBm/LngNFQP/2Q=="
          }
          alt={currentSong.name}
        />
        {currentSong ? (
          <div className="footer__songInfo">
            <h4>{currentSong.name}</h4>
            <p>{currentSong.artist}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon
          onClick={() => changeSong("prev")}
          className="footer__icon"
        />
        {currentSong ? (
          <PauseCircleOutlineIcon
            onClick={() => changeSong("close")}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={() => changeSong("close")}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon
          onClick={() => changeSong("next")}
          className="footer__icon"
        />
        <RepeatIcon className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon className="playlistPlayIcon" />
          </Grid>
          <Grid item>
            <VolumeDownIcon className="volumeDownIcon" />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
