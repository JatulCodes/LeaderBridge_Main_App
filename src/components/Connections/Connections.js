import React, { useState, useEffect, useRef } from "react";
import "./Connections.scss";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import WorldImage from "../../Assets/Images/world.svg";
import SentImage from "../../Assets/Images/sent.png";
import { ApiDelete, ApiGet, ApiPost, ApiPut } from "../../Helpers/Api/ApiData";
import useConnection from "./useConnection";

// import Logo from "../../Assets/Images/logo.png";
import ProfileImg from "../../Assets/Images/ProfileImg.png";

export default function Connections() {
  const connectionMenuRef = useRef();
  const [totalConnectionList, setTotalConnectionList] = useState([]);
  const [pendingConnectionList, setPendingConnectionList] = useState([]);
  const [sentConnectionList, setSentConnectionList] = useState([]);
  const [connectionsMenu, setConnectionsMenu] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [blockUserModel, setBlockUserModel] = useState(false);
  const [withdrawReuestModel, setWithdrawReuestModel] = useState(false);
  const [removeUserModel, setRemoveUserModel] = useState(false);
  const [idForBlockUser, setIdForBlockUser] = useState("");
  const [idForRemoveUser, setIdForRemoveUser] = useState("");
  const [idForDeclineRequest, setIdForDeclineRequest] = useState("");
  const [connectionId, setConnectionId] = useState("");
  const [idForWithdrawRequest, setIdForWithdrawRequest] = useState("");
  const [activeClass, setActiveClass] = useState({
    total: true,
    pending: false,
    sent: false,
  });

  const history = useHistory();
  const location = useLocation();
  const [qParams, setQParams] = useState(location?.state?.type);

  const {
    TotalConection,
    PendingConnectionData,
    PendingConection,
    SentConnection,
    SentConnectionData,
    acceptConnectionrequest,
    declineRequest,
    BlockUser,
    RemoveUserConnection,
    withDrawRequestData,
  } = useConnection(
    setIsLoaderVisible,
    setDeclineModal,
    setBlockUserModel,
    setRemoveUserModel,
    setWithdrawReuestModel
  );

  useEffect(() => {
    document.title = "Connections | LeaderBridge";

    getTotalConnectionDetails();
    getPendingConnectionDetails();
    getSentConnectionDetails();
  }, []);

  useEffect(() => {
    if (qParams == "pending") {
      setActiveClass({
        total: false,
        pending: true,
        sent: false,
      });
      setQParams("");
    } else if (qParams == "total") {
      setActiveClass({
        total: true,
        pending: false,
        sent: false,
      });
      setQParams("");
    }
  }, [location]);

  // if (activeClass?.pending) {
  //   PendingConnectionData();
  // }

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

  const getTotalConnectionDetails = async () => {};

  const getPendingConnectionDetails = async () => {};

  const getSentConnectionDetails = async () => {};

  const withdrawalRequest = async () => {
    withDrawRequestData(idForWithdrawRequest);
  };

  const removeUserRequest = async () => {
    RemoveUserConnection(true, idForRemoveUser);
  };

  const accpetRequest = async (sender_id, connection_id) => {
    acceptConnectionrequest(true, sender_id, connection_id);
  };
  const blockUserRequest = () => {
    BlockUser(idForBlockUser);
  };

  const declineUserRequest = () => {
    declineRequest(idForDeclineRequest, connectionId);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!connectionsMenu) {
        if (
          !connectionsMenu &&
          connectionMenuRef.current &&
          !connectionMenuRef.current.contains(e.target)
        ) {
          setConnectionsMenu(true);
        }
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [connectionsMenu]);

  return (
    <div>
      <ToastContainer style={{ zIndex: "1111111111" }} />
      <section className="connections-section-align children-page-align">
        <div className="container-fluid">
          <div className="tab-text-alignment">
            <h1>Connections</h1>
            <div className="tab-design">
              <button
                className={`${activeClass.total && "avtive-tab-button"}`}
                onClick={() => {
                  setActiveClass({ total: true, pending: false, sent: false });
                }}
              >
                Total ({TotalConection?.length})
              </button>
              <button
                className={`${activeClass.pending && "avtive-tab-button"}`}
                onClick={() => {
                  setActiveClass({ total: false, pending: true, sent: false });
                }}
              >
                Pending ({PendingConection?.length})
              </button>
              <button
                className={`${activeClass.sent && "avtive-tab-button"}`}
                onClick={() => {
                  setActiveClass({ total: false, pending: false, sent: true });
                }}
              >
                Sent ({SentConnection?.length})
              </button>
            </div>
          </div>

          {activeClass.total ? (
            <div className="connection-section-align">
              {isLoaderVisible === true ? (
                <>
                  <div className="connection-skeleton-grid">
                    <div className="connection-skeleton-grid-items">
                      <div className="sub-grid-skeleton">
                        <div className="sub-grid-skeleton-items">
                          <Skeleton variant="circular" circle />
                        </div>
                        <div className="sub-grid-skeleton-items">
                          <Skeleton
                            animation="wave"
                            width={"80%"}
                            height={22}
                          />
                          <Skeleton
                            animation="wave"
                            width={"95%"}
                            height={22}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="connection-skeleton-grid-items">
                      <div className="sub-grid-skeleton">
                        <div className="sub-grid-skeleton-items">
                          <Skeleton variant="circular" circle />
                        </div>
                        <div className="sub-grid-skeleton-items">
                          <Skeleton
                            animation="wave"
                            width={"80%"}
                            height={22}
                          />
                          <Skeleton
                            animation="wave"
                            width={"95%"}
                            height={22}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="connection-skeleton-grid-items">
                      <div className="sub-grid-skeleton">
                        <div className="sub-grid-skeleton-items">
                          <Skeleton variant="circular" circle />
                        </div>
                        <div className="sub-grid-skeleton-items">
                          <Skeleton
                            animation="wave"
                            width={"80%"}
                            height={22}
                          />
                          <Skeleton
                            animation="wave"
                            width={"95%"}
                            height={22}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="connection-skeleton-grid-items">
                      <div className="sub-grid-skeleton">
                        <div className="sub-grid-skeleton-items">
                          <Skeleton variant="circular" circle />
                        </div>
                        <div className="sub-grid-skeleton-items">
                          <Skeleton
                            animation="wave"
                            width={"80%"}
                            height={22}
                          />
                          <Skeleton
                            animation="wave"
                            width={"95%"}
                            height={22}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="connection-skeleton-grid-items">
                      <div className="sub-grid-skeleton">
                        <div className="sub-grid-skeleton-items">
                          <Skeleton variant="circular" circle />
                        </div>
                        <div className="sub-grid-skeleton-items">
                          <Skeleton
                            animation="wave"
                            width={"80%"}
                            height={22}
                          />
                          <Skeleton
                            animation="wave"
                            width={"95%"}
                            height={22}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {TotalConection?.length > 0 ? (
                    <div className="grid">
                      {TotalConection?.map((data, key) => {
                        return (
                          <div
                            className="grid-items animate__animated animate__slideInRight wow"
                            data-wow-offset="200"
                            key={key}
                          >
                            <div className="sub-grid">
                              <div className="sub-grid-items">
                                <div className="profile-grid">
                                  {/* <div> */}
                                  <div className="prfoile-grid-items">
                                    {data?.profileImage ? (
                                      <img src={data?.profileImage} />
                                    ) : (
                                      <img src={ProfileImg} />
                                    )}
                                  </div>
                                  <div className="prfoile-grid-items">
                                    <p
                                      className="cursor-pointer"
                                      onClick={() => {
                                        history.push({
                                          pathname: `/view-profile/${data?._id}`,
                                          state: {
                                            viewdata: data,
                                          },
                                        });
                                      }}
                                    >
                                      <span>{data?.currentRole}</span>

                                      {/* {data?.subject?.join(", ")} */}
                                    </p>

                                    <div className="location-alignment">
                                      {/* <span>{data?.currentRole}</span> */}
                                      <div className="location">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <span>{data?.region}</span>
                                      </div>
                                    </div>
                                    {/* </div> */}
                                  </div>
                                </div>
                              </div>
                              <div className="sub-grid-items">
                                <i
                                  onClick={() => {
                                    // setEditDropdown(!editDropdown)
                                    if (data?._id === connectionsMenu) {
                                      setConnectionsMenu(0);
                                    } else {
                                      setConnectionsMenu(data?._id);
                                    }
                                  }}
                                  class="fas fa-ellipsis-v"
                                ></i>
                                {/* <i onClick={() => setConnectionsMenu(!connectionsMenu)} class="fas fa-ellipsis-v"></i> */}
                                <div
                                  className={
                                    data?._id === connectionsMenu
                                      ? "connections-dropdown-menu dropdown-open"
                                      : "connections-dropdown-menu dropdown-close"
                                  }
                                >
                                  <div className="connections-drop-down-design">
                                    <div className="same-design-dropdown">
                                      <div
                                        className="dropdown-alignment-text-icon"
                                        onClick={(e) => {
                                          setBlockUserModel(true);
                                          setConnectionsMenu(0);
                                          setIdForBlockUser(data?._id);
                                        }}
                                      >
                                        <div className="svg-icon-design">
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
                                            <circle
                                              cx="12"
                                              cy="12"
                                              r="10"
                                            ></circle>
                                            <line
                                              x1="4.93"
                                              y1="4.93"
                                              x2="19.07"
                                              y2="19.07"
                                            ></line>
                                          </svg>
                                        </div>
                                        <span>Block user</span>
                                      </div>
                                      <div
                                        className="dropdown-alignment-text-icon"
                                        onClick={(e) => {
                                          setRemoveUserModel(true);
                                          setConnectionsMenu(0);
                                          setIdForRemoveUser(data?._id);
                                        }}
                                      >
                                        <div className="svg-icon-design">
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
                                            <line
                                              x1="18"
                                              y1="6"
                                              x2="6"
                                              y2="18"
                                            ></line>
                                            <line
                                              x1="6"
                                              y1="6"
                                              x2="18"
                                              y2="18"
                                            ></line>
                                          </svg>
                                        </div>
                                        <span>Remove user</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="button-center">
                              <button
                                onClick={() => {
                                  initiatChat(data?._id);
                                }}
                              >
                                <i class="far fa-envelope"></i>
                                <span>Message</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      <div className="total-connection-no-show-data">
                        <div className="no-data-connection-text">
                          <div className="total-connection-image">
                            <img src={WorldImage} alt="WorldImage" />
                          </div>
                          <p>You don't have any connections</p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          ) : null}
          {activeClass.pending ? (
            <div className="connection-section-align">
              {isLoaderVisible === true ? (
                <>
                  <div className="connection-skeleton-grid">
                    <div className="connection-skeleton-grid-items">
                      <div className="sub-grid-skeleton">
                        <div className="sub-grid-skeleton-items">
                          <Skeleton variant="circular" circle />
                        </div>
                        <div className="sub-grid-skeleton-items">
                          <Skeleton
                            animation="wave"
                            width={"80%"}
                            height={22}
                          />
                          <Skeleton
                            animation="wave"
                            width={"95%"}
                            height={22}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="connection-skeleton-grid-items">
                      <div className="sub-grid-skeleton">
                        <div className="sub-grid-skeleton-items">
                          <Skeleton variant="circular" circle />
                        </div>
                        <div className="sub-grid-skeleton-items">
                          <Skeleton
                            animation="wave"
                            width={"80%"}
                            height={22}
                          />
                          <Skeleton
                            animation="wave"
                            width={"95%"}
                            height={22}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="connection-skeleton-grid-items">
                      <div className="sub-grid-skeleton">
                        <div className="sub-grid-skeleton-items">
                          <Skeleton variant="circular" circle />
                        </div>
                        <div className="sub-grid-skeleton-items">
                          <Skeleton
                            animation="wave"
                            width={"80%"}
                            height={22}
                          />
                          <Skeleton
                            animation="wave"
                            width={"95%"}
                            height={22}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="connection-skeleton-grid-items">
                      <div className="sub-grid-skeleton">
                        <div className="sub-grid-skeleton-items">
                          <Skeleton variant="circular" circle />
                        </div>
                        <div className="sub-grid-skeleton-items">
                          <Skeleton
                            animation="wave"
                            width={"80%"}
                            height={22}
                          />
                          <Skeleton
                            animation="wave"
                            width={"95%"}
                            height={22}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="connection-skeleton-grid-items">
                      <div className="sub-grid-skeleton">
                        <div className="sub-grid-skeleton-items">
                          <Skeleton variant="circular" circle />
                        </div>
                        <div className="sub-grid-skeleton-items">
                          <Skeleton
                            animation="wave"
                            width={"80%"}
                            height={22}
                          />
                          <Skeleton
                            animation="wave"
                            width={"95%"}
                            height={22}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {PendingConection?.length > 0 ? (
                    <div className="grid">
                      {PendingConection?.map((con) => {
                        return (
                          <div
                            className="grid-items animate__animated animate__slideInRight wow"
                            data-wow-offset="200"
                            // onClick={() => {
                            //   history.push({
                            //     pathname: `/view-profile/${con?._id}`,
                            //     state: {
                            //       pendingConnection: con,
                            //     },
                            //   });
                            // }}
                          >
                            <div className="sub-grid">
                              <div className="sub-grid-items">
                                <div className="profile-grid">
                                  <div className="prfoile-grid-items">
                                    {con?.senderId?.profileImage ? (
                                      <img src={con?.senderId?.profileImage} />
                                    ) : (
                                      <img src={ProfileImg} />
                                    )}
                                  </div>
                                  <div className="prfoile-grid-items">
                                    <p
                                      className="cursor-pointer"
                                      onClick={() => {
                                        history.push(
                                          `/view-profile/${con?.senderId?._id}`
                                        );
                                      }}
                                    >
                                      <span>{con?.senderId?.currentRole}</span>
                                      {/* {con?.senderId?.subject?.join(", ")} */}
                                    </p>
                                    <div className="location-alignment">
                                      {/* <span>{con?.senderId?.currentRole}</span> */}
                                      <div className="location">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <span>{con?.senderId?.region}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="sub-grid-items">
                                <i
                                  onClick={() => {
                                    // setEditDropdown(!editDropdown)
                                    if (
                                      con?.senderId?._id === connectionsMenu
                                    ) {
                                      setConnectionsMenu(0);
                                    } else {
                                      setConnectionsMenu(con?.senderId?._id);
                                    }
                                  }}
                                  class="fas fa-ellipsis-v"
                                ></i>
                                <div
                                  className={
                                    con?.senderId?._id === connectionsMenu
                                      ? "connections-dropdown-menu dropdown-open"
                                      : "connections-dropdown-menu dropdown-close"
                                  }
                                >
                                  <div
                                    className="connections-drop-down-design"
                                    onClick={(e) => {
                                      setBlockUserModel(true);
                                      setConnectionsMenu(0);
                                      setIdForBlockUser(con?.senderId?._id);
                                    }}
                                  >
                                    <div className="same-design-dropdown">
                                      <div className="dropdown-alignment-text-icon">
                                        <div className="svg-icon-design">
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
                                            <circle
                                              cx="12"
                                              cy="12"
                                              r="10"
                                            ></circle>
                                            <line
                                              x1="4.93"
                                              y1="4.93"
                                              x2="19.07"
                                              y2="19.07"
                                            ></line>
                                          </svg>
                                        </div>
                                        <span

                                        // onClick={(e) => {
                                        //   blockUserRequest(
                                        //     con?.senderId?._id
                                        //   );
                                        //   setConnectionsMenu(0)
                                        // }}
                                        >
                                          Block user
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="button-center">
                              <button
                                className="accept-button-style"
                                onClick={() => {
                                  setDeclineModal(true);
                                  setIdForDeclineRequest(con?.senderId?._id);
                                  setConnectionId(con?._id);
                                }}
                                // onClick={() =>
                                //   declineRequest(con?.senderId?._id, con?._id)
                                // }
                              >
                                <i class="fas fa-times"></i>
                                <span>Reject</span>
                              </button>
                              <button
                                className=""
                                onClick={() =>
                                  accpetRequest(con?.senderId?._id, con?._id)
                                }
                              >
                                <i class="fas fa-check"></i>
                                <span></span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      <div className="total-connection-no-show-data">
                        <div className="no-data-connection-text">
                          <div className="total-connection-image">
                            <img src={SentImage} alt="SentImage" />
                          </div>
                          <p>You don't have any pending requests.</p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          ) : null}
          {activeClass.sent ? (
            <div className="connection-section-align">
              {isLoaderVisible === true ? (
                <>
                  <div className="connection-skeleton-grid">
                    <div className="connection-skeleton-grid-items">
                      <div className="sub-grid-skeleton">
                        <div className="sub-grid-skeleton-items">
                          <Skeleton variant="circular" circle />
                        </div>
                        <div className="sub-grid-skeleton-items">
                          <Skeleton
                            animation="wave"
                            width={"80%"}
                            height={22}
                          />
                          <Skeleton
                            animation="wave"
                            width={"95%"}
                            height={22}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="connection-skeleton-grid-items">
                      <div className="sub-grid-skeleton">
                        <div className="sub-grid-skeleton-items">
                          <Skeleton variant="circular" circle />
                        </div>
                        <div className="sub-grid-skeleton-items">
                          <Skeleton
                            animation="wave"
                            width={"80%"}
                            height={22}
                          />
                          <Skeleton
                            animation="wave"
                            width={"95%"}
                            height={22}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="connection-skeleton-grid-items">
                      <div className="sub-grid-skeleton">
                        <div className="sub-grid-skeleton-items">
                          <Skeleton variant="circular" circle />
                        </div>
                        <div className="sub-grid-skeleton-items">
                          <Skeleton
                            animation="wave"
                            width={"80%"}
                            height={22}
                          />
                          <Skeleton
                            animation="wave"
                            width={"95%"}
                            height={22}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="connection-skeleton-grid-items">
                      <div className="sub-grid-skeleton">
                        <div className="sub-grid-skeleton-items">
                          <Skeleton variant="circular" circle />
                        </div>
                        <div className="sub-grid-skeleton-items">
                          <Skeleton
                            animation="wave"
                            width={"80%"}
                            height={22}
                          />
                          <Skeleton
                            animation="wave"
                            width={"95%"}
                            height={22}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="connection-skeleton-grid-items">
                      <div className="sub-grid-skeleton">
                        <div className="sub-grid-skeleton-items">
                          <Skeleton variant="circular" circle />
                        </div>
                        <div className="sub-grid-skeleton-items">
                          <Skeleton
                            animation="wave"
                            width={"80%"}
                            height={22}
                          />
                          <Skeleton
                            animation="wave"
                            width={"95%"}
                            height={22}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {SentConnection?.length > 0 ? (
                    <div className="grid">
                      {SentConnection?.map((con) => {
                        return (
                          <div
                            className="grid-items animate__animated animate__slideInRight wow"
                            data-wow-offset="200"
                          >
                            <div className="sub-grid">
                              <div className="sub-grid-items">
                                <div className="profile-grid">
                                  <div className="prfoile-grid-items">
                                    {con?.receiverId?.profileImage ? (
                                      <img
                                        src={con?.receiverId?.profileImage}
                                      />
                                    ) : (
                                      <img src={ProfileImg} />
                                    )}
                                  </div>
                                  <div className="prfoile-grid-items">
                                    <p
                                      className="cursor-pointer"
                                      onClick={() => {
                                        history.push({
                                          pathname: `/view-profile/${con?.receiverId?._id}`,
                                          state: {
                                            Conn: true,
                                          },
                                        });
                                      }}
                                    >
                                      <span>
                                        {con?.receiverId?.currentRole}
                                      </span>
                                      {/* {con?.receiverId?.subject?.join(", ")} */}
                                    </p>
                                    <div className="location-alignment">
                                      {/* <span>
                                        {con?.receiverId?.currentRole}
                                      </span> */}
                                      <div className="location">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <span>
                                          {con?.region ? con?.region : "India"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="sub-grid-items">
                                <i
                                  onClick={() => {
                                    // setEditDropdown(!editDropdown)
                                    if (
                                      con?.receiverId?._id === connectionsMenu
                                    ) {
                                      setConnectionsMenu(0);
                                    } else {
                                      setConnectionsMenu(con?.receiverId?._id);
                                    }
                                  }}
                                  class="fas fa-ellipsis-v"
                                ></i>
                                <div
                                  className={
                                    con?.receiverId?._id === connectionsMenu
                                      ? "connections-dropdown-menu dropdown-open"
                                      : "connections-dropdown-menu dropdown-close"
                                  }
                                >
                                  <div
                                    className="connections-drop-down-design"
                                    onClick={(e) => {
                                      setBlockUserModel(true);
                                      setConnectionsMenu(0);
                                      setIdForBlockUser(con?.receiverId?._id);
                                    }}
                                  >
                                    <div className="same-design-dropdown">
                                      <div className="dropdown-alignment-text-icon">
                                        <div className="svg-icon-design">
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
                                            <circle
                                              cx="12"
                                              cy="12"
                                              r="10"
                                            ></circle>
                                            <line
                                              x1="4.93"
                                              y1="4.93"
                                              x2="19.07"
                                              y2="19.07"
                                            ></line>
                                          </svg>
                                        </div>
                                        <span

                                        // onClick={(e) => {
                                        //   blockUserRequest(
                                        //     con?.receiverId?._id
                                        //   );
                                        //   setConnectionsMenu(0)
                                        // }}
                                        >
                                          Block user
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="button-center">
                              <button
                                onClick={() => {
                                  setWithdrawReuestModel(true);
                                  setIdForWithdrawRequest(con?._id);
                                }}
                              >
                                {/* onClick={() => {
                                  withdrawalRequest(con?._id)
                                  }}> */}
                                <i class="fas fa-times"></i>
                                <span>Withdraw</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      <div className="total-connection-no-show-data">
                        <div className="no-data-connection-text">
                          <div className="total-connection-image">
                            <img src={SentImage} alt="SentImage" />
                          </div>
                          <p>You haven't sent any request yet</p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          ) : null}
        </div>
      </section>
      {declineModal ? (
        <div className="decline-modal-design">
          <div className="decline-modal animate__animated animate__zoomIn wow">
            <div className="modal-heading">
              <h2>Reject Request</h2>
              <div
                className="modal-close-icon"
                onClick={() => setDeclineModal(!declineModal)}
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
              <p>Sure you want to reject this request?</p>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-button-style"
                onClick={() => setDeclineModal(!declineModal)}
              >
                Cancel
              </button>
              <button
                className="confirm-button-style"
                onClick={() => {
                  declineUserRequest();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {blockUserModel ? (
        <div className="decline-modal-design">
          <div
            className="decline-modal animate__animated animate__zoomIn wow"
            data-wow-offset="200"
          >
            <div className="modal-heading">
              <h2>Block User</h2>
              <div
                className="modal-close-icon"
                onClick={() => setBlockUserModel(false)}
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
      {withdrawReuestModel ? (
        <div className="decline-modal-design">
          <div className="decline-modal">
            <div className="modal-heading">
              <h2>Withdraw Request</h2>
              <div
                className="modal-close-icon"
                onClick={() => setWithdrawReuestModel(!withdrawReuestModel)}
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
              <p>Sure you want to withdraw this request?</p>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-button-style"
                onClick={() => setWithdrawReuestModel(false)}
              >
                Cancel
              </button>
              <button
                className="confirm-button-style"
                onClick={() => {
                  withdrawalRequest();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {removeUserModel ? (
        <div className="decline-modal-design">
          <div className="decline-modal">
            <div className="modal-heading">
              <h2>Remove User</h2>
              <div
                className="modal-close-icon"
                onClick={() => setRemoveUserModel(false)}
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
              <p>Sure, you want to remove this user from connections?</p>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-button-style"
                onClick={() => setRemoveUserModel(false)}
              >
                Cancel
              </button>
              <button
                className="confirm-button-style"
                onClick={() => {
                  removeUserRequest();
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
