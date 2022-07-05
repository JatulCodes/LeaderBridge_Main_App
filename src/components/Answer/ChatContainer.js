import moment from "moment";
import React, { useState } from "react";

import ScrollToBottom from "react-scroll-to-bottom";
import ProfileImg from "../../Assets/Images/ProfileImg.png";
import { ApiPut } from "../../Helpers/Api/ApiData";
import {
  FacebookCircularProgress,
  FacebookCircularProgressChange,
} from "../../Loader/FacebookCircularProgress";

const ChatContainer = ({
  DeleteId,
  questionData,
  date,
  allAnswerIdWise,
  dataToCheckProfileRequest,
  requestedBy,
  profileImage,
  setIdComparePopup,
  idComparePopup,
  userData,
  setDataForEdit,
  setinputValue,
  setSeeAnswerChild,
  setOpenModal,
  setIdForDeleteAnswer,
  setOpenReportAbuseModal,
  setIdReportAbuse,
  handleOnChnage,
  inputValue,
  answerQuestionEdit,
  answerQuestion,
  dataForEdit,
  displayProfile,
  acceptAccess,
  declineAccess,
  EveryOne,
  OnlySeeAdmin,
  WhoIs,
  whoCan,
  setWhoCan,
  GetWhoIS,
  response,
  QuestReqest,
  declineReqesut,
}) => {
  const [changeData, setChangeData] = useState(false);

  if (DeleteId) {
    const Data = allAnswerIdWise.filter((item) => !(item._id === DeleteId));
  }

  const textWho = () => {
    if (WhoIs != "please check it") {
      if (WhoIs == "Only can see admin") {
        return <>{"(Only author)"}</>;
      } else {
        return <>{"(Everyone)"}</>;
      }
    } else {
      if (GetWhoIS == 0) {
        return <>{"(Everyone)"}</>;
      } else {
        return <>{"(Only author)"}</>;
      }
    }
  };

  // function isValidURL(string) {
  //   var res = string.match(/(https?:\/\/[^\s]+)/g);
  //   return res !== null;
  // }

  const Answer = (answer) => {
    function isValidURL(text) {
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '">' + url + "</a>";
      });
    }

    var text = `${answer.answer}`;
    var html = isValidURL(text);

    if (answer?.createdBy?._id === userData?._id) {
      return (
        <>
          <div className="answer-grid-items">
            <div className="answer-profile-image">
              {answer?.createdBy && answer?.createdBy?.profileImage ? (
                <img src={answer?.createdBy?.profileImage} />
              ) : (
                <img src={ProfileImg} />
              )}
            </div>
          </div>

          <div className="answer-grid-items">
            <span style={{ fontWeight: 600 }}>
              {answer?.createdBy &&
                answer?.createdBy?.currentRole &&
                answer?.createdBy?.currentRole}
            </span>
            <span>
              {answer?.createdBy &&
              answer?.createdBy?.subject &&
              displayProfile === true
                ? answer?.createdBy?.subject
                : "Anonymous"}
            </span>
            {}

            <span>
              {moment(answer?.createdAt).fromNow()}

              {answer?.isUpdated === true && "(edited)"}
            </span>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            {/* {isValidURL(
              html
                <>
                  <p
                    style={{ color: "#2234c0", cursor: "pointer" }}
                    onClick={() => window.open(answer?.answer)}
                  >
                    {answer?.answer}
                  </p>
                </>
              ) : (
                <>
                  <p>{answer?.answer}</p>
                </>
            )} */}

            {/* <a href={answer?.answer}>{answer?.answer}</a> */}
          </div>

          <div className="answer-grid-items">
            <div className="answer-grid-items answer-show-dropdown-relative">
              <div
                className="pointer mobile-view-flex-end-side"
                onClick={() => {
                  // setEditDropdown(!editDropdown)

                  setSeeAnswerChild(false);
                  if (answer?._id === idComparePopup) {
                    setIdComparePopup(0);
                  } else {
                    setIdComparePopup(answer?._id);
                  }
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
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="12" cy="5" r="1"></circle>
                  <circle cx="12" cy="19" r="1"></circle>
                </svg>
              </div>
              {/* )} */}

              <div
                className={
                  answer?._id === idComparePopup
                    ? "answer-edit-delete-dropdwon-design dropdown-show"
                    : "answer-edit-delete-dropdwon-design dropdown-hidden"
                }
              >
                <div className="dropdown-cus-design">
                  {userData?._id == answer?.createdBy?._id ? (
                    <>
                      <div className="edit-list-alignment">
                        <div className="edit-icon">
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
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                          </svg>
                        </div>
                        <div
                          className="edit-text"
                          onClick={() => {
                            setDataForEdit(answer);
                            setinputValue({
                              answer: answer?.answer,
                            });
                            setIdComparePopup(0);
                          }}
                        >
                          <p>Edit</p>
                        </div>
                      </div>
                      <div className="edit-list-alignment">
                        <div className="edit-icon">
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
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </div>
                        <div
                          className="edit-text"
                          onClick={() => {
                            setOpenModal(true);
                            setIdComparePopup(0);
                            setDataForEdit({});
                            setinputValue({
                              answer: "",
                            });
                            setIdForDeleteAnswer(answer?._id);
                          }}
                        >
                          <p>Delete</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (answer?.createdBy?._id) {
      return (
        <>
          <div className="answer-grid-items">
            <div className="answer-profile-image">
              {answer?.createdBy &&
              answer?.createdBy?.profileImage &&
              displayProfile === true ? (
                <img src={answer?.createdBy?.profileImage} />
              ) : (
                <img src={ProfileImg} />
              )}
            </div>
          </div>

          <div className="answer-grid-items">
            <span style={{ fontWeight: 600 }}>
              {answer?.createdBy &&
                answer?.createdBy?.currentRole &&
                answer?.createdBy?.currentRole}
            </span>
            <span>
              {answer?.createdBy &&
              answer?.createdBy?.subject &&
              displayProfile === true
                ? answer?.createdBy?.subject
                : "Anonymous"}
            </span>
            <span>
              {moment(answer?.createdAt).fromNow()}
              {answer?.isUpdated === true && "(edited)"}
            </span>
            {isValidURL(answer?.answer) ? (
              <>
                <p
                  style={{ color: "#2234c0", cursor: "pointer" }}
                  onClick={() => window.open(answer?.answer)}
                >
                  {answer?.answer}
                </p>
              </>
            ) : (
              <>
                <p>{answer?.answer}</p>
              </>
            )}
          </div>
          <div className="answer-grid-items">
            <div className="answer-grid-items answer-show-dropdown-relative">
              <div
                className="pointer mobile-view-flex-end-side"
                onClick={() => {
                  // setEditDropdown(!editDropdown)

                  setSeeAnswerChild(false);
                  if (answer?._id === idComparePopup) {
                    setIdComparePopup(0);
                  } else {
                    setIdComparePopup(answer?._id);
                  }
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
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="12" cy="5" r="1"></circle>
                  <circle cx="12" cy="19" r="1"></circle>
                </svg>
              </div>
              {/* )} */}

              <div
                className={
                  answer?._id === idComparePopup
                    ? "answer-edit-delete-dropdwon-design dropdown-show"
                    : "answer-edit-delete-dropdwon-design dropdown-hidden"
                }
              >
                <div className="dropdown-cus-design">
                  {userData?._id !== answer?.createdBy?._id &&
                  answer?.createdBy?._id ? (
                    <>
                      <>
                        <div className="edit-list-alignment">
                          <div className="edit-icon">
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
                              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                              <line x1="4" y1="22" x2="4" y2="15"></line>
                            </svg>
                          </div>
                          <div
                            className="edit-text"
                            onClick={() => {
                              setIdComparePopup(0);
                              setOpenReportAbuseModal(true);
                              setDataForEdit({});
                              setinputValue({
                                answer: "",
                              });
                              setIdReportAbuse(answer?._id);
                            }}
                          >
                            <p>Report Abuse</p>
                          </div>
                        </div>
                        {/* <div className="edit-list-alignment">
                          <div className="edit-icon">
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
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          </div>
                          <div
                            className="edit-text"
                            // onClick={() => {
                            //   setOpenModal(true);
                            //   setIdComparePopup(0);
                            //   setIdForDeleteAnswer(answer?._id);
                            // }}
                          >
                            <p>Starred Message</p>
                          </div>
                        </div> */}
                      </>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (
      answer?.requestBy?._id == userData?._id &&
      answer?.status === "pending"
    ) {
      return (
        <>
          <div
            className="answer-grid-items animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          >
            <div className="answer-profile-image">
              <img src={answer?.requestBy?.profileImage} />
            </div>
          </div>
          <div className="answer-grid-items">
            <p>You sent a profile access request</p>

            <span>{moment(answer?.createdAt).fromNow()}</span>
          </div>
        </>
      );
    } else if (
      answer?.requestTo?._id == userData?._id &&
      answer?.status === "accepted"
    ) {
      return (
        <>
          {/* <h1>You accepted Profile Request</h1>
          <img src={answer?.requestTo?.profileImage} /> */}
          {/* <div
            className="answer-grid-items animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          > */}
          <div className="answer-grid-items">
            <div className="answer-profile-image">
              <img src={answer?.requestTo?.profileImage} />
            </div>
          </div>

          <div className="answer-grid-items">
            <p>You accepted Profile Request</p>
            <span>{moment(answer?.createdAt).fromNow()}</span>
          </div>
          {/* </div> */}
        </>
      );
    } else if (
      answer?.requestBy?._id == userData?._id &&
      answer?.status === "accepted"
    ) {
      return (
        <>
          <div className="answer-grid-items">
            <div className="answer-profile-image">
              <img src={answer?.requestBy?.profileImage} />
            </div>
          </div>

          <div className="answer-grid-items">
            {/* <p>Your Request Accepted by Other User</p> */}
            <p>Your request to view profile has been accepted</p>
            <span>{moment(answer?.createdAt).fromNow()}</span>
          </div>
        </>
      );
    } else if (
      answer?.requestBy?._id == userData?._id &&
      answer?.status === "decline"
    ) {
      return (
        <>
          <div
            className="answer-grid-items animate__animated animate__slideInRight wow"
            data-wow-offset="200"
          >
            <div className="answer-profile-image">
              <img src={answer?.requestBy?.profileImage} />
            </div>
          </div>

          <div className="answer-grid-items">
            {/* <p>Your request rejected</p> */}
            <p>Your request to view profile has been rejected</p>
            <span>{moment(answer?.createdAt).fromNow()}</span>
          </div>
        </>
      );
    } else if (
      answer?.requestTo?._id == userData?._id &&
      answer?.status === "decline"
    ) {
      return (
        <>
          {" "}
          <div className="answer-grid-items">
            <div className="answer-profile-image">
              <img src={answer?.requestTo?.profileImage} />
            </div>
          </div>
          <div className="answer-grid-items">
            <p>Your request to view profile has been rejected</p>
            <span>{moment(answer?.createdAt).fromNow()}</span>
          </div>
        </>
      );
    }
  };

  return (
    <div className="test-question-grid-items">
      <div className="text-send-box">
        <div className="test-question-text">
          <h1>{questionData}</h1>
          <span>{moment(date).fromNow()} </span>
        </div>

        {allAnswerIdWise?.length === 0 ? (
          <div className="chat-icon-center-question">
            <div className="image-center">
              <img src={require("../../Assets/Images/chat1.png").default} />
            </div>
            <div className="chat-text-style">
              <p>Nothing in here yet</p>
            </div>
          </div>
        ) : (
          <>
            <div className="all-answer-count">
              <p>Answer ({allAnswerIdWise?.length})</p>
            </div>
            <div className="answer-box-design">
              <ScrollToBottom className="answer-all-main-heihgt-box">
                {allAnswerIdWise?.map((answer) => {
                  return (
                    <>
                      <div className="answer-grid">{Answer(answer)}</div>
                      {answer?.requestTo?._id == userData?._id &&
                        answer?.status === "pending" && (
                          <>
                            <div className="mb-allow-reject-grid">
                              <div className="mb-allow-reject-grid-items">
                                <img src={answer?.requestTo?.profileImage} />
                              </div>
                              <div className="mb-allow-reject-grid-items">
                                <p>
                                  You received a request for accessing your
                                  profile
                                </p>
                                <span>
                                  {moment(answer?.createdAt).fromNow()}
                                </span>
                              </div>
                              <div className="mb-allow-reject-grid-items">
                                <div className="mb-button-center-req">
                                  {/* <button
                                    onClick={() => {
                                      acceptAccess(answer?._id);
                                    }}
                                  >
                                    {" "}
                                    Allow
                                  </button> */}
                                  {QuestReqest == answer?._id ? (
                                    <button>
                                      <div style={{ marginLeft: "15px" }}>
                                        <FacebookCircularProgress />
                                      </div>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        acceptAccess(answer?._id, "request");
                                      }}
                                    >
                                      Allow
                                    </button>
                                  )}

                                  {/* <button
                                    onClick={() => {
                                      declineAccess(answer?._id);
                                    }}
                                  >
                                    {" "}
                                    Reject
                                  </button> */}

                                  {declineReqesut == answer?._id ? (
                                    <button>
                                      <div style={{ marginLeft: "20px" }}>
                                        <FacebookCircularProgressChange />
                                      </div>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        declineAccess(answer?._id, "reject");
                                      }}
                                    >
                                      Reject
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                    </>
                  );
                })}
              </ScrollToBottom>
            </div>
          </>
        )}

        <div className="chat-input-grid">
          <div className="chat-input-grid-items">
            {/* <input  type="text" placeholder="Write your answer here..." /> */}
            <input
              type="text"
              onChange={(e) => {
                handleOnChnage(e);
              }}
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  Object.keys(dataForEdit).length === 0
                    ? answerQuestion()
                    : answerQuestionEdit();
                }
              }}
              value={inputValue?.answer ? inputValue?.answer : ""}
              name="answer"
              placeholder="Write your answer here..."
              id="answer"
            />
          </div>
          {Object.keys(dataForEdit).length === 0 ? (
            <div className="chat-input-grid-items">
              <button
                className="submit-answer-button-style"
                onClick={(e) => {
                  answerQuestion(e);
                }}
                style={{
                  backgroundColor: inputValue.answer ? "#E61952" : "#F3A1B7",
                }}
              >
                Submit
              </button>
            </div>
          ) : (
            <>
              <div className="chat-input-grid-items">
                <button
                  className="cancel-button-style"
                  onClick={() => {
                    setDataForEdit({});
                    setinputValue("");
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className="chat-input-grid-items">
                <button
                  onClick={(e) => {
                    answerQuestionEdit(e);
                  }}
                  style={{
                    backgroundColor: inputValue.answer ? "#E61952" : "#F3A1B7",
                  }}
                >
                  Submit
                </button>
              </div>
            </>
          )}
          <div className=""></div>
        </div>
        <div className="" style={{ position: "relative" }}>
          <div
            className="who-can-see-alignment"
            onClick={() => setWhoCan(!whoCan)}
          >
            <div>
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="css-i6dzq1"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <div>
              <span>
                {`Who can see`}
                {textWho()}
              </span>
            </div>
          </div>
          <div
            className={
              whoCan
                ? "who-can-drop who-cand-show"
                : "who-can-drop who-cand-hidden"
            }
          >
            <div className="who-can-design">
              <div
                className="first-who"
                onClick={() => {
                  if (WhoIs != "please check it") {
                    OnlySeeAdmin();
                  } else {
                    localStorage.setItem("whoIs", 1);
                    setWhoCan(!whoCan);
                  }
                  // OnlySeeAdmin();
                }}
              >
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="vertical-align-bottom"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <div>
                  <span>Only author (Default)</span>
                </div>
              </div>
              <div
                className="first-who"
                onClick={() => {
                  if (WhoIs != "please check it") {
                    EveryOne();
                  } else {
                    localStorage.setItem("whoIs", 0);
                    setWhoCan(!whoCan);
                  }
                }}
              >
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="vertical-align-bottom"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <div>
                  <span>Everyone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
