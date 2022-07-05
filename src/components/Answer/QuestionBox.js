import React from "react";

import ProfileImg from "../../Assets/Images/ProfileImg.png";
import {
  FacebookCircularProgress,
  FacebookCircularProgressAnswer,
} from "../../Loader/FacebookCircularProgress";

const QuestionBox = ({
  profileImage,
  Friend,
  userName,
  seeAnswerChild,
  setSeeAnswerChild,
  setIdComparePopup,
  setOpenModalRemoveQuestionIReceived,
  dataToCheckProfileRequest,
  requestedBy,
  questionDataForRequest,
  viewData,
  history,
  userId,
  requestProfileAccess,
  responses,
  displayProfile,
  questionData,
  isUserFriend,
  allowConnectionRequest,
  setOpenConnectionModal,
  SentConnection,
  setIdForWithdrawRequest,
  idForWithdrawRequest,
  withdrawRequest,
  setwithdrawModel,
  WithdrawModel,
  QuestionBoxData,
  SentConnectionData,
  dropdown,
  response,
  QuestionReqest,
  setQuestionReqution,
}) => {
  console.log("seeAnswerChild", seeAnswerChild);
  const ConnWithdraw = SentConnectionData?.filter((item) => {
    return item?.receiverId?._id == QuestionBoxData?.createdBy?._id;
  });

  const UserIDChat = JSON.parse(localStorage.getItem("userData"));
  const renderMessage = () => {
    if (requestedBy?.status != "accepted") {
      if (
        requestedBy?.requestBy?._id == UserIDChat._id &&
        requestedBy?.status === "pending"
      ) {
        // setQuestionReqution(!QuestionReqest);
        return (
          <>
            <div className="answer-text-alignment">
              <div>
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
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
              </div>
              <div>
                <span
                // onClick={() => {
                //   history.push(`/view-profile/${userId}`);
                // }}

                // onClick={() => {
                //   requestProfileAccess(chatData?.createdBy?._id);
                // }}
                >
                  Requested Profile access
                </span>
              </div>
            </div>
          </>
        );
      } else if (
        requestedBy?.requestBy?._id != UserIDChat._id &&
        requestedBy?.status === "pending"
      ) {
        return (
          <>
            <div className="answer-text-alignment">
              <div>
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
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
              </div>
              <div>
                <span
                // onClick={() => {
                //   requestProfileAccess();
                // }}
                >
                  Received profile access
                </span>
              </div>
            </div>
          </>
        );
      } else if (requestedBy?.status === "decline") {
        return (
          <>
            <div className="answer-text-alignment">
              {QuestionReqest ? (
                <div className="TextLoader">
                  <FacebookCircularProgressAnswer />
                </div>
              ) : (
                <div>
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
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                </div>
              )}

              <div>
                {QuestionReqest ? (
                  <span
                    // onClick={() => {
                    //   requestProfileAccess();
                    // }}
                    style={{ opacity: "0.5" }}
                  >
                    Request profile access
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      requestProfileAccess();
                    }}
                    // style={{ opacity: "0.5" }}
                  >
                    Request profile access
                  </span>
                )}
              </div>
            </div>
          </>
        );
      }
    } else if (requestedBy?.status == "accepted") {
      if (requestedBy?.acceptedBy != userId) {
        return (
          <>
            <>
              <div className="answer-text-alignment">
                {QuestionReqest ? (
                  <div className="TextLoader">
                    <FacebookCircularProgressAnswer />
                  </div>
                ) : (
                  <div>
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
                      <line x1="20" y1="8" x2="20" y2="14"></line>
                      <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                  </div>
                )}

                <div>
                  {QuestionReqest ? (
                    <span
                      // onClick={() => {
                      //   requestProfileAccess();
                      // }}
                      style={{ opacity: "0.5" }}
                    >
                      Request profile access
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        requestProfileAccess();
                      }}
                      // style={{ opacity: "0.5" }}
                    >
                      Request profile access
                    </span>
                  )}
                </div>
              </div>
            </>
          </>
        );
      } else {
        return (
          <>
            <div className="answer-text-alignment">
              <div>
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
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
              </div>
              <div>
                <span
                  onClick={() => {
                    history.push(`/view-profile/${userId}`);
                  }}
                >
                  View Profile
                </span>
              </div>
            </div>
          </>
        );
      }
    } else if (isUserFriend == true) {
      return (
        <>
          <div className="answer-text-alignment">
            <div>
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
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
            <div>
              <span
                onClick={() => {
                  history.push(`/view-profile/${userId}`);
                }}
              >
                View Profile
              </span>
            </div>
          </div>
        </>
      );
    }

    if (displayProfile == true) {
      return (
        <>
          <div className="answer-text-alignment">
            <div>
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
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
            <div>
              <span
                onClick={() => {
                  history.push(`/view-profile/${userId}`);
                }}
              >
                View Profile
              </span>
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <div className="test-question-grid-items">
      <div className="answer-card-box">
        <div className="profile-grid">
          <div className="profile-grid-items">
            <div className="profile-aligment-all see-answer-grid-all">
              <div className="profile">
                {profileImage && displayProfile === true ? (
                  <img src={profileImage} />
                ) : (
                  <img src={ProfileImg} />
                )}
              </div>
              <div className="profile-text">
                {/* <span>
                  {console.log("3454335435435345435435333344554335", userName)}
                  {displayProfile === true ? userName?.subject : "Anonymous"}
                  {/* { userName?.current} */}
                {/* </span> */}
                <span>
                  {userName?.currentRole}
                  {/* { userName?.current} */}
                </span>
              </div>
            </div>
          </div>
          <div className="profile-grid-items" ref={dropdown}>
            <div
              onClick={() => {
                console.log("Datatata11111");
                setSeeAnswerChild(true);
                // setIdComparePopup(0);
              }}
              style={{ cursor: "pointer" }}
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
            <div className="see-answer-child-menu">
              <div
                className={
                  seeAnswerChild ? "see-answer-show " : "see-answer-hidden"
                }
              >
                <div className="an-child">
                  <div className="answer-text-alignment">
                    <div>
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
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                      </svg>
                    </div>
                    <div
                      onClick={() => {
                        setOpenModalRemoveQuestionIReceived(true);
                        setSeeAnswerChild(false);
                      }}
                    >
                      <span>Block user</span>
                    </div>
                  </div>
                  {renderMessage()}
                  {!requestedBy?.requestBy?._id && displayProfile != true && (
                    <>
                      <div className="answer-text-alignment">
                        {QuestionReqest ? (
                          <div className="TextLoader">
                            <FacebookCircularProgressAnswer />
                          </div>
                        ) : (
                          <div>
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
                              <line x1="20" y1="8" x2="20" y2="14"></line>
                              <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                          </div>
                        )}

                        <div>
                          {QuestionReqest ? (
                            <span
                              // onClick={() => {
                              //   requestProfileAccess();
                              // }}
                              style={{ opacity: "0.5" }}
                            >
                              Request profile access
                            </span>
                          ) : (
                            <span
                              onClick={() => {
                                requestProfileAccess();
                              }}
                              // style={{ opacity: "0.5" }}
                            >
                              Request profile access
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  {/* {(allowConnectionRequest === true && Friend == true) ||
                    !displayProfile === true ||
                    (!requestedBy?.status == "accepted" && (
                      <div className="answer-text-alignment">
                        <div>
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
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                          </svg>
                        </div>
                        <div>
                          <span
                            onClick={() => {
                              setOpenConnectionModal(true);
                            }}
                          >
                            Send Connection Request
                          </span>
                        </div>
                      </div>
                    ))} */}

                  {isUserFriend && isUserFriend == "true" ? (
                    ""
                  ) : isUserFriend != true &&
                    allowConnectionRequest === true ? (
                    <>
                      {ConnWithdraw?.length > 0 ? (
                        <div
                          onClick={() => {
                            // withdrawRequest(s?._id);
                            setwithdrawModel(true);
                            setIdForWithdrawRequest(SentConnectionData[0]?._id);
                          }}
                          className="answer-text-alignment"
                        >
                          <div>
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
                              <line x1="20" y1="8" x2="20" y2="14"></line>
                              <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                          </div>
                          <div>
                            <span>Withdraw request</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="answer-text-alignment">
                            <div>
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
                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                <line x1="23" y1="11" x2="17" y2="11"></line>
                              </svg>
                            </div>
                            <div>
                              <span
                                onClick={() => {
                                  setOpenConnectionModal(true);
                                }}
                              >
                                Send Connection Request
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ans-text-alignment top-align-text">
          <p>Reach</p>
          <button>{viewData}</button>
        </div>
        <div className="ans-text-alignment">
          <p>Responses</p>
          <button>{response}</button>
        </div>
        <div className="ans-text-alignment">
          <p>Starred Answer</p>
          <button>0</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
