import moment from "moment";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import UserProfile from "../../Assets/Images/user-profile.png";

export const RoomsList = ({
  answerRooms,
  setIdForAnswer,
  setChatData,
  setUserIdForProfileAccess,
}) => {
  const Data = answerRooms?.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return (
      new Date(b?.lastMessage?.createdAt) - new Date(a?.lastMessage?.createdAt)
    );
  });

  console.log(Data, "answerRooms----->");
  return (
    <div className="profile-image-text-full-height">
      {answerRooms?.length > 0 &&
        answerRooms?.map((userInfo, i) => {
          console.log("userInfo", userInfo);
          return (
            <div
              className="profile-grid "
              onClick={() => {
                setIdForAnswer(userInfo._id);
                setChatData(userInfo);
                setUserIdForProfileAccess(userInfo?.createdBy?._id);
                console.log("userInfo._id", userInfo._id);
              }}
            >
              <div
                className="profile-grid-items"
                style={{ position: "relative" }}
              >
                {userInfo?.createdBy && userInfo?.createdBy?.profileImage ? (
                  <img
                    src={userInfo?.createdBy?.profileImage}
                    alt="UserProfile"
                  />
                ) : (
                  <img src={UserProfile} alt="UserProfile" />
                )}
                {/* <div className="green-active-round"></div> */}
              </div>
              <div className="profile-grid-items">
                <p>
                  {userInfo?.createdBy &&
                    userInfo?.createdBy?.currentRole &&
                    userInfo?.createdBy?.currentRole}
                </p>
                <span>{userInfo?.lastMessage?.answer}</span>
              </div>
              <div className="profile-grid-items">
                {/* <span>{moment(userInfo?.createdAt).fromNow()}</span> */}
                <span>
                  {/* <ReactTimeAgo
                    date={userInfo?.lastMessage?.createdAt}
                    locale="en-US"
                    timeStyle="twitter-first-minute"
                  /> */}

                  {moment(userInfo?.lastMessage?.createdAt).fromNow()}
                </span>
                {/* <div className="a-secound-end-side">
                  <div className="a-secound-red"></div>
                </div> */}
              </div>
            </div>
          );
        })}
    </div>
  );
};
