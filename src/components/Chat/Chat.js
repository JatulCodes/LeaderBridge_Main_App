import React, { useContext, useEffect, useState } from "react";
import "./Chat.scss";
import { ApiPost, ApiGet, ApiPut } from "../../Helpers/Api/ApiData";
import ChatMessages from "./ChatMessages";
import { useLocation } from "react-router";

import Logo from "../../Assets/Images/logo.png";
import useLastMessages from "../../Helpers/useLastMessages";
import Auth from "../../Helpers/auth";
import useCallFunction from "../../Helpers/useCallFunction";
import MakeCallScreen from "./MakeCallScreen";
import ReceivedCallScreen from "./ReceivedCallScreen";
import ReceivedVideoCallScreen from "./ReceivedVideoCallScreen";
import AudioCallScreen from "./AudioCallScreen";
import axios from "axios";
import moment from "moment";
import { DataLoaded } from "../../App";

const kAppId = "61ea755745d53614a51778c3";
const kAppkey = "PuZetuSa4yYuNaduSaZuBuRyHabasebuRy2a";

export default function Chat() {
  const location = useLocation();
  const [roomId, setRoomId] = useState();
  const [searchInputShow, setSearchInputShow] = useState(false);
  const [connections, setConnections] = useState([]);
  // const [activeUser, setActiveUser] = useState();
  const [searchInput, setSearchInput] = useState();
  const [searchResults, setSearchResults] = useState([]);

  const [blockUserModel, setBlockUserModel] = useState(false);
  const [shareEmailModel, setShareEMailModel] = useState(false);
  const [confirmShareEmail, setConfirmShareEmail] = useState(false);

  const [chatId, setChatId] = useState("");

  const [lastChangeData, setLastChangeData] = useState(false);
  const [userId, setUserId] = useState("");

  const { message } = useLastMessages(lastChangeData);

  const [callToken, setCallToken] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userData"));

  const {
    answer,
    myquery,
    request,
    answerLaterUser,
    ContentPopupFun,
    SwipContentFun,
    ActiveData,
    CallcutData,
    ChatCallData,
    ChatacceptData,
    ChatReject,
  } = useContext(DataLoaded);

  const [activeUser, setActiveUser] = ActiveData;
  const [callCut, setCallCut] = CallcutData;
  const [callData, setCallData] = ChatCallData;
  const [acceptData, setAcceptData] = ChatacceptData;
  const [rejectData, setRejectData] = ChatReject;
  // const [callCut, setCallCut] = useState(true);
  const { makeCallRequest, acceptCallRequest, rejectCallRequest, BlockUser } =
    useCallFunction(
      userId,
      setBlockUserModel,
      setLastChangeData,
      lastChangeData
    );

  useEffect(() => {
    getConnections();
    document.title = "Messaging | LeaderBridge";
    activeUser && setRoomId(activeUser?._id);
  }, [activeUser, message]);

  useEffect(() => {}, []);

  useEffect(() => {
    const uData = Auth.getUserData();
    setUserId(uData?._id);
    getCallToken(uData?._id);
  }, []);

  useEffect(() => {
    setCallData();
    setAcceptData();
    setRejectData();
  }, [rejectData]);

  const getCallToken = (id) => {
    ApiGet(`user/agora?channelName=${id}`).then((res) => {
      console.log("11111111111111111111", res);
      setCallToken(res?.data?.payload?.token);
    });
  };

  const makeCallRequestFunction = (isVideo) => {
    console.log("isVideo", isVideo);
    makeCallRequest(
      userId,
      activeUser?.participateIds[0]?._id,
      isVideo,
      callToken
    );
  };
  const acceptCallRequestFunction = () => {
    acceptCallRequest(callData);
  };
  const rejectCallRequestFunction = () => {
    rejectCallRequest(callData);
  };

  const manageBlockUseModel = () => {
    setBlockUserModel(!blockUserModel);
  };

  const manageShareEmail = () => {
    setShareEMailModel(!shareEmailModel);
  };

  const getConnections = () => {
    const connections = message || [];
    setConnections(connections);
    setSearchResults(connections);

    // location?.state?.user_id is meatingId
    if (
      location?.state?.user_id &&
      message.length > 0 &&
      chatId != location?.state?.user_id
    ) {
      const activeUser = [...message].filter(
        (con) => con?._id === location?.state?.user_id
      );

      activeUser && setActiveUser(activeUser[0]);
      setChatId(location?.state?.user_id);
    } else {
      // setActiveUser(connections?.[0]);
    }
  };

  useEffect(() => {
    if (searchInput) {
      const searchData = connections.filter((con) => {
        const filterArray = con?.participateIds[0]?.subject?.filter((sub) =>
          sub.toLowerCase().includes(searchInput.toLowerCase())
        );

        if (filterArray.length > 0) {
          return con;
        }
      });
      setSearchResults(searchData);
    } else {
      setSearchResults(connections);
    }
  }, [searchInput]);

  useEffect(() => {
    getConnections();
  }, [message]);

  useEffect(() => {}, [chatId]);

  const blockUser = () => {
    if (activeUser?.participateIds[0]?._id) {
      BlockUser(activeUser?.participateIds[0]?._id);
    }
  };

  const stopShareEmail = () => {
    setConfirmShareEmail(false);
  };

  // sort by searchResults

  searchResults?.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return (
      new Date(b?.lastMessage?.createdAt) - new Date(a?.lastMessage?.createdAt)
    );
  });

  return (
    <div>
      <section className="chat-section-align">
        <div className="container-fluid-width">
          <div className="chat-grid">
            <div className="chat-grid-items">
              <div className="search-toogle-height">
                <div className="message-search">
                  <h4>Messages</h4>
                  <div
                    className="search-icon-design"
                    onClick={() => setSearchInputShow(!searchInputShow)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="css-i6dzq1"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                </div>
                <div
                  className={
                    searchInputShow ? "sub-search" : "sub-search-hidden"
                  }
                >
                  <input
                    type="search"
                    onChange={(e) => setSearchInput(e?.target?.value)}
                    placeholder="Search User ..."
                  />
                </div>
              </div>
              <div className="chat-heading-height">
                {searchResults?.length > 0 &&
                  searchResults.map((conection) => {
                    // window.onload = function () {
                    //   if (conection?._id === location?.state?.user_id) {
                    //     alert("hello");
                    //   }
                    // };

                    // Dataconection = conection?._id;

                    // if (conection?._id === location?.state?.user_id) {
                    //   setActiveUser(conection).click();
                    // }

                    return (
                      <div
                        className={`user-heighlight ${
                          activeUser?._id === conection?._id &&
                          "user-heighlight-active"
                        }`}
                        onClick={() => setActiveUser(conection)}
                      >
                        <div className="grid relative">
                          <div className="absolute">
                            <div>
                              {moment(
                                conection?.lastMessage?.createdAt
                              ).fromNow()}
                            </div>
                            <div className="minit">
                              {conection?.matchingRoom === true ? "M" : ""}
                            </div>
                          </div>
                          {/* <img src="https://img.icons8.com/emoji/20/000000/green-circle-emoji.png" /> */}
                          <div
                            className="grid-items"
                            style={{ position: "relative" }}
                          >
                            {conection?.participateIds[0]?.isOnline === true ? (
                              <div className="green-active-round"></div>
                            ) : (
                              <div className="green-active-gray"></div>
                            )}
                            {conection?.participateIds[0]?.profileImage ? (
                              <>
                                <img
                                  src={
                                    conection?.participateIds[0]?.profileImage
                                  }
                                  alt="img"
                                />
                              </>
                            ) : (
                              <img src={Logo} />
                            )}
                          </div>
                          <div className="grid-items">
                            {console.log(
                              "conection?.participateIds",
                              conection?.participateIds
                            )}
                            {conection?.participateIds &&
                              conection?.participateIds[0]?.currentRole && (
                                <p>
                                  {`${conection?.participateIds[0]?.currentRole.substring(
                                    0,
                                    24
                                  )}`}
                                </p>
                              )}

                            {/* count unseen message */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <span>
                                {conection?.lastMessage
                                  ? conection?.lastMessage?.message
                                  : "Click to start new Chat"}
                              </span>
                              {conection?.unseenMessageCount != 0 && (
                                <div className="a-secound-end-side">
                                  <div className="a-secound-red1">
                                    {conection?.unseenMessageCount}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/*  Chat Message goes here */}
            {
              <ChatMessages
                roomId={roomId}
                activeUser={activeUser}
                manageBlockUseModel={manageBlockUseModel}
                manageShareEmail={manageShareEmail}
                stopShareEmail={stopShareEmail}
                confirmShareEmail={confirmShareEmail}
                getConnections={getConnections}
                lastChangeData={lastChangeData}
                setLastChangeData={setLastChangeData}
                makeCallRequestFunction={makeCallRequestFunction}
                acceptCallRequestFunction={acceptCallRequestFunction}
                rejectCallRequestFunction={rejectCallRequestFunction}
                callData={callData}
                acceptData={acceptData}
                rejectData={rejectData}
                setCallData={setCallData}
                setAcceptData={setAcceptData}
                setRejectData={setRejectData}
              />
            }
          </div>
        </div>
        {blockUserModel ? (
          <div className="content-modal">
            <div className="modal-center-align animate__animated animate__zoomIn wow">
              <div className="modal-header">
                <p>Block User</p>
                <div
                  className="close-icon"
                  onClick={() => {
                    setBlockUserModel(!blockUserModel);
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="css-i6dzq1"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
              </div>
              <div className="modal-body">
                <div className="form-group-modal">
                  <p className="delete-text">
                    Sure you want to Block this user?
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <div className="modal-footer-button-alignment">
                  <button
                    className="cancel-button"
                    onClick={() => {
                      setBlockUserModel(!blockUserModel);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="send-button"
                    onClick={(e) => {
                      blockUser();
                    }}
                    autoFocus
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {shareEmailModel ? (
          <div className="content-modal">
            <div className="modal-center-align animate__animated animate__zoomIn wow">
              <div className="modal-header">
                <p>Share Email</p>
                <div
                  className="close-icon"
                  onClick={() => {
                    setShareEMailModel(!shareEmailModel);
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="css-i6dzq1"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
              </div>
              <div className="modal-body">
                <div className="form-group-modal">
                  <p className="delete-text">
                    Are you sure you want to share your Email ?
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <div className="modal-footer-button-alignment">
                  <button
                    className="cancel-button"
                    onClick={() => {
                      setShareEMailModel(!shareEmailModel);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="send-button"
                    onClick={(e) => {
                      setConfirmShareEmail(true);
                      setShareEMailModel(false);
                    }}
                    autoFocus
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* {callData &&
          callData?.otherId != userId &&
          callData?.channelName == userId && (
            <MakeCallScreen
              rejectCallRequestFunction={rejectCallRequestFunction}
              callData={callData}
              rejectData={rejectData}
            />
          )} */}
        {/* call revice screen */}

        {/* {callData &&
          callData?.otherId == userId &&
          callData?.channelName != userId && (
            <ReceivedCallScreen
              acceptCallRequestFunction={acceptCallRequestFunction}
              rejectCallRequestFunction={rejectCallRequestFunction}
              rejectData={rejectData}
              callData={callData}
              userId={userId}
            />
          )} */}

        {/* video call screen */}
        {/* {acceptData && acceptData?.isForVideoCall == true && (
          <ReceivedVideoCallScreen
            rejectCallRequestFunction={rejectCallRequestFunction}
            callData={callData}
            userInfo={userInfo}
            activeUser={activeUser}
            callCut={callCut}
            setCallCut={setCallCut}
          />
        )} */}

        {/* audio call Screen */}
        {/* {acceptData && acceptData?.isForVideoCall == false && (
          <AudioCallScreen
            rejectCallRequestFunction={rejectCallRequestFunction}
            callData={callData}
            userId={userId}
          />
        )} */}
      </section>
    </div>
  );
}
