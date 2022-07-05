import React, { useContext, useEffect, useState } from "react";
import "./ProfileSearch.scss";

import { useLocation, useHistory } from "react-router";
import { ApiDelete, ApiGet, ApiPost } from "../../Helpers/Api/ApiData";
import { NavLink } from "react-router-dom";
import { Skeleton } from "@mui/material";

import WorldImage from "../../Assets/Images/world.svg";

import Logo from "../../Assets/Images/logo.png";

import useProfile from "./useProfile";
import { DataLoaded } from "../../App";

export default function ProfileSearch() {
  const location = useLocation();
  const history = useHistory();

  const [searchUserData, setSearchUserData] = useState([]);
  const [openmodal, setOpenModal] = useState(false);
  const [openWithdrawmodal, setOpenWithdrawModal] = useState(false);
  const [connectionId, setConnectionId] = useState("");
  const [customMessage, setCustomMessage] = useState(
    "Hi, I want to connect with you .."
  );
  const [senderId, setSenderId] = useState("");
  const [userSearchLoader, setUserSearchLoader] = useState(true);

  console.log("location?.state?.filter.length", location?.state?.filter);

  window.onload = function () {
    console.log("searchUserData", searchUserData);
    setSearchUserData([]);
  };

  useEffect(() => {
    document.title = "Search | LeaderBridge";
    getSearchedUserData();
  }, [location?.state?.searchValue, location?.state?.filter]);
  const getSearchedUserData = async () => {
    setUserSearchLoader(true);
    if (
      location?.state?.searchValue == "" ||
      location?.state?.searchValue == undefined ||
      !location?.state?.searchValue
    ) {
      if (location?.state?.filter.length > 0) {
        const res = await ApiPost(`user/search`, {
          filter: location?.state?.filter,
        });
        setSearchUserData(res?.data?.payload?.allUser);
        setUserSearchLoader(false);
      } else {
        const res = await ApiPost(`user/search`);
        setSearchUserData(res?.data?.payload?.allUser);
        setUserSearchLoader(false);
      }
    } else {
      if (location?.state?.filter.length > 0) {
        const res = await ApiPost(
          `user/search?search=${location?.state?.searchValue}`,
          {
            filter: location?.state?.filter,
          }
        );
        setSearchUserData(res?.data?.payload?.allUser);
        setUserSearchLoader(false);
      } else {
        const res = await ApiPost(
          `user/search?search=${location?.state?.searchValue}`
        );
        setSearchUserData(res?.data?.payload?.allUser);
        setUserSearchLoader(false);
      }
    }
  };

  const { sendConnection, withDrawRequestData } = useProfile(
    setOpenModal,
    setCustomMessage,
    getSearchedUserData,
    setOpenWithdrawModal,
    setConnectionId
  );
  const sendConnectRequest = async () => {
    sendConnection(senderId, customMessage);
  };

  const withdrawalRequest = async (id) => {
    withDrawRequestData(id);
  };

  const { answer, myquery, request, answerLaterUser } = useContext(DataLoaded);

  const [myQueryData, setMyQueryData] = myquery;
  const [requestData, setRequestData] = request;
  const [answerByme, setAnswerByme] = answer;
  const [answerLaterData, setanswerLaterData] = answerLaterUser;

  // window.onload = (event) => {
  //   history.push("/request");
  //   setRequestData(true);
  //   setMyQueryData(false);
  //   setAnswerByme(false);
  //   setanswerLaterData(false);
  // };

  return (
    <div>
      <div className="container-fluid">
        <section className="children-page-align">
          <div className="members-heading-text">
            <h2>Members</h2>

            {!userSearchLoader && searchUserData?.length > 0 ? (
              <p>
                Showing ({searchUserData?.length}) result for "
                {location?.state?.searchValue}"
              </p>
            ) : (
              ""
            )}
          </div>
          {!userSearchLoader ? (
            searchUserData && searchUserData?.length > 0 ? (
              <div className="member-grid">
                {searchUserData.map((user) => {
                  return (
                    <div className="member-grid-items">
                      <div className="profile-grid">
                        <div className="profile-grid-items">
                          <div className="profile-image">
                            {user?.searchUser?.profileImage ? (
                              <img src={user?.searchUser?.profileImage} />
                            ) : (
                              <img src={Logo} />
                            )}
                          </div>
                        </div>
                        <div className="profile-grid-items">
                          <p
                            onClick={() => {
                              history.push(
                                `/view-profile/${user?.searchUser?._id}`
                              );
                            }}
                          >
                            {user?.searchUser?.subject?.join(", ")}
                          </p>
                          <div className="child-text-alignment">
                            <span>{user?.searchUser?.currentRole}</span>
                            <div className="location-text">
                              <i class="fas fa-map-marker-alt"></i>
                              <span>{user?.searchUser?.region}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="connect-button-center">
                        {user?.isFriend === "true" ? (
                          <NavLink
                            to={{
                              pathname: "/chat",
                              state: { user_id: user?.searchUser?._id },
                            }}
                          >
                            <button>
                              <i class="far fa-envelope"></i>
                              <span>Message</span>
                            </button>
                          </NavLink>
                        ) : user?.isFriend === "false" ? (
                          <button
                            onClick={() => {
                              setSenderId(user?.searchUser?._id);
                              setOpenModal(!openmodal);
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
                              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                              <circle cx="8.5" cy="7" r="4"></circle>
                              <line x1="20" y1="8" x2="20" y2="14"></line>
                              <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                            <span>Connect</span>
                          </button>
                        ) : user?.isFriend === "sent" ? (
                          <button
                            onClick={() => {
                              setConnectionId(user?.connection?._id);
                              setOpenWithdrawModal(!openWithdrawmodal);
                            }}
                          >
                            <i class="fas fa-times"></i>
                            <span>Withdraw</span>
                          </button>
                        ) : (
                          <button>
                            {/* <i class="fas fa-times"></i> */}
                            <span>Pending</span>
                          </button>
                        )}
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
                    <p>No Result Found for "{location?.state?.searchValue}"</p>
                  </div>
                </div>
              </>
            )
          ) : (
            <>
              <div className="connection-skeleton-grid">
                <div className="connection-skeleton-grid-items">
                  <div className="sub-grid-skeleton">
                    <div className="sub-grid-skeleton-items">
                      <Skeleton variant="circular" circle />
                    </div>
                    <div className="sub-grid-skeleton-items">
                      <Skeleton animation="wave" width={"80%"} height={22} />
                      <Skeleton animation="wave" width={"95%"} height={22} />
                    </div>
                  </div>
                </div>
                <div className="connection-skeleton-grid-items">
                  <div className="sub-grid-skeleton">
                    <div className="sub-grid-skeleton-items">
                      <Skeleton variant="circular" circle />
                    </div>
                    <div className="sub-grid-skeleton-items">
                      <Skeleton animation="wave" width={"80%"} height={22} />
                      <Skeleton animation="wave" width={"95%"} height={22} />
                    </div>
                  </div>
                </div>
                <div className="connection-skeleton-grid-items">
                  <div className="sub-grid-skeleton">
                    <div className="sub-grid-skeleton-items">
                      <Skeleton variant="circular" circle />
                    </div>
                    <div className="sub-grid-skeleton-items">
                      <Skeleton animation="wave" width={"80%"} height={22} />
                      <Skeleton animation="wave" width={"95%"} height={22} />
                    </div>
                  </div>
                </div>
                <div className="connection-skeleton-grid-items">
                  <div className="sub-grid-skeleton">
                    <div className="sub-grid-skeleton-items">
                      <Skeleton variant="circular" circle />
                    </div>
                    <div className="sub-grid-skeleton-items">
                      <Skeleton animation="wave" width={"80%"} height={22} />
                      <Skeleton animation="wave" width={"95%"} height={22} />
                    </div>
                  </div>
                </div>
                <div className="connection-skeleton-grid-items">
                  <div className="sub-grid-skeleton">
                    <div className="sub-grid-skeleton-items">
                      <Skeleton variant="circular" circle />
                    </div>
                    <div className="sub-grid-skeleton-items">
                      <Skeleton animation="wave" width={"80%"} height={22} />
                      <Skeleton animation="wave" width={"95%"} height={22} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
        {openmodal ? (
          <div className="content-modal ">
            <div className="modal-center-align animate__animated animate__zoomIn wow">
              <div className="modal-header">
                <p>You can customize this invitation</p>
                <div
                  className="close-icon"
                  onClick={() => setOpenModal(!openmodal)}
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
                      setUserSearchLoader(true);
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
        {openWithdrawmodal ? (
          <div className="content-modal">
            <div className="modal-center-align">
              <div className="modal-header">
                <p>Withdraw Request</p>
                <div
                  className="close-icon"
                  onClick={() => setOpenWithdrawModal(!openWithdrawmodal)}
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
                  <span>Sure you want to withdraw the request?</span>
                </div>
              </div>
              <div className="modal-footer">
                <div className="modal-footer-button-alignment">
                  <button
                    className="cancel-button"
                    onClick={() => {
                      setOpenWithdrawModal(!openWithdrawmodal);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="send-button"
                    onClick={() => {
                      withdrawalRequest(connectionId);
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
