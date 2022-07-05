import React, { useEffect, useState, useCallback } from "react";
import { ApiDelete, ApiGet, ApiPost, ApiPut, ApiPutNoAuth } from "../../Helpers/Api/ApiData";
import TabView from "../Common/TabView/TabView";
import "./ViewProfile.scss";
import { DndProvider } from "react-dnd";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";

import ProfileImg from "../../Assets/Images/ProfileImg.png";
import { toast } from "react-toastify";
import useViewprofile from "./useViewprofile";

export default function ViewProfile() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [subjectCards, setSubjectCards] = useState([]);
  // const [sentConnectionList, setSentConnectionList] = useState([]);
  let { id } = useParams();

  const location = useLocation();
  ///////////////////////////////////////////////// ////////////////////////////////////////////////////////////////////////////
  const [DeclineModal, setDeclineModal] = useState(false);
  useEffect(() => {
    document.title = "Profile | LeaderBridge";
    getAnswers();
    getQuestions();
    getUserDetails();
  }, []);

  const { SentConnection, withDrawRequestData, TotalConection, PendingConection, declineRequest, acceptConnectionrequest } = useViewprofile(setDeclineModal);

  ////////////////////////////////////////////////  GET USER DETAILS  /////////////////////////////////////////////////////
  const [questionsCount, setQuestionsCount] = useState();
  const [anwserCount, setAnwserCount] = useState();
  const getUserDetails = async () => {
    await ApiGet(`user?userId=${id}`)
      .then((res) => {
        setQuestionsCount(res?.data?.payload?.questionCount);
        setAnwserCount(res?.data?.payload?.answerCount);
        setUserDetails(res?.data?.payload?.findUser);
        setSubjectCards(res?.data?.payload?.findUser[0]?.subject);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const user_id = JSON.parse(localStorage.getItem("userData"))._id;

  const DataSentConnection = SentConnection?.filter((item) => {
    return item.senderId === user_id;
  });

  //////////////////////////////////////////////////  GET QUESTIONS  /////////////////////////////////////////////////////

  const getQuestions = async () => {
    await ApiGet("question/get-question?byUser=true")
      .then((res) => {
        setQuestions(res?.data?.payload?.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const withdrawalRequest = async () => {
    withDrawRequestData(WithdrawId);
  };

  ////////////////////////////////////////////////////  GET ANSWERS  /////////////////////////////////////////////////////

  const getAnswers = async () => {
    await ApiGet("answer?answerByMe=true")
      .then((res) => {
        setAnswers(res?.data?.payload?.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [IdForDeclineRequest, setIdForDeclineRequest] = useState([]);
  const [ConnectionId, setConnectionId] = useState([]);

  const [PendingConnectionList, setPendingConnectionList] = useState([]);
  const [WithdrawModel, setwithdrawModel] = useState(false);
  const [WithdrawId, setwithdrawModeliD] = useState();
  // with draw

  // set connection id for decline request
  const setConnectionIdForDeclineRequest = (e) => {
    e.preventDefault();

    declineRequest(IdForDeclineRequest, ConnectionId);
  };

  const AccesptRequest = async (sender_id, connection_id) => {
    acceptConnectionrequest(true, sender_id, connection_id);
  };

  // set Chat intial data

  const history = useHistory();
  const initiatChat = (id) => {
    const body = {
      id: id,
    };

    ApiPost("chat/initiate-chat", body)
      .then((res) => {
        const roomId = res?.data?.payload?.chatRoom?._id;

        history.push({ pathname: "/chat", state: { user_id: roomId } });
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <section className="children-page-align profile-section-align">
        <div className="container-fluid">
          <div className="profile-grid">
            <div className="profile-grid-items">
              <div className="profile-box">
                <div className="profile-image-center">{userDetails[0]?.profileImage ? <img src={userDetails[0]?.profileImage} /> : <img src={ProfileImg} />}</div>
                <div className="user-information">
                  <div>
                    {/* <p>{userDetails[0]?.subject?.join(", ")}</p> */}
                    <span>{userDetails[0]?.currentRole}</span>
                  </div>
                </div>
                <div className="answer-list">
                  <div className="start-block">
                    <p>Questions</p>

                    <span>{questionsCount}</span>
                  </div>
                  <div className="start-block">
                    <p>Answers</p>
                    <span>{anwserCount}</span>
                  </div>
                </div>
                {/* {location?.state?.pendingConnection_id &&} */}
                {PendingConection?.length > 0 &&
                  !location?.state?.Conn &&
                  PendingConection?.map((item, index) => {
                    return (
                      <>
                        {item?.senderId?._id === location?.pathname.slice(14) && (
                          <>
                            <div className="button-center">
                              <button
                                className="accept-button-style"
                                onClick={() => {
                                  setDeclineModal(true);
                                  setIdForDeclineRequest(item?.senderId?._id);
                                  setConnectionId(item?._id);
                                }}
                                // onClick={() =>
                                //   declineRequest(con?.senderId?._id, con?._id)
                                // }
                              >
                                <i class="fas fa-times"></i>
                                <span>Reject</span>
                              </button>
                              <button className="" onClick={() => AccesptRequest(item?.senderId?._id, item?._id)}>
                                <i class="fas fa-check"></i>
                                <span></span>
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    );
                  })}

                {TotalConection?.length > 0 &&
                  !location?.state?.Conn &&
                  TotalConection?.map((con) => {
                    return (
                      <>
                        {con?._id === location?.pathname.slice(14) && (
                          <>
                            <div className="button-center">
                              <button
                                onClick={() => {
                                  initiatChat(con?._id);
                                }}
                              >
                                <i class="far fa-envelope"></i>
                                <span>Message</span>
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    );
                  })}

                {}

                {DataSentConnection?.length !== 0 && location?.state?.Conn === true && (
                  <>
                    <div className="button-center">
                      <button
                        onClick={() => {
                          setwithdrawModel(true);
                          setwithdrawModeliD(DataSentConnection[0]?._id);
                        }}
                      >
                        <i class="fas fa-times"></i>
                        <span>Withdraw</span>
                      </button>
                    </div>
                  </>
                )}

                {WithdrawModel === true && (
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
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </div>
                        </div>
                        <div className="view-text-center-alignment">
                          <p>Sure you want withdraw the connection request?</p>
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
                                withdrawalRequest();
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

                <>
                  {DeclineModal && (
                    <>
                      {" "}
                      <div className="content-modal">
                        <div className="modal-center-align animate__animated animate__zoomIn wow">
                          <div className="modal-header">
                            <p>Widthdraw Request</p>
                            <div className="close-icon" onClick={() => setDeclineModal(!DeclineModal)}>
                              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </div>
                          </div>
                          <div className="view-text-center-alignment">
                            <p>Sure you want reject the connection request?</p>
                          </div>
                          <div className="modal-footer">
                            <div className="modal-footer-button-alignment">
                              <button className="cancel-button" onClick={() => setDeclineModal(!DeclineModal)}>
                                Cancel
                              </button>
                              <button className="send-button" onClick={(e) => setConnectionIdForDeclineRequest(e)}>
                                Confirm
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
                {/* <button>Message</button> */}
              </div>
            </div>
            <div className="profile-grid-items">
              <TabView userId={id} />
            </div>
            <div className="profile-grid-items">
              <div className="top-subject-box">
                <div className="content-alignment">
                  <p>Top Subjects</p>
                </div>
                <div className="list-style-alignment">
                  <DndProvider backend={HTML5Backend}>
                    {subjectCards?.map((data, i) => (
                      <div key={i}>
                        <p style={{ paddingTop: "10px", paddingLeft: "10px" }} className="">
                          {data}
                        </p>
                      </div>
                    ))}
                  </DndProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
