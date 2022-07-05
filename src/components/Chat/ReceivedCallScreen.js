import React, { useEffect, useRef, useState } from "react";
import ProfileImage from "../../Assets/Images/ProfileImg.png";
import Ringing from "../../Assets/Images/Ringing.gif";
function ReceivedCallScreen({
  acceptCallRequestFunction,
  rejectCallRequestFunction,
  rejectData,
  callData,
  userId,
}) {
  const myRef = useRef();

  // audio.play();
  useEffect(() => {
    if (myRef.current) {
      myRef.current.play();
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
    <div className="audio-modal-alignment">
      <audio
        ref={myRef}
        src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
      />
      <div className="audio-modal">
        <div>
          <div className="out-going-call">
            <p>Incoming call</p>
          </div>
          <div className="audio-chat-alignment-image">
            <img src={callData?.loginUser?.profileImage} alt="ProfileImage" />
          </div>

          <div className="out-going-call call-person-alignment">
            {console.log(
              "callData?.loginUser?",
              callData?.loginUser?.currentRole
            )}
            <p>{callData?.loginUser?.currentRole}</p>
          </div>
          <div className="all-call-button-center">
            <div
              className="call-end-button call-icon-rotate"
              onClick={() => rejectCallRequestFunction()}
              // onClick={() => setCallCut(!callCut)}
            >
              <i class="fas fa-phone"></i>
            </div>
            <div
              className="call-revice-button"
              onClick={() => {
                acceptCallRequestFunction();
                myRef.current.pause();
              }}
            >
              <i class="fas fa-phone"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceivedCallScreen;
