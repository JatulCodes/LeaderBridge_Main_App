import React, { useEffect, useState, useRef, useContext, createContext } from "react";
import { useLocation, useHistory } from "react-router";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { ApiDelete, ApiGet, ApiPost, ApiPut } from "../../Helpers/Api/ApiData";
import Sidebar from "../Common/Sidebar/Sidebar";
import "./MyQuery.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileImg from "../../Assets/Images/ProfileImg.png";
import moment from "moment";
import Loader from "react-loader-spinner";
import noQuestion from "./no_questions.svg";
import SearchIcon from "../../Assets/Images/search-icon.png";
import { NavLink } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Tooltip } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import Auth from "../../Helpers/auth";
import data from "../../Context/context";
import messageIcons from "../../Assets/Images/message.png";
import ReceivedVideoCallScreen from "../Chat/ReceivedVideoCallScreen";
import useMyquery from "./useMyquery";
import { DataLoaded } from "../../App";
import Linkify from "react-linkify";
import upVote from "../../Assets/Images/up.png";
import downVote from "../../Assets/Images/down.png";

export default function Request() {
  const { answer, myquery, request, answerLaterUser, FilterData } = useContext(DataLoaded);

  const [myQueryData, setMyQueryData] = myquery;
  const [requestData, setRequestData] = request;
  const [answerByme, setAnswerByme] = answer;
  const [answerLaterData, setanswerLaterData] = answerLaterUser;
  const [filterOpen, setFilterOpen] = FilterData;

  // let myQuery;
  // let request;

  // let answerByme = "";

  const DDD = new Date();

  let FF = moment(DDD).format("DD-MM-YYYY hh:mm:ss");
  let FFEE = moment("2022-04-03T20:36:19.970Z").utc().format("DD-MM-YYYY hh:mm:ss");
  console.log("DDDDDDDDDDDD", DDD);
  console.log("FFFFFFFFFFF", FF);
  console.log("   ", FFEE);

  const startTime = moment(FF);
  const end = moment(DDD);
  const duration = moment.duration(startTime.diff(end));
  const hours = duration.asHours();
  console.log("hours", Math.floor(hours));

  const fetchQuestionIHaveReceived = () => {
    document.title = "Request | LeaderBridge";
    setIdComparePopup(false);
    setOpenModal(false);
    setAllReceivedQuestion([]);
    setIsLoaderVisible(true);
    ApiGet("question/get-question")
      .then((res) => {
        if (res?.data?.payload && res?.status === 200) {
          setAllReceivedQuestion(res.data.payload);
          setIsLoaderVisible(false);
        }
      })
      .catch((err) => {
        toast.error(err?.message, { theme: "colored" });
        setIsLoaderVisible(false);
      });
  };

  function isValidURL(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + "</a>";
    });
  }

  let route = window.location.pathname;
  const location = useLocation();
  const history = useHistory();

  const [allReceivedQuestion, setAllReceivedQuestion] = useState([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [selectedTopSubjects, setSelectedTopSubjects] = useState([]);
  const [idForRemove, setIdForRemove] = useState();
  const [openmodal, setOpenModal] = React.useState(false);
  const [openAnswerModal, setOpenAnswerModal] = React.useState(false);
  const [openReportAbuseModal, setOpenReportAbuseModal] = React.useState(false);
  const [idComparePopup, setIdComparePopup] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [idReportAbuse, setIdReportAbuse] = useState("");
  const [inputForReportAbuse, setInputForReportAbuse] = useState("Its Annoying");
  const [idForDeleteAskedQuestion, setIdForDeleteAskedQuestion] = useState();
  const [openmodalDelete, setOpenModalDelete] = useState(false);
  const [openmodalDeleteAnswerLater, setOpenmodalDeleteAnswerLater] = useState(false);
  const [openModalRemoveQuestionIReceived, setOpenModalRemoveQuestionIReceived] = useState(false);
  const [IdForRemoveQuestionIReceived, setIdForRemoveQuestionIReceived] = useState("");
  const [customMessage, setCustomMessage] = useState("Hi, I want to connect with you ..");
  const [senderId, setSenderId] = useState("");
  //popupForRemove
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = useState({});
  const { SendConnectionRequest, Blockuser } = useMyquery(setCustomMessage, fetchQuestionIHaveReceived, setOpenModal);

  //<--------------questions ratings-------->

  

  const dropdown = useRef(null);

  // useEffect(() => {
  //   if (!idComparePopup) return;
  //   function handleClick(event) {
  //     if (dropdown.current && !dropdown.current.contains(event.target)) {
  //       setIdComparePopup(false);
  //     }
  //   }
  //   window.addEventListener("click", handleClick);
  //   // clean up
  //   return () => window.removeEventListener("click", handleClick);
  // }, [idComparePopup]);

  const concernedElement = document.getElementById("click-text");

  document.addEventListener("mousedown", (event) => {
    if (concernedElement?.contains(event.target)) {
      console.log("Clicked Inside");
    } else {
      // console.log("Clicked Outside / Elsewhere");
      setIdComparePopup("");
    }
  });

  console.log("setIdComparePopup", idComparePopup);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setinputValue("");
  }, [route]);

  const [hasMore, sethasMore] = useState(true);

  const [page, setpage] = useState(2);

  useEffect(() => {
    console.log(hasMore);
  }, [hasMore]);

  window.onload = function () {
    setMyQueryData(false);
    setRequestData(true);
    setAnswerByme(false);
    setanswerLaterData(false);
    history.push("/request");
  };

  //popupForConnection

  const [openConnection, setOpenConnection] = React.useState(false);

  const handleClickOpenConnection = () => {
    setOpenConnection(true);
  };

  const handleCloseConnection = () => {
    setOpenConnection(false);
  };

  useEffect(() => {
    const uData = Auth.getUserData();
    setUserData(uData);
    setAllReceivedQuestion([]);
  }, []);

  useEffect(() => {
    const myPromise = new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        setAllReceivedQuestion([]);
        setIsLoaderVisible(true);
        setpage(2);
        sethasMore(true);
        setinputValue("");
      }, 1000);
      clearTimeout(timer);
    });

    myPromise.then(() => {
      fetchQuestionIHaveReceived();
    });
  }, [route]);

  const handleSubjectSelect = (sub, id) => {
    if (selectedTopSubjects?.find((ss) => ss === sub?.subject)) {
      setSelectedTopSubjects((curVal) => curVal.filter((cv) => cv !== sub?.subject));
    } else {
      setSelectedTopSubjects((curVal) => [...curVal, sub?.subject]);
    }
  };

  useEffect(() => {
    setpage(2);
    sethasMore(true);
    setAllReceivedQuestion([]);
    if (selectedTopSubjects.length === 0) {
      fetchQuestionIHaveReceived();
    } else {
      setIsLoaderVisible(true);
      ApiPost(`question/filter`, { filter: selectedTopSubjects })
        .then((res) => {
          if (res?.data?.payload && res?.status === 200) {
            setAllReceivedQuestion(res.data.payload);
            setIsLoaderVisible(false);
          }
        })
        .catch((err) => {
          toast.error(err?.message, { theme: "colored" });
          setIsLoaderVisible(false);
        });
    }
  }, [selectedTopSubjects]);

  const handleOnChnage = (e) => {
    const { name, value } = e.target;
    setinputValue(value);
  };

  const debouncedSearchTerm = useDebounce(inputValue, 500);

  // Hook
  function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoaderVisible(true);
      setpage(2);
      sethasMore(true);
      searchQuestionData();
    } else {
      fetchQuestionIHaveReceived();
    }
  }, [debouncedSearchTerm]);

  const searchQuestionData = () => {
    if (inputValue) {
      ApiGet(`question/get-question?search=${inputValue}`)
        .then((res) => {
          console.log(res.data.payload, "TTTTTTT");
          if (res?.data?.payload && res?.status === 200) {
            setAllReceivedQuestion(res.data.payload);
            setIsLoaderVisible(false);
            console.log(res.data.payload, "res.data.payload");
          }
        })
        .catch((err) => {
          toast.error(err?.message, { theme: "colored" });
          setIsLoaderVisible(false);
        });
    } else {
      fetchQuestionIHaveReceived();
    }
  };

  useEffect(() => {
    setSelectedTopSubjects([]);
  }, [route]);

  const fetchQuestionForPagination = async () => {
    if (inputValue) {
      const res = await ApiGet(`question/get-question?page=${page}&limit=10&search=${inputValue}`);

      const data = await res?.data?.payload?.questions;

      return data;
    } else {
      const res = await ApiGet(`question/get-question?page=${page}&limit=10`);

      const data = await res?.data?.payload?.questions;

      return data;
    }
  };

  const fetchData = async () => {
    if (selectedTopSubjects.length === 0) {
      const commentsFormServer = await fetchQuestionForPagination();

      if (commentsFormServer && commentsFormServer?.length > 0) {
        setAllReceivedQuestion((data) => {
          const newData = [...data?.questions, ...commentsFormServer];
          if (newData.length > 0) {
            data.questions = newData;
            return data;
          }
        });
      }
      if (commentsFormServer?.length === 0 || commentsFormServer?.length < 10) {
        sethasMore(false);
      }
      setpage(page + 1);
    } else {
      sethasMore(false);
    }
  };

  const sendConnectRequest = async () => {
    SendConnectionRequest(senderId, customMessage);
  };

  const sendReportAbuse = async () => {
    await ApiPost(`question/report/id=${idReportAbuse}`, {
      reason: inputForReportAbuse,
    })
      .then((res) => {
        setInputForReportAbuse("Its Annoying");
        fetchQuestionIHaveReceived();
        const state = { ...history.location.state, updateAnswerLater: true };
        history.replace({ ...history.location, state });
        setOpenReportAbuseModal(false);
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.error(err?.message ? err?.message : "something went wrong");
      });
  };

  const answerLater = (idAnswerLater) => {
    ApiPost(`answer/id=${idAnswerLater}`)
      .then((res) => {
        if (res.data.result === 0) {
          fetchQuestionIHaveReceived();

          const state = { ...history.location.state, updateAnswerLater: true };
          history.replace({ ...history.location, state });
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        toast.error(err, { theme: "colored" });
      });
  };

  const removeAnswerLater = () => {
    ApiPut(`answer/${idForRemove}`)
      .then((res) => {
        if (res.data.result === 0) {
          fetchQuestionIHaveReceived();
          setOpenmodalDeleteAnswerLater(false);
          toast.success(res.data.message);
          const state = { ...history.location.state, updateAnswerLater: true };
          history.replace({ ...history.location, state });
        } else {
          toast.error(res.data.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        toast.error(err.message, { theme: "colored" });
      });
  };

  const removeQuestionIReceived = () => {
    ApiPut(`question/remove/id=${IdForRemoveQuestionIReceived}`)
      .then((res) => {
        if (res.data.result === 0) {
          fetchQuestionIHaveReceived();
          setOpenModalRemoveQuestionIReceived(false);
          const state = { ...history.location.state, updateAnswerLater: true };
          history.replace({ ...history.location, state });
          toast.success("Question removed");
        } else {
          toast.error(res.data.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        toast.error(err.message, { theme: "colored" });
      });
  };

  const blockUserRequest = (userID) => {
    Blockuser(userID);
  };

  const deleteQuestion = (id) => {
    ApiDelete(`question/${id}`)
      .then((res) => {
        if (res.data.result === 0) {
          fetchQuestionIHaveReceived();
          setOpenModalDelete(false);
          setIdForDeleteAskedQuestion();
          const state = { ...history.location.state, updateAnswerLater: true };
          history.replace({ ...history.location, state });
        } else {
          setOpenModalDelete(false);
          setIdForDeleteAskedQuestion();
          toast.error(res?.data?.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        setIdForDeleteAskedQuestion();
        setOpenModalDelete(false);
        toast.error(err?.message ? err?.message : "Something went wrong!", {
          theme: "colored",
        });
      });
  };

  const getTopSubject = async (allQuestion) => {
    if (allQuestion?.displayProfile === true) {
      const data = allQuestion?.filter?.map((f) => {
        if (f?.filterId === "619e07b7641d2f00f887ec96") {
          return f?.optionName?.options?.find((o) => o?.optionName === userData?.subject);
        }
      });
      if (data) {
        return (
          <span class="borderlefttext">
            <span class="category"> Managing yourself</span>
          </span>
        );
      }
    } else {
      return "";
    }
  };
  
  //<--------------questions ratings-------->
  const [rating, setRating] = useState(0);
  const incre =()=>{
    setRating (rating+ 1)
  }
  const decre =()=>{
    if(rating > 0){
      setRating(rating -1)
    }else{
      setRating(0)
    }
  }

  return (
    <>
      <section className="container-fluid">
        <div className="children-page-align">
          <ToastContainer style={{ zIndex: "1111111111" }} />
          <div className="my-query-grid">
            <div className="my-query-grid-items">
              <>
                <Sidebar handleSubjectSelect={handleSubjectSelect} selectedTopSubjects={selectedTopSubjects} setSelectedTopSubjects={setSelectedTopSubjects} />
              </>
            </div>

            {requestData && (
              <>
                <div className="my-query-grid-items no-anwer-data">
                  <div className="search-input-alignment-end">
                    <div className="input-relative-search">
                      <input type="search" placeholder="Search for question" id="searchData" onChange={(e) => handleOnChnage(e)} value={inputValue} name="searchData" />
                      <div
                        className="search-icon-center"
                        onClick={() => {
                          setinputValue("");
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {isLoaderVisible === true ? (
                    <Stack spacing={1}>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" width={"80%"} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"80%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" width={"80%"} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"80%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" width={"80%"} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"80%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" width={"80%"} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"80%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" width={"80%"} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"80%"} height={25} />
                      </div>
                    </Stack>
                  ) : allReceivedQuestion.count === 0 ? (
                    <>
                      {/* {isLoaderVisible === true ? "" :
        <> */}
                      <div className="no-data-image">
                        <img src={noQuestion} />
                      </div>
                      <p className="">You haven't received any request yet</p>
                    </>
                  ) : (
                    <>
                      <InfiniteScroll
                        dataLength={allReceivedQuestion?.questions?.length > 0 ? allReceivedQuestion?.questions?.length : 0} //This is important field to render the next data
                        next={fetchData}
                        hasMore={allReceivedQuestion?.count < 10 ? false : hasMore}
                        loader={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Loader
                              type="Oval"
                              color="#333"
                              height={25}
                              width={25}
                              // visible={false}
                            />
                          </div>
                        }
                        // endMessage={<EndMsg />}
                      >
                        {allReceivedQuestion?.questions?.map((allQuestion) => {
                          return (
                            <div className="card-grid">
                              <div className={filterOpen ? "card-grid-items filter-open-card-grid-items-none" : "card-grid-items"}>
                                <div className="card-child-grid">
                                  <div className="card-child-grid-items">
                                    <div className={filterOpen ? "profile-grid profile-grid-filter-z-index" : "profile-grid"}>
                                      <div className="profile-grid-items">
                                        <div className="profile-image">
                                          <div className="popover__wrapper">
                                            <img className="" src={allQuestion?.displayProfile === true ? allQuestion?.createdBy?.profileImage : ProfileImg} />
                                            {allQuestion?.displayProfile === true && (
                                              <div class="popover__content">
                                                <div class="card is-ad mb-0 no-border">
                                                  <div class="card-flex friend-card aftershimmer">
                                                    <div class="friend-info">
                                                      <div class="pop-up-top-part">
                                                        <p class="mb-0 font-size-25 text-white">{allQuestion?.createdBy?.currentRole}</p>
                                                        <p class="font-size-20 text-white">
                                                          <span>
                                                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1 text-white">
                                                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                              <circle cx="12" cy="10" r="3"></circle>
                                                            </svg>
                                                          </span>
                                                        </p>
                                                      </div>
                                                      <span class="user-name-left-side">
                                                        {allQuestion?.createdBy?.subject?.map((sub) => (
                                                          <span class="badge badge-light">{sub}</span>
                                                        ))}
                                                      </span>
                                                    </div>

                                                    <div class="display-flex">
                                                      <NavLink to={`/view-profile/${allQuestion?.createdBy?._id}`} class="btn view-profile-btn mr-auto">
                                                        {" "}
                                                        View Profile{" "}
                                                      </NavLink>
                                                      {allQuestion?.allowConnectionRequest === true ? (
                                                        allQuestion?.isFriend === "false" ? (
                                                          <div
                                                            className="abc"
                                                            onClick={() => {
                                                              setOpenModal(!openmodal);
                                                              setSenderId(allQuestion?.createdBy?._id);
                                                            }}
                                                          >
                                                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                                                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                              <polyline points="22,6 12,13 2,6"></polyline>
                                                            </svg>
                                                          </div>
                                                        ) : allQuestion?.isFriend === "true" ? (
                                                          <div
                                                            className="abc"
                                                            onClick={(e) => {
                                                              history.push({
                                                                pathname: "/chat",
                                                                state: {
                                                                  user_id: allQuestion?.createdBy?._id,
                                                                },
                                                              });
                                                            }}
                                                          >
                                                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                                                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                              <polyline points="22,6 12,13 2,6"></polyline>
                                                            </svg>
                                                          </div>
                                                        ) : allQuestion?.isFriend === "sent" ? (
                                                          ""
                                                        ) : (
                                                          ""
                                                        )
                                                      ) : (
                                                        ""
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <div className="votes">
                                          <img src={upVote} onClick={incre} className="vote-icon"/>
                                          <div className="rating">{rating}</div>
                                          <img
                                            src={downVote}
                                            className="vote-icon"
                                            onClick={decre}/>
                                        </div>
                                      </div>
                                      <div className="profile-grid-items">
                                        {allQuestion?.createdBy?.currentRole && (
                                          <span class="borderlefttext">
                                            <span class="category"> {`${allQuestion?.createdBy?.currentRole}`}</span>
                                          </span>
                                        )}

                                        {allQuestion?.displayProfile === true &&
                                        allQuestion?.filter?.map((f) => {
                                          if (f?.filterId === "619e07b7641d2f00f887ec96") {
                                            return f?.options?.map((o) => {
                                              if (userData?.subject[0] === o?.optionName || userData?.subject[1] === o?.optionName || userData?.subject[2] === o?.optionName || userData?.subject[3] === o?.optionName) {
                                                return o?.optionName;
                                              }
                                            });
                                          }
                                        }).length > 0 ? (
                                          <span class="borderlefttext">
                                            {allQuestion?.filter?.map((f) => {
                                              return (
                                                f?.filterId === "619e07b7641d2f00f887ec96" &&
                                                f?.options?.map((opt) => {
                                                  return <span class="category"> {`${opt?.optionName}, `}</span>;
                                                })
                                              );
                                            })}
                                          </span>
                                        ) : (
                                          ""
                                        )}

                                        <h2>
                                          {" "}
                                          <ReactReadMoreReadLess charLimit={330} readMoreText={<h6 className="ReadMore">Read more</h6>} readLessText={<h6 className="ReadLess">Read less</h6>} readMoreClassName="read-more-less--more" readLessClassName="read-more-less--less">
                                            {allQuestion.question}
                                            {/* <div
                                              dangerouslySetInnerHTML={{
                                                __html: isValidURL(
                                                  allQuestion.question
                                                ),
                                              }}
                                            /> */}

                                            {/* <div
                                              dangerouslySetInnerHTML={{
                                                __html: isValidURL(
                                                  allQuestion.question
                                                ),
                                              }}
                                            /> */}
                                          </ReactReadMoreReadLess>
                                        </h2>

                                        <div className="text-alignment">
                                          <Tooltip title="User reach" arrow>
                                            <p>Reach ({allQuestion?.reach})</p>
                                          </Tooltip>
                                          <Tooltip title="Total responses received" arrow>
                                            <ul>
                                              <Tooltip title="User reach" arrow>
                                                <li onClick={() => setOpenAnswerModal(!openAnswerModal)}>Responses ({allQuestion.response})</li>
                                              </Tooltip>
                                            </ul>
                                          </Tooltip>

                                          <ul>
                                            <li>
                                              {console.log(" allQuestion.createdAt", allQuestion.createdAt)}
                                              {moment(allQuestion.createdAt).fromNow() === "a few seconds ago"}
                                              {moment(allQuestion.createdAt).fromNow() === "a few seconds ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "1 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "2 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "3 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "4 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "5 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "6 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "7 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "8 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "9 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "10 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "11 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "12 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "13 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "14 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "15 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "16 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "17 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "18 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "19 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "20 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "21 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "22 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "23 hours ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "3 days ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "1 days ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "2 days ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "4 days ago" ||
                                              moment(allQuestion.createdAt).fromNow() === "5 days ago"
                                                ? moment(allQuestion.createdAt).fromNow()
                                                : moment(allQuestion.createdAt).format("ll")}

                                              {/* {moment(
                            allQuestion.createdAt
                          ).format("ll")} */}
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="button-alignment">
                                          <NavLink to={`/answer/${allQuestion._id}`}>
                                            <button>
                                              {/* <i class="fas fa-pen"></i> */}
                                              <div className="pen-icon-svg">
                                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                                                  <path d="M12 20h9"></path>
                                                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                                </svg>
                                              </div>
                                              <span>Answer</span>
                                            </button>
                                          </NavLink>
                                          <button
                                            onClick={(e) => {
                                              answerLater(allQuestion._id);
                                            }}
                                          >
                                            <i class="fas fa-undo-alt"></i>
                                            <span>Answer Later</span>
                                          </button>
                                          {allQuestion?.allowConnectionRequest === true ? (
                                            allQuestion?.isFriend === "pending" ? (
                                              <>
                                                <button>
                                                  <NavLink to={`/connections`}>
                                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1 stroke-gray">
                                                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                      <circle cx="8.5" cy="7" r="4"></circle>
                                                      <polyline points="17 11 19 13 23 9"></polyline>
                                                    </svg>
                                                    <span>Pending</span>
                                                  </NavLink>
                                                </button>
                                              </>
                                            ) : allQuestion?.isFriend === "false" || allQuestion?.isFriend === false ? (
                                              <>
                                                <button
                                                  onClick={() => {
                                                    setOpenModal(!openmodal);
                                                    setSenderId(allQuestion?.createdBy?._id);
                                                  }}
                                                >
                                                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1 stroke-gray">
                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="8.5" cy="7" r="4"></circle>
                                                    <line x1="20" y1="8" x2="20" y2="14"></line>
                                                    <line x1="23" y1="11" x2="17" y2="11"></line>
                                                  </svg>
                                                  <span>Connect</span>
                                                </button>
                                              </>
                                            ) : allQuestion?.isFriend === "sent" ? (
                                              <>
                                                <button>
                                                  <NavLink to={`/connections`}>
                                                    <div className="sent-alignment-myqury">
                                                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1 stroke-gray">
                                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                        <circle cx="8.5" cy="7" r="4"></circle>
                                                        <polyline points="17 11 19 13 23 9"></polyline>
                                                      </svg>
                                                      <span>sent</span>
                                                    </div>
                                                  </NavLink>
                                                </button>
                                              </>
                                            ) : (
                                              <>
                                                <button
                                                  onClick={(e) => {
                                                    history.push({
                                                      pathname: "/chat",
                                                      state: {
                                                        user_id: allQuestion?.createdBy?._id,
                                                      },
                                                    });
                                                  }}
                                                >
                                                  <div className="Message-icon-alignment">
                                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                                                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                      <polyline points="22,6 12,13 2,6"></polyline>
                                                    </svg>
                                                    <span>Message</span>
                                                  </div>
                                                </button>
                                              </>
                                            )
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="answer-grid-items answer-show-dropdown-relative"
                                    // ref={dropdown}

                                    id="click-text"
                                  >
                                    <div
                                      className={filterOpen ? "pointer mobile-view-flex-end-side pointer-mobile-opacity" : "pointer mobile-view-flex-end-side "}
                                      style={{ zIndex: "99" }}
                                      onClick={() => {
                                        setIdComparePopup(allQuestion?._id);
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
                                        onClick={() => {
                                          setIdComparePopup(allQuestion?._id);
                                        }}
                                      >
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="12" cy="5" r="1"></circle>
                                        <circle cx="12" cy="19" r="1"></circle>
                                      </svg>
                                    </div>
                                    <div className={allQuestion?._id === idComparePopup ? "answer-edit-delete-dropdwon-design dropdown-show" : "answer-edit-delete-dropdwon-design dropdown-hidden"}>
                                      <div className="dropdown-cus-design">
                                        <div
                                          className="edit-list-alignment"
                                          onClick={() => {
                                            setOpenModalRemoveQuestionIReceived(!openModalRemoveQuestionIReceived);
                                            setIdForRemoveQuestionIReceived(allQuestion?._id);
                                            setIdComparePopup(false);
                                          }}
                                        >
                                          <div className="edit-icon">
                                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                                              <line x1="18" y1="6" x2="6" y2="18"></line>
                                              <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                          </div>
                                          <div className="edit-text">
                                            <p>Remove</p>
                                          </div>
                                        </div>
                                        <div
                                          className="edit-list-alignment"
                                          onClick={() => {
                                            setOpenReportAbuseModal(!openReportAbuseModal);
                                            setIdReportAbuse(allQuestion?._id);
                                            setIdComparePopup(false);
                                          }}
                                        >
                                          <div className="edit-icon">
                                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                                              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                                              <line x1="4" y1="22" x2="4" y2="15"></line>
                                            </svg>
                                          </div>
                                          <div className="edit-text">
                                            <p>Report Abuse</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </InfiniteScroll>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <>
        <div style={{ paddingTop: "60px" }}></div>
      </>
      {openmodal ? (
        <div className="content-modal">
          <div className="modal-center-align animate__animated animate__zoomIn wow">
            <div>
              <div className="modal-header">
                <p className="">You can customize this invitation</p>
                <div
                  className="close-icon"
                  onClick={() => {
                    setOpenModal(!openmodal);
                    setSenderId();
                  }}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
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
                      setSenderId();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="send-button"
                    onClick={() => {
                      setIsLoaderVisible(true);
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
                  setSenderId();
                }}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </div>
            <div className="modal-body1">
              <p>Let the admins know what's wrong with this question. No one else will see your name or the content of this report.</p>
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
                <label for="html">I dont think it should be on the platform</label>
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
      {openmodalDelete ? (
        <div className="content-modal">
          <div className="modal-center-align">
            <div className="modal-header">
              <p>Delete Question</p>
              <div
                className="close-icon"
                onClick={() => {
                  setOpenModalDelete(!openmodalDelete);
                  setIdForDeleteAskedQuestion();
                }}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
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
                    setOpenModalDelete(!openmodalDelete);
                    setIdForDeleteAskedQuestion();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="send-button"
                  onClick={(e) => {
                    deleteQuestion(idForDeleteAskedQuestion);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {openmodalDeleteAnswerLater ? (
        <div className="content-modal">
          <div className="modal-center-align animate__animated animate__backInDown wow" data-wow-offset="200">
            <div className="modal-header">
              <p>Remove Question</p>
              <div
                className="close-icon"
                onClick={() => {
                  setOpenmodalDeleteAnswerLater(!openmodalDeleteAnswerLater);
                  setIdForRemove();
                }}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </div>
            <div className="modal-body">
              <div className="form-group-modal">
                <p className="delete-text">Sure you want to remove this question?</p>
              </div>
            </div>
            <div className="modal-footer">
              <div className="modal-footer-button-alignment">
                <button
                  className="cancel-button"
                  onClick={() => {
                    setOpenmodalDeleteAnswerLater(!openmodalDeleteAnswerLater);
                    setIdForRemove();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="send-button"
                  onClick={(e) => {
                    removeAnswerLater();
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
      {openModalRemoveQuestionIReceived ? (
        <div className="content-modal">
          <div className="modal-center-align animate__animated animate__zoomIn wow">
            <div className="modal-header">
              <p>Remove Question</p>
              <div
                className="close-icon"
                onClick={() => {
                  setOpenModalRemoveQuestionIReceived(!openModalRemoveQuestionIReceived);
                  setIdForRemoveQuestionIReceived();
                }}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </div>
            <div className="modal-body">
              <div className="form-group-modal">
                <p className="delete-text">Sure you want to remove this question?</p>
              </div>
            </div>
            <div className="modal-footer">
              <div className="modal-footer-button-alignment">
                <button
                  className="cancel-button"
                  onClick={() => {
                    setOpenModalRemoveQuestionIReceived(!openModalRemoveQuestionIReceived);
                    setIdForRemoveQuestionIReceived();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="send-button"
                  onClick={(e) => {
                    removeQuestionIReceived();
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
      {openAnswerModal ? (
        <div className="answer-later-design">
          <div className="white-modal-design">
            <div className="modal-body">
              <p>The Response Count is the number of Public and Author-View-Only responses. Only Public Responses are Visible to you.</p>
            </div>
            <div className="modal-footer-button">
              <button onClick={() => setOpenAnswerModal(!openAnswerModal)}>Close</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
