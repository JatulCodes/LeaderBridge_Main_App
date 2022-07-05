import AgoraRTC from "agora-rtc-sdk";
import React, { useEffect, useState } from "react";
import ProfileImage from "../../Assets/Images/ProfileImg.png";
import {
  channelName,
  config,
  useClient,
  useMicrophoneAndCameraTracks,
} from "./setting";
import { IMicrophoneAudioTrack } from "agora-rtc-react";
import Audiosetting from "./Audiosetting";
import { toast } from "react-toastify";

const AppId = "cfc5828d95354c0aabf836481b92100f";

function AudioCallScreen({ rejectCallRequestFunction, callData, userId }) {
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const customerClient = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  const [time, setTime] = useState(0);

  useEffect(() => {
    let TimeId = setInterval(() => {
      setTime((prevTime) => prevTime + 1000);
    }, 1000);

    return () => {
      clearInterval(TimeId);
    };
  });

  const [inCall, setInCall] = useState(true);

  useEffect(() => {
    let init = async (name) => {
      try {
        await customerClient.join(
          config.appId,
          callData?.channelName,
          callData?.token,
          null
        );
        if (tracks) await customerClient.publish([tracks[0], tracks[1]]);
        setStart(true);

        customerClient.on("user-published", async (user, mediaType) => {
          await customerClient.subscribe(user, mediaType);
          if (mediaType === "video") {
            setUsers((prevUsers) => {
              return [...prevUsers, user];
            });
          }
          if (mediaType === "audio") {
            user.audioTrack.play();
          }
        });

        customerClient.on("user-unpublished", (user, mediaType) => {
          if (mediaType === "audio") {
            if (user.audioTrack) user.audioTrack.stop();
          }
          if (mediaType === "video") {
            setUsers((prevUsers) => {
              return prevUsers.filter((User) => User.uid !== user.uid);
            });
          }
        });

        customerClient.on("user-left", async (user, userData) => {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
          await customerClient.leave();
          customerClient.removeAllListeners();
          tracks[0].close();
          tracks[1].close();
          rejectCallRequestFunction();
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (ready && tracks) {
      try {
        init(channelName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [channelName, customerClient, ready, tracks]);

  const leaveChannel = async () => {
    // debugger;
    if (tracks?.length > 0) {
      tracks[0]?.close();
      tracks[1]?.close();
      await customerClient.leave();

      customerClient.removeAllListeners();

      rejectCallRequestFunction();
      // tracks[0].renewMediaStreamTrack();
      // tracks[1].removeTrack();
      setStart(false);
      setInCall(false);
    } else {
      rejectCallRequestFunction();
    }
  };

  return (
    <div className="video-call-background">
      <div className="video-call-modal">
        <div className="video-call-first-show modal-center-alignment-all">
          <div>
            <div className="video-call-end-image-center-align">
              <img
                src={
                  userId == callData?.otherId
                    ? callData?.loginUser?.profileImage
                    : callData?.otherUser?.profileImage
                }
                alt="ProfileImage"
              />
            </div>
            <div className="last-modal-button-center-align">
              <div
                className="call-end-button call-icon-rotate"
                onClick={() => leaveChannel()}
              >
                <i class="fas fa-phone"></i>
              </div>
              <div className="call-end-button">
                <Audiosetting tracks={tracks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioCallScreen;
