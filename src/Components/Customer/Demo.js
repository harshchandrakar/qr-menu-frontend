import React from "react";
import ReactPlayer from "react-player";

function Demo() {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player fixed-bottom"
        url="videos/Main.mp4"
        width="100%"
        height="100%"
        controls={true}
      />
    </div>
  );
}

export default Demo;
