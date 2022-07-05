import React, { useEffect, useState, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { ApiGet, ApiPost, ApiPut } from "../../Helpers/Api/ApiData";
// import FilterMenu from '../Common/FilterMenu/FilterMenu';
import "./AskQuestion.scss";
import Multiselect from "multiselect-react-dropdown";
import { toast, ToastContainer } from "react-toastify";
import { useHistory, useLocation } from "react-router";
import { DataLoaded } from "../../App";

export default function AskQuestion() {
  const filterMenuRef = useRef();
  const history = useHistory();
  const location = useLocation();
  const [filterMenu, SetFilterMenu] = useState(true);

  const [questionFilters, setQuestionFilters] = useState([]);

  const [askQuestionFilters, setAskQuestionFilters] = useState([]);

  const [question, setQuestion] = useState("");
  const [questionButton, setQuestionButton] = useState();

  const [displayMyProfile, setDisplayMyProfile] = useState(
    location?.state?.question &&
      location?.state?.question?.displayMyProfile === true
      ? true
      : false
  );
  const [allowConnectionRequest, setAllowConnectionRequest] = useState(
    location?.state?.question &&
      location?.state?.question?.allowConnectionRequest
      ? location?.state?.question?.allowConnectionRequest
      : true
  );

  useEffect(() => {
    document.title = "Ask Query | LeaderBridge";
    getQuestionFilter();
    checkQuestionType();
  }, []);

  const checkQuestionType = () => {
    if (location?.state?.question) {
      setQuestion(location?.state?.question?.question);
      setAskQuestionFilters(location?.state?.question?.filter);
      setAllowConnectionRequest(
        location?.state?.question?.allowConnectionRequest
      );
      setDisplayMyProfile(location?.state?.question?.displayProfile);
    }
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

  const getQuestionFilter = async () => {
    const res = await ApiGet("filter/get-filter?type=question");
    setQuestionFilters(res?.data?.payload?.filter);
  };

  const { answer, myquery, request, answerLaterUser } = useContext(DataLoaded);

  const [myQueryData, setMyQueryData] = myquery;
  const [requestData, setRequestData] = request;
  const [answerByme, setAnswerByme] = answer;
  const [answerLaterData, setanswerLaterData] = answerLaterUser;

  const sendQuestionData = async () => {
    setQuestionButton(1);
    if (question) {
      if (location?.state?.question) {
        await ApiPut(`question/id=${location?.state?.question._id}`, {
          question: question,
          filter: askQuestionFilters,
          displayProfile: displayMyProfile,
          allowConnectionRequest: allowConnectionRequest,
        })
          .then((res) => {
            setQuestionFilters([]);
            setAskQuestionFilters([]);

            setMyQueryData(true);
            setRequestData(false);
            setAnswerByme(false);
            setanswerLaterData(false);
            history.push("/my-query");
          })
          .catch((err) => {
            toast.error(err, { theme: "colored" });
          });
      } else {
        await ApiPost("question/create-question", {
          question: question,
          filter: askQuestionFilters,
          displayProfile: displayMyProfile,
          allowConnectionRequest: allowConnectionRequest,
        })
          .then((res) => {
            setQuestion("");
            setQuestionFilters([]);
            setAskQuestionFilters([]);
            history.push("/my-query");
          })
          .catch((err) => {
            toast.error(err, { theme: "colored" });
          });
      }
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
  return (
    <>
      <section className="ask-question-banner">
        <div className="container">
          <div className="search-grid">
            <div className="search-grid-items">
              {/* <input
                type="search"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here..."
              /> */}
              <textarea
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here..."
                type="search"
                id="question"
                name="question"
                value={question}
              ></textarea>
              {question !== "" ? (
                <div
                  className="close-icon-textarea"
                  onClick={() => setQuestion("")}
                >
                  <span id="input-icon" class="icon is-small is-right pointer">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="css-i6dzq1 pointer cleardata"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                </div>
              ) : (
                ""
              )}
              <ToastContainer />
            </div>
            <div className="search-grid-items">
              <div
                className="filter-icon"
                onClick={() => SetFilterMenu(!filterMenu)}
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
                {(askQuestionFilters.length > 0 ||
                  allowConnectionRequest === true ||
                  displayMyProfile === true) && (
                  <div className="sub-filter"></div>
                )}
              </div>
            </div>
          </div>
          <div className="filter-counter-style">
            <p style={{ padding: "0 20px" }}>
              {askQuestionFilters.length +
                (allowConnectionRequest == true ? 1 : 0) +
                (displayMyProfile == true ? 1 : 0) >
              0 ? (
                <>
                  <span>
                    {askQuestionFilters?.length +
                      (allowConnectionRequest == true ? 1 : 0) +
                      (displayMyProfile == true ? 1 : 0)}
                  </span>{" "}
                  filters applied
                </>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className="submit-button-center">
            <button
              type="button"
              style={
                question && !questionButton
                  ? { background: "#333" }
                  : { cursor: "auto" }
              }
              onClick={question && !questionButton && sendQuestionData}
            >
              {location?.state?.question ? "Update Question" : "Submit"}
            </button>
          </div>
        </div>
      </section>

      <div
        className={
          !filterMenu
            ? "filter-menu-design filter-menu-open "
            : "filter-menu-design filter-menu-close"
        }
        ref={filterMenuRef}
      >
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
              class="css-i6dzq1"
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
            {console.log("questionFilters", questionFilters)}
            {questionFilters.map((filter) => {
              return (
                <div className="question-grid-items">
                  <label>{filter?.name}</label>
                  <Multiselect
                    //  style={{chips: { background: '#FFF'},option:{color: '#FFF'}}}
                    // options={filter?.options} // Options to display in the dropdown
                    options={filter?.options?.filter(
                      (item) => item.status == true
                    )}
                    //selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                    onSelect={(selectedList, selectedItem) =>
                      onSelect(selectedList, selectedItem, filter)
                    } // Function will trigger on select event
                    onRemove={(selectedList, removedItem) =>
                      onRemove(selectedList, removedItem, filter)
                    } // Function will trigger on remove event
                    displayValue="optionName" // Property name to display in the dropdown options
                    // disablePreSelectedValues="true"
                    // closeIcon="circle"
                    selectedValues={getSelectedData(filter)}
                  />
                </div>
              );
            })}
          </div>
          <div className="toggle-button-alignment">
            <div className="display-profile-alignment">
              <span>Display my profile</span>
              <div>
                <label className="f-switch">
                  <input
                    type="checkbox"
                    className="is-switch "
                    id="view_profile"
                    checked={displayMyProfile === true ? true : false}
                    // value={true}
                    onChange={(e) => {
                      setDisplayMyProfile(e.target.checked);
                    }}
                  />
                  <i></i>
                </label>
              </div>
            </div>
            <div className="display-profile-alignment">
              <span>Allow connection request</span>
              <div>
                <label className="f-switch">
                  <input
                    type="checkbox"
                    className="is-switch "
                    id="view_profile"
                    checked={allowConnectionRequest === true ? true : false}
                    onChange={(e) => {
                      setAllowConnectionRequest(e.target.checked);
                    }}
                  />
                  <i></i>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="filter-modal-footer">
          <div className="text-alignment">
            <p
              onClick={() => {
                setAllowConnectionRequest(false);
                setDisplayMyProfile(false);
                setAskQuestionFilters([]);
              }}
            >
              Reset
            </p>
            <div className="modal-button-alignment">
              <button
                className="cancel-button"
                onClick={() => {
                  setAskQuestionFilters([]);
                  SetFilterMenu(!filterMenu);
                }}
              >
                Cancel
              </button>
              <button
                className="apply-button-style"
                onClick={() => SetFilterMenu(!filterMenu)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      {filterMenu ? null : (
        <div
          className="filter-menu-blur"
          onClick={() => SetFilterMenu(false)}
        ></div>
      )}
    </>
  );
}
