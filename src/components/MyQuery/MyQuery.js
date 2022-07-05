import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  createContext,
} from "react";
import { useLocation, useHistory } from "react-router";
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

export default function MyQuery() {
  const { answer, myquery, request, answerLaterUser,FilterData } = useContext(DataLoaded);
  const [ filterOpen , setFilterOpen ] = FilterData;

  const [myQueryData, setMyQueryData] = myquery;
  const [requestData, setRequestData] = request;
  const [answerByme, setAnswerByme] = answer;
  const [answerLaterData, setanswerLaterData] = answerLaterUser;

  // let myQuery;
  // let request;

  // let answerByme = "";

  const fetchQuestionIHaveReceived = () => {
    if (requestData) {
      document.title = "Request | LeaderBridge";
      setIdComparePopup(0);
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
    } else if (myQueryData) {
      document.title = "My Query | LeaderBridge";
      setIdComparePopup(0);
      setOpenModal(false);
      setAllReceivedQuestion([]);
      setIsLoaderVisible(true);
      ApiGet("question/get-question?byUser=true")
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
    } else if (answerByme) {
      document.title = "My Answer | LeaderBridge";
      setIdComparePopup(0);
      setOpenModal(false);
      setAllReceivedQuestion([]);
      setIsLoaderVisible(true);
      ApiGet("answer?answerByMe=true")
        .then((res) => {
          if (res?.data?.payload && res?.status === 200) {
            const Data = res?.data?.payload.questions?.sort(function (a, b) {
              return new Date(b?.createdAt) - new Date(a?.createdAt);
            });
            setAllReceivedQuestion(res.data.payload);
            setIsLoaderVisible(false);
          }
        })
        .catch((err) => {
          toast.error(err?.message, { theme: "colored" });
          setIsLoaderVisible(false);
        });
    } else if (answerLaterData) {
      document.title = "Answer Later | LeaderBridge";
      setIdComparePopup(0);
      setOpenModal(false);
      setAllReceivedQuestion([]);
      setIsLoaderVisible(true);
      ApiGet("answer/later")
        .then((res) => {
          if (res?.data?.payload && res?.status === 200) {
            setAllReceivedQuestion(res?.data?.payload);
            setIsLoaderVisible(false);
          }
        })
        .catch((err) => {
          toast.error(err?.message, { theme: "colored" });
          setIsLoaderVisible(false);
        });
    }
  };

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
  const [idComparePopup, setIdComparePopup] = useState();
  const [inputValue, setinputValue] = useState("");
  const [idReportAbuse, setIdReportAbuse] = useState("");
  const [inputForReportAbuse, setInputForReportAbuse] =
    useState("Its Annoying");
  const [idForDeleteAskedQuestion, setIdForDeleteAskedQuestion] = useState();
  const [openmodalDelete, setOpenModalDelete] = useState(false);
  const [openmodalDeleteAnswerLater, setOpenmodalDeleteAnswerLater] =
    useState(false);
  const [
    openModalRemoveQuestionIReceived,
    setOpenModalRemoveQuestionIReceived,
  ] = useState(false);
  const [IdForRemoveQuestionIReceived, setIdForRemoveQuestionIReceived] =
    useState("");
  const [customMessage, setCustomMessage] = useState(
    "Hi, I want to connect with you .."
  );
  const [senderId, setSenderId] = useState("");
  //popupForRemove
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = useState({});
  const { SendConnectionRequest, Blockuser } = useMyquery(
    setCustomMessage,
    fetchQuestionIHaveReceived,
    setOpenModal
  );

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
      setSelectedTopSubjects((curVal) =>
        curVal.filter((cv) => cv !== sub?.subject)
      );
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
    if (myQueryData) {
      if (inputValue) {
        ApiGet(`question/get-question?byUser=true&search=${inputValue}`)
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
      } else {
        fetchQuestionIHaveReceived();
      }
    } else if (requestData) {
      if (inputValue) {
        ApiGet(`question/get-question?search=${inputValue}`)
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
      } else {
        fetchQuestionIHaveReceived();
      }
    } else if (answerLaterData) {
      if (inputValue) {
        ApiGet(`answer/later?search=${inputValue}`)
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
      } else {
        fetchQuestionIHaveReceived();
      }
    } else if (answerByme) {
      if (inputValue) {
        ApiGet(`answer?answerByMe=true?search=${inputValue}`)
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
      } else {
        fetchQuestionIHaveReceived();
      }
    }
  };

  useEffect(() => {
    setSelectedTopSubjects([]);
  }, [route]);

  const fetchQuestionForPagination = async () => {
    if (requestData) {
      if (inputValue) {
        const res = await ApiGet(
          `question/get-question?page=${page}&limit=10&search=${inputValue}`
        );

        const data = await res?.data?.payload?.questions;

        return data;
      } else {
        const res = await ApiGet(`question/get-question?page=${page}&limit=10`);

        const data = await res?.data?.payload?.questions;

        return data;
      }
    } else if (answerByme) {
      if (inputValue) {
        const res = await ApiGet(
          `answer?answerByMe=true?page=${page}&limit=10&search=${inputValue}`
        );

        const data = await res?.data?.payload?.questions;

        // setUserReport(res?.data?.payload?.questions);

        return data;
      } else {
        const res = await ApiGet(
          `answer?answerByMe=true?page=${page}&limit=10`
        );

        const data = await res?.data?.payload?.questions;

        // setUserReport(res?.data?.payload?.questions);

        return data;
      }
    } else if (myQueryData) {
      if (inputValue) {
        const res = await ApiGet(
          `question/get-question?byUser=true&page=${page}&limit=10&search=${inputValue}`
        );

        const data = await res?.data?.payload?.questions;

        return data;
      } else {
        const res = await ApiGet(
          `question/get-question?byUser=true&page=${page}&limit=10`
        );

        const data = await res?.data?.payload?.questions;

        return data;
      }
    } else if (answerLaterData) {
      if (inputValue) {
        const res = await ApiGet(
          `answer/later?page=${page}&limit=10&search=${inputValue}`
        );

        if (res) {
          const data = await res?.data?.payload?.questions;

          if (data) {
            return data;
          }
        }

        return data;
      } else {
        const res = await ApiGet(`answer/later?page=${page}&limit=10`);
        if (res) {
          const data = await res?.data?.payload?.questions;

          if (data) {
            return data;
          }
        }
      }
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
        if (res.data.result == 0) {
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
        if (res.data.result == 0) {
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
        if (res.data.result == 0) {
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
    // ApiPut(`user/block/id=${userID}`)
    //   .then((res) => {
    //     if (res.data.result == 0) {
    //       fetchQuestionIHaveReceived();
    //       const state = { ...history.location.state, updateAnswerLater: true };
    //       history.replace({ ...history.location, state });
    //       toast.success("user blocked");
    //     } else {
    //       toast.error(res?.data?.message, { theme: "colored" });
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(err.message, { theme: "colored" });
    //   });

    Blockuser(userID);
  };

  const deleteQuestion = (id) => {
    ApiDelete(`question/${id}`)
      .then((res) => {
        if (res.data.result == 0) {
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
        if (f?.filterId == "619e07b7641d2f00f887ec96") {
          return f?.optionName?.options?.find(
            (o) => o?.optionName === userData?.subject
          );
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

  return (
    <>
      <section className="container-fluid">
        <div className="children-page-align">
          <ToastContainer style={{ zIndex: "1111111111" }} />
          <div className="my-query-grid">
            <div className="my-query-grid-items">
              <>
                <Sidebar
                  handleSubjectSelect={handleSubjectSelect}
                  selectedTopSubjects={selectedTopSubjects}
                  setSelectedTopSubjects={setSelectedTopSubjects}
                />
              </>
            </div>

            {requestData ? (
              <>
                <div className="my-query-grid-items no-anwer-data">
                  <div className="search-input-alignment-end">
                    <div className="input-relative-search">
                      <input
                        type="search"
                        placeholder="Search for question"
                        id="searchData"
                        onChange={(e) => handleOnChnage(e)}
                        value={inputValue}
                        name="searchData"
                      />
                      <div
                        className="search-icon-center"
                        onClick={() => {
                          setinputValue("");
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
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
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
                        dataLength={
                          allReceivedQuestion?.questions?.length > 0
                            ? allReceivedQuestion?.questions?.length
                            : 0
                        } //This is important field to render the next data
                        next={fetchData}
                        hasMore={
                          allReceivedQuestion?.count < 10 ? false : hasMore
                        }
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
                              <div className="card-grid-items">
                                <div className="card-child-grid">
                                  <div
                                    className="card-child-grid-items"
                                    onClick={() => {
                                      setIdComparePopup(0);
                                    }}
                                  >
                                    <div className={filterOpen ? "profile-grid profile-grid-filter-z-index" :"profile-grid"}>
                                      <div className="profile-grid-items">
                                        <div className="profile-image">
                                          <div className="popover__wrapper">
                                            <img
                                              className=""
                                              src={
                                                allQuestion?.displayProfile ===
                                                true
                                                  ? allQuestion?.createdBy
                                                      ?.profileImage
                                                  : ProfileImg
                                              }
                                            />
                                            {allQuestion?.displayProfile ===
                                              true && (
                                              <div class="popover__content">
                                                <div class="card is-ad mb-0 no-border">
                                                  <div class="card-flex friend-card aftershimmer">
                                                    <div class="friend-info">
                                                      <div class="pop-up-top-part">
                                                        <p class="mb-0 font-size-25 text-white">
                                                          {
                                                            allQuestion
                                                              ?.createdBy
                                                              ?.currentRole
                                                          }
                                                        </p>
                                                        <p class="font-size-20 text-white">
                                                          <span>
                                                            <svg
                                                              viewBox="0 0 24 24"
                                                              width="20"
                                                              height="20"
                                                              stroke="currentColor"
                                                              stroke-width="2"
                                                              fill="none"
                                                              stroke-linecap="round"
                                                              stroke-linejoin="round"
                                                              class="css-i6dzq1 text-white"
                                                            >
                                                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                              <circle
                                                                cx="12"
                                                                cy="10"
                                                                r="3"
                                                              ></circle>
                                                            </svg>{" "}
                                                          </span>
                                                        </p>
                                                      </div>
                                                      <span class="user-name-left-side">
                                                        {allQuestion?.createdBy?.subject?.map(
                                                          (sub) => (
                                                            <span class="badge badge-light">
                                                              {sub}
                                                            </span>
                                                          )
                                                        )}
                                                      </span>
                                                    </div>

                                                    <div class="display-flex">
                                                      <NavLink
                                                        to={`/view-profile/${allQuestion?.createdBy?._id}`}
                                                        class="btn view-profile-btn mr-auto"
                                                      >
                                                        {" "}
                                                        View Profile{" "}
                                                      </NavLink>
                                                      {allQuestion?.allowConnectionRequest ===
                                                      true ? (
                                                        allQuestion?.isFriend ===
                                                        "false" ? (
                                                          <div
                                                            className="abc"
                                                            onClick={() => {
                                                              setOpenModal(
                                                                !openmodal
                                                              );
                                                              setSenderId(
                                                                allQuestion
                                                                  ?.createdBy
                                                                  ?._id
                                                              );
                                                            }}
                                                          >
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
                                                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                              <polyline points="22,6 12,13 2,6"></polyline>
                                                            </svg>
                                                          </div>
                                                        ) : allQuestion?.isFriend ===
                                                          "true" ? (
                                                          <div
                                                            className="abc"
                                                            onClick={(e) => {
                                                              history.push({
                                                                pathname:
                                                                  "/chat",
                                                                state: {
                                                                  user_id:
                                                                    allQuestion
                                                                      ?.createdBy
                                                                      ?._id,
                                                                },
                                                              });
                                                            }}
                                                          >
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
                                                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                              <polyline points="22,6 12,13 2,6"></polyline>
                                                            </svg>
                                                          </div>
                                                        ) : allQuestion?.isFriend ===
                                                          "sent" ? (
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
                                      </div>

                                      <div className="profile-grid-items">
                                        {allQuestion?.displayProfile === true &&
                                        allQuestion?.filter?.map((f) => {
                                          console.log("-11111111111111", f);
                                          if (
                                            f?.filterId ==
                                            "619e07b7641d2f00f887ec96"
                                          ) {
                                            return f?.options?.map((o) => {
                                              if (
                                                userData?.subject[0] ==
                                                  o?.optionName ||
                                                userData?.subject[1] ==
                                                  o?.optionName ||
                                                userData?.subject[2] ==
                                                  o?.optionName ||
                                                userData?.subject[3] ==
                                                  o?.optionName
                                              ) {
                                                return o?.optionName;
                                              }
                                            });
                                          }
                                        }).length > 0 ? (
                                          <span class="borderlefttext">
                                            {allQuestion?.filter?.map((f) => {
                                              return (
                                                f?.filterId ==
                                                  "619e07b7641d2f00f887ec96" &&
                                                f?.options?.map((opt) => {
                                                  return (
                                                    <span class="category">
                                                      {" "}
                                                      {`${opt?.optionName}, `}
                                                    </span>
                                                  );
                                                })
                                              );
                                            })}
                                          </span>
                                        ) : (
                                          ""
                                        )}

                                        <h2>{allQuestion.question}</h2>

                                        <div className="text-alignment">
                                          <Tooltip title="User reach" arrow>
                                            <p>Reach ({allQuestion?.reach})</p>
                                          </Tooltip>
                                          <Tooltip
                                            title="Total responses received"
                                            arrow
                                          >
                                            <ul>
                                              <Tooltip title="User reach" arrow>
                                                <li
                                                  onClick={() =>
                                                    setOpenAnswerModal(
                                                      !openAnswerModal
                                                    )
                                                  }
                                                >
                                                  Responses (
                                                  {allQuestion.response})
                                                </li>
                                              </Tooltip>
                                            </ul>
                                          </Tooltip>

                                          <ul>
                                            <li>
                                              {moment(
                                                allQuestion.createdAt
                                              ).fromNow()}
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="button-alignment">
                                          <NavLink
                                            to={`/answer/${allQuestion._id}`}
                                          >
                                            <button>
                                              {/* <i class="fas fa-pen"></i> */}
                                              <div className="pen-icon-svg">
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
                                          {allQuestion?.allowConnectionRequest ===
                                          true ? (
                                            allQuestion?.isFriend ===
                                            "pending" ? (
                                              <>
                                                <button>
                                                  <NavLink to={`/connections`}>
                                                    <svg
                                                      viewBox="0 0 24 24"
                                                      width="24"
                                                      height="24"
                                                      stroke="currentColor"
                                                      stroke-width="2"
                                                      fill="none"
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      class="css-i6dzq1 stroke-gray"
                                                    >
                                                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                      <circle
                                                        cx="8.5"
                                                        cy="7"
                                                        r="4"
                                                      ></circle>
                                                      <polyline points="17 11 19 13 23 9"></polyline>
                                                    </svg>
                                                    <span>Pending</span>
                                                  </NavLink>
                                                </button>
                                              </>
                                            ) : allQuestion?.isFriend ==
                                                "false" ||
                                              allQuestion?.isFriend == false ? (
                                              <>
                                                <button
                                                  onClick={() => {
                                                    setOpenModal(!openmodal);
                                                    setSenderId(
                                                      allQuestion?.createdBy
                                                        ?._id
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
                                                    class="css-i6dzq1 stroke-gray"
                                                  >
                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                    <circle
                                                      cx="8.5"
                                                      cy="7"
                                                      r="4"
                                                    ></circle>
                                                    <line
                                                      x1="20"
                                                      y1="8"
                                                      x2="20"
                                                      y2="14"
                                                    ></line>
                                                    <line
                                                      x1="23"
                                                      y1="11"
                                                      x2="17"
                                                      y2="11"
                                                    ></line>
                                                  </svg>
                                                  <span>Connect</span>
                                                </button>
                                              </>
                                            ) : allQuestion?.isFriend ===
                                              "sent" ? (
                                              <>
                                                <button>
                                                  <NavLink to={`/connections`}>
                                                    <div className="sent-alignment-myqury">
                                                      <svg
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        fill="none"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        class="css-i6dzq1 stroke-gray"
                                                      >
                                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                        <circle
                                                          cx="8.5"
                                                          cy="7"
                                                          r="4"
                                                        ></circle>
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
                                                        user_id:
                                                          allQuestion?.createdBy
                                                            ?._id,
                                                      },
                                                    });
                                                  }}
                                                >
                                                  <div className="Message-icon-alignment">
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
                                  <div className="answer-grid-items answer-show-dropdown-relative">
                                    <div
                                      className="pointer mobile-view-end-side-alignment"
                                      onClick={() => {
                                        if (
                                          allQuestion?._id === idComparePopup
                                        ) {
                                          setIdComparePopup(0);
                                          console.log(
                                            "idComparePopup",
                                            idComparePopup
                                          );
                                        } else {
                                          setIdComparePopup(allQuestion?._id);
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
                                    <div
                                      className={
                                        allQuestion?._id === idComparePopup
                                          ? "answer-edit-delete-dropdwon-design dropdown-show"
                                          : "answer-edit-delete-dropdwon-design dropdown-hidden"
                                      }
                                    >
                                      <div className="dropdown-cus-design">
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
                                          <div className="edit-text">
                                            <p
                                              onClick={() => {
                                                setOpenModalRemoveQuestionIReceived(
                                                  !openModalRemoveQuestionIReceived
                                                );
                                                setIdForRemoveQuestionIReceived(
                                                  allQuestion?._id
                                                );
                                                setIdComparePopup(0);
                                              }}
                                            >
                                              Remove
                                            </p>
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
                                              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                                              <line
                                                x1="4"
                                                y1="22"
                                                x2="4"
                                                y2="15"
                                              ></line>
                                            </svg>
                                          </div>
                                          <div
                                            onClick={() => {
                                              setOpenReportAbuseModal(
                                                !openReportAbuseModal
                                              );
                                              setIdReportAbuse(
                                                allQuestion?._id
                                              );
                                              setIdComparePopup(0);
                                            }}
                                            className="edit-text"
                                          >
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
            ) : answerByme ? (
              <>
                <div className="my-query-grid-items no-anwer-data">
                  <div className="search-input-alignment-end">
                    <div className="input-relative-search">
                      <input
                        type="search"
                        placeholder="Search for question"
                        id="searchData"
                        onChange={(e) => handleOnChnage(e)}
                        value={inputValue}
                        name="searchData"
                      />
                      <div
                        className="search-icon-center"
                        onClick={() => {
                          setinputValue("");
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
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                    </Stack>
                  ) : allReceivedQuestion?.count === 0 ? (
                    <>
                      <div className="no-data-image">
                        <img src={noQuestion} />
                      </div>
                      <p className="">You haven't answered any questions yet</p>
                    </>
                  ) : (
                    <>
                      <InfiniteScroll
                        style={{ overflow: "inherit" }}
                        dataLength={
                          allReceivedQuestion?.questions?.length > 0
                            ? allReceivedQuestion?.questions?.length
                            : 0
                        } //This is important field to render the next data
                        next={fetchData}
                        hasMore={
                          allReceivedQuestion?.count < 10 ? false : hasMore
                        }
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
                            />
                          </div>
                        }
                        // endMessage={<EndMsg />}
                      >
                        {allReceivedQuestion?.questions?.map(
                          (allQuestion, key) => {
                            return (
                              <div className="card-grid">
                                <div className="card-grid-items">
                                  <div className="card-child-grid">
                                    <div
                                      className="card-child-grid-items"
                                      onClick={() => {
                                        setIdComparePopup(0);
                                      }}
                                    >
                                      <div className="profile-grid">
                                        <div className="profile-grid-items">
                                          <div className="profile-image">
                                            <div className="popover__wrapper">
                                              <img
                                                className=""
                                                src={
                                                  allQuestion?.displayProfile ===
                                                  true
                                                    ? allQuestion?.createdBy
                                                        ?.profileImage
                                                    : ProfileImg
                                                }
                                                alt="profile"
                                                // src={ProfileImg}
                                              />
                                              {allQuestion?.displayProfile ===
                                                true && (
                                                <div class="popover__content">
                                                  <div class="card is-ad mb-0 no-border">
                                                    <div class="card-flex friend-card aftershimmer">
                                                      <div class="friend-info">
                                                        <div class="pop-up-top-part">
                                                          <p class="mb-0 font-size-25 text-white">
                                                            {
                                                              allQuestion
                                                                ?.createdBy
                                                                ?.currentRole
                                                            }
                                                          </p>
                                                          <p class="font-size-20 text-white">
                                                            <span>
                                                              <svg
                                                                viewBox="0 0 24 24"
                                                                width="20"
                                                                height="20"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                fill="none"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                class="css-i6dzq1 text-white"
                                                              >
                                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                                <circle
                                                                  cx="12"
                                                                  cy="10"
                                                                  r="3"
                                                                ></circle>
                                                              </svg>{" "}
                                                            </span>
                                                          </p>
                                                        </div>
                                                        <span class="user-name-left-side">
                                                          {allQuestion?.createdBy?.subject?.map(
                                                            (sub) => (
                                                              <span class="badge badge-light">
                                                                {sub}
                                                              </span>
                                                            )
                                                          )}
                                                        </span>
                                                      </div>

                                                      <div class="display-flex">
                                                        <NavLink
                                                          to={`/view-profile/${allQuestion?.createdBy?._id}`}
                                                          class="btn view-profile-btn mr-auto"
                                                        >
                                                          {" "}
                                                          View Profile{" "}
                                                        </NavLink>

                                                        {allQuestion?.allowConnectionRequest ===
                                                        true ? (
                                                          allQuestion?.isFriend ===
                                                          "false" ? (
                                                            <div
                                                              className="abc"
                                                              onClick={() => {
                                                                setOpenModal(
                                                                  !openmodal
                                                                );
                                                                setSenderId(
                                                                  allQuestion
                                                                    ?.createdBy
                                                                    ?._id
                                                                );
                                                              }}
                                                            >
                                                              <img
                                                                src={
                                                                  messageIcons
                                                                }
                                                                alt=""
                                                              />
                                                            </div>
                                                          ) : allQuestion?.isFriend ===
                                                            "true" ? (
                                                            <div
                                                              className="abc"
                                                              onClick={(e) => {
                                                                history.push({
                                                                  pathname:
                                                                    "/chat",
                                                                  state: {
                                                                    user_id:
                                                                      allQuestion
                                                                        ?.createdBy
                                                                        ?._id,
                                                                  },
                                                                });
                                                              }}
                                                            >
                                                              <img
                                                                src={
                                                                  messageIcons
                                                                }
                                                                alt=""
                                                              />
                                                            </div>
                                                          ) : allQuestion?.isFriend ===
                                                            "sent" ? (
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
                                        </div>
                                        <div className="profile-grid-items">
                                          {allQuestion?.displayProfile ===
                                            true &&
                                          allQuestion?.filter?.map((f) => {
                                            if (f?.filterId == "") {
                                              return f?.options?.map((o) => {
                                                if (
                                                  userData?.subject[0] ==
                                                    o?.optionName ||
                                                  userData?.subject[1] ==
                                                    o?.optionName ||
                                                  userData?.subject[2] ==
                                                    o?.optionName ||
                                                  userData?.subject[3] ==
                                                    o?.optionName
                                                ) {
                                                  return o?.optionName;
                                                }
                                              });
                                            }
                                          }).length > 0 ? (
                                            <span class="borderlefttext">
                                              {allQuestion?.filter?.map((f) => {
                                                return (
                                                  f?.filterId ==
                                                    "619e07b7641d2f00f887ec96" &&
                                                  f?.options?.map((opt) => {
                                                    return (
                                                      <span class="category">
                                                        {" "}
                                                        {`${opt?.optionName}, `}
                                                      </span>
                                                    );
                                                  })
                                                );
                                              })}
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                          <h2>{allQuestion?.question}</h2>
                                          <div className="text-alignment">
                                            <Tooltip title="User reach" arrow>
                                              <p>
                                                Reach ({allQuestion?.reach})
                                              </p>
                                            </Tooltip>
                                            <Tooltip
                                              title="Total responses received"
                                              arrow
                                            >
                                              <ul>
                                                <li
                                                  onClick={() =>
                                                    setOpenAnswerModal(
                                                      !openAnswerModal
                                                    )
                                                  }
                                                >
                                                  Responses (
                                                  {allQuestion?.response})
                                                </li>
                                              </ul>
                                            </Tooltip>
                                            <ul>
                                              <li>
                                                {moment(
                                                  allQuestion.createdAt
                                                ).fromNow()}
                                              </li>
                                            </ul>
                                          </div>
                                          <div className="button-alignment">
                                            <NavLink
                                              to={`/answer/${allQuestion?._id}`}
                                            >
                                              <button>
                                                <i class="fas fa-pen"></i>
                                                <span>Answer</span>
                                              </button>
                                            </NavLink>
                                            {allQuestion?.allowConnectionRequest ===
                                            true ? (
                                              allQuestion?.isFriend ===
                                              "pending" ? (
                                                <>
                                                  <button>
                                                    <NavLink
                                                      to={`/connections`}
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
                                                        class="css-i6dzq1 stroke-gray"
                                                      >
                                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                        <circle
                                                          cx="8.5"
                                                          cy="7"
                                                          r="4"
                                                        ></circle>
                                                        <polyline points="17 11 19 13 23 9"></polyline>
                                                      </svg>
                                                      <span>Pending</span>
                                                    </NavLink>
                                                  </button>
                                                </>
                                              ) : allQuestion?.isFriend ===
                                                "false" ? (
                                                <>
                                                  {/* <button> */}
                                                  <button
                                                    onClick={() => {
                                                      setOpenModal(!openmodal);
                                                      setSenderId(
                                                        allQuestion?.createdBy
                                                          ?._id
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
                                                      class="css-i6dzq1 stroke-gray"
                                                    >
                                                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                      <circle
                                                        cx="8.5"
                                                        cy="7"
                                                        r="4"
                                                      ></circle>
                                                      <line
                                                        x1="20"
                                                        y1="8"
                                                        x2="20"
                                                        y2="14"
                                                      ></line>
                                                      <line
                                                        x1="23"
                                                        y1="11"
                                                        x2="17"
                                                        y2="11"
                                                      ></line>
                                                    </svg>
                                                    <span>Connect</span>
                                                  </button>
                                                </>
                                              ) : allQuestion?.isFriend ===
                                                "sent" ? (
                                                <>
                                                  <button>
                                                    <NavLink
                                                      to={`/connections`}
                                                    >
                                                      <i class="fas fa-user-plus"></i>
                                                      <span>sent</span>
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
                                                          user_id:
                                                            allQuestion
                                                              ?.createdBy?._id,
                                                        },
                                                      });
                                                    }}
                                                  >
                                                    <i class="fas fa-user-plus"></i>
                                                    <span>Message</span>
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
                                    {/* <div className="card-child-grid-items">
                                    <i class="fas fa-ellipsis-v"></i>
                                  </div> */}
                                    <div className="answer-grid-items answer-show-dropdown-relative">
                                      <div
                                        className="pointer mobile-view-end-side-alignment"
                                        onClick={() => {
                                          // setEditDropdown(!editDropdown)

                                          if (
                                            allQuestion?._id === idComparePopup
                                          ) {
                                            console.log("2323232345566677");
                                            setIdComparePopup(0);
                                          } else {
                                            setIdComparePopup(allQuestion?._id);
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
                                          <circle
                                            cx="12"
                                            cy="12"
                                            r="1"
                                          ></circle>
                                          <circle cx="12" cy="5" r="1"></circle>
                                          <circle
                                            cx="12"
                                            cy="19"
                                            r="1"
                                          ></circle>
                                        </svg>
                                      </div>
                                      <div
                                        className={
                                          allQuestion?._id === idComparePopup
                                            ? "answer-edit-delete-dropdwon-design dropdown-show"
                                            : "answer-edit-delete-dropdwon-design dropdown-hidden"
                                        }
                                      >
                                        <div className="dropdown-cus-design">
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
                                                <line
                                                  x1="4"
                                                  y1="22"
                                                  x2="4"
                                                  y2="15"
                                                ></line>
                                              </svg>
                                            </div>
                                            <div
                                              onClick={(e) => {
                                                blockUserRequest(
                                                  allQuestion?.createdBy?._id
                                                );
                                              }}
                                              className="edit-text"
                                            >
                                              <p>Block user</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </InfiniteScroll>
                    </>
                  )}
                </div>
              </>
            ) : answerLaterData ? (
              <>
                <div className="my-query-grid-items no-anwer-data">
                  <div className="search-input-alignment-end">
                    <div className="input-relative-search">
                      <input
                        type="search"
                        placeholder="Search for question"
                        id="searchData"
                        onChange={(e) => handleOnChnage(e)}
                        value={inputValue}
                        name="searchData"
                      />
                      <div
                        className="search-icon-center"
                        onClick={() => {
                          setinputValue("");
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
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                    </Stack>
                  ) : allReceivedQuestion.count === 0 ? (
                    <>
                      <div className="no-data-image">
                        <img src={noQuestion} />
                      </div>
                      <p className="">
                        You haven't added any questions to answer later
                      </p>
                    </>
                  ) : (
                    // "no answer later found"
                    <>
                      <InfiniteScroll
                        dataLength={
                          allReceivedQuestion?.questions?.length > 0
                            ? allReceivedQuestion?.questions?.length
                            : 0
                        } //This is important field to render the next data
                        next={fetchData}
                        hasMore={
                          allReceivedQuestion?.count < 10 ? false : hasMore
                        }
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
                            />
                          </div>
                        }
                        // endMessage={<EndMsg />}
                      >
                        {allReceivedQuestion?.questions?.map((allQuestion) => {
                          return (
                            <div className="card-grid">
                              <div className="card-grid-items">
                                <div className="card-child-grid">
                                  <div
                                    className="card-child-grid-items"
                                    onClick={() => {
                                      setIdComparePopup(0);
                                    }}
                                  >
                                    <div className="profile-grid">
                                      <div className="profile-grid-items">
                                        <div className="profile-image">
                                          <div className="popover__wrapper">
                                            <img
                                              className=""
                                              src={
                                                allQuestion?.displayProfile ===
                                                true
                                                  ? allQuestion?.createdBy
                                                      ?.profileImage
                                                  : ProfileImg
                                              }
                                              alt="img"
                                            />
                                            {allQuestion?.displayProfile ===
                                              true && (
                                              <div class="popover__content">
                                                <div class="card is-ad mb-0 no-border">
                                                  <div class="card-flex friend-card aftershimmer">
                                                    <div class="friend-info">
                                                      <div class="pop-up-top-part">
                                                        <p class="mb-0 font-size-25 text-white">
                                                          {
                                                            allQuestion
                                                              ?.createdBy
                                                              ?.currentRole
                                                          }
                                                        </p>
                                                        <p class="font-size-20 text-white">
                                                          <span>
                                                            <svg
                                                              viewBox="0 0 24 24"
                                                              width="20"
                                                              height="20"
                                                              stroke="currentColor"
                                                              stroke-width="2"
                                                              fill="none"
                                                              stroke-linecap="round"
                                                              stroke-linejoin="round"
                                                              class="css-i6dzq1 text-white"
                                                            >
                                                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                              <circle
                                                                cx="12"
                                                                cy="10"
                                                                r="3"
                                                              ></circle>
                                                            </svg>{" "}
                                                          </span>
                                                        </p>
                                                      </div>
                                                      <span class="user-name-left-side">
                                                        {allQuestion?.createdBy?.subject?.map(
                                                          (sub) => (
                                                            <span class="badge badge-light">
                                                              {sub}
                                                            </span>
                                                          )
                                                        )}
                                                      </span>
                                                    </div>

                                                    <div class="display-flex">
                                                      <NavLink
                                                        to={`/view-profile/${allQuestion?.createdBy?._id}`}
                                                        class="btn view-profile-btn mr-auto"
                                                      >
                                                        {" "}
                                                        View Profile{" "}
                                                      </NavLink>

                                                      {allQuestion?.allowConnectionRequest ===
                                                      true ? (
                                                        allQuestion?.isFriend ===
                                                        "false" ? (
                                                          <div
                                                            className="abc"
                                                            onClick={() => {
                                                              setOpenModal(
                                                                !openmodal
                                                              );
                                                              setSenderId(
                                                                allQuestion
                                                                  ?.createdBy
                                                                  ?._id
                                                              );
                                                            }}
                                                          >
                                                            <img
                                                              src={messageIcons}
                                                              alt=""
                                                            />
                                                          </div>
                                                        ) : allQuestion?.isFriend ===
                                                          "true" ? (
                                                          <div
                                                            className="abc"
                                                            onClick={(e) => {
                                                              history.push({
                                                                pathname:
                                                                  "/chat",
                                                                state: {
                                                                  user_id:
                                                                    allQuestion
                                                                      ?.createdBy
                                                                      ?._id,
                                                                },
                                                              });
                                                            }}
                                                          >
                                                            <img
                                                              src={messageIcons}
                                                              alt=""
                                                            />
                                                          </div>
                                                        ) : allQuestion?.isFriend ===
                                                          "sent" ? (
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
                                      </div>
                                      <div className="profile-grid-items">
                                        {allQuestion?.displayProfile === true &&
                                        allQuestion?.filter?.map((f) => {
                                          if (
                                            f?.filterId ==
                                            "619e07b7641d2f00f887ec96"
                                          ) {
                                            return f?.options?.map((o) => {
                                              if (
                                                userData?.subject[0] ==
                                                  o?.optionName ||
                                                userData?.subject[1] ==
                                                  o?.optionName ||
                                                userData?.subject[2] ==
                                                  o?.optionName ||
                                                userData?.subject[3] ==
                                                  o?.optionName
                                              ) {
                                                return o?.optionName;
                                              }
                                            });
                                          }
                                        }).length > 0 ? (
                                          <span class="borderlefttext">
                                            {allQuestion?.filter?.map((f) => {
                                              return (
                                                f?.filterId ==
                                                  "619e07b7641d2f00f887ec96" &&
                                                f?.options?.map((opt) => {
                                                  return (
                                                    <span class="category">
                                                      {" "}
                                                      {`${opt?.optionName}, `}
                                                    </span>
                                                  );
                                                })
                                              );
                                            })}
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                        <h2>{allQuestion?.question}</h2>
                                        <div className="text-alignment">
                                          <Tooltip title="User reach" arrow>
                                            <p>Reach ({allQuestion?.reach})</p>
                                          </Tooltip>
                                          <Tooltip
                                            title="Total responses received"
                                            arrow
                                          >
                                            <ul>
                                              <li
                                                onClick={() =>
                                                  setOpenAnswerModal(
                                                    !openAnswerModal
                                                  )
                                                }
                                              >
                                                Responses (
                                                {allQuestion?.response})
                                              </li>
                                            </ul>
                                          </Tooltip>
                                          <ul>
                                            <li>
                                              {moment(
                                                allQuestion?.createdAt
                                              ).fromNow()}
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="button-alignment">
                                          <NavLink
                                            to={`/answer/${allQuestion?._id}`}
                                          >
                                            <button>
                                              <i class="fas fa-pen"></i>
                                              <span>Answer</span>
                                            </button>
                                          </NavLink>
                                          {/* <button onClick={(e) => { removeAnswerLater(allQuestion._id) }}> */}
                                          <button
                                            onClick={(e) => {
                                              setOpenmodalDeleteAnswerLater(
                                                true
                                              );
                                              setIdForRemove(allQuestion?._id);
                                              setIdComparePopup(0);
                                            }}
                                          >
                                            <i class="fas fa-times"></i>
                                            <span>Remove</span>
                                          </button>
                                          {/* <button
                                            onClick={() => {
                                              setOpenModal(!openmodal);
                                              setSenderId(
                                                allQuestion?.question?.createdBy
                                              );
                                            }}
                                          >
                                            <i class="fas fa-times"></i>
                                            <i class="fas fa-user-plus"></i>
                                            <span>Connect</span>
                                          </button> */}
                                          {allQuestion?.allowConnectionRequest ===
                                          true ? (
                                            allQuestion?.isFriend ===
                                            "pending" ? (
                                              <>
                                                <button>
                                                  <NavLink to={`/connections`}>
                                                    <svg
                                                      viewBox="0 0 24 24"
                                                      width="24"
                                                      height="24"
                                                      stroke="currentColor"
                                                      stroke-width="2"
                                                      fill="none"
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      class="css-i6dzq1 stroke-gray"
                                                    >
                                                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                      <circle
                                                        cx="8.5"
                                                        cy="7"
                                                        r="4"
                                                      ></circle>
                                                      <polyline points="17 11 19 13 23 9"></polyline>
                                                    </svg>
                                                    <span>Pending</span>
                                                  </NavLink>
                                                </button>
                                              </>
                                            ) : allQuestion?.isFriend ===
                                              "false" ? (
                                              <>
                                                <button
                                                  onClick={() => {
                                                    setOpenModal(!openmodal);
                                                    setSenderId(
                                                      allQuestion?.createdBy
                                                        ?._id
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
                                                    class="css-i6dzq1 stroke-gray"
                                                  >
                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                    <circle
                                                      cx="8.5"
                                                      cy="7"
                                                      r="4"
                                                    ></circle>
                                                    <line
                                                      x1="20"
                                                      y1="8"
                                                      x2="20"
                                                      y2="14"
                                                    ></line>
                                                    <line
                                                      x1="23"
                                                      y1="11"
                                                      x2="17"
                                                      y2="11"
                                                    ></line>
                                                  </svg>
                                                  <span>Connect</span>
                                                </button>
                                              </>
                                            ) : allQuestion?.isFriend ==
                                              "sent" ? (
                                              <>
                                                <button>
                                                  <NavLink to={`/connections`}>
                                                    <i class="fas fa-user-plus"></i>
                                                    <span>sent</span>
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
                                                        user_id:
                                                          allQuestion?.createdBy
                                                            ?._id,
                                                      },
                                                    });
                                                  }}
                                                >
                                                  <i class="fas fa-user-plus"></i>
                                                  <span>Message</span>
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
                                  <div className="answer-grid-items answer-show-dropdown-relative">
                                    <div
                                      className="pointer mobile-view-end-side-alignment"
                                      onClick={() => {
                                        if (
                                          allQuestion?._id === idComparePopup
                                        ) {
                                          setIdComparePopup(0);
                                          console.log(
                                            "idComparePopup",
                                            idComparePopup
                                          );
                                        } else {
                                          setIdComparePopup(allQuestion?._id);
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
                                    <div
                                      className={
                                        allQuestion?._id === idComparePopup
                                          ? "answer-edit-delete-dropdwon-design dropdown-show"
                                          : "answer-edit-delete-dropdwon-design dropdown-hidden"
                                      }
                                    >
                                      <div className="dropdown-cus-design">
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
                                              <line
                                                x1="4"
                                                y1="22"
                                                x2="4"
                                                y2="15"
                                              ></line>
                                            </svg>
                                          </div>
                                          <div
                                            onClick={() => {
                                              setOpenReportAbuseModal(
                                                !openReportAbuseModal
                                              );
                                              setIdReportAbuse(
                                                allQuestion?._id
                                              );
                                            }}
                                            className="edit-text"
                                          >
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
            ) : route == "/my-query" ? (
              <>
                <div className="my-query-grid-items no-anwer-data">
                  <div className="search-input-alignment-end">
                    <div className="input-relative-search">
                      <input
                        type="search"
                        placeholder="Search for question"
                        id="searchData"
                        onChange={(e) => handleOnChnage(e)}
                        value={inputValue}
                        name="searchData"
                      />
                      <div
                        className="search-icon-center"
                        onClick={() => {
                          setinputValue("");
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
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                  {isLoaderVisible === true && (
                    <Stack spacing={1}>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                      <div className="main-skeleton-lodar-design">
                        <div className="Skeleton-flex-align">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="padding-left-loader">
                            <Skeleton variant="text" style={{ width:"100%"}} height={25} />
                          </div>
                        </div>
                        <Skeleton variant="text" width={"60%"} height={25} />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                    </Stack>
                  )}
                  {allReceivedQuestion?.count === 0 ? (
                    <>
                      <div className="no-data-image">
                        <img src={noQuestion} />
                      </div>
                      <p className="">You have not asked any questions</p>
                      <div className="ask-question-center-align">
                        <NavLink to="/ask-question">
                          <button>Ask question </button>
                        </NavLink>
                      </div>
                    </>
                  ) : (
                    <>
                      <InfiniteScroll
                        dataLength={
                          allReceivedQuestion?.questions?.length > 0
                            ? allReceivedQuestion?.questions?.length
                            : 0
                        } //This is important field to render the next data
                        next={fetchData}
                        hasMore={
                          allReceivedQuestion?.count < 10 ? false : hasMore
                        }
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
                            />
                          </div>
                        }
                        // endMessage={<EndMsg />}
                      >
                        {allReceivedQuestion?.questions?.map((allQuestion) => {
                          return (
                            <div className="card-grid">
                              <div className="card-grid-items">
                                <div className="card-child-grid">
                                  <div
                                    className="card-child-grid-items"
                                    onClick={() => {
                                      setIdComparePopup(0);
                                    }}
                                  >
                                    <div className="profile-grid">
                                      <div className="profile-grid-items">
                                        <div className="profile-image">
                                          <div className="popover__wrapper">
                                            <img
                                              className=""
                                              src={
                                                userData
                                                  ? userData?.profileImage
                                                  : ProfileImg
                                              }
                                            />
                                            <div class="popover__content">
                                              <div class="card is-ad mb-0 no-border">
                                                <div class="card-flex friend-card aftershimmer">
                                                  <div class="friend-info">
                                                    <div class="pop-up-top-part">
                                                      <p class="mb-0 font-size-25 text-white">
                                                        {userData?.currentRole}
                                                      </p>
                                                      <p class="font-size-20 text-white">
                                                        <span>
                                                          <svg
                                                            viewBox="0 0 24 24"
                                                            width="20"
                                                            height="20"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            fill="none"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="css-i6dzq1 text-white"
                                                          >
                                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                            <circle
                                                              cx="12"
                                                              cy="10"
                                                              r="3"
                                                            ></circle>
                                                          </svg>{" "}
                                                        </span>
                                                      </p>
                                                    </div>
                                                  </div>

                                                  <div class="display-flex">
                                                    <NavLink
                                                      to="/profile"
                                                      class="btn view-profile-btn mr-auto"
                                                    >
                                                      {" "}
                                                      View Profile{" "}
                                                    </NavLink>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {/* </Tooltip> */}
                                        </div>
                                      </div>
                                      <div className="profile-grid-items">
                                        {allQuestion?.filter?.length > 0
                                          ? allQuestion?.filter?.map((f) => {
                                              return (
                                                f?.filterId ==
                                                  "619e07b7641d2f00f887ec96" && (
                                                  <span class="borderlefttext">
                                                    {f?.options?.map((opt) => {
                                                      return (
                                                        <span class="category">
                                                          {" "}
                                                          {`${opt?.optionName}, `}
                                                        </span>
                                                      );
                                                    })}
                                                  </span>
                                                )
                                              );
                                            })
                                          : ""}

                                        <h2>{allQuestion.question}</h2>
                                        <div className="text-alignment">
                                          <Tooltip title="User reach" arrow>
                                            <p>Reach ({allQuestion?.reach})</p>
                                          </Tooltip>
                                          <Tooltip
                                            title="Total responses received"
                                            arrow
                                          >
                                            <ul>
                                              <li
                                                onClick={() =>
                                                  setOpenAnswerModal(
                                                    !openAnswerModal
                                                  )
                                                }
                                              >
                                                Responses (
                                                {allQuestion.response})
                                              </li>
                                            </ul>
                                          </Tooltip>
                                          <ul>
                                            <li>
                                              {moment(
                                                allQuestion.createdAt
                                              ).fromNow()}
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="button-alignment">
                                          <button
                                            onClick={() => {
                                              history.push({
                                                pathname: "/see-answer",
                                                state: {
                                                  questionId: allQuestion._id,
                                                  question: allQuestion,
                                                },
                                              });
                                            }}
                                          >
                                            <i
                                              class="fas fa-eye"
                                              style={{
                                                color: "red",
                                                fontSize: "16px",
                                              }}
                                            ></i>
                                            <span style={{ fontSize: "14px" }}>
                                              See Answer
                                            </span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="answer-grid-items answer-show-dropdown-relative">
                                    <div
                                      className="pointer mobile-view-end-side-alignment"
                                      onClick={() => {
                                        if (
                                          allQuestion?._id === idComparePopup
                                        ) {
                                          setIdComparePopup(0);
                                        } else {
                                          setIdComparePopup(allQuestion?._id);
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
                                    <div
                                      className={
                                        allQuestion?._id === idComparePopup
                                          ? "answer-edit-delete-dropdwon-design dropdown-show"
                                          : "answer-edit-delete-dropdwon-design dropdown-hidden"
                                      }
                                    >
                                      <div className="dropdown-cus-design">
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
                                            onClick={() => {
                                              history.push({
                                                pathname: "/ask-question",
                                                state: {
                                                  question: allQuestion,
                                                },
                                              });
                                            }}
                                            className="edit-text"
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
                                              <line
                                                x1="10"
                                                y1="11"
                                                x2="10"
                                                y2="17"
                                              ></line>
                                              <line
                                                x1="14"
                                                y1="11"
                                                x2="14"
                                                y2="17"
                                              ></line>
                                            </svg>
                                          </div>
                                          <div
                                            onClick={(e) => {
                                              setOpenModalDelete(true);
                                              setIdComparePopup(0);
                                              setIdForDeleteAskedQuestion(
                                                allQuestion?._id
                                              );
                                            }}
                                            className="edit-text"
                                          >
                                            <p>Delete</p>
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
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      <>
        <div style={{ paddingTop: "60px" }}></div>
      </>
      {openmodal ? (
        <div className="content-modal ">
          <div className="modal-center-align animate__animated animate__zoomIn wow">
            <div className="modal-header">
              <p>You can customize this invitation</p>
              <div
                className="close-icon"
                onClick={() => {
                  setOpenModal(!openmodal);
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
          <div className="modal-center-align">
            <div className="modal-header">
              <p>Remove Question</p>
              <div
                className="close-icon"
                onClick={() => {
                  setOpenmodalDeleteAnswerLater(!openmodalDeleteAnswerLater);
                  setIdForRemove();
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
                <p className="delete-text">
                  Sure you want to remove this question?
                </p>
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
          <div className="modal-center-align">
            <div className="modal-header">
              <p>Remove Question</p>
              <div
                className="close-icon"
                onClick={() => {
                  setOpenModalRemoveQuestionIReceived(
                    !openModalRemoveQuestionIReceived
                  );
                  setIdForRemoveQuestionIReceived();
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
                <p className="delete-text">
                  Sure you want to remove this question?
                </p>
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
              <p>
                Hi user, You won't be able to see the responses of the other
                users. Please feel free to share your view point anonymously.
              </p>
            </div>
            <div className="modal-footer-button">
              <button onClick={() => setOpenAnswerModal(!openAnswerModal)}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
