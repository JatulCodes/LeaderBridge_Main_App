/// chat messages

import React, { useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router";
import "./Chat.scss";
import useChat from "../../Helpers/useChat";
import moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import Auth from "../../Helpers/auth";

import Logo from "../../Assets/Images/logo.png";
import RequestImage from "../../Assets/Images/request.png";
import ProfileImage from "../../Assets/Images/ProfileImg.png";
import { ApiDelete, ApiGet, ApiPost, ApiPut } from "../../Helpers/Api/ApiData";
import { toast, ToastContainer } from "react-toastify";
import { color } from "@mui/system";
import MakeCallScreen from "./MakeCallScreen";
import ReceivedCallScreen from "./ReceivedCallScreen";
import AudioCallScreen from "./AudioCallScreen";
import ReceivedVideoCallScreen from "./ReceivedVideoCallScreen";
import ShowCall from "../../Assets/Images/showcall.gif";
import ShowCallVideo from "../../Assets/Images/showvideo.gif";
import ShowVideoGreen from "../../Assets/Images/greenvideo.png";
import ShowVideoGrenAudio from "../../Assets/Images/audioCall.png";
import {
  FacebookCircularProgressChange,
  FacebookCircularProgress,
  FacebookCircularProgressAnswer,
} from "../../Loader/FacebookCircularProgress";
function ChatMessages({
  roomId,
  activeUser,
  manageBlockUseModel,
  manageShareEmail,
  stopShareEmail,
  confirmShareEmail,
  getConnections,
  lastChangeData,
  setLastChangeData,
  makeCallRequestFunction,
}) {
  const location = useLocation();
  const history = useHistory();
  const [changeData, setChangeData] = useState(false);
  const [answerReplayMenu, setAnswerReplayMenu] = useState("");
  const [displayStarMessagesList, setDisplayStarMessagesList] = useState(false);
  const [WithdrawModel, setwithdrawModel] = useState(false);
  const [customMessage, setCustomMessage] = useState(
    "Hi, I want to connect with you .."
  );
  const [QuestionReqest, setQuestionReqution] = useState(false);

  const [RequestID, setRequestID] = useState();
  const [videoChat, setVideoChat] = useState();
  const [declineReqesutvideo, setdeclineReqesutvideo] = useState();
  const [declineReqesutaudio, setdeclineReqesutaudio] = useState();
  const [QuestReqest, setQuestReqest] = useState();
  const [declineReqesut, setdeclineReqesut] = useState();
  const [audioLoader, setAudioLoader] = useState(false);
  const [videoLoader, setVideoLoader] = useState(false);
  const {
    messages,
    dataToCheckProfileRequest,
    requestedBy,
    sendMessage,
    newRequest,
    newDeclineRequest,
    accepTrequestChat,
    blockUser,
    Friend,
    starMessage,
    ControlChat,
    sendConnection,
    SentConnectionData,
    withdrawRequestData,
    setMessages,
  } = useChat(
    roomId,
    changeData,
    displayStarMessagesList,
    lastChangeData,
    setLastChangeData,
    setChangeData,
    setAnswerReplayMenu,
    setCustomMessage,
    setwithdrawModel,
    setRequestID,
    setVideoChat,
    setdeclineReqesutaudio,
    setdeclineReqesutvideo,
    setQuestReqest,
    setdeclineReqesut,
    setQuestionReqution,
    setAudioLoader,
    setVideoLoader
  );

  const [sendMsg, setSendMsg] = useState();
  const userInfo = JSON.parse(localStorage.getItem("userData"));

  const [answerParentId, setAnswerParentId] = useState("");
  const [AnswerCreated, setAnswerCreated] = useState("");
  const [AnswerRes, setAnswerRes] = useState("");
  const [editMessageId, setEditMessageId] = useState("");
  const [userMenu, setUserMenu] = useState(false);
  const [EditMessagetext, setEditMessagetext] = useState("");

  const [userId, setUserId] = useState("");

  const dropdown = useRef(null);
  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!userMenu) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setUserMenu(!userMenu);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [userMenu]);

  useEffect(() => {}, [messages]);

  const handleSendMessage = () => {
    if (sendMsg.trim() == "") {
      return;
    }

    setMessages((item) => [
      ...item,
      {
        message: sendMsg,
        sender: userInfo._id,
        seenBy: [],
        deliveredTo: [],
        sentTo: [],
        isActive: true,
        isStar: false,
        starredBy: [],
        isUpdated: false,
        status: false,
        parentMessageId: null,
        _id:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        roomId: roomId,
        type: "string",
        MessageLoading: true,
        createdAt: moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      },
    ]);

    sendMsg && sendMessage(sendMsg, null);

    setSendMsg("");
  };

  console.log("messages", messages);

  const handleSendMessageWithParentId = () => {
    sendMsg && sendMessage(sendMsg, answerParentId);
    setAnswerParentId("");
    setAnswerCreated("");
    setAnswerRes("");
    setSendMsg("");
  };

  useEffect(() => {
    setAnswerReplayMenu("");
    setAnswerParentId("");
    setAnswerCreated("");
    setAnswerRes("");
    setEditMessageId("");
  }, [roomId]);

  useEffect(() => {
    setChangeData(!changeData);
  }, [displayStarMessagesList]);

  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (confirmShareEmail === true) {
      sendMessage(
        `Sharing my Email: ${userData?.email}
      `,
        null
      );
      stopShareEmail();
    }
  }, [confirmShareEmail]);

  const [StarUserId, setStarUserId] = useState();
  const setStarMessage = (id, star, sender) => {
    ApiPut(`chat/star/id=${id}/userId=${userId}`, { star: star }).then(
      (res) => {
        setAnswerReplayMenu("");
        setChangeData(!changeData);
        setStarUserId(sender);
      }
    );
    // starMessage(id, userId, star);
  };

  const updateChatMessage = () => {
    if (sendMsg.trim() == "") {
      return;
    }

    ApiPut(`chat/id=${editMessageId}`, { message: sendMsg }).then((res) => {
      setSendMsg("");
      setEditMessageId("");
      setChangeData(!changeData);
      setLastChangeData(!lastChangeData);
    });
  };

  const requestAccess = (type) => {
    newRequest(activeUser?.participateIds[0]?._id, type);
  };

  const acceptAccess = (requestId, type, data) => {
    accepTrequestChat(requestId, type, data);
    // setRequestID();
    // newRequest(requestId);
  };

  const declineAccess = (requestId, type) => {
    newDeclineRequest(requestId, type);
  };

  const muteNotification = () => {
    ApiPut(`chat/mute/id=${roomId}`).then((res) => {
      setLastChangeData(!lastChangeData);
      // setActiveuser(res?.data?.payload?.muteRoom?.mutedBy);
    });
  };
  const unmuteNotification = () => {
    ApiPut(`chat/un-mute/id=${roomId}`).then((res) => {
      setLastChangeData(!lastChangeData);
      // setActiveuser(res?.data?.payload?.unMuteRoom?.mutedBy);
    });
  };

  // const concernedElement = document.getElementById("click-text");

  // document?.addEventListener("mousedown", (event) => {
  //   if (concernedElement?.contains(event.target)) {
  //     console.log("Clicked Inside");
  //   } else {
  //     // console.log("Clicked Outside / Elsewhere");
  //     setAnswerReplayMenu("");
  //   }
  // });

  useEffect(() => {
    // setActiveuser(activeUser?.chat?.mutedBy);
  }, [activeUser]);

  useEffect(() => {
    const uData = Auth.getUserData();
    setUserId(uData?._id);
  }, []);
  const [openConnectionModal, setOpenConnectionModal] = useState(false);

  const [withdraw, setwithdraw] = useState();
  const sendConnectRequest = async () => {
    sendConnection(activeUser?.participateIds[0]?._id, customMessage);
  };

  const [requestProfile, setRequestProfile] = useState();

  const Obj = {
    message: "You have Requested For ProfileAccess",
    status: "pending",
  };

  const AllMessagesSeen = (message) => {
    if (activeUser?.participateIds[0]?._id) {
      if (message && message?.MessageLoading) {
        return (
          <>
            <div className="timerIcon">
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="14px"
                height="14px"
              >
                <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z" />
              </svg>
            </div>
          </>
        );
      } else {
        if (
          message &&
          message?.seenBy.length != 0 &&
          message?.seenBy[0] == activeUser?.participateIds[0]?._id
        ) {
          return (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="14"
                height="14"
                viewBox="0 0 172 172"
                // style=" fill:#000000;"
                style={{ fill: "#000000" }}
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <path d="M0,172v-172h172v172z" fill="none"></path>
                  <g fill="#2ecc71">
                    <path d="M130.3975,30.8525c-0.14781,0.02688 -0.29562,0.06719 -0.43,0.1075c-0.77937,0.18813 -1.46469,0.645 -1.935,1.29l-83.5275,100.19l-38.5925,-38.5925c-1.37062,-1.37062 -3.57437,-1.37062 -4.945,0c-1.37063,1.37063 -1.37063,3.57438 0,4.945l41.28,41.28c0.69875,0.69875 1.66625,1.075 2.64719,1.00781c0.99438,-0.06719 1.90813,-0.55094 2.51281,-1.33031l86,-103.2c0.95406,-1.075 1.14219,-2.62031 0.47031,-3.89687c-0.67188,-1.26313 -2.05594,-1.98875 -3.48031,-1.80063zM168.2375,30.8525c-0.14781,0.02688 -0.29562,0.06719 -0.43,0.1075c-0.77937,0.18813 -1.46469,0.645 -1.935,1.29l-83.5275,100.19l-8.815,-8.7075c-0.83312,-1.02125 -2.16344,-1.49156 -3.45344,-1.19594c-1.27656,0.29562 -2.28438,1.30344 -2.58,2.58c-0.29563,1.29 0.17469,2.62031 1.19594,3.45344l11.395,11.5025c0.69875,0.69875 1.66625,1.075 2.64719,1.00781c0.99438,-0.06719 1.90813,-0.55094 2.51281,-1.33031l86,-103.2c0.95406,-1.075 1.14219,-2.62031 0.47031,-3.89687c-0.67188,-1.26313 -2.05594,-1.98875 -3.48031,-1.80063z"></path>
                  </g>
                </g>
              </svg>
            </>
          );
        } else if (
          message?.seenBy.length == 0 &&
          message?.deliveredTo[0] == activeUser?.participateIds[0]?._id
        ) {
          return (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="14"
                height="14"
                viewBox="0 0 172 172"
                // style=" fill:#000000;"
                style={{ fill: "#000000" }}
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <path d="M0,172v-172h172v172z" fill="none"></path>
                  <g fill="#ffffff">
                    <path d="M130.3975,30.8525c-0.14781,0.02688 -0.29562,0.06719 -0.43,0.1075c-0.77937,0.18813 -1.46469,0.645 -1.935,1.29l-83.5275,100.19l-38.5925,-38.5925c-1.37062,-1.37062 -3.57437,-1.37062 -4.945,0c-1.37063,1.37063 -1.37063,3.57438 0,4.945l41.28,41.28c0.69875,0.69875 1.66625,1.075 2.64719,1.00781c0.99438,-0.06719 1.90813,-0.55094 2.51281,-1.33031l86,-103.2c0.95406,-1.075 1.14219,-2.62031 0.47031,-3.89687c-0.67188,-1.26313 -2.05594,-1.98875 -3.48031,-1.80063zM168.2375,30.8525c-0.14781,0.02688 -0.29562,0.06719 -0.43,0.1075c-0.77937,0.18813 -1.46469,0.645 -1.935,1.29l-83.5275,100.19l-8.815,-8.7075c-0.83312,-1.02125 -2.16344,-1.49156 -3.45344,-1.19594c-1.27656,0.29562 -2.28438,1.30344 -2.58,2.58c-0.29563,1.29 0.17469,2.62031 1.19594,3.45344l11.395,11.5025c0.69875,0.69875 1.66625,1.075 2.64719,1.00781c0.99438,-0.06719 1.90813,-0.55094 2.51281,-1.33031l86,-103.2c0.95406,-1.075 1.14219,-2.62031 0.47031,-3.89687c-0.67188,-1.26313 -2.05594,-1.98875 -3.48031,-1.80063z"></path>
                  </g>
                </g>
              </svg>
            </>
          );
        } else if (
          message?.seenBy?.length == 0 &&
          message?.deliveredTo?.length == 0 &&
          message?.sentTo[0] == activeUser?.participateIds[0]?._id
        ) {
          return (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="22"
                height="22"
                viewBox="0 0 172 172"
                // style=" fill:#000000;"
                style={{ fill: "#000000" }}
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <path d="M0,172v-172h172v172z" fill="none"></path>
                  <g fill="#ffffff">
                    <path d="M53.00467,79.82233l21.5,21.5c0.68083,0.67367 1.591,1.0535 2.55133,1.0535c0.95317,-0.00717 1.86333,-0.387 2.537,-1.06783l39.41667,-39.91117c1.39033,-1.41183 1.376,-3.68367 -0.03583,-5.06683c-1.40467,-1.39033 -3.6765,-1.376 -5.06683,0.02867l-36.87967,37.3455l-18.94867,-18.94867c-1.40467,-1.3975 -3.66933,-1.3975 -5.074,0c-1.3975,1.3975 -1.3975,3.66933 0,5.06683z"></path>
                  </g>
                </g>
              </svg>
            </>
          );
        }
      }
    }
  };

  const handleClickData = (id, data, nameId) => {
    setEditMessageId("");
    setAnswerParentId(id);
    setAnswerCreated(nameId);
    setAnswerRes(data);
    setAnswerReplayMenu("");
  };

  const AllMessages = (message, i) => {
    function isValidURL(text) {
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '">' + url + "</a>";
      });
    }

    var text = `${message?.message}`;
    var html = isValidURL(text);
    console.log("messagesDDD", message);
    if (message?.sender == userInfo?._id) {
      return (
        <div className="full-message-one ">
          <div className="short-message-one">
            {/* <div className="sent-time">{moment(date).fromNow()}</div> */}
            <div className="top-message-part">
              <span>
                {moment(message?.createdAt).fromNow()}
                {message?.isUpdated === true && "(edited)"}
              </span>

              <>
                <span
                  onClick={() => {
                    console.log("11111111111111111");
                    if (message && !message?.MessageLoading) {
                      if (answerReplayMenu == message?._id) {
                        setAnswerReplayMenu("");
                      } else {
                        setAnswerReplayMenu(message?._id);
                      }
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-more-horizontal horizon-three-dots"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </span>
              </>
            </div>

            <p>
              {message?.parentMessageId ? (
                <div
                  style={{
                    backgroundColor: "#ffffff7a",
                    padding: "5px 10px",
                    "margin-bottom": "3px",
                    "border-bottom": "2px solid #a2a4bb",
                    "border-radius": "10px",
                  }}
                >
                  {message?.parentMessageId?.message}
                </div>
              ) : (
                ""
              )}

              <>
                <div
                  // style={{ color: "#2234c0", cursor: "pointer" }}
                  style={{ cursor: "pointer" }}
                  onClick={() => window.open(message?.message)}
                >
                  {/* {message?.message}
                   */}
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
              </>

              {/* <div>{message?.message}</div> */}
              <div className="message-image-container-seen">
                {AllMessagesSeen(message)}
              </div>

              {message?.starredBy?.map((item) => {
                return (
                  <>
                    {item == userId && (
                      <>
                        <div className="star-chat-design">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-star star-messages"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        </div>
                      </>
                    )}
                  </>
                );
              })}
            </p>
            {console.log("answerReplayMenu", answerReplayMenu)}
            <div
              className={
                answerReplayMenu == message?._id
                  ? "chat-menu-design chat-menu-design-show-top-align"
                  : "chat-menu-design chat-menu-design-hidden"
              }
            >
              <div className="chat-answer-menu-design-new">
                <div
                  className="alignment-answer-all"
                  onClick={() => {
                    setStarMessage(
                      message?._id,
                      !message?.isStar,
                      message?.sender
                    );
                  }}
                >
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-star"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <div className="text">
                    <span>
                      {message?.starredBy?.length == 0 && "Star Message"}
                      {message?.starredBy?.length != 2 ? (
                        <>
                          {message?.starredBy?.map((item) => {
                            return (
                              <>
                                {item == userId
                                  ? "Unstar Message"
                                  : "Star Message"}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        "Unstar Message"
                      )}
                    </span>
                  </div>
                </div>
                <div
                  className="alignment-answer-all"
                  onClick={() => {
                    setEditMessageId(message?._id);
                    setEditMessagetext(message?.message);
                    setAnswerParentId("");
                    setAnswerCreated("");
                    setAnswerReplayMenu("");
                  }}
                >
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-edit-2"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                    </svg>
                  </div>
                  <div className="text">
                    <span>Edit </span>
                  </div>
                </div>
                <div
                  className="alignment-answer-all"
                  onClick={() => {
                    handleClickData(
                      message?._id,
                      message?.message,
                      message?.sender
                    );
                  }}
                >
                  <div className="icon">
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
                      <polyline points="15 10 20 15 15 20"></polyline>
                      <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
                    </svg>
                  </div>
                  <div className="text">
                    <span>Reply</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (message?.sender) {
      return (
        <>
          <div className="full-message">
            <div>
              <div className="short-message">
                {/* <div className="sent-time">{moment(date).fromNow()}</div> */}
                <div className="top-message-part">
                  <span>
                    {moment(message?.createdAt).fromNow()}
                    {message?.isUpdated === true && "(edited)"}
                  </span>
                  <span
                    onClick={() => {
                      if (answerReplayMenu == message?._id) {
                        setAnswerReplayMenu("");
                      } else {
                        setAnswerReplayMenu(message?._id);
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-more-horizontal horizon-three-dots"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </span>
                </div>
                <p>
                  {message?.parentMessageId ? (
                    <div
                      style={{
                        backgroundColor: "#ffffff7a",
                        padding: "5px 10px",
                        "margin-bottom": "3px",
                        "border-bottom": "2px solid #a2a4bb",
                        "border-radius": "10px",
                      }}
                    >
                      {message?.parentMessageId?.message}
                    </div>
                  ) : (
                    ""
                  )}

                  {isValidURL(message?.message) ? (
                    <>
                      <div
                        // style={{ color: "#2234c0", cursor: "pointer" }}
                        style={{ cursor: "pointer" }}
                        onClick={() => window.open(message?.message)}
                      >
                        {message?.message}
                      </div>
                    </>
                  ) : (
                    <>
                      <div>{message?.message}</div>
                    </>
                  )}

                  {message?.starredBy?.map((item) => {
                    return (
                      <>
                        {item == userId && (
                          <>
                            <div className="star-chat-design">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-star star-messages"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                            </div>
                          </>
                        )}
                      </>
                    );
                  })}
                </p>

                <div
                  className={
                    answerReplayMenu == message?._id
                      ? "chat-menu-design chat-menu-design-show-top-align"
                      : "chat-menu-design chat-menu-design-hidden"
                  }
                >
                  <div className="chat-answer-menu-design-new">
                    <div
                      className="alignment-answer-all"
                      onClick={() =>
                        setStarMessage(message?._id, !message?.isStar)
                      }
                    >
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-star"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      </div>
                      <div className="text">
                        {message?.starredBy?.length == 0 && "Star Message"}
                        {message?.starredBy?.length != 2 ? (
                          <>
                            {message?.starredBy?.map((item) => {
                              return (
                                <>
                                  {item == userId
                                    ? "Unstar Message"
                                    : "Star Message"}
                                </>
                              );
                            })}
                          </>
                        ) : (
                          "Unstar Message"
                        )}
                      </div>
                    </div>
                    <div
                      className="alignment-answer-all"
                      onClick={() => {
                        console.log("messageEEEEEEEEE", message);
                        handleClickData(message?._id, message?.message);
                      }}
                    >
                      <div className="icon">
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
                          <polyline points="15 10 20 15 15 20"></polyline>
                          <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
                        </svg>
                      </div>
                      <div className="text">
                        <span>Reply</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestBy?._id == userId &&
      message?.status === "pending" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestProfileAccess"
    ) {
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You sent a profile access request</h1>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestBy?._id == userId &&
      message?.status === "pending" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestAudioAccess"
    ) {
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You sent an audio call request</h1>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestBy?._id == userId &&
      message?.status === "pending" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestVideoAccess"
    ) {
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You sent an video call request</h1>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestTo?._id == userId &&
      message?.status === "pending" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestProfileAccess"
    ) {
      const UserProfile = JSON.parse(localStorage.getItem("userData"));
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You received a request for accessing your profile</h1>
                <div className="mb-button-center-req">
                  {QuestReqest == message?._id ? (
                    <button className="light-background">
                      <FacebookCircularProgress />
                    </button>
                  ) : declineReqesut == message?._id ? (
                    <button
                      className="light-background"
                      style={{ opacity: "0.5" }}
                    >
                      Allow
                    </button>
                  ) : (
                    <button
                      className="light-background"
                      onClick={() => {
                        acceptAccess(message?._id, null, "request");
                      }}
                    >
                      Allow
                    </button>
                  )}

                  {declineReqesut == message?._id ? (
                    <button className="dark-background">
                      <FacebookCircularProgressChange />
                    </button>
                  ) : QuestReqest == message?._id ? (
                    <button
                      className="dark-background"
                      style={{ opacity: "0.5" }}
                    >
                      Reject
                    </button>
                  ) : (
                    <button
                      className="dark-background"
                      onClick={() => {
                        declineAccess(message?._id, "request");
                      }}
                    >
                      Reject
                    </button>
                  )}

                  {/* <button
                    className="dark-background"
                    onClick={() => {
                      declineAccess(message?._id, null, "request");
                    }}
                  >
                    Reject
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestTo?._id == userId &&
      message?.status === "pending" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestAudioAccess"
    ) {
      const UserProfile = JSON.parse(localStorage.getItem("userData"));
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You received a request for audio call</h1>
                <div className="mb-button-center-req">
                  {console.log("RequestID", RequestID)}
                  {RequestID == message?._id ? (
                    <button className="light-background">
                      <FacebookCircularProgress />
                    </button>
                  ) : declineReqesutaudio == message?._id ? (
                    <button
                      className="light-background"
                      style={{ opacity: "0.5" }}
                    >
                      Allow
                    </button>
                  ) : (
                    <button
                      className="light-background"
                      onClick={() => {
                        acceptAccess(message?._id, null, "audio");
                      }}
                    >
                      Allow
                    </button>
                  )}
                  {/* <button
                    className="light-background"
                    onClick={() => {
                      acceptAccess(message?._id);
                    }}
                  >
                    Allow
                  </button> */}

                  {declineReqesutaudio == message?._id ? (
                    <button className="dark-background">
                      <FacebookCircularProgressChange />
                    </button>
                  ) : RequestID == message?._id ? (
                    <button
                      className="dark-background"
                      style={{ opacity: "0.5" }}
                    >
                      Reject
                    </button>
                  ) : (
                    <button
                      className="dark-background"
                      onClick={() => {
                        declineAccess(message?._id, "audio");
                      }}
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestTo?._id == userId &&
      message?.status === "pending" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestVideoAccess"
    ) {
      const UserProfile = JSON.parse(localStorage.getItem("userData"));
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You received a request for video call</h1>
                <div className="mb-button-center-req">
                  {videoChat == message?._id ? (
                    <button className="light-background">
                      <FacebookCircularProgress color="inherit" />
                    </button>
                  ) : declineReqesutvideo == message?._id ? (
                    <button
                      className="light-background"
                      style={{ opacity: "0.5" }}
                    >
                      Allow
                    </button>
                  ) : (
                    <button
                      className="light-background"
                      // style={{ height: "40px" }}
                      onClick={() => {
                        acceptAccess(message?._id, null, "video");
                      }}
                    >
                      Allow
                    </button>
                  )}

                  {declineReqesutvideo == message?._id ? (
                    <button className="dark-background">
                      <FacebookCircularProgressChange />
                    </button>
                  ) : videoChat == message?._id ? (
                    <button
                      className="dark-background"
                      style={{ opacity: "0.5" }}
                    >
                      Reject
                    </button>
                  ) : (
                    <button
                      className="dark-background"
                      onClick={() => {
                        declineAccess(message?._id, "video");
                      }}
                    >
                      Reject
                    </button>
                  )}

                  {/* <button
                    className="dark-background"
                    onClick={() => {
                      declineAccess(message?._id);
                    }}
                  >
                    Reject
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestBy?._id == userId &&
      message?.status === "accepted" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestProfileAccess"
    ) {
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
            style={{ padding: "0 0 20px 0" }}
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You sent a request for accessing your profile</h1>
                <h1 style={{ paddingLeft: "96px" }}>Request accepted</h1>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestBy?._id == userId &&
      message?.status === "accepted" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestAudioAccess"
    ) {
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
            style={{ padding: "0 0 20px 0" }}
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You sent a request for audio call</h1>
                <h1 style={{ paddingLeft: "57px" }}>Request accepted</h1>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestBy?._id == userId &&
      message?.status === "accepted" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestVideoAccess"
    ) {
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
            style={{ padding: "0 0 20px 0" }}
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You received a request for video call</h1>
                <h1 style={{ paddingLeft: "57px" }}>Request accepted</h1>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestTo?._id == userId &&
      message?.status === "accepted" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestProfileAccess"
    ) {
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You received a request for accessing your profile</h1>
                <h1 style={{ paddingLeft: "67px" }}>Request accepted</h1>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestTo?._id == userId &&
      message?.status === "accepted" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestAudioAccess"
    ) {
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You received a request for audio call</h1>
                <h1 style={{ paddingLeft: "67px" }}>Request accepted</h1>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestTo?._id == userId &&
      message?.status === "accepted" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestVideoAccess"
    ) {
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You received a request for video call</h1>
                <h1 style={{ paddingLeft: "67px" }}>Request accepted</h1>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestBy?._id == userId &&
      message?.status === "decline" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestProfileAccess"
    ) {
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You sent a request for accessing your profile</h1>
                <h1 style={{ paddingLeft: "85px" }}>Request rejected</h1>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestBy?._id == userId &&
      message?.status === "decline" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestAudioAccess"
    ) {
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You sent a request for audio call</h1>
                <h1 style={{ paddingLeft: "67px" }}>Request rejected</h1>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestBy?._id == userId &&
      message?.status === "decline" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestVideoAccess"
    ) {
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You sent a request for video call</h1>
                <h1 style={{ paddingLeft: "67px" }}>Request rejected</h1>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestTo?._id == userId &&
      message?.status === "decline" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestProfileAccess"
    ) {
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You received a request for accessing your profile</h1>
                <h1 style={{ paddingLeft: "97px" }}>Request rejected</h1>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      message?.requestTo?._id == userId &&
      message?.status === "decline" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestAudioAccess"
    ) {
      return (
        <>
          <>
            <div
              className="request-center-message-alignment animate__animated animate__slideInRight wow"
              data-wow-offset="200"
            >
              <div>
                <div className="mb-profile-center">
                  <div className="sect-m-profile">
                    <img src={message?.requestTo?.profileImage} />
                  </div>
                  <div className="sect-m-profile">
                    <img src={message?.requestBy?.profileImage} />
                  </div>
                </div>
                <div>
                  <h1>you received a request for audio call</h1>
                  <h1 style={{ paddingLeft: "67px" }}>Request rejected</h1>
                </div>
              </div>
            </div>
          </>
        </>
      );
    } else if (
      message?.requestTo?._id == userId &&
      message?.status === "decline" &&
      !displayStarMessagesList &&
      message?.typeOfRequest == "requestVideoAccess"
    ) {
      return (
        <>
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={message?.requestTo?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={message?.requestBy?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You received a request for video call</h1>
                <h1 style={{ paddingLeft: "67px" }}>Request rejected</h1>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  const renderMessage = () => {
    if (requestedBy?.status != "accepted") {
      if (
        requestedBy?.requestBy?._id == userId &&
        requestedBy?.status === "pending"
      ) {
        return (
          <>
            {/* <div
              className="alignment-answer-all"
              onClick={() => {
                setUserMenu(false);
                // requestAccess();
              }}
            >
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-refresh-ccw display-none"
                  id="profile_access_loader"
                >
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <polyline points="23 20 23 14 17 14"></polyline>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                </svg>
              </div>
              <div className="text">
                <span>Requested Profile Access </span>
              </div>
            </div> */}
          </>
        );
      } else if (
        requestedBy?.requestBy?._id != userId &&
        requestedBy?.status === "pending"
      ) {
        return (
          <>
            <div
              className="alignment-answer-all"
              onClick={() => {
                setUserMenu(false);
                // requestAccess();
              }}
            >
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-refresh-ccw display-none"
                  id="profile_access_loader"
                >
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <polyline points="23 20 23 14 17 14"></polyline>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                </svg>
              </div>
              <div className="text">
                <span>Received Profile Access </span>
              </div>
            </div>
          </>
        );
      } else if (requestedBy?.status === "decline") {
        return (
          <>
            <div
              className="alignment-answer-all"
              onClick={() => {
                // setUserMenu(false);
                !QuestionReqest && requestAccess("requestProfileAccess");
              }}
            >
              <div className="icon">
                {QuestionReqest ? (
                  <div className="Loader-spam">
                    <FacebookCircularProgressAnswer />
                  </div>
                ) : (
                  // </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-refresh-ccw display-none"
                    id="profile_access_loader"
                  >
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <polyline points="23 20 23 14 17 14"></polyline>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                  </svg>
                )}
              </div>
              <div className="text">
                {QuestionReqest ? (
                  <span style={{ opacity: "0.5" }}>Request profile access</span>
                ) : (
                  <span
                  // onClick={() => {
                  //   requestProfileAccess(chatData?.createdBy?._id);
                  // }}
                  >
                    Request profile access
                  </span>
                )}
                {/* <span>Request Profile Access </span> */}
              </div>
            </div>
          </>
        );
      }
    } else if (requestedBy?.status == "accepted") {
      if (requestedBy?.acceptedBy == userId) {
        return (
          <>
            <div
              className="alignment-answer-all"
              onClick={() => {
                // setUserMenu(false);
                !QuestionReqest && requestAccess("requestProfileAccess");
              }}
            >
              <div className="icon">
                {QuestionReqest ? (
                  <div className="Loader-spam">
                    <FacebookCircularProgressAnswer />
                  </div>
                ) : (
                  // </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-refresh-ccw display-none"
                    id="profile_access_loader"
                  >
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <polyline points="23 20 23 14 17 14"></polyline>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                  </svg>
                )}
              </div>
              <div className="text">
                {QuestionReqest ? (
                  <span style={{ opacity: "0.5" }}>Request profile access</span>
                ) : (
                  <span
                  // onClick={() => {
                  //   requestProfileAccess(chatData?.createdBy?._id);
                  // }}
                  >
                    Request profile access
                  </span>
                )}
                {/* <span>Request Profile Access </span> */}
              </div>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div
              className="alignment-answer-all"
              onClick={() => {
                history.push(
                  `/view-profile/${activeUser?.participateIds[0]?._id}`
                );
              }}
            >
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-refresh-ccw display-none"
                  id="profile_access_loader"
                >
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <polyline points="23 20 23 14 17 14"></polyline>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                </svg>
              </div>
              <div className="text">
                {/* <span>View profile </span> */}
                <span>View Profile</span>
              </div>
            </div>
          </>
        );
      }
    }
  };

  const AudioRequest = (type) => {
    newRequest(activeUser?.participateIds[0]?._id, type);
  };

  const AudioChatmessage = () => {
    if (
      ControlChat?.requestAudio?.length == 0 ||
      ControlChat?.requestAudio[ControlChat?.requestAudio?.length - 1].status ==
        "revoked" ||
      (!ControlChat?.requestAudio[ControlChat?.requestAudio?.length - 1]
        .requestedBy?.requestBy?._id &&
        ControlChat?.requestAudio[ControlChat?.requestAudio?.length - 1]
          .status != "accepted" &&
        ControlChat?.requestAudio[ControlChat?.requestAudio?.length - 1]
          .status !== "pending")
    ) {
      return (
        <>
          <div
            className="alignment-answer-all"
            onClick={() => {
              // setUserMenu(false);
              !audioLoader && AudioRequest("requestAudioAccess");
            }}
          >
            <div className="icon">
              {audioLoader ? (
                <div className="Loader-spam">
                  <FacebookCircularProgressAnswer />
                </div>
              ) : (
                // </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-refresh-ccw display-none"
                  id="profile_access_loader"
                >
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <polyline points="23 20 23 14 17 14"></polyline>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                </svg>
              )}
            </div>
            <div className="text">
              {audioLoader ? (
                <span style={{ opacity: "0.5" }}>Request Audio Call</span>
              ) : (
                <span
                // onClick={() => {
                //   requestProfileAccess(chatData?.createdBy?._id);
                // }}
                >
                  Request Audio Call
                </span>
              )}
              {/* <span>Request Audio Call </span> */}
            </div>
          </div>
        </>
      );
    } else if (
      ControlChat?.requestAudio[ControlChat?.requestAudio?.length - 1].status ==
      "accepted"
    ) {
      return (
        <>
          <div
            className="alignment-answer-all"
            onClick={() => {
              // setUserMenu(false);
              // requestAccess();
              acceptAccess(
                ControlChat?.requestAudio[ControlChat?.requestAudio?.length - 1]
                  ?._id,
                "revoked"
              );
            }}
          >
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-refresh-ccw display-none"
                id="profile_access_loader"
              >
                <polyline points="1 4 1 10 7 10"></polyline>
                <polyline points="23 20 23 14 17 14"></polyline>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
              </svg>
            </div>
            <div className="text">
              <span>Revoke Audio Call Request </span>
            </div>
          </div>
        </>
      );
    }
  };

  const VideoChatmessage = () => {
    if (
      ControlChat?.requestVideo?.length == 0 ||
      ControlChat?.requestVideo[ControlChat?.requestVideo?.length - 1].status ==
        "revoked" ||
      (!ControlChat?.requestVideo[ControlChat?.requestVideo?.length - 1]
        .requestedBy?.requestBy?._id &&
        ControlChat?.requestVideo[ControlChat?.requestVideo?.length - 1]
          .status != "accepted" &&
        ControlChat?.requestVideo[ControlChat?.requestVideo?.length - 1]
          .status !== "pending")
    ) {
      return (
        <>
          <div
            className="alignment-answer-all"
            onClick={() => {
              // setUserMenu(false);
              !videoLoader && AudioRequest("requestVideoAccess");
            }}
          >
            <div className="icon">
              {videoLoader ? (
                <div className="Loader-spam">
                  <FacebookCircularProgressAnswer />
                </div>
              ) : (
                // </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-refresh-ccw display-none"
                  id="profile_access_loader"
                >
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <polyline points="23 20 23 14 17 14"></polyline>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                </svg>
              )}
            </div>
            <div className="text">
              {videoLoader ? (
                <span style={{ opacity: "0.5" }}>Request Video Call</span>
              ) : (
                <span
                // onClick={() => {
                //   requestProfileAccess(chatData?.createdBy?._id);
                // }}
                >
                  Request Video Call
                </span>
              )}
              {/* <span>Request Audio Call </span> */}
            </div>
          </div>
        </>
      );
    } else if (
      ControlChat?.requestVideo[ControlChat?.requestVideo?.length - 1].status ==
      "accepted"
    ) {
      return (
        <>
          <div
            className="alignment-answer-all"
            onClick={() => {
              // setUserMenu(false);
              // requestAccess();
              acceptAccess(
                ControlChat?.requestVideo[ControlChat?.requestVideo?.length - 1]
                  ?._id,
                "revoked"
              );
            }}
          >
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-refresh-ccw display-none"
                id="profile_access_loader"
              >
                <polyline points="1 4 1 10 7 10"></polyline>
                <polyline points="23 20 23 14 17 14"></polyline>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
              </svg>
            </div>
            <div className="text">
              <span>Revoke Video Call Request </span>
            </div>
          </div>
        </>
      );
    }
  };

  // pending request
  const [sentConnectionList, setSentConnectionList] = useState([]);

  const [WithdrawId, setwithdrawModeliD] = useState();
  const getSentConnectionDetails = async () => {
    // setIsLoaderVisible(true);
    await ApiGet("connection?sent=true")
      .then((res) => {
        setSentConnectionList(res?.data?.payload?.findConnection);

        // setIsLoaderVisible(false);
      })
      .catch((err) => {
        toast.error(err);
        // setIsLoaderVisible(false);
      });
  };

  useEffect(() => {
    setUserMenu(false);
  }, [blockUser == true]);

  const FiltersentConnection = SentConnectionData?.filter((item) => {
    return item?.receiverId?._id == activeUser?.participateIds[0]?._id;
  });

  const withdrawRequest = async () => {
    withdrawRequestData(WithdrawId);
  };

  if (roomId) {
    return (
      <>
        <div className="chat-grid-items">
          <div className="user-details-grid">
            <div>
              <div className="user-details-grid-items back-and-profile-alignment">
                {displayStarMessagesList && (
                  <div
                    className="back-arrow-chat-design"
                    onClick={() => {
                      setDisplayStarMessagesList(!displayStarMessagesList);
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="css-i6dzq1"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </div>
                )}
                <div className="profile-image">
                  {activeUser?.participateIds[0]?.profileImage ? (
                    <img src={activeUser?.participateIds[0]?.profileImage} />
                  ) : (
                    <img src={Logo} />
                  )}
                </div>
                <div
                  className={`user-details-grid-items left-align-text-chat ${
                    requestedBy?.status === "accepted" &&
                    requestedBy?.acceptedBy != userId &&
                    "ChatCursor"
                  } `}
                >
                  <p
                    className="text-capitalize"
                    onClick={() => {
                      requestedBy?.status === "accepted" &&
                        requestedBy?.acceptedBy != userId &&
                        history.push(
                          `/view-profile/${activeUser?.participateIds[0]?._id}`
                        );

                      // if (requestedBy?.status == "accepted") {
                      // } else {
                      // }
                    }}
                  >
                    {activeUser?.participateIds[0]?.currentRole}
                  </p>
                  <span style={{ color: "#adadad" }}>
                    {activeUser?.participateIds[0]?.subject.join(", ")}
                  </span>
                </div>
              </div>

              <ToastContainer />
            </div>

            <div className="user-details-grid-items video-audio-call-alignment">
              {ControlChat?.requestAudio[ControlChat?.requestAudio?.length - 1]
                ?.status == "accepted" && !blockUser ? (
                <div
                  className="audio-icon-design"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    makeCallRequestFunction(false);
                  }}
                >
                  <img
                    src={ShowVideoGrenAudio}
                    style={{ width: "25px", height: "25px" }}
                  />
                  {/* <i class="fas fa-phone-alt"></i> */}
                </div>
              ) : (
                ""
              )}

              {ControlChat?.requestVideo[ControlChat?.requestVideo?.length - 1]
                ?.status == "accepted" && !blockUser ? (
                <div
                  className="video-icon-design"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    makeCallRequestFunction(true);
                  }}
                >
                  {/* <i class="fas fa-video"></i> */}
                  {/* <img src="https://img.icons8.com/ios-glyphs/30/000000/video-call.png" />
                  <i class="fa-solid fa-video"></i> */}
                  <img
                    src={ShowVideoGreen}
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
              ) : (
                ""
              )}

              {!blockUser && (
                <div
                  onClick={() => setUserMenu(!userMenu)}
                  style={{ position: "relative" }}
                >
                  <svg
                    ref={dropdown}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-more-vertical"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </div>
              )}

              <div
                className={
                  userMenu
                    ? "chat-menu-design chat-menu-design-show"
                    : "chat-menu-design chat-menu-design-hidden"
                }
              >
                <div
                  className="chat-answer-menu-design-new"
                  style={{ width: "230px" }}
                >
                  <div
                    className="alignment-answer-all"
                    onClick={() => {
                      setUserMenu(false);
                      manageBlockUseModel();
                    }}
                  >
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-slash"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                      </svg>
                    </div>
                    <div className="text">
                      <span>Block user </span>
                    </div>
                  </div>
                  <div
                    className="alignment-answer-all"
                    onClick={() => {
                      setUserMenu(false);
                      manageShareEmail();
                    }}
                  >
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-user-check"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <polyline points="17 11 19 13 23 9"></polyline>
                      </svg>
                    </div>
                    <div className="text">
                      <span>Share Email </span>
                    </div>
                  </div>
                  {!requestedBy?.requestBy?._id && Friend != "true" ? (
                    <>
                      <div
                        className="alignment-answer-all"
                        onClick={() => {
                          // setUserMenu(false);
                          !QuestionReqest &&
                            requestAccess("requestProfileAccess");
                        }}
                      >
                        <div className="icon">
                          {QuestionReqest ? (
                            <div className="Loader-spam">
                              <FacebookCircularProgressAnswer />
                            </div>
                          ) : (
                            // </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-refresh-ccw display-none"
                              id="profile_access_loader"
                            >
                              <polyline points="1 4 1 10 7 10"></polyline>
                              <polyline points="23 20 23 14 17 14"></polyline>
                              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                            </svg>
                          )}
                        </div>
                        <div className="text">
                          {QuestionReqest ? (
                            <span style={{ opacity: "0.5" }}>
                              Request profile access
                            </span>
                          ) : (
                            <span
                            // onClick={() => {
                            //   requestProfileAccess(chatData?.createdBy?._id);
                            // }}
                            >
                              Request profile access
                            </span>
                          )}
                          {/* <span>Request Profile Access </span> */}
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {/* {ControlChat?.requestAudio?.length == 0 || !ControlChat?.requestAudio[length - 1].requestedBy?.requestBy?._id ? ( } */}

                  {AudioChatmessage()}
                  {VideoChatmessage()}

                  {renderMessage()}

                  {Friend == false ? (
                    <>
                      {FiltersentConnection?.length == 0 ? (
                        <>
                          <div
                            className="alignment-answer-all"
                            onClick={() => {
                              setOpenConnectionModal(!openConnectionModal);
                              // requestAccess();
                            }}
                          >
                            <div className="icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-refresh-ccw display-none"
                                id="profile_access_loader"
                              >
                                <polyline points="1 4 1 10 7 10"></polyline>
                                <polyline points="23 20 23 14 17 14"></polyline>
                                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                              </svg>
                            </div>
                            <div className="text">
                              <span>Send connection request </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div
                          className="alignment-answer-all"
                          onClick={() => {
                            setwithdrawModel(true);
                            setwithdrawModeliD(FiltersentConnection[0]?._id);
                          }}
                        >
                          <div className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-refresh-ccw display-none"
                              id="profile_access_loader"
                            >
                              <polyline points="1 4 1 10 7 10"></polyline>
                              <polyline points="23 20 23 14 17 14"></polyline>
                              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                            </svg>
                          </div>
                          <div className="text">
                            <span>Withdraw request </span>
                          </div>
                        </div>
                      )}
                    </>
                  ) : Friend == "sent" ? (
                    <>
                      <div className="alignment-answer-all">
                        <div className="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-refresh-ccw display-none"
                            id="profile_access_loader"
                          >
                            <polyline points="1 4 1 10 7 10"></polyline>
                            <polyline points="23 20 23 14 17 14"></polyline>
                            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                          </svg>
                        </div>
                        <div className="text">
                          <span>Withdraw Request </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {/* {requestedBy?.sentRequest?.length == 0 || requestedBy?.sentRequest?} */}
                  <div className="alignment-answer-all">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-bell-off"
                      >
                        <path d="M8.56 2.9A7 7 0 0 1 19 9v4m-2 4H2a3 3 0 0 0 3-3V9a7 7 0 0 1 .78-3.22M13.73 21a2 2 0 0 1-3.46 0"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    </div>
                    <div
                      className="text"
                      // onClick={() =>
                      //   activeUser.includes(userId)
                      //     ? (setUserMenu(false), unmuteNotification())
                      //     : (setUserMenu(false), muteNotification())
                      // }
                    >
                      <span>
                        {/* {activeUser.includes(userId) ? "Unmute" : "Mute"}{" "} */}
                        Notification
                      </span>
                    </div>
                  </div>
                  <div
                    className="alignment-answer-all"
                    style={{ border: "1px solid #f5f5f5" }}
                    onClick={() => {
                      setUserMenu(false);
                      setDisplayStarMessagesList(!displayStarMessagesList);
                    }}
                  >
                    <div className="text">
                      <span>
                        {!displayStarMessagesList
                          ? "Starred Messages"
                          : "All Messages"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-background">
            <div
              className={`${
                answerParentId
                  ? "full-chat-height rightclickHeight"
                  : "full-chat-heigh"
              }`}
            >
              <ScrollToBottom
                className="chat-message"
                style={{ overflowX: "hidden" }}
              >
                <div>
                  {messages &&
                    messages.length > 0 &&
                    messages.map((message, i) => {
                      return AllMessages(message, i);
                    })}
                </div>
              </ScrollToBottom>
            </div>

            {answerParentId && (
              <>
                <div className="box-raply-main">
                  <div className="raply-box-design">
                    {console.log("activeUser", activeUser)}
                    <div>
                      <p>
                        {" "}
                        {AnswerCreated == userInfo?._id ? (
                          <>
                            <b>You</b>
                          </>
                        ) : (
                          <b>{activeUser?.participateIds[0]?.currentRole}</b>
                        )}
                        <div>{AnswerRes}</div>
                      </p>
                      <div
                        className="closeicon"
                        onClick={() => {
                          setAnswerParentId("");
                          setAnswerCreated("");
                        }}
                      >
                        <i className="fa fa-close"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {blockUser ? (
              <>
                <div className="chat-message-sen-grid">
                  <span>{blockUser}</span>
                </div>
              </>
            ) : (
              <>
                <div className="chat-message-sen-grid">
                  <div
                    className={
                      answerParentId
                        ? "chat-message-sen-grid-items rightclickHeight"
                        : "chat-message-sen-grid-items"
                    }
                  >
                    <input
                      value={!editMessageId ? sendMsg : EditMessagetext}
                      onChange={(e) => {
                        setSendMsg(e.target.value);
                        setEditMessagetext(e.target.value);
                      }}
                      // onClick={() => {
                      //   setEditMessagetext("");
                      // }}
                      type="text"
                      placeholder="Type your message here..."
                      onKeyPress={(event) => {
                        if (
                          event.key === "Enter" &&
                          !answerParentId &&
                          !editMessageId
                        ) {
                          handleSendMessage();
                        } else if (event.key === "Enter" && answerParentId) {
                          handleSendMessageWithParentId();
                        } else if (event.key === "Enter" && editMessageId) {
                          updateChatMessage();
                        }
                      }}
                    />
                  </div>
                  <div className="chat-message-sen-grid-items ">
                    {answerParentId ? (
                      <button
                        onClick={handleSendMessageWithParentId}
                        className={!sendMsg ? "button-op" : ""}
                      >
                        <i class="fas fa-paper-plane"></i>
                        <span>Reply</span>
                      </button>
                    ) : editMessageId ? (
                      <button
                        onClick={updateChatMessage}
                        className={!EditMessagetext ? "button-op" : ""}
                      >
                        <i class="fas fa-paper-plane"></i>
                        <span>Edit</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleSendMessage}
                        className={!sendMsg ? "button-op" : ""}
                      >
                        <i class="fas fa-paper-plane"></i>
                        <span>Send</span>
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {openConnectionModal ? (
          <div className="content-modal ">
            <div className="modal-center-align animate__animated animate__zoomIn wow">
              <div className="modal-header">
                <p>You can customize this invitation</p>
                <div
                  className="close-icon"
                  onClick={() => {
                    setOpenConnectionModal(!openConnectionModal);
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
                  <textarea
                    id="message"
                    name="message"
                    value={customMessage}
                    rows="4"
                    cols="50"
                    onChange={(e) => {
                      setCustomMessage(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <div className="modal-footer-button-alignment">
                  <button
                    className="cancel-button"
                    onClick={() => {
                      setOpenConnectionModal(!openConnectionModal);
                      setCustomMessage("Hi, I want to connect with you ..");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="send-button"
                    onClick={() => {
                      setOpenConnectionModal(!openConnectionModal);
                      sendConnectRequest();
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {WithdrawModel ? (
          <div className="content-modal">
            <div className="modal-center-align">
              <div className="modal-header">
                <p>Withdraw Request</p>
                <div
                  className="close-icon"
                  onClick={() => {
                    setwithdrawModel(false);
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
                <div
                  className="form-group-modal"
                  style={{
                    marginLeft: "70px",
                    fontFamily: "sans-serif",
                    color: "#666666",
                    fontSize: "18px",
                  }}
                >
                  <div className="view-text-center-alignment">
                    <p>Sure you want withdraw the connection request?</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="modal-footer-button-alignment">
                  <button
                    className="cancel-button"
                    onClick={() => {
                      setwithdrawModel(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="send-button"
                    onClick={() => {
                      // setwithdrawModel();
                      withdrawRequest();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  } else {
    return (
      <>
        <div className="no-chat-alignment">
          <div className="chat-icon-center">
            <img src={require("../../Assets/Images/blank-chat.png").default} />
          </div>
          <ToastContainer />
          <div className="chat-dummy-text">
            <p>
              {" "}
              Reach out to someone you want to connect with. Send them a message
              and make a connection!
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default ChatMessages;
