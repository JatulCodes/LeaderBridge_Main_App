import React, { useEffect, useState, createContext, useContext } from "react";
import { ApiGet } from "../../../Helpers/Api/ApiData";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Sidebar.scss";
import { DataLoaded } from "../../../App";
import { Tooltip } from "@mui/material";
// import InfoIcon from "@mui/icons-material/Info"

export default function Sidebar({
  handleSubjectSelect,
  selectedTopSubjects,
  setSelectedTopSubjects,
}) {
  let history = useHistory();
  let route = window.location.pathname;

  const [numberOfQuestionIHaveReceived, setNumberOfQuestionIHaveReceived] =
    useState(0);
  const [topSubjectValues, setTopSubjectValues] = useState([]);

  // const [ filterOpen , setFilterOpen ] = useState(false)

  const [totalCount, setTotalCount] = useState({});
  const { answer, myquery, request, answerLaterUser, FilterData } =
    useContext(DataLoaded);

  const [filterOpen, setFilterOpen] = FilterData;

  const [myQueryData, setMyQueryData] = myquery;
  const [requestData, setRequestData] = request;
  const [answerByme, setAnswerByme] = answer;
  const [answerLaterData, setanswerLaterData] = answerLaterUser;

  // let updateAnswerLater = false;
  const [updateAnswerLater, setUpdateAnswerLater] = useState(false);

  useEffect(() => {
    fetchData();
  }, [updateAnswerLater, history?.location?.state]);

  const fetchData = async () => {
    fetchQuestionCOunt();
    fetchTopSubjectValues();
  };

  const fetchQuestionCOunt = () => {
    ApiGet("user/count")
      .then((res) => {
        console.log("1212121212121212222", res);
        setTotalCount(res?.data?.payload);
      })
      .catch((err) => {
        toast.error(err?.message, { theme: "colored" });
      });
  };

  const fetchTopSubjectValues = () => {
    ApiGet("legend")
      .then((res) => {
        if (res?.status === 200 && res?.data?.payload) {
          setTopSubjectValues(res.data.payload);
        }
      })
      .catch((err) => {
        toast.error(err?.message, { theme: "colored" });
      });
  };

  // const handleSubjectSelect = (sub, id) => {
  //   if (selectedTopSubjects?.find((ss) => ss === sub?._id)) {
  //     setSelectedTopSubjects((curVal) => curVal.filter((cv) => cv !== sub?._id))
  //   } else {
  //     setSelectedTopSubjects((curVal) => [...curVal, sub?._id])
  //   }
  // }

  const organigationRoleList = [
    {
      id: 1,
      subject: "Assistant Director",
    },

    {
      id: 2,
      subject: "Assistant Vice President",
    },

    {
      id: 3,
      subject: "Associate Vice President",
    },

    {
      id: 4,
      subject: "Chief Executive Officer",
    },

    {
      id: 5,
      subject: "Chief Financial Officer",
    },

    {
      id: 6,
      subject: "Chief Operating Officer",
    },

    { id: 7, subject: "Co-Founder" },

    { id: 8, subject: "Director" },

    { id: 9, subject: "Executive Vice President" },

    { id: 10, subject: "Founder" },

    { id: 11, subject: "Manager" },

    { id: 12, subject: "Partner" },

    { id: 13, subject: "President" },

    { id: 14, subject: "Product Manager" },

    { id: 15, subject: "Senior Vice President" },

    { id: 16, subject: "Senior Director" },

    { id: 17, subject: "Vice President" },

    { id: 18, subject: "Other" },
  ];

  let Asked = "Asked";

  return (
    <>
      <div className="sidebar">
        {/* <ToastContainer /> */}
        <h3>The Bridge</h3>
        <div className="mobile-view-filter-button-show">
          <div className="mobile-view-filter-button">
            <button onClick={() => setFilterOpen(!filterOpen)}>Filter</button>
          </div>
        </div>
        <div
          className={
            filterOpen
              ? "mobile-view-filter-style mobile-view-filter-show"
              : "mobile-view-filter-hidden mobile-view-filter-style"
          }
        >
          <div className="mobile-filter-body-style">
            <div className="sidebar-main-menu-align">
              <button
                className={`${requestData && "sidebar-active"}`}
                onClick={() => {
                  history.push({
                    pathname: "/request",
                    state: {
                      updateAnswerLater: updateAnswerLater,
                    },
                  });

                  // setMyQuery(false);
                  setRequestData(true);
                  setAnswerByme(false);
                  setMyQueryData(false);
                  setanswerLaterData(false);
                  setFilterOpen(!filterOpen);
                }}
              >
                {/* <button className={`${route == "/request" && 'sidebar-active'}`} onClick={() => history.push("/request")}> */}
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="css-i6dzq1 li-icon-left"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>
                  Questions I've Received ({totalCount?.questionReceivedCount})
                </span>
              </button>
              <button
                className={`${myQueryData && "sidebar-active"}`}
                onClick={() => {
                  setMyQueryData(true);
                  setRequestData(false);
                  setAnswerByme(false);
                  setFilterOpen(!filterOpen);
                  setanswerLaterData(false);

                  history.push("/my-query");
                }}
              >
                <i class="fas fa-question-circle"></i>
                <span>
                  Questions I've Asked ({totalCount?.questionAskedCount})
                </span>
              </button>
              <button
                className={`${answerByme && "sidebar-active"}`}
                onClick={() => {
                  history.push({
                    pathname: "/answer-by-me",
                  });
                  // setAnswerByme(true);
                  setAnswerByme(true);
                  setRequestData(false);
                  setMyQueryData(false);
                  setanswerLaterData(false);
                  setFilterOpen(!filterOpen);
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
                  class="css-i6dzq1 li-icon-left"
                >
                  <line x1="17" y1="10" x2="3" y2="10"></line>
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="14" x2="3" y2="14"></line>
                  <line x1="17" y1="18" x2="3" y2="18"></line>
                </svg>
                <span>
                  Questions I've Answered ({totalCount.getAnswerCount})
                </span>
              </button>
              <button
                className={`${answerLaterData && "sidebar-active"}`}
                onClick={() => {
                  history.push({
                    pathname: "/answer-later",
                    // state: { detail: updateAnswerLater },
                    state: {
                      updateAnswerLater: updateAnswerLater,
                    },
                  });
                  setanswerLaterData(true);
                  setAnswerByme(false);
                  setRequestData(false);
                  setMyQueryData(false);
                  setFilterOpen(!filterOpen);
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
                  class="css-i6dzq1 li-icon-left"
                >
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                </svg>
                <span>Answer later ({totalCount?.answerLaterCount})</span>
              </button>
            </div>

            <div className="filter-title">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "22px",
                }}
              >
                <h4>
                  Roles{" "}
                  <Tooltip
                    title="This allow you to filter the questions on the basis of the selected value"
                    placement="top"
                  >
                    <i
                      className="fa fa-info-circle"
                      style={{
                        cursor: "pointer",
                        height: "15px",
                        width: "15px",
                      }}
                    ></i>
                  </Tooltip>{" "}
                </h4>

                {selectedTopSubjects.length > 0 && (
                  <>
                    {/* <span
                  style={{ alignSelf: "center" }}
                  onClick={() => {
                    setSelectedTopSubjects([]);
                  }}
                >
                  Clear
                </span> */}

                    <div className="filter-clear-button-alignment">
                      <button
                        onClick={() => {
                          setSelectedTopSubjects([]);
                        }}
                      >
                        Clear
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="filter-clear-button-alignment">
                {selectedTopSubjects.length > 0
                  ? selectedTopSubjects.map((subject) => {
                      return <button>{subject}</button>;
                    })
                  : ""}
                {/* <button>Managing organizations </button>
            <button>Technology</button>
            <button>Economics & Society</button> */}
              </div>
            </div>

            <div className="child-list-alignment">
              {organigationRoleList?.length > 0 &&
                organigationRoleList?.map((sub, id) => (
                  <div key={id} className="checkbox-alignment">
                    <input
                      type="checkbox"
                      checked={
                        selectedTopSubjects?.find((ss) => ss === sub?.subject)
                          ? true
                          : false
                      }
                      onChange={() => handleSubjectSelect(sub, sub?.subject)}
                    />
                    <span>{sub?.subject}</span>
                  </div>
                ))}

              {/* <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Technology</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Managing yourself</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Operations</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Sales & Marketing</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Finance & Accounting</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>International business</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Economics & Society</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Innovation</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Entrepreneurship</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Leadership & Managing people</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Managing organizations</span>
                    </div> */}
            </div>
          </div>
        </div>
        {filterOpen && (
          <div
            className="mobile-view-filter-style-wrapper"
            onClick={() => setFilterOpen(!filterOpen)}
          ></div>
        )}
        <div className="sidebar-none-mobile-view">
          <div className="sidebar-main-menu-align">
            <button
              className={`${requestData && "sidebar-active"}`}
              onClick={() => {
                history.push({
                  pathname: "/request",
                  state: {
                    updateAnswerLater: updateAnswerLater,
                  },
                });

                // setMyQuery(false);
                setRequestData(true);
                setAnswerByme(false);
                setMyQueryData(false);
                setanswerLaterData(false);
              }}
            >
              {/* <button className={`${route == "/request" && 'sidebar-active'}`} onClick={() => history.push("/request")}> */}
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="css-i6dzq1 li-icon-left"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>
                Questions I've Received ({totalCount?.questionReceivedCount})
              </span>
            </button>
            <button
              className={`${myQueryData && "sidebar-active"}`}
              onClick={() => {
                setMyQueryData(true);
                setRequestData(false);
                setAnswerByme(false);
                setanswerLaterData(false);

                history.push("/my-query");
              }}
            >
              <i class="fas fa-question-circle"></i>
              <span>
                Questions I've Asked ({totalCount?.questionAskedCount})
              </span>
            </button>
            <button
              className={`${answerByme && "sidebar-active"}`}
              onClick={() => {
                history.push({
                  pathname: "/answer-by-me",
                });
                // setAnswerByme(true);
                setAnswerByme(true);
                setRequestData(false);
                setMyQueryData(false);
                setanswerLaterData(false);
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
                class="css-i6dzq1 li-icon-left"
              >
                <line x1="17" y1="10" x2="3" y2="10"></line>
                <line x1="21" y1="6" x2="3" y2="6"></line>
                <line x1="21" y1="14" x2="3" y2="14"></line>
                <line x1="17" y1="18" x2="3" y2="18"></line>
              </svg>
              <span>Questions I've Answered ({totalCount.getAnswerCount})</span>
            </button>
            <button
              className={`${answerLaterData && "sidebar-active"}`}
              onClick={() => {
                history.push({
                  pathname: "/answer-later",
                  // state: { detail: updateAnswerLater },
                  state: {
                    updateAnswerLater: updateAnswerLater,
                  },
                });
                setanswerLaterData(true);
                setAnswerByme(false);
                setRequestData(false);
                setMyQueryData(false);
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
                class="css-i6dzq1 li-icon-left"
              >
                <polyline points="1 4 1 10 7 10"></polyline>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
              </svg>
              <span>Answer later ({totalCount?.answerLaterCount})</span>
            </button>
          </div>

          <div className="filter-title">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "22px",
              }}
            >
              <h4>
                Roles{" "}
                <Tooltip
                  title="This allow you to filter the questions on the basis of the selected value"
                  placement="top"
                >
                  <i
                    className="fa fa-info-circle"
                    style={{ cursor: "pointer", height: "15px", width: "15px" }}
                  ></i>
                </Tooltip>{" "}
              </h4>

              {selectedTopSubjects.length > 0 && (
                <>
                  {/* <span
                  style={{ alignSelf: "center" }}
                  onClick={() => {
                    setSelectedTopSubjects([]);
                  }}
                >
                  Clear
                </span> */}

                  <div className="filter-clear-button-alignment">
                    <button
                      onClick={() => {
                        setSelectedTopSubjects([]);
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="filter-clear-button-alignment">
              {selectedTopSubjects.length > 0
                ? selectedTopSubjects.map((subject) => {
                    return <button>{subject}</button>;
                  })
                : ""}
              {/* <button>Managing organizations </button>
            <button>Technology</button>
            <button>Economics & Society</button> */}
            </div>
          </div>

          <div className="child-list-alignment">
            {organigationRoleList?.length > 0 &&
              organigationRoleList?.map((sub, id) => (
                <div key={id} className="checkbox-alignment">
                  <input
                    type="checkbox"
                    checked={
                      selectedTopSubjects?.find((ss) => ss === sub?.subject)
                        ? true
                        : false
                    }
                    onChange={() => handleSubjectSelect(sub, sub?.subject)}
                  />
                  <span>{sub?.subject}</span>
                </div>
              ))}

            {/* <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Technology</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Managing yourself</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Operations</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Sales & Marketing</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Finance & Accounting</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>International business</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Economics & Society</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Innovation</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Entrepreneurship</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Leadership & Managing people</span>
                    </div>
                    <div className="checkbox-alignment">
                        <input type="checkbox" />
                        <span>Managing organizations</span>
                    </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
