import React, { useEffect, useState, useRef, lazy, useContext } from "react";
import { useHistory, useLocation } from "react-router";
import "./UserHeader.scss";
import Logo from "../../../Assets/Images/logo.png";
import { NavLink } from "react-router-dom";
import { ApiGet, ApiPost } from "../../../Helpers/Api/ApiData";
import Multiselect from "multiselect-react-dropdown";
import { toast } from "react-toastify";
import Auth from "../../../Helpers/auth";
import PropTypes from "prop-types";
import LegendImg from "../../../Assets/Images/legend-img.png";
import UserProfile from "../../../Assets/Images/user-profile.png";
import Popper from "popper.js";
import { Button, Tooltip } from "@mui/material";

import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import useNotification from "../../Notifications/useNotification";
import { DataLoaded } from "../../../App";
import renderHTML from "react-render-html";
import AudioCallScreen from "../../Chat/AudioCallScreen";
import ReceivedVideoCallScreen from "../../Chat/ReceivedVideoCallScreen";
import ReceivedCallScreen from "../../Chat/ReceivedCallScreen";
import MakeCallScreen from "../../Chat/MakeCallScreen";
import useCallFunction from "../../../Helpers/useCallFunction";

export default function UserHeader() {
  const [mobileHeader, setMobileHeader] = useState(false);
  const filterMenuRef = useRef();
  const settingMenuRef = useRef();
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(true);
  const [dropdownPopoverShow1, setDropdownPopoverShow1] = React.useState(true);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const route = window.location.pathname;
  const wrapperRef = useRef(null);
  const history = useHistory();
  const [subSettingMenuopen, SetSubSettingMenuopen] = useState(true);
  const [legendsModal, setLegendsModal] = React.useState(false);

  const [filterMenu, SetFilterMenu] = useState(true);

  const [questionFilters, setQuestionFilters] = useState([]);

  const [askQuestionFilters, setAskQuestionFilters] = useState([]);

  const [question, setQuestion] = useState("");

  //for getting data from local storage

  const [userDetails, setUserDetails] = useState();

  const [userData, setUserData] = useState({});

  const [legendData, setLegendData] = useState({});

  const [inputValue, setInputValue] = useState("");

  const location = useLocation();

  const { makeCallRequest, acceptCallRequest, rejectCallRequest, BlockUser } =
    useCallFunction(userDetails);

  useEffect(() => {
    const uData = Auth.getUserData();
    setUserDetails(uData?._id);
  }, []);

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

  const [callData, setCallData] = ChatCallData;
  const [acceptData, setAcceptData] = ChatacceptData;
  const [rejectData, setRejectData] = ChatReject;

  console.log("acceptData33333333333", acceptData);
  useEffect(() => {
    setCallData();
    setAcceptData();
    setRejectData();
  }, [rejectData]);
  const acceptCallRequestFunction = () => {
    acceptCallRequest(callData);
  };
  const rejectCallRequestFunction = () => {
    rejectCallRequest(callData);
  };

  const userInfo = JSON.parse(localStorage.getItem("userData"));

  const [myQueryData, setMyQueryData] = myquery;
  const [requestData, setRequestData] = request;
  const [SwipContent, setSwipContent] = SwipContentFun;
  const [answerByme, setAnswerByme] = answer;
  const [answerLaterData, setanswerLaterData] = answerLaterUser;

  const [ContentPopup, setContentPopup] = useState();

  const [notificationCount, setNotificationCount] = useState(0);
  const [userDataForNotification, setUserDataForNotification] = useState({});

  const [takeTourData, setakeTourData] = useState([
    {
      target: ".company-logo",
      title: "The Bridge",
      disableBeacon: true,
      content: "Check the all questions, responses here",
    },

    {
      target: ".navbar-icon",
      title: "Matching!",
      // disableBeacon: true,
      content: "Matching! Here we show all Matching!",
    },
    // {
    //   target: ".navbar-icon",
    //   title: "3 User Options",
    //   content: "Check the multiple options here",
    // },
    {
      target: ".filter-icon",
      title: "Filters",
      content: "Search user by filters",
    },
  ]);

  const [initialTourState, setInitialTourState] = useState({
    run: false, // false
    continuous: true,
    loading: false,
    stepIndex: 0,
    steps: takeTourData,
    key: new Date(),
  });

  let userId = Auth.getUserData();

  const GetQuestionData = () => {
    ApiGet(`content/get-content-value?userId=${userId?._id}`)
      .then((res) => {
        console.log("11111111", res);
        setContentPopup(res?.data?.payload?.Cms);
      })
      .catch((err) => {
        toast.error(err?.message, { theme: "colored" });
      });
  };

  const PostContent = (e, id) => {
    e.preventDefault();
    ApiPost(`content/post-content-value?userId=${userId?._id}&content=${id}`)
      .then((res) => {
        GetQuestionData();
        console.log("11111111", res);
      })
      .catch((err) => {
        toast.error(err?.message, { theme: "colored" });
      });
  };

  useEffect(() => {
    GetQuestionData();
  }, []);

  const callback = (data) => {
    const { action, index, type, status } = data;
    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && initialTourState.run) ||
      status === STATUS.FINISHED
    ) {
      setInitialTourState({ ...initialTourState, run: false });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      setInitialTourState({
        ...initialTourState,
        stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
      });
    }
  };

  useEffect(() => {
    const uData = Auth.getUserData();
    if (uData?.notificationSound === true) {
      setTimeout(() => {
        // getNotifitcationCount();
      }, 500);
    }
  }, []);

  const {
    getNotificationData,
    getNotificationCount,
    ClickBaleIcon,
    UserGetnotification,
    slectLoader,
    unseenMessage,
  } = useNotification();

  const [activeUser, setActiveUser] = ActiveData;
  const [callCut, setCallCut] = CallcutData;

  console.log("unseenMessage", unseenMessage);

  var RedNotification = unseenMessage.reduce(function (acc, obj) {
    return acc + obj.unseenMessageCount;
  }, 0);

  console.log("RedNotification", RedNotification);

  //For getting data from local storage for data and img
  const [userDetailsForImg, setUserDetailsForImg] = useState();

  const [userDataForImg, setUserDataForImg] = useState({});

  useEffect(() => {
    const uData = Auth.getUserData();
    setUserDataForImg(uData);
  }, []);

  useEffect(() => {
    if (userDataForImg) {
      setUserDetailsForImg(userDataForImg);
    }
  }, [userDataForImg]);

  useEffect(() => {
    if (history?.location?.pathname == "/profile-search") {
    } else {
      setAskQuestionFilters([]);
    }
  }, [history.location]);

  useEffect(() => {
    getQuestionFilter();
  }, []);

  const getQuestionFilter = async () => {
    const res = await ApiGet("filter/get-filter?type=user");
    setQuestionFilters(res?.data?.payload?.filter);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdownPopoverShow(true);
          setDropdownPopoverShow1(true);
          setMobileHeader(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);
  UserHeader.propTypes = {
    children: PropTypes.element.isRequired,
  };

  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const sendQuestionData = async () => {
    if (question) {
    } else {
      return;
    }
  };

  const onSelect = async (selectedList, selectedItem, filter) => {
    const isAvailable = askQuestionFilters?.find(
      (f) => f.filterId == filter._id
    );

    if (isAvailable !== undefined) {
      const newData = askQuestionFilters.map((question) => {
        if (question.filterId == filter._id) {
          return {
            filterId: filter._id,
            filterName: filter.name,
            options: selectedList,
          };
        } else {
          return question;
        }
      });

      setAskQuestionFilters(newData);
    } else {
      setAskQuestionFilters((f) => [
        ...f,
        {
          filterId: filter._id,
          filterName: filter.name,
          options: selectedList,
        },
      ]);
    }
  };

  const onRemove = (selectedList, removedItem, filter) => {
    if (selectedList.length === 0) {
      const newData = askQuestionFilters.filter((f) => {
        if (f.filterId !== filter._id) {
          return f;
        }
      });

      setAskQuestionFilters(newData);
    } else {
      const newData = askQuestionFilters.map((question) => {
        if (question.filterId == filter._id) {
          return {
            filterId: filter._id,
            filterName: filter.name,
            options: selectedList,
          };
        } else {
          return question;
        }
      });
      setAskQuestionFilters(newData);
    }
  };

  const getSelectedData = (filters) => {
    let result = [];
    for (let i = 0; i < askQuestionFilters.length; i++) {
      if (askQuestionFilters[i].filterId == filters?._id) {
        result = askQuestionFilters[i]?.options;
      }
    }

    return result;
  };

  const HandleLogOut = () => {
    Auth.deauthenticateUser();
    toast.success("User Signout", {
      theme: "colored",
    });
    history.push("/");
  };

  const onChangeForSearch = (event) => {
    setInputValue(event.target.value);
    if (event.charCode == "13") {
      history.push({
        pathname: "/profile-search",
        search: `search=${event.target.value}`,
        state: { searchValue: event.target.value, filter: askQuestionFilters },
      });
    }
  };

  const getLegendData = () => {
    ApiGet(`legend`)
      .then((res) => {
        if (res?.data?.payload && res?.status === 200) {
          setLegendData(res?.data?.payload);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!filterMenu) {
        if (
          !filterMenu &&
          filterMenuRef.current &&
          !filterMenuRef.current.contains(e.target)
        ) {
          SetFilterMenu(true);
        }
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [filterMenu]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!dropdownPopoverShow) {
        if (
          !dropdownPopoverShow &&
          settingMenuRef.current &&
          !settingMenuRef.current.contains(e.target)
        ) {
          setDropdownPopoverShow(true);
        }
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdownPopoverShow]);

  console.log("2222222222", SwipContent);
  return (
    <>
      {ContentPopup?.length > 0 && (
        <div className="content-modal custom-content-modal ">
          {console.log("2625252525252525", ContentPopup)}
          <div className="modal-center-align">
            <div className="modal-header">
              <h3>What's New</h3>
            </div>
            <div className="modal-body">
              <div className="form-group-modal">
                <p>
                  <p>{renderHTML(ContentPopup[0].description)}</p>
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <div className="modal-footer-button-alignment">
                <div className="custom-btn-wrapper">
                  <Button
                    class="custom-btn"
                    onClick={(e) => PostContent(e, ContentPopup[0]._id)}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {mobileHeader && (
        <div
          className="mobile-header-wrapper-header-custom"
          onClick={() => setMobileHeader(false)}
        ></div>
      )}
      <div
        className={
          mobileHeader
            ? "mobile-user-header1 user-mobile-header-show"
            : "mobile-user-header1 user-mobile-header-hidden"
        }
      >
        <div className="mobile-user-sidebar-header">
          <div className="company-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div
            className="sidebar-close-alignment"
            onClick={() => setMobileHeader(false)}
          >
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="mobile-user-sidebar-body">
          <div className="user-notification">
            <NavLink
              onClick={() => route != "/swipe-page" && setSwipContent(true)}
              to="/swipe-page"
            >
              {/* {RedNotification != 0 && } */}
              <Tooltip title="Matching" arrow>
                {/* <div className="notifi">1</div> */}

                <div
                  className={`navbar-icon ${
                    route === "/swipe-page"
                      ? "navbar-icon active-notification"
                      : null
                  }`}
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
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </Tooltip>
              <span>Matching</span>
            </NavLink>

            <NavLink to="/chat" style={{ position: "relative" }}>
              {RedNotification != 0 && <div className="notifi"></div>}

              <Tooltip title="Messaging" arrow>
                <div
                  className={`navbar-icon ${
                    route === "/chat" ? "navbar-icon active-notification" : null
                  }`}
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
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
              </Tooltip>
              <span>Messaging</span>
            </NavLink>
            <a href="https://blog.leaderbridge.com/" target="_blank">
              <Tooltip title="Blog" arrow>
                <div className="navbar-icon">
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
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
              </Tooltip>
              <span>Blog</span>
            </a>
            {console.log("getNotificationCount", getNotificationCount)}

            <NavLink to="/notifications" className="relative">
              {getNotificationCount > 0 &&
                location.pathname !== "/notifications" && (
                  <div className="notifi">
                    {/* <span>{getNotificationCount}</span> */}
                  </div>
                )}
              <Tooltip title="Notifications" arrow>
                <div
                  className={`navbar-icon ${
                    route === "/notifications"
                      ? "navbar-icon active-notification"
                      : null
                  }`}
                  // onClick={() => ClickBaleIcon()}
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
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  {/* <img src={bell} alt="Notification" /> */}
                </div>
              </Tooltip>
              <span>Notification</span>
            </NavLink>
            <div className="profile-image">
              <NavLink to="/profile">
                <Tooltip title="Profile" arrow>
                  <img src={userDetailsForImg?.profileImage} />
                </Tooltip>
                <span style={{ paddingLeft: "16px" }}>Profile</span>
              </NavLink>
            </div>
            <div className="more-menu-relative">
              <div
                className="navbar-icon"
                onClick={() => {
                  if (!dropdownPopoverShow) {
                    setDropdownPopoverShow(true);
                  } else {
                    setDropdownPopoverShow(false);
                  }

                  // setDropdownPopoverShow(!dropdownPopoverShow);
                }}
              >
                {/* <i className="fas fa-cog" ref={btnDropdownRef}></i> */}
                <svg
                  // ref={btnDropdownRef}
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
              <div
                // ref={popoverDropdownRef}
                className={
                  dropdownPopoverShow
                    ? "sub-menu-design sub-menu-close"
                    : "sub-menu-design sub-menu-open"
                }
              >
                <div className="sub-menu-header">
                  {/* <p>{userDetailsForImg?.name}</p> */}
                  <NavLink
                    to="/profile"
                    onClick={() => {
                      setDropdownPopoverShow(true);
                      setDropdownPopoverShow1(true);
                      setMobileHeader(false);
                    }}
                  >
                    <p>View Profile</p>
                  </NavLink>
                </div>
                <div className="sub-grid-alignment">
                  <div className="sub-grid">
                    <div className="sub-grid-items">
                      <div className="sub-menu-icon">
                        <i className="far fa-eye"></i>
                      </div>
                    </div>
                    <div
                      className="sub-grid-items"
                      onClick={() => {
                        setDropdownPopoverShow(true);
                        setDropdownPopoverShow1(true);
                        setLegendsModal(!legendsModal);
                        getLegendData();
                      }}
                    >
                      <p>Legends</p>
                      <small>View Legends</small>
                    </div>
                  </div>
                  <div
                    className="sub-grid"
                    onClick={() => {
                      setInitialTourState({
                        ...initialTourState,
                        stepIndex: 0,
                        run: true,
                        loading: false,
                        key: new Date(),
                      });
                      setDropdownPopoverShow(true);
                      setDropdownPopoverShow1(true);
                      setMobileHeader(false);
                    }}
                  >
                    <div className="sub-grid-items">
                      <div className="sub-menu-icon">
                        <i className="far fa-question-circle"></i>
                      </div>
                    </div>
                    <div className="sub-grid-items">
                      <p>Take Tour</p>
                      <small>Know the platform</small>
                    </div>
                  </div>
                  <NavLink to="/setting-page">
                    <div
                      className="sub-grid"
                      onClick={() => {
                        setDropdownPopoverShow(true);
                        setDropdownPopoverShow1(true);
                      }}
                    >
                      <div className="sub-grid-items">
                        <div className="sub-menu-icon">
                          <i className="fas fa-cog"></i>
                        </div>
                      </div>
                      <div className="sub-grid-items">
                        <p>Settings</p>
                        <small>Access settings</small>
                      </div>
                    </div>
                  </NavLink>
                  <NavLink to="/connections">
                    <div
                      className="sub-grid"
                      onClick={() => {
                        setDropdownPopoverShow(true);
                        setDropdownPopoverShow1(true);
                        setMobileHeader(false);
                      }}
                    >
                      <div className="sub-grid-items">
                        <div className="sub-menu-icon">
                          <i class="fa fa-address-book" aria-hidden="true"></i>
                        </div>
                      </div>
                      <div className="sub-grid-items">
                        <p>Connections</p>
                        <small>Access settings</small>
                      </div>
                    </div>
                  </NavLink>
                  <div className="sub-grid sub-grid-boder-bottom-none">
                    <div className="sub-grid-items">
                      <div className="sub-menu-icon">
                        <i className="fas fa-sign-out-alt"></i>
                      </div>
                    </div>
                    <div className="sub-grid-items">
                      <p onClick={HandleLogOut}>Sign out</p>
                      <small onClick={HandleLogOut}>
                        Sign out from your account
                      </small>
                    </div>
                  </div>
                  <div className="bottom-align"></div>
                </div>
              </div>
            </div>
            {/* <Tooltip title="Profile" arrow>
                <div className="profile-image">
                  <NavLink to="/profile">
                    <img src={UserProfile} />
                  </NavLink>
                </div>
              </Tooltip> */}
            <div className="question-button">
              <NavLink to="/ask-question">
                <button className="fill-button">Ask Question</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="user-header">
        <div className="container-fluid">
          <div className="user-header-alignment">
            {/* <div className="user-search" ref={settingMenuRef}>
              <input
                type="text"
                placeholder="Search user by designation"
                onKeyPress={onChangeForSearch}
              />
              <div className="search-icon-alignment">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="css-i6dzq1"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <div
                className="filter-icon"
                onClick={() => SetFilterMenu(!filterMenu)}
              >
                <Tooltip title="Filter" arrow>
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="css-i6dzq1 feather feather-filter"
                  >
                    <line x1="4" y1="21" x2="4" y2="14"></line>
                    <line x1="4" y1="10" x2="4" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="3"></line>
                    <line x1="20" y1="21" x2="20" y2="16"></line>
                    <line x1="20" y1="12" x2="20" y2="3"></line>
                    <line x1="1" y1="14" x2="7" y2="14"></line>
                    <line x1="9" y1="8" x2="15" y2="8"></line>
                    <line x1="17" y1="16" x2="23" y2="16"></line>
                  </svg>
                </Tooltip>
                {askQuestionFilters.length > 0 && (
                  <div className="sub-filter"></div>
                )}
              </div>
            </div> */}
            <Tooltip title="The Bridge" arrow>
              <NavLink
                to="/request"
                onClick={() => {
                  setMyQueryData(false);
                  setRequestData(true);
                  setAnswerByme(false);
                  setanswerLaterData(false);
                }}
              >
                <div className="company-logo">
                  <img src={Logo} alt="Logo" />
                </div>
              </NavLink>
            </Tooltip>
            <div className="mobile-user-header">
              <i
                onClick={() => setMobileHeader(!mobileHeader)}
                className="fa-solid fa-bars"
              ></i>
            </div>
            <div className="user-notification">
              <NavLink
                onClick={() => route != "/swipe-page" && setSwipContent(true)}
                to="/swipe-page"
              >
                {/* {RedNotification != 0 && } */}
                <Tooltip title="Matching" arrow>
                  {/* <div className="notifi">1</div> */}

                  <div
                    className={`navbar-icon ${
                      route === "/swipe-page"
                        ? "navbar-icon active-notification"
                        : null
                    }`}
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
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                </Tooltip>
              </NavLink>

              <NavLink to="/chat" style={{ position: "relative" }}>
                {RedNotification != 0 && <div className="notifi"></div>}

                <Tooltip title="Messaging" arrow>
                  <div
                    className={`navbar-icon ${
                      route === "/chat"
                        ? "navbar-icon active-notification"
                        : null
                    }`}
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
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                </Tooltip>
              </NavLink>
              <Tooltip title="Blog" arrow>
                <a href="https://blog.leaderbridge.com/" target="_blank">
                  <div className="navbar-icon">
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
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                </a>
              </Tooltip>

              {console.log("getNotificationCount", getNotificationCount)}

              <NavLink to="/notifications" className="relative">
                {getNotificationCount > 0 &&
                  location.pathname !== "/notifications" && (
                    <div className="notifi">
                      {/* <span>{getNotificationCount}</span> */}
                    </div>
                  )}
                <Tooltip title="Notifications" arrow>
                  <div
                    className={`navbar-icon ${
                      route === "/notifications"
                        ? "navbar-icon active-notification"
                        : null
                    }`}
                    // onClick={() => ClickBaleIcon()}
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
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    {/* <img src={bell} alt="Notification" /> */}
                  </div>
                </Tooltip>
              </NavLink>
              <div className="profile-image">
                <NavLink to="/profile">
                  <Tooltip title="Profile" arrow>
                    <img src={userDetailsForImg?.profileImage} />
                  </Tooltip>
                </NavLink>
              </div>
              <div className="more-menu-relative">
                <div
                  className="navbar-icon"
                  onClick={() => {
                    if (!dropdownPopoverShow1) {
                      setDropdownPopoverShow1(true);
                    } else {
                      setDropdownPopoverShow1(false);
                    }
                    // setDropdownPopoverShow(false);
                    // setDropdownPopoverShow1(false);
                  }}
                >
                  {/* <i className="fas fa-cog" ref={btnDropdownRef}></i> */}
                  <svg
                    ref={btnDropdownRef}
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
                <div
                  ref={popoverDropdownRef}
                  className={
                    dropdownPopoverShow1
                      ? "sub-menu-design sub-menu-close"
                      : "sub-menu-design sub-menu-open"
                  }
                >
                  <div className="sub-menu-header">
                    {/* <p>{userDetailsForImg?.name}</p> */}
                    <NavLink
                      to="/profile"
                      onClick={() => {
                        setDropdownPopoverShow(true);
                        setDropdownPopoverShow1(true);
                        setMobileHeader(false);
                      }}
                    >
                      <p>View Profile</p>
                    </NavLink>
                  </div>
                  <div className="sub-grid-alignment">
                    <div className="sub-grid">
                      <div className="sub-grid-items">
                        <div className="sub-menu-icon">
                          <i className="far fa-eye"></i>
                        </div>
                      </div>
                      <div
                        className="sub-grid-items"
                        onClick={() => {
                          setDropdownPopoverShow(true);
                          setDropdownPopoverShow1(true);
                          setMobileHeader(false);
                          setLegendsModal(!legendsModal);
                          getLegendData();
                        }}
                      >
                        <p>Legends</p>
                        <small>View Legends</small>
                      </div>
                    </div>
                    <div
                      className="sub-grid"
                      onClick={() => {
                        setInitialTourState({
                          ...initialTourState,
                          stepIndex: 0,
                          run: true,
                          loading: false,
                          key: new Date(),
                        });
                        setDropdownPopoverShow(true);
                        setDropdownPopoverShow1(true);
                        setMobileHeader(false);
                      }}
                    >
                      <div className="sub-grid-items">
                        <div className="sub-menu-icon">
                          <i className="far fa-question-circle"></i>
                        </div>
                      </div>
                      <div className="sub-grid-items">
                        <p>Take Tour</p>
                        <small>Know the platform</small>
                      </div>
                    </div>
                    <NavLink to="/setting-page">
                      <div
                        className="sub-grid"
                        onClick={() => {
                          setDropdownPopoverShow(true);
                          setDropdownPopoverShow1(true);
                          setMobileHeader(false);
                        }}
                      >
                        <div className="sub-grid-items">
                          <div className="sub-menu-icon">
                            <i className="fas fa-cog"></i>
                          </div>
                        </div>
                        <div className="sub-grid-items">
                          <p>Settings</p>
                          <small>Access settings</small>
                        </div>
                      </div>
                    </NavLink>
                    <NavLink to="/connections">
                      <div
                        className="sub-grid"
                        onClick={() => {
                          setDropdownPopoverShow(true);
                          setDropdownPopoverShow1(true);
                          setMobileHeader(false);
                        }}
                      >
                        <div className="sub-grid-items">
                          <div className="sub-menu-icon">
                            <i
                              class="fa fa-address-book"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                        <div className="sub-grid-items">
                          <p>Connections</p>
                          <small>Access settings</small>
                        </div>
                      </div>
                    </NavLink>
                    <div className="sub-grid sub-grid-boder-bottom-none">
                      <div className="sub-grid-items">
                        <div className="sub-menu-icon">
                          <i className="fas fa-sign-out-alt"></i>
                        </div>
                      </div>
                      <div className="sub-grid-items">
                        <p onClick={HandleLogOut}>Sign out</p>
                        <small onClick={HandleLogOut}>
                          Sign out from your account
                        </small>
                      </div>
                    </div>
                    <div className="bottom-align"></div>
                  </div>
                </div>
              </div>
              {/* <Tooltip title="Profile" arrow>
                <div className="profile-image">
                  <NavLink to="/profile">
                    <img src={UserProfile} />
                  </NavLink>
                </div>
              </Tooltip> */}
              <div className="question-button">
                <NavLink to="/ask-question">
                  <button className="fill-button">Ask Question</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* joy ride(Take a tour) */}

        <JoyRide
          steps={takeTourData}
          callback={callback}
          run={initialTourState.run}
          continuous={true}
          disableOverlayClose={true}
          // stepIndex={initialTourState.stepIndex}
          styles={{
            tooltipContainer: {
              textAlign: "left",
            },
          }}
          locale={{
            last: "Done",
          }}
        />

        {/* filter-open */}
        <div
          className={
            !filterMenu
              ? "filter-menu-design filter-menu-open"
              : "filter-menu-design filter-menu-close"
          }
          ref={filterMenuRef}
        >
          {/* <p onClick={() => SetFilterMenu(!filterMenu)}>close</p> */}
          <div className="filter-header-design">
            <div
              className="close-button"
              onClick={() => SetFilterMenu(!filterMenu)}
            >
              <svg
                viewBox="0 0 24 24"
                width="30"
                height="30"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="css-i6dzq1"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <div className="modal-title">
              <p>Filter</p>
            </div>
          </div>

          <div className="filter-modal-body">
            <div className="question-grid">
              {console.log()}
              {questionFilters.map((filter) => {
                return (
                  <div className="question-grid-items">
                    <label>{filter?.name}</label>

                    <Multiselect
                      //  style={{chips: { background: '#FFF'},option:{color: '#FFF'}}}

                      options={filter?.options?.filter(
                        (item) => item.status == true
                      )} // Options to display in the dropdown
                      //selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                      onSelect={(selectedList, selectedItem) =>
                        onSelect(selectedList, selectedItem, filter)
                      } // Function will trigger on select event
                      onRemove={(selectedList, removedItem) =>
                        onRemove(selectedList, removedItem, filter)
                      } // Function will trigger on remove event
                      displayValue="optionName" // Property name to display in the dropdown options
                      selectedValues={getSelectedData(filter)}
                    />
                  </div>
                );
              })}
            </div>
            {/* <div className="toggle-button-alignment">
              <div className="display-profile-alignment">
                <span>Display my profile</span>
                <div>
                  <label className="f-switch">
                    <input
                      type="checkbox"
                      className="is-switch "
                      id="view_profile"
                    />
                    <i></i>
                  </label>
                </div>
              </div>
              <div className="display-profile-alignment">
                <span>Display my profile</span>
                <div>
                  <label className="f-switch">
                    <input
                      type="checkbox"
                      className="is-switch "
                      id="view_profile"
                    />
                    <i></i>
                  </label>
                </div>
              </div>
            </div> */}
          </div>

          <div className="filter-modal-footer">
            <div className="text-alignment">
              <p
                onClick={() => {
                  setAskQuestionFilters([]);
                }}
              >
                Reset
              </p>
              <button
                className="apply-button-style"
                onClick={() => {
                  SetFilterMenu(!filterMenu);
                  history.push({
                    pathname: "/profile-search",
                    search: `search=${inputValue}`,
                    state: {
                      searchValue: inputValue,
                      filter: askQuestionFilters,
                    },
                  });
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        {filterMenu ? null : <div className="filter-menu-blur"></div>}
      </div>
      {legendsModal ? (
        <div className="legends-modal-design">
          <div className="legends-box-white">
            <div className="modal-header">
              <div className="modal-header-alignment">
                <p>Legends</p>
                <div
                  className="close-icon"
                  onClick={() => setLegendsModal(!legendsModal)}
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
            </div>
            <div className="modal-body-alignment">
              <div className="modal-box-grid">
                {/* {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(() => {
                  return (
                    <div className="modal-box-grid-items">
                      <div className="image-alignment">
                        <img src={LegendImg} alt="LegendImg" />
                      </div>
                      <p>Technology</p>
                    </div>
                  );
                })} */}
                {legendData.length > 0 &&
                  legendData.map((item) => {
                    return (
                      <div className="modal-box-grid-items">
                        <div className="image-alignment">
                          <img
                            src={item?.legendsIcon}
                            alt={item?.legendsName}
                          />
                        </div>
                        <p>{item?.legendsName}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {console.log("callDatacallData", callData)}
      {callData &&
        callData?.otherId != userDetails &&
        callData?.channelName == userDetails && (
          <MakeCallScreen
            rejectCallRequestFunction={rejectCallRequestFunction}
            callData={callData}
            rejectData={rejectData}
          />
        )}
      {/* call revice screen */}

      {callData &&
        callData?.otherId == userDetails &&
        callData?.channelName != userDetails && (
          <ReceivedCallScreen
            acceptCallRequestFunction={acceptCallRequestFunction}
            rejectCallRequestFunction={rejectCallRequestFunction}
            rejectData={rejectData}
            callData={callData}
            userId={userDetails}
          />
        )}

      {/* video call screen */}
      {acceptData && acceptData?.isForVideoCall == true && (
        <ReceivedVideoCallScreen
          rejectCallRequestFunction={rejectCallRequestFunction}
          callData={callData}
          userInfo={userInfo}
          activeUser={activeUser}
          callCut={callCut}
          setCallCut={setCallCut}
        />
      )}

      {/* audio call Screen */}
      {acceptData && acceptData?.isForVideoCall == false && (
        <AudioCallScreen
          rejectCallRequestFunction={rejectCallRequestFunction}
          callData={callData}
          userId={userDetails}
        />
      )}
    </>
  );
}
