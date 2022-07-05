import React, { useState, useEffect, useContext, useRef } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { ApiPost, ApiGet, ApiPut, ApiDelete } from "../../Helpers/Api/ApiData";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import Loader from "react-loader-spinner";
import "./Answer.scss";
import Auth from "../../Helpers/auth";
import ProfileImg from "../../Assets/Images/ProfileImg.png";
import QuestionBox from "./QuestionBox";
import ChatContainer from "./ChatContainer";
import useAnswers from "../../Helpers/useAnswers";
import { DataLoaded } from "../../App";

export default function Answer(props) {
  const [idForAnswer, setIdForAnswer] = useState(props.match.params.id);
  const [inputValue, setinputValue] = useState({});
  // const [allAnswerIdWise, setAllAnswerIdWise] = useState({});
  const [questionData, setQuestionData] = useState();
  const [viewData, setViewData] = useState();
  const [responses, setResponses] = useState();
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [editDropdown, setEditDropdown] = useState(false);
  const [idComparePopup, setIdComparePopup] = useState();
  const [userName, setUserName] = useState([]);
  const [dataForEdit, setDataForEdit] = useState({});
  const [anwerModalOpen, setAnwerModalOpen] = useState(false);
  const [openmodal, setOpenModal] = useState(false);
  const [seeAnswerChild, setSeeAnswerChild] = useState(false);
  const [idForDeleteAnswer, setIdForDeleteAnswer] = useState();
  const [openmodalDelete, setOpenModalDelete] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [isUserFriend, setIsUserFreind] = useState("");
  const [allowConnectionRequest, setAllowConnectionRequest] = useState("");
  const [userId, setUserId] = useState("");
  const [declineReqesut, setdeclineReqesut] = useState();
  const [QuestReqest, setQuestReqest] = useState();
  const [
    openModalRemoveQuestionIReceived,
    setOpenModalRemoveQuestionIReceived,
  ] = useState(false);

  const [customMessage, setCustomMessage] = useState(
    "Hi, I want to connect with you .."
  );

  const [whoCan, setWhoCan] = useState(false);

  const { answer, myquery, request, answerLaterUser } = useContext(DataLoaded);
  const [myQueryData, setMyQueryData] = myquery;
  const [requestData, setRequestData] = request;
  const [answerByme, setAnswerByme] = answer;
  const [answerLaterData, setanswerLaterData] = answerLaterUser;

  const [displayProfile, setDisplayProfile] = useState(false);

  const [userData, setUserData] = useState({});
  const [inputForReportAbuse, setInputForReportAbuse] =
    useState("Its Annoying");

  const [roomId, setRoomId] = useState("");

  const [date, setdate] = useState();
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const [openReportAbuseModal, setOpenReportAbuseModal] = useState(false);

  const [idReportAbuse, setIdReportAbuse] = useState("");
  const [questionDataForRequest, setQuestionDataForRequest] = useState({});
  const [questionId, setQuestionId] = useState("");
  const [WithdrawModel, setwithdrawModel] = useState(false);
  const [RoomquestionId, setRoomquestionId] = useState("");
  const [QuestionReqest, setQuestionReqution] = useState(false);
  const [changeData, setChangeData] = useState(false);
  const [openConnectionModal, setOpenConnectionModal] = useState(false);
  const {
    answers,
    dataToCheckProfileRequest,
    requestedBy,
    sendAnswer,
    declinerequest,
    newrequest,
    acceptrequest,
    Friend,
    setAnswers,
    DeleteAnswer,
    EditAnswer,
    sendConnection,
    TotalConection,
    SentConnection,
    BlockUser,
    withdrawRequestData,
    EveryOne,
    OnlySeeAdmin,
    WhoIs,
    AbuseAnswer,
    response,
  } = useAnswers(
    roomId,
    questionId,
    changeData,
    setinputValue,
    setDataForEdit,
    setOpenModal,
    setOpenModalDelete,
    setOpenConnectionModal,
    setChangeData,
    setOpenModalRemoveQuestionIReceived,
    setIsUserFreind,
    setwithdrawModel,
    RoomquestionId,
    whoCan,
    setWhoCan,
    setOpenReportAbuseModal,
    setInputForReportAbuse,
    setIdReportAbuse,
    setQuestReqest,
    setdeclineReqesut,
    setQuestionReqution,
    QuestionReqest
  );

  const sendReportAbuse = async () => {
    AbuseAnswer(idReportAbuse, inputForReportAbuse);
  };

  const GetWhoIS = JSON.parse(localStorage.getItem("whoIs"));

  const dropdown = useRef(null);

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!seeAnswerChild) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setSeeAnswerChild(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [seeAnswerChild]);

  useEffect(() => {
    document.title = "Write Answer | LeaderBridge";
    const uData = Auth.getUserData();
    setUserData(uData);
  }, []);

  const handleOnChnage = (e) => {
    const { name, value } = e.target;
    setinputValue({ ...inputValue, [name]: value });
    setErrors({});
  };

  useEffect(() => {
    getQuestionData();
    initChat();
  }, [idForAnswer]);

  const initChat = async () => {
    ApiPost("new-answer/init", {
      questionId: props.match.params.id,
    })
      .then((res) => {
        setRoomId(res?.data?.payload?.chatRoom?._id);
        setRoomquestionId(res?.data?.payload?.chatRoom?.questionId);
      })
      .catch((err) => {
        toast.error(err?.message ? err?.message : "something went wrong");
      });
  };

  const [QuestionBoxData, setQuestionBoxData] = useState();

  const getQuestionData = () => {
    if (idForAnswer) {
      ApiGet(`question/get-question?question=${idForAnswer}`)
        .then((res) => {
          setQuestionBoxData(res?.data?.payload?.questions[0]);
          if (res?.data?.payload && res?.status === 200) {
            setQuestionDataForRequest(
              res?.data?.payload?.questions[0]?.isFriend
            );
            setQuestionId(res?.data?.payload?.questions[0]?.createdBy?._id);
            setQuestionData(res?.data?.payload?.questions[0]?.question);
            setdate(res?.data?.payload?.questions[0]?.createdAt);
            setViewData(res?.data?.payload?.questions[0]?.reach);
            setResponses(res?.data?.payload?.questions[0]?.response);
            setUserName(res?.data?.payload?.questions[0]?.createdBy);
            setUserId(res?.data?.payload?.questions[0]?.createdBy?._id);
            setProfileImage(
              res?.data?.payload?.questions[0]?.createdBy?.profileImage
            );
            setDisplayProfile(res?.data?.payload?.questions[0]?.displayProfile);
            setIsUserFreind(res?.data?.payload?.questions[0]?.isFriend);
            setAllowConnectionRequest(
              res?.data?.payload?.questions[0]?.allowConnectionRequest
            );
          }
        })
        .catch((err) => {
          toast.error(err?.message ? err?.message : "something went wrong");
        });
    }
  };

  const Location = useLocation();

  const answerQuestion = (e) => {
    if (!inputValue.answer) {
      return;
    }

    if (inputValue.answer.trim() == "") {
      return;
    }

    sendAnswer && sendAnswer(idForAnswer, inputValue.answer, roomId, "user");

    setinputValue({});
  };

  const requestProfileAccess = () => {
    newrequest(questionId);
  };

  const acceptAccess = (requestId, type) => {
    acceptrequest(requestId, questionId, type);
  };

  const declineAccess = (requestId, type) => {
    ApiPut(`answer/decline/id=${requestId}?questionId=${questionId}`).then(
      (res) => {
        // setSendMsg("");
        // setEditMessageId("");
        toast.success(res?.data?.message);
        setChangeData(!changeData);
        // setLastChangeData(!lastChangeData);
      }
    );

    declinerequest(requestId, questionId, type);
  };

  const answerQuestionEdit = (e) => {
    if (!inputValue.answer) {
      return;
    }

    if (inputValue.answer.trim() == "") {
      return;
    }

    EditAnswer(dataForEdit?._id, inputValue.answer);
  };

  const [DeleteId, setDeleteId] = useState();
  const answerDelete = (id) => {
    // ApiDelete(`answer/id=${id}`)
    //   .then((res) => {
    //     if (res.data.result == 0) {
    //       setAnswers(answers.filter((item) => !(item._id === id)));
    //       getQuestionData();
    //       setChangeData(!changeData);
    //       setOpenModal(false);
    //       setOpenModalDelete(false);

    //       toast.success(res?.data?.message);
    //     } else {
    //       toast.error(res.data.message, { theme: "colored" });
    //       setOpenModal(false);
    //       setOpenModalDelete(false);
    //       setDeleteId("");
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(err.message, { theme: "colored" });
    //     setOpenModal(false);
    //     setOpenModalDelete(false);
    //   });
    DeleteAnswer(id);
  };

  const blockUser = () => {
    // ApiPut(`user/block/id=${userId}`)
    //   .then((res) => {
    //     if (res.data.result == 0) {
    //       toast.success("user blocked", { theme: "colored" });
    //       setOpenModalRemoveQuestionIReceived(false);
    //       history.push("/answer-by-me");
    //     } else {
    //       toast.error(res?.data?.message, { theme: "colored" });
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(err.message, { theme: "colored" });
    //   });

    BlockUser(userId);
  };

  const sendConnectRequest = async () => {
    sendConnection(userId, customMessage);
  };

  const [idForWithdrawRequest, setIdForWithdrawRequest] = useState("");

  const withdrawRequest = async () => {
    withdrawRequestData(idForWithdrawRequest);
  };

  return (
    <div>
      {/* <ToastContainer /> */}
      <ToastContainer style={{ zIndex: "1111111111111" }} />
      <div className="answer-section-full-height">
        <div className="container-fluid">
          <div className="answer-top-alignment">
            <div className="all-content-alignment">
              <div
                className="back-to-text"
                onClick={() => {
                  setAnswerByme(true);
                  setRequestData(false);
                  setanswerLaterData(false);
                  setMyQueryData(false);
                }}
              >
                <NavLink to="/answer-by-me">
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
                </NavLink>
                <NavLink to="/answer-by-me">
                  <span>Back to Bridge</span>
                </NavLink>
              </div>
              <div
                className="more"
                onClick={() => setAnwerModalOpen(!anwerModalOpen)}
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
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
        {isLoaderVisible === false ? (
          <div className="container-fluid">
            <div className="test-question-grid">
              <ChatContainer
                DeleteId={DeleteId}
                questionData={questionData}
                date={date}
                allAnswerIdWise={answers}
                dataToCheckProfileRequest={dataToCheckProfileRequest}
                requestedBy={requestedBy}
                profileImage={profileImage}
                setIdComparePopup={setIdComparePopup}
                idComparePopup={idComparePopup}
                userData={userData}
                setDataForEdit={setDataForEdit}
                setinputValue={setinputValue}
                setSeeAnswerChild={setSeeAnswerChild}
                setOpenModal={setOpenModal}
                setIdForDeleteAnswer={setIdForDeleteAnswer}
                setOpenReportAbuseModal={setOpenReportAbuseModal}
                setIdReportAbuse={setIdReportAbuse}
                handleOnChnage={handleOnChnage}
                inputValue={inputValue}
                answerQuestionEdit={answerQuestionEdit}
                answerQuestion={answerQuestion}
                dataForEdit={dataForEdit}
                displayProfile={displayProfile}
                acceptAccess={acceptAccess}
                declineAccess={declineAccess}
                EveryOne={EveryOne}
                OnlySeeAdmin={OnlySeeAdmin}
                WhoIs={WhoIs}
                whoCan={whoCan}
                setWhoCan={setWhoCan}
                GetWhoIS={GetWhoIS}
                response={response}
                QuestReqest={QuestReqest}
                declineReqesut={declineReqesut}
              />
              <QuestionBox
                profileImage={profileImage}
                Friend={Friend}
                userName={userName}
                seeAnswerChild={seeAnswerChild}
                setSeeAnswerChild={setSeeAnswerChild}
                setIdComparePopup={setIdComparePopup}
                setOpenModalRemoveQuestionIReceived={
                  setOpenModalRemoveQuestionIReceived
                }
                dataToCheckProfileRequest={dataToCheckProfileRequest}
                requestedBy={requestedBy}
                questionDataForRequest={questionDataForRequest}
                viewData={viewData}
                history={history}
                userId={userId}
                requestProfileAccess={requestProfileAccess}
                responses={responses}
                displayProfile={displayProfile}
                isUserFriend={isUserFriend}
                allowConnectionRequest={allowConnectionRequest}
                setOpenConnectionModal={setOpenConnectionModal}
                SentConnection={SentConnection}
                setIdForWithdrawRequest={setIdForWithdrawRequest}
                idForWithdrawRequest={idForWithdrawRequest}
                withdrawRequest={withdrawRequest}
                setwithdrawModel={setwithdrawModel}
                WithdrawModel={WithdrawModel}
                QuestionBoxData={QuestionBoxData}
                SentConnectionData={SentConnection}
                dropdown={dropdown}
                response={response}
                QuestionReqest={QuestionReqest}
                setQuestionReqution={setQuestionReqution}
              />
            </div>
          </div>
        ) : (
          <div className="answer-only-loder-design">
            {/* <ToastContainer /> */}
            <div className="container-fluid">
              <div className="answer-top-alignment">
                <div className="all-content-alignment">
                  <Loader
                    className=""
                    type="Puff"
                    color="#334D52"
                    height={30}
                    width={30}
                    visible={isLoaderVisible}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {openConnectionModal ? (
        <div className="content-modal ">
          <div className="modal-center-align">
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

      {WithdrawModel && (
        <>
          <div className="content-modal">
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
              <div className="modal-body">
                <div className="form-group-modal">
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
      {anwerModalOpen ? (
        <div className="answer-full-screen-modal">
          <div className="answer-full-modal-close">
            <div
              className="close-icon-center-align"
              onClick={() => setAnwerModalOpen(!anwerModalOpen)}
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
          <div className="container-fluid">
            <div className="test-question-grid-full">
              <ChatContainer
                questionData={questionData}
                date={date}
                allAnswerIdWise={answers}
                dataToCheckProfileRequest={dataToCheckProfileRequest}
                profileImage={profileImage}
                setIdComparePopup={setIdComparePopup}
                idComparePopup={idComparePopup}
                userData={userData}
                setDataForEdit={setDataForEdit}
                setinputValue={setinputValue}
                setSeeAnswerChild={setSeeAnswerChild}
                setOpenModal={setOpenModal}
                setIdForDeleteAnswer={setIdForDeleteAnswer}
                setOpenReportAbuseModal={setOpenReportAbuseModal}
                setIdReportAbuse={setIdReportAbuse}
                handleOnChnage={handleOnChnage}
                inputValue={inputValue}
                answerQuestionEdit={answerQuestionEdit}
                answerQuestion={answerQuestion}
                dataForEdit={dataForEdit}
              />
            </div>
          </div>
        </div>
      ) : null}
      {openmodal ? (
        <div className="content-modal">
          <div className="modal-center-align">
            <div className="modal-header">
              <p>Delete Answer</p>
              <div className="close-icon" onClick={() => setOpenModal(false)}>
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
                <p className="delete-text">Sure you want to delete?</p>
              </div>
            </div>
            <div className="modal-footer">
              <div className="modal-footer-button-alignment">
                <button
                  className="cancel-button"
                  onClick={() => {
                    setOpenModal(!openmodal);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="send-button"
                  onClick={(e) => {
                    answerDelete(idForDeleteAnswer);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {openModalRemoveQuestionIReceived ? (
        <div className="content-modal">
          <div className="modal-center-align animate__animated animate__zoomIn wow">
            <div className="modal-header">
              <p>Block User</p>
              <div
                className="close-icon"
                onClick={() => {
                  setOpenModalRemoveQuestionIReceived(
                    !openModalRemoveQuestionIReceived
                  );
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
                <p className="delete-text">Sure you want to Block this user?</p>
              </div>
            </div>
            <div className="modal-footer">
              <div className="modal-footer-button-alignment">
                <button
                  className="cancel-button"
                  onClick={() => {
                    setOpenModalRemoveQuestionIReceived(
                      !openModalRemoveQuestionIReceived
                    );
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
      {openReportAbuseModal ? (
        <div className="content-modal">
          <div className="modal-center-align animate__animated animate__zoomIn wow">
            <div className="modal-header">
              <p>Report Abuse</p>
              <div
                className="close-icon"
                onClick={() => {
                  setOpenReportAbuseModal(!openReportAbuseModal);
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
    </div>
  );
}
