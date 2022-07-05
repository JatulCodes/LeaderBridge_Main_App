//

import React, { useState } from "react";
import { useClient } from "./setting";
import VideoSlash from "../../Assets/Images/video-slash.svg";
import { height } from "@mui/system";

function AudioMute(props) {
  const { tracks } = props;
  const [audio, setAudio] = useState(false);
  const [video, setVideo] = useState(false);
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0]?.setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  return (
    <div>
      {" "}
      <div style={{ display: "flex", alignItems: "center" }}>
        {" "}
        {audio ? (
          <div
            className="call-end-button"
            onClick={() => {
              mute("audio");
              setAudio(!audio);
            }}
          >
            <i className="fa fa-microphone"></i>
          </div>
        ) : (
          <div
            className="call-end-button"
            onClick={() => {
              mute("audio");
              setAudio(!audio);
            }}
          >
            <i class="fas fa-microphone-alt-slash"></i>{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default AudioMute;
