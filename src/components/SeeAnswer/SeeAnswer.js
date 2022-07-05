import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useHistory } from "react-router";
import { ApiDelete, ApiGet, ApiPost, ApiPut } from "../../Helpers/Api/ApiData";
import Auth from "../../Helpers/auth";
import { ToastContainer, toast } from "react-toastify";
import "./SeeAnswer.scss";
import UserProfile from "../../Assets/Images/user-profile.png";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { Button } from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import useGetAnswers from "../../Helpers/useGetAnswers";
import { RoomsList } from "./RoomsList";
import { DataLoaded } from "../../App";
import ReactReadMoreReadLess from "react-read-more-read-less";
import {
  FacebookCircularProgress,
  FacebookCircularProgressAnswer,
  FacebookCircularProgressChange,
} from "../../Loader/FacebookCircularProgress";

// import ScrollToBottom from "react-scroll-to-bottom";

export default function SeeAnswer() {
  const answerMenuRef = useRef();
  const location = useLocation();
  const history = useHistory();

  const [totalAnswer, setTotalAnswer] = useState([]);
  const [idForAnswer, setIdForAnswer] = useState("");
  const [allAnswer, setAllAnswer] = useState({});
  const [userBlockMenu, setUserBlockMenu] = useState(true);
  const [blockUserModel, setBlockUserModel] = useState(false);
  const [openmodal, setOpenModal] = useState(false);
  const [senderId, setSenderId] = useState("");
  const [chatData, setChatData] = useState("");
  const [answerPut, setAnswerPut] = useState("");
  const [Unblockuser, setUnblockuser] = useState(false);
  const [customMessage, setCustomMessage] = useState(
    "Hi, I want to connect with you .."
  );
  const [QuestReqest, setQuestReqest] = useState();

  const CheckBlockUser = chatData?.createdBy?.blockUser.includes(
    Auth.getUserData()?._id
  );
  const [RoomListId, setRoomListId] = useState();
  const { answer, myquery, request, answerLaterUser } = useContext(DataLoaded);
  const [myQueryData, setMyQueryData] = myquery;
  const [requestData, setRequestData] = request;
  const [answerByme, setAnswerByme] = answer;
  const [answerLaterData, setanswerLaterData] = answerLaterUser;
  const [openReportAbuseModal, setOpenReportAbuseModal] = useState(false);

  const [inputForReportAbuse, setInputForReportAbuse] =
    useState("Its Annoying");

  //geting id from local storage
  const [userDetails, setUserDetails] = useState();

  const [answerReplayMenu, setAnswerReplayMenu] = useState("");

  const [idForEdit, setIdForEdit] = useState("");

  const [isEditable, setisEditable] = useState(false);
  const [QuestionReqest, setQuestionReqution] = useState(false);
  const [openModelAnswerRemove, setOpenModelAnswerRemove] = useState(false);
  const [displayStarMessagesList, setDisplayStarMessagesList] = useState(false);
  const [idReportAbuse, setIdReportAbuse] = useState("");
  const [userIdForProfileAccess, setUserIdForProfileAccess] = useState("");
  const [changeData, setChangeData] = useState(false);
  const [WithdrawModel, setwithdrawModel] = useState(false);
  const [WithdrawId, setwithdrawModeliD] = useState();
  const [declineReqesut, setdeclineReqesut] = useState();
  const {
    answerRooms,
    answers,
    dataToCheckProfileRequest,
    requestedBy,
    addAnswer,
    declinerequest,
    acceptrequest,
    newrequest,
    Friend,
    DeleteAnswer,
    EditAnswer,
    setFriend,
    Toplocation,
    sendConnection,
    SentConnection,
    BlockUser,
    GetBlockUser,
    withDrawRequestData,
    Blocked,
    UnBlockuser,
    response,
  } = useGetAnswers(
    location?.state?.questionId,
    idForAnswer,
    changeData,
    setChangeData,
    displayStarMessagesList,
    setIdForEdit,
    setisEditable,
    setOpenModelAnswerRemove,
    setAnswerPut,
    setCustomMessage,
    setOpenModal,
    setBlockUserModel,
    setwithdrawModel,
    chatData,
    setUnblockuser,
    setQuestReqest,
    setdeclineReqesut,
    setQuestionReqution
  );

  const userId = JSON.parse(localStorage.getItem("userData"))?._id;

  const [DisplayProfile, setDisplayProfile] = useState(false);
  const [IsUserFreind, setIsUserFreind] = useState(false);

  useEffect(() => {
    getQuestionData();
  }, [chatData?.questionId]);
  const getQuestionData = () => {
    if (chatData?.questionId) {
      ApiGet(`question/get-question?question=${chatData?.questionId}`)
        .then((res) => {
          // if (res?.data?.payload && res?.status === 200) {
          setDisplayProfile(res?.data?.payload?.questions[0]?.displayProfile);
          setIsUserFreind(res?.data?.payload?.questions[0]?.isFriend);

          // }
        })
        .catch((err) => {
          toast.error(err?.message ? err?.message : "something went wrong");
        });
    }
  };
  useEffect(() => {
    document.title = "See Answer | LeaderBridge";
    setUserDetails(Auth.getUserData());
  }, []);

  useEffect(() => {
    setChangeData(!changeData);
  }, [idForAnswer]);

  const removeAnser = () => {
    DeleteAnswer(idForEdit);
  };

  const acceptAccess = (requestId, type) => {
    acceptrequest(requestId, location?.state?.question?._id, type);
  };

  const declineAccess = (requestId, type) => {
    declinerequest(requestId, location?.state?.question?._id, type);
  };

  const changeStartValue = (answerId, star) => {
    ApiPut(`new-answer/star/id=${answerId}`, {
      isStar: star,
    })
      .then((res) => {
        if (res.data.result == 0) {
          setChangeData(!changeData);
        } else {
          toast.error(res.data.message, {
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        toast.error(err, { theme: "colored" });
      });
  };

  const answerQuestion = (e) => {
    if (!answerPut) {
      return;
    }

    if (answerPut?.trim() == "") {
      return;
    }

    if (isEditable) {
      EditAnswer(idForEdit, answerPut);
    } else {
      addAnswer(location?.state?.questionId, answerPut, chatData?._id, "user");
      setAnswerPut("");
      setChangeData(!changeData);
    }
  };

  const blockUserRequest = () => {
    BlockUser(chatData?.createdBy?._id);
  };

  const requestProfileAccess = (idForProfileAcess) => {
    newrequest(idForProfileAcess);
  };

  const sendConnectRequest = async () => {
    sendConnection(chatData?.createdBy?._id, customMessage);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!userBlockMenu) {
        if (
          !userBlockMenu &&
          answerMenuRef.current &&
          !answerMenuRef.current.contains(e.target)
        ) {
          setUserBlockMenu(true);
        }
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [userBlockMenu]);

  function useKey(key, cb) {
    const callback = useRef(cb);
    useEffect(() => {
      callback.current = cb;
    });
    useEffect(() => {
      function handle(event) {
        if (event.code === key) {
          callback.current(event);
        }
      }
      document.addEventListener("keypress", handle);
      return () => document.removeEventListener("keypress", handle);
    }, [key]);
  }
  useKey("Enter", answerQuestion);

  const sendReportAbuse = async () => {
    await ApiPut(`answer/abuse/id=${idReportAbuse}`, {
      reason: inputForReportAbuse,
    })
      .then((res) => {
        setInputForReportAbuse("Its Annoying");
        setOpenReportAbuseModal(false);
        const data = chatData?.data?.filter(
          (item) => item?.answer?._id != idReportAbuse
        );
        setChangeData(!chatData);
        setIdReportAbuse("");
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.error(err?.message ? err?.message : "something went wrong");
      });
  };

  function isValidURL(string) {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  }

  //for test time formate
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");

  function SeeAnswerData(ans) {
    function isValidURL(text) {
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '">' + url + "</a>";
      });
    }

    var text = `${answer.answer}`;
    var html = isValidURL(text);

    if (userDetails._id == ans?.createdBy?._id) {
      return (
        <div className="chat-message-one">
          <div className="message-block">
            <div className="top-message-part">
              <span>
                {/* {timeAgo.format(new Date(ans?.answer?.answerAt),"round")} */}
                {moment(ans?.createdAt).fromNow()}
                {ans?.isUpdated === true && "(edited)"}
              </span>
              <span
                onClick={() => {
                  if (answerReplayMenu == "") {
                    setAnswerReplayMenu(ans?._id);
                  } else if (answerReplayMenu != ans?._id) {
                    setAnswerReplayMenu(ans?._id);
                  } else {
                    setAnswerReplayMenu("");
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
            <div
              className={
                answerReplayMenu == ans?._id
                  ? "chat-menu-design chat-menu-design-show-top-align"
                  : "chat-menu-design chat-menu-design-hidden"
              }
            >
              <div className="chat-answer-menu-design-new">
                <div
                  className="alignment-answer-all"
                  onClick={() => {
                    setisEditable(true);
                    setAnswerReplayMenu("");
                    setIdForEdit(ans?._id);
                    setAnswerPut(ans?.answer);
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
                    setIdForEdit(ans?._id);
                    setOpenModelAnswerRemove(true);
                  }}
                >
                  <div className="icon">
                    <i
                      class="far fa-trash-alt"
                      style={{ paddingRight: "10px" }}
                    ></i>
                  </div>
                  <div className="text">
                    <span>Delete </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="message-text">
              <>
                <button
                  // style={{ color: "#2234c0", cursor: "pointer" }}
                  style={{ cursor: "pointer" }}
                  onClick={() => window.open(ans?.answer)}
                >
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </button>
              </>

              {/* <button>{ans?.answer}</button> */}
            </div>
          </div>
        </div>
      );
    } else if (ans?.createdBy?._id && ans?.createdBy?._id) {
      return (
        <div className="chat-message">
          <div className="message-block">
            <div className="top-message-part">
              <span>
                {/* {timeAgo.format(new Date(ans?.answer?.answerAt),"round")} */}
                {moment(ans?.createdAt).fromNow()}
                {ans?.isUpdated === true && "(edited)"}
              </span>
              <span
                onClick={() => {
                  if (answerReplayMenu == "") {
                    setAnswerReplayMenu(ans?._id);
                  } else if (answerReplayMenu != ans?._id) {
                    setAnswerReplayMenu(ans?._id);
                  } else {
                    setAnswerReplayMenu("");
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
            <div
              className={
                answerReplayMenu == ans?._id
                  ? "chat-menu-design chat-menu-design-show-top-align"
                  : "chat-menu-design chat-menu-design-hidden"
              }
            >
              <div className="chat-answer-menu-design-new">
                {ans?.isStar ? (
                  <>
                    <div
                      className="alignment-answer-all"
                      onClick={() => {
                        changeStartValue(ans?._id, !ans?.isStar);
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
                          class="feather feather-star"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      </div>
                      <div className="text">
                        <span>Unstar message </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="alignment-answer-all"
                      onClick={() => {
                        changeStartValue(ans?._id, !ans?.isStar);
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
                          class="feather feather-star"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      </div>
                      <div className="text">
                        <span>Star message </span>
                      </div>
                    </div>
                  </>
                )}

                {/* <div
                  className="alignment-answer-all"
                  onClick={() => {
                    setOpenReportAbuseModal(!openReportAbuseModal);
                    setAnswerReplayMenu("");
                    setIdReportAbuse(ans?._id);
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
                    <span>Report Abuse </span>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="message-text">
              {/* {isValidURL(ans?.answer) ? (
                <>
                  <button
                    // style={{ color: "#2234c0", cursor: "pointer" }}
                    // style={{ cursor: "pointer" }}
                    onClick={() => window.open(ans?.answer)}
                  >
                    {ans?.answer}

                    {ans?.isStar ? (
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
                    ) : (
                      ""
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button>
                    {ans?.answer}

                    {ans?.isStar ? (
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
                    ) : (
                      ""
                    )}
                  </button>
                </>
              )} */}
            </div>
          </div>
        </div>
      );
    } else if (
      ans?.requestBy?._id == userId &&
      ans?.status === "pending" &&
      !displayStarMessagesList
    ) {
      return (
        <>
          {" "}
          <div
            className="request-center-message-alignment animate__animated animate__slideInRight wow"
            data-wow-offset="400"
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={ans?.requestBy?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={ans?.requestTo?.profileImage} />
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
      ans?.requestTo?._id == userId &&
      ans?.status === "pending" &&
      !displayStarMessagesList
    ) {
      return (
        <>
          <div className="request-center-message-alignment">
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={ans?.requestTo?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={ans?.requestBy?.profileImage} />
                </div>
              </div>
              <div>
                {console.log("ans3333", ans)}
                {/* <h1>You received a request for accessing your profile</h1> */}
                <h1>
                  {ans?.requestTo.currentRole +
                    " " +
                    "has requested access to view your profile"}
                </h1>
                <div className="mb-button-center-req">
                  {QuestReqest == ans?._id ? (
                    <button className="light-background">
                      <FacebookCircularProgress />
                    </button>
                  ) : (
                    <button
                      className="light-background"
                      onClick={() => {
                        acceptAccess(ans?._id, "request");
                      }}
                    >
                      Allow
                    </button>
                  )}

                  {/* <button
                    className="light-background"
                    onClick={() => {
                      acceptAccess(ans?._id);
                    }}
                  >
                    Allow
                  </button> */}
                  {/* <button
                    className="dark-background"
                    onClick={() => {
                      declineAccess(ans?._id);
                    }}
                  >
                    Reject
                  </button> */}

                  {declineReqesut == ans?._id ? (
                    <button className="dark-background">
                      <FacebookCircularProgressChange />
                    </button>
                  ) : (
                    <button
                      className="dark-background"
                      onClick={() => {
                        declineAccess(ans?._id, "reject");
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
      ans?.requestBy?._id == userId &&
      ans?.status === "accepted" &&
      !displayStarMessagesList
    ) {
      return (
        <>
          <div
            className="request-center-message-alignment"
            style={{ padding: "0 0 20px 0" }}
          >
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={ans?.requestBy?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={ans?.requestTo?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You sent a request for accessing your profile</h1>
                <h1 style={{ paddingLeft: "105px" }}>Request Accepted</h1>
                {/* <h1>you accepted the profile access request</h1> */}
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      ans?.requestTo?._id == userId &&
      ans?.status === "accepted" &&
      !displayStarMessagesList
    ) {
      return (
        <>
          <div className="request-center-message-alignment">
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={ans?.requestTo?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={ans?.requestBy?.profileImage} />
                </div>
              </div>
              <div>
                {/* <h1>You received a request for accessing your profile</h1>
                <h1 style={{ paddingLeft: "110px" }}>Request accepted</h1> */}
                <h1>You accepted the profile access request</h1>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      ans?.requestBy?._id == userId &&
      ans?.status === "decline" &&
      !displayStarMessagesList
    ) {
      return (
        <>
          <div className="request-center-message-alignment">
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={ans?.requestTo?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={ans?.requestBy?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You sent a request for accessing your profile</h1>
                <h1 style={{ paddingLeft: "105px" }}>Request rejected</h1>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      ans?.requestTo?._id == userId &&
      ans?.status === "decline" &&
      !displayStarMessagesList
    ) {
      return (
        <>
          {" "}
          <div className="request-center-message-alignment">
            <div>
              <div className="mb-profile-center">
                <div className="sect-m-profile">
                  <img src={ans?.requestTo?.profileImage} />
                </div>
                <div className="sect-m-profile">
                  <img src={ans?.requestBy?.profileImage} />
                </div>
              </div>
              <div>
                <h1>You received a request for accessing your profile</h1>
                <h1 style={{ paddingLeft: "110px" }}>Request rejected</h1>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  const renderMessage = () => {
    if (requestedBy?.status != "accepted") {
      if (
        requestedBy?.requestBy?._id == userId &&
        requestedBy?.status == "pending" &&
        Friend?.isFriend != "true" &&
        !CheckBlockUser
      ) {
        return (
          <>
            <div className="menu-list-alignment">
              <div className="icon-design">
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
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <p>Requested profile access</p>
            </div>
          </>
        );
      } else if (
        requestedBy?.requestBy?._id != userId &&
        requestedBy?.status === "pending"
      ) {
        return (
          <>
            <div className="menu-list-alignment">
              <div className="icon-design">
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
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <p
                onClick={() => {
                  requestProfileAccess(chatData?.createdBy?._id);
                }}
              >
                Received profile access
              </p>
            </div>
          </>
        );
      } else if (
        requestedBy?.status === "decline" &&
        Friend?.isFriend != "true" &&
        Friend?.isFriend != "pending"
      ) {
        return (
          <>
            <div className="menu-list-alignment">
              <div className="icon-design">
                {QuestionReqest ? (
                  <div className="TextLoader">
                    <FacebookCircularProgressAnswer />
                  </div>
                ) : (
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
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                )}
              </div>
              {QuestionReqest ? (
                <p style={{ opacity: "0.5" }}>Request profile access</p>
              ) : (
                <p
                  onClick={() => {
                    requestProfileAccess(chatData?.createdBy?._id);
                  }}
                >
                  Request profile access
                </p>
              )}
            </div>
          </>
        );
      }
    } else if (requestedBy?.status == "accepted") {
      if (requestedBy?.acceptedBy != userId) {
        return (
          <>
            <div className="menu-list-alignment">
              <div className="icon-design">
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
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <p
                onClick={() => {
                  if (
                    requestedBy?.status == "accepted" ||
                    Friend?.isFriend == "true"
                  ) {
                    history.push(`/view-profile/${chatData?.createdBy?._id}`);
                  } else {
                  }
                }}
              >
                View profile
              </p>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className="menu-list-alignment">
              <div className="icon-design">
                {QuestionReqest ? (
                  <div className="TextLoader">
                    <FacebookCircularProgressAnswer />
                  </div>
                ) : (
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
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                )}
              </div>
              {QuestionReqest ? (
                <p style={{ opacity: "0.5" }}>Request profile access</p>
              ) : (
                <p
                  onClick={() => {
                    requestProfileAccess(chatData?.createdBy?._id);
                  }}
                >
                  Request profile access
                </p>
              )}
            </div>
          </>
        );
      }
    } else if (Friend?.isFriend == "true") {
      return (
        <>
          <div className="menu-list-alignment">
            <div className="icon-design">
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <p
              onClick={() => {
                if (
                  requestedBy?.status == "accepted" ||
                  Friend?.isFriend == "true"
                ) {
                  history.push(`/view-profile/${chatData?.createdBy?._id}`);
                } else {
                }
              }}
            >
              View profile
            </p>
          </div>
        </>
      );
    }
  };

  SentConnection?.filter((item) => {
    return item?.receiverId?._id == chatData?.createdBy?._id;
  });

  // withDraw Request
  const withdrawRequest = async () => {
    withDrawRequestData(WithdrawId);
  };

  return (
    <div>
      <div className="children-page-align">
        <ToastContainer />
        <div className="container-fluid">
          <NavLink to="/my-query">
            <div
              className="page-back-style"
              onClick={() => {
                setAnswerByme(false);
                setRequestData(false);
                setanswerLaterData(false);
                setMyQueryData(true);
              }}
            >
              <div className="left-side-arrow-design">
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
              <div className="left-side-text">
                <p> Back to Bridge</p>
              </div>
            </div>
          </NavLink>
          <div className="see-answer-grid">
            <div className="see-answer-grid-items">
              <RoomsList
                answerRooms={answerRooms}
                setIdForAnswer={setIdForAnswer}
                setChatData={setChatData}
                setUserIdForProfileAccess={setUserIdForProfileAccess}
              />
            </div>
            {chatData ? (
              <div
                className={`see-answer-grid-items animate__animated animate__slideInRight wow`}
                data-wow-offset="200"
              >
                <div className="answer-chat-profile-grid">
                  <div
                    className={`answer-chat-profile-grid-items back-and-profile-alignment ${
                      requestedBy?.status == "accepted" ||
                      (Friend?.isFriend == true && "cursorDiv")
                    }`}
                  >
                    {displayStarMessagesList && (
                      <div
                        className="back-arrow-chat-design"
                        onClick={() =>
                          setDisplayStarMessagesList(!displayStarMessagesList)
                        }
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
                    {chatData?.createdBy &&
                    chatData?.createdBy?.profileImage ? (
                      <img
                        src={chatData?.createdBy?.profileImage}
                        alt="UserProfile"
                      />
                    ) : (
                      <img src={UserProfile} alt="UserProfile" />
                    )}

                    <div
                      className={`answer-chat-profile-grid-items left1 ${
                        requestedBy?.status == "accepted" && "cursorDiv"
                      }`}
                      onClick={() => {
                        if (
                          requestedBy?.status == "accepted" ||
                          Friend?.isFriend == true
                        ) {
                          history.push(
                            `/view-profile/${chatData?.createdBy?._id}`
                          );
                        } else {
                        }
                      }}
                    >
                      <span>
                        {chatData?.createdBy && chatData?.createdBy?.currentRole
                          ? chatData?.createdBy?.currentRole
                          : ""}
                      </span>
                      {/* <p className="text-capitalize">
                        {chatData?.createdBy && chatData?.createdBy?.subject
                          ? chatData?.createdBy?.subject
                          : ""}
                      </p> */}
                    </div>
                  </div>

                  <div className="answer-chat-profile-grid-items answer-menu-relative">
                    <div
                      className="more-menu-icon-style"
                      onClick={() => {
                        setUserBlockMenu(!userBlockMenu);
                        setAnswerReplayMenu("");
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
                        class="css-i6dzq1 pointer"
                      >
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </div>
                    <div
                      className={
                        userBlockMenu
                          ? "user-block-menu-design user-menu-hidden"
                          : "user-block-menu-design user-menu-open"
                      }
                      ref={answerMenuRef}
                    >
                      <div className="user-menu-design">
                        {Blocked == true ? (
                          <>
                            <div className="menu-list-alignment">
                              <div className="icon-design">
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
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line
                                    x1="4.93"
                                    y1="4.93"
                                    x2="19.07"
                                    y2="19.07"
                                  ></line>
                                </svg>
                              </div>
                              <p
                                className="cursor-pointer"
                                onClick={(e) => {
                                  setUnblockuser(true);
                                }}
                              >
                                Unblock User
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="menu-list-alignment">
                              <div className="icon-design">
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
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line
                                    x1="4.93"
                                    y1="4.93"
                                    x2="19.07"
                                    y2="19.07"
                                  ></line>
                                </svg>
                              </div>
                              <p
                                className="cursor-pointer"
                                onClick={(e) => {
                                  setBlockUserModel(true);
                                  setUserBlockMenu(false);
                                }}
                              >
                                Block User
                              </p>
                            </div>
                          </>
                        )}

                        {Friend?.isFriend == "falsesssss" && !CheckBlockUser ? (
                          <div className="menu-list-alignment">
                            <div className="icon-design">
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
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <polyline points="17 11 19 13 23 9"></polyline>
                              </svg>
                            </div>
                            <p
                              onClick={() => {
                                setOpenModal(!openmodal);
                              }}
                            >
                              Send Connection Request
                            </p>
                          </div>
                        ) : Friend?.isFriend == "true" ? (
                          <div className="menu-list-alignment">
                            <div className="icon-design">
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
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <polyline points="17 11 19 13 23 9"></polyline>
                              </svg>
                            </div>
                            <p
                              onClick={() => {
                                if (
                                  requestedBy?.status == "accepted" ||
                                  Friend?.isFriend == "true"
                                ) {
                                  history.push(
                                    `/view-profile/${chatData?.createdBy?._id}`
                                  );
                                }
                              }}
                            >
                              View Profile
                            </p>
                          </div>
                        ) : DisplayProfile == true ? (
                          <div className="menu-list-alignment">
                            <div className="icon-design">
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
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <polyline points="17 11 19 13 23 9"></polyline>
                              </svg>
                            </div>
                            <p
                              onClick={() => {
                                if (
                                  requestedBy?.status == "accepted" ||
                                  Friend?.isFriend == "true"
                                ) {
                                  history.push(
                                    `/view-profile/${chatData?.createdBy?._id}`
                                  );
                                } else {
                                }
                              }}
                            >
                              View Profile
                            </p>
                          </div>
                        ) : Friend?.isFriend != "true" && !CheckBlockUser ? (
                          <>
                            {SentConnection?.length > 0 ? (
                              <>
                                <div
                                  onClick={() => {
                                    setwithdrawModel(true);
                                    setwithdrawModeliD(SentConnection[0]?._id);
                                  }}
                                  className="menu-list-alignment"
                                >
                                  <div className="icon-design">
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
                                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                      <circle cx="8.5" cy="7" r="4"></circle>
                                      <polyline points="17 11 19 13 23 9"></polyline>
                                    </svg>
                                  </div>
                                  <p>Withdraw Request</p>
                                </div>
                              </>
                            ) : (
                              <div className="menu-list-alignment">
                                <div className="icon-design">
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
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="8.5" cy="7" r="4"></circle>
                                    <polyline points="17 11 19 13 23 9"></polyline>
                                  </svg>
                                </div>
                                <p
                                  onClick={() => {
                                    setOpenModal(!openmodal);
                                  }}
                                >
                                  Send Connection Request
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          ""
                        )}

                        {!requestedBy?.requestBy?._id &&
                          Friend?.isFriend != "true" && (
                            <>
                              <div className="menu-list-alignment">
                                <div className="icon-design">
                                  {QuestionReqest ? (
                                    <div className="TextLoader">
                                      <FacebookCircularProgressAnswer />
                                    </div>
                                  ) : (
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
                                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                      <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                  )}
                                </div>
                                {QuestionReqest ? (
                                  <p style={{ opacity: "0.5" }}>
                                    Request profile access
                                  </p>
                                ) : (
                                  <p
                                    onClick={() => {
                                      requestProfileAccess(
                                        chatData?.createdBy?._id
                                      );
                                    }}
                                  >
                                    Request profile access
                                  </p>
                                )}
                              </div>
                            </>
                          )}

                        {renderMessage()}
                        {!CheckBlockUser && (
                          <div
                            className="menu-list-alignment"
                            onClick={() =>
                              setDisplayStarMessagesList(
                                !displayStarMessagesList
                              )
                            }
                          >
                            <h6>
                              <>
                                {displayStarMessagesList
                                  ? "All Messages"
                                  : "Starred Messages"}
                              </>
                            </h6>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="chat-list-answer-style  animate__animated animate__slideInRight wow"
                  data-wow-offset="200"
                >
                  {answers?.map((ans) => {
                    return SeeAnswerData(ans);
                  })}
                </div>

                {isEditable ? (
                  <div className="chat-list-type-style">
                    <div className="search-grid-text-grid">
                      <div className="search-grid-text-grid-items">
                        <input
                          type="text"
                          placeholder="Write a reply here..."
                          id="answer"
                          name="answer"
                          onChange={(e) => setAnswerPut(e.target.value)}
                          value={answerPut}
                        />
                      </div>
                      {isEditable ? (
                        <>
                          <div className={"search-grid-text-grid-items"}>
                            <button
                              className="cancel-button-style-see-answer"
                              onClick={() => {
                                setAnswerPut("");
                                setisEditable(false);
                                setIdForEdit("");
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                          <div
                            className={
                              !answerPut && /\s/.test(!answerPut)
                                ? "search-grid-text-grid-items"
                                : "search-grid-text-grid-items-deselect"
                            }
                          >
                            <button
                              className="cancel-button-style-see-answer"
                              onClick={(e) => {
                                e.keyCode === 13
                                  ? answerQuestion()
                                  : answerQuestion();
                              }}
                            >
                              Update
                            </button>
                          </div>
                        </>
                      ) : (
                        <div
                          className={
                            !answerPut
                              ? "search-grid-text-grid-items"
                              : "search-grid-text-grid-items-deselect"
                          }
                        >
                          <button
                            className="update-button-new-style"
                            onClick={() => {
                              answerQuestion();
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="chat-list-type-style">
                      <div className="search-grid-text-grid1">
                        {!CheckBlockUser ? (
                          <>
                            <div className="search-grid-text-grid-items">
                              <input
                                type="text"
                                placeholder="Write a reply here..."
                                id="answer"
                                rows={2}
                                cols={20}
                                name="answer"
                                onChange={(e) => setAnswerPut(e.target.value)}
                                value={answerPut}
                              ></input>
                            </div>
                          </>
                        ) : (
                          <div className="search-grid-text-grid-items">
                            You have been blocked from following this account at
                            the request of the user
                          </div>
                        )}
                        {!CheckBlockUser && (
                          <>
                            {isEditable ? (
                              <>
                                <div className={"search-grid-text-grid-items"}>
                                  <button
                                    className="cancel-button-style-see-answer"
                                    onClick={() => {
                                      setAnswerPut("");
                                      setisEditable(false);
                                      setIdForEdit("");
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                                <div
                                  className={
                                    !answerPut && /\s/.test(!answerPut)
                                      ? "search-grid-text-grid-items"
                                      : "search-grid-text-grid-items-deselect"
                                  }
                                >
                                  <button
                                    className="cancel-button-style-see-answer"
                                    onClick={(e) => {
                                      e.keyCode === 13
                                        ? answerQuestion()
                                        : answerQuestion();
                                    }}
                                  >
                                    Update
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div
                                className={
                                  !answerPut
                                    ? "search-grid-text-grid-items"
                                    : "search-grid-text-grid-items-deselect"
                                }
                              >
                                <button
                                  className="update-button-new-style"
                                  onClick={() => {
                                    answerQuestion();
                                  }}
                                >
                                  Submit
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div
                className="see-answer-grid-items animate__animated animate__slideInRight wow"
                data-wow-offset="200"
              >
                <div className="chat-list-answer-style center-align-image-no-data ">
                  <div className="no-answer-alignment">
                    <div className="no-answer-image-center">
                      <img
                        src={
                          require("../../Assets/Images/no-answer.svg").default
                        }
                        alt="img"
                      />
                    </div>
                    <p>Click on a chat room to see the response from a user</p>
                  </div>
                </div>
              </div>
            )}

            {answerRooms && answerRooms.length > 0 && (
              <div className="see-answer-grid-items">
                <div className="answer-text-box">
                  <div className="answer-text-alignment-style">
                    {/* <ReactReadMoreReadLess
                      text={location?.state?.question.question}
                      min={10}
                      ideal={10}
                      max={10}
                      readMoreText="click here to read more"
                    /> */}

                    <ReactReadMoreReadLess
                      charLimit={30}
                      readMoreText={<h6 className="ReadMore">Read more</h6>}
                      readLessText={<h6 className="ReadLess">Read less</h6>}
                      readMoreClassName="read-more-less--more"
                      readLessClassName="read-more-less--less"
                    >
                      {location?.state?.question.question}
                    </ReactReadMoreReadLess>
                    <p></p>
                    <div className="edit-answer">
                      <Button
                        onClick={() => {
                          history.push({
                            pathname: "/ask-question",
                            state: {
                              question: location?.state?.question,
                            },
                          });
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
                          class="css-i6dzq1 color-gray width-icon-edit"
                        >
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                      </Button>
                    </div>
                  </div>
                  <div className="answer-list-style-alignment answer-list-top-align">
                    <p>Reach </p>
                    <button>{location?.state?.question?.reach}</button>
                  </div>
                  <div className="answer-list-style-alignment">
                    <p>Responses </p>
                    <button>
                      {!response
                        ? location?.state?.question?.response
                        : response}
                    </button>
                  </div>
                  <div className="answer-list-style-alignment">
                    <p>Starred Answers </p>
                    <button>0</button>
                  </div>
                </div>
                <div className="answer-text-box">
                  <div className="location-text-style">
                    <p>Top locations responses</p>
                  </div>
                  <div className="answer-list-style-alignment">
                    <p>{Toplocation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {openReportAbuseModal ? (
        <div className="content-modal">
          <div className="modal-center-align animate__animated animate__zoomIn wow">
            <div className="modal-header">
              <p>Report Abuse</p>
              <div
                className="close-icon"
                onClick={() => {
                  setOpenReportAbuseModal(!openReportAbuseModal);
                  setSenderId();
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
            <div className="modal-body1">
              <p>
                Let the admins know what's wrong with this question. No one else
                will see your name or the content of this report.
              </p>
              <div className="select-button-style">
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="Its Annoying"
                  onChange={(e) => {
                    setInputForReportAbuse(e.target.value);
                  }}
                  checked={inputForReportAbuse === "Its Annoying"}
                />
                <label for="html">Its Annoying</label>
              </div>
              <div className="select-button-style">
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="Fake Content"
                  onChange={(e) => {
                    setInputForReportAbuse(e.target.value);
                  }}
                />
                <label for="html">Fake Content</label>
              </div>
              <div className="select-button-style">
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="Abusive Content"
                  onChange={(e) => {
                    setInputForReportAbuse(e.target.value);
                  }}
                />
                <label for="html">Abusive Content</label>
              </div>
              <div className="select-button-style">
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="I dont think it should be on the platform"
                  onChange={(e) => {
                    setInputForReportAbuse(e.target.value);
                  }}
                />
                <label for="html">
                  I dont think it should be on the platform
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <div className="modal-footer-button-alignment">
                <button
                  className="cancel-button"
                  onClick={() => {
                    setOpenReportAbuseModal(!openReportAbuseModal);
                    setInputForReportAbuse("Its Annoying");
                    setIdReportAbuse("");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="send-button"
                  onClick={() => {
                    sendReportAbuse();
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {blockUserModel ? (
        <div className="decline-modal-design ">
          <div
            className="decline-modal animate__animated animate__zoomIn wow"
            data-wow-offset="200"
          >
            <div className="modal-heading">
              <h2>Block User</h2>
              <div
                className="modal-close-icon"
                onClick={() => setBlockUserModel(!blockUserModel)}
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
              <p>Sure you want to block this user?</p>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-button-style"
                onClick={() => setBlockUserModel(false)}
              >
                Cancel
              </button>
              <button
                className="confirm-button-style"
                onClick={() => {
                  blockUserRequest();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {Unblockuser ? (
        <div className="decline-modal-design animate__animated animate__fadeIn wow ">
          <div className="decline-modal">
            <div className="modal-heading">
              <h2>Unblock User</h2>
              <div
                className="modal-close-icon"
                onClick={() => setUnblockuser(false)}
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
              <p>Sure you want to unblock this user?</p>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-button-style"
                onClick={() => setUnblockuser(false)}
              >
                Cancel
              </button>
              <button
                className="confirm-button-style"
                onClick={() => {
                  UnBlockuser();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {openmodal ? (
        <div className="content-modal ">
          <div className="modal-center-align animate__animated animate__zoomIn wow">
            <div className="modal-header">
              <p>You can customize this invitation</p>
              <div
                className="close-icon"
                onClick={() => {
                  setOpenModal(!openmodal);
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
                    setOpenModal(!openmodal);
                    setCustomMessage("Hi, I want to connect with you ..");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="send-button"
                  onClick={() => {
                    setOpenModal(!openmodal);
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
      {WithdrawModel == true && (
        <>
          <div className="content-modal animate__animated animate__fadeIn wow">
            <div className="modal-center-align">
              <div className="modal-header">
                <p>Widthdraw Request</p>
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
              <div className="view-text-center-alignment">
                <div className="view-text-center-alignment">
                  <p>Sure you want withdraw the connection request?</p>
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
        </>
      )}
      {openModelAnswerRemove ? (
        <div className="decline-modal-design ">
          <div className="decline-modal animate__animated animate__zoomIn wow">
            <div className="modal-heading">
              <h2>Delete Answer</h2>
              <div
                className="modal-close-icon"
                onClick={() => setOpenModelAnswerRemove(false)}
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
              <p>Sure you want to this answer?</p>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-button-style"
                onClick={() => setOpenModelAnswerRemove(false)}
              >
                Cancel
              </button>
              <button
                className="confirm-button-style"
                onClick={() => {
                  removeAnser();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
