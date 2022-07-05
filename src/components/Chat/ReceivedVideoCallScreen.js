import { AgoraVideoPlayer } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk";
import moment from "moment";

import React, { useEffect, useState } from "react";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from "./setting";
import Mutvideo from "./Mutvideo";
import { toast } from "react-toastify";
const AppId = "cfc5828d95354c0aabf836481b92100f";

function ReceivedVideoCallScreen({
  rejectCallRequestFunction,
  callData,
  userInfo,
  activeUser,
  callCut,
  setCallCut,
}) {
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

  let init = async (name) => {
    try {
      const Data = await customerClient.join(
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

  useEffect(() => {
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
      await customerClient.leave();

      customerClient.removeAllListeners();
      tracks[0].close();
      tracks[1].close();

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
    <>
      <div className="video-call-background">
        <div className="video-call-modal">
          <div
            className={`${
              tracks && ready && tracks[1].enabled == true
                ? "video-call-first-show"
                : "new-video-call-first-show"
            }`}
            id="remote-container"
          >
            {ready && tracks && (
              <>
                {tracks[1] && tracks[1]?.enabled == true ? (
                  <AgoraVideoPlayer
                    videoTrack={tracks[1]}
                    style={{ height: "100%", width: "100%" }}
                  />
                ) : (
                  <>
                    <img src={userInfo?.profileImage} />
                    {/* <h1 style={{ color: "white" }}>
                      {
                        (userInfo?.subject[0],
                        userInfo?.subject[1],
                        userInfo?.subject[2],
                        userInfo?.subject[3])
                      }
                    </h1> */}
                  </>
                )}

                <div
                  className={`${
                    users.length > 0 ? "mini-video-show" : "new-mini-video-show"
                  }`}
                >
                  <>
                    {users.length > 0 &&
                      users.map((user) => {
                        if (user.videoTrack) {
                          return (
                            <>
                              <AgoraVideoPlayer
                                className="vid"
                                videoTrack={user.videoTrack}
                                key={user.uid}
                                style={{ height: "100%", width: "100%" }}
                              />
                            </>
                          );
                        }
                      })}

                    {users.length <= 0 && (
                      <>
                        <img src={activeUser?.participateIds[0].profileImage} />
                        {/* <h1 style={{ color: "white" }}>
                          {
                            (activeUser?.participateIds[0]?.subject[0],
                            activeUser?.participateIds[0]?.subject[1],
                            activeUser?.participateIds[0]?.subject[2],
                            activeUser?.participateIds[0]?.subject[3])
                          }
                        </h1> */}
                      </>
                    )}
                  </>

                  <div className="remote-name"></div>
                </div>
              </>
            )}

            <div className="button-end-side-all">
              <div className=" self-name">
                {ready && tracks && (
                  <>
                    <div className="time-button-style">
                      <button>
                        {/* ${moment.duration({ seconds: time / 1000 }).hours()} : */}
                        {`
                  ${moment.duration({ seconds: time / 1000 }).minutes()} :
                  ${moment.duration({ seconds: time / 1000 }).seconds()}`}
                      </button>
                    </div>
                    <div style={{ display: "flex" }}>
                      {}
                      <Mutvideo
                        tracks={tracks}
                        setStart={setStart}
                        setInCall={setInCall}
                      />
                      <div
                        className="call-end-button call-icon-rotate"
                        title="End Call"
                        onClick={() => {
                          leaveChannel();
                        }}
                        // onClick={() => {
                        //   setCallCut(!callCut);
                        // }}
                      >
                        <i class="fas fa-phone"></i>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {callCut && (
            <>
              <div className="callCutAlert">
                <div
                  className="close-icon"
                  onClick={() => setCallCut(!callCut)}
                >
                  <i className="fa fa-times" />
                </div>
                <p>
                  Call will be <span>disconnected</span> if the page is refresh
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ReceivedVideoCallScreen;
