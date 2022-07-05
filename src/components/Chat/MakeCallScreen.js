import React, { useEffect, useRef } from "react";
import ProfileImage from "../../Assets/Images/ProfileImg.png";
import Callingload from "../../Assets/Images/callingloaddata.gif";

const MakeCallScreen = ({
  rejectCallRequestFunction,
  callData,
  rejectData,
}) => {
  const myRef = useRef();

  // audio.play();
  useEffect(() => {
    if (myRef.current) {
      // myRef.current.play();
    }
    // audio.resume();

    return () => {
      // Your code here

      if (myRef.current) {
        myRef.current.pause();
      }
      // audio.star;
    };
  }, [callData]);

  return (
    <>
      <div className="audio-modal-alignment">
        <audio
          ref={myRef}
          src="https://dm0qx8t0i9gc9.cloudfront.net/previews/audio/BsTwCwBHBjzwub4i4/church-bell-ringing-7-times_NWM.mp3"
        />
        <div className="audio-modal">
          <div>
            <div className="out-going-call">
              <p>Out going call</p>
              <div
                className="out-going-call-img"
                style={{
                  paddingLeft: "40%",
                }}
              >
                <img src={Callingload} style={{ height: "60px" }} />
              </div>
            </div>

            <div className="audio-chat-alignment-image">
              <img src={callData?.otherUser?.profileImage} alt="ProfileImage" />
            </div>
            <div className="out-going-call call-person-alignment">
              <p>{callData?.otherUser?.currentRole}</p>
            </div>

            <div className="call-end-center-alignment">
              <div
                className="call-end-button"
                onClick={() => rejectCallRequestFunction()}
              >
                <i class="fas fa-phone"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeCallScreen;
