import React, { useEffect, useState, useCallback } from "react";
import { ApiGet, ApiPut, ApiPutNoAuth } from "../../Helpers/Api/ApiData";
import Tab from "../Common/Tab/Tab";
import "./Profile.scss";
import update from "immutability-helper";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card } from "../Common/dragCard/dragCard";
import { useHistory, useLocation } from "react-router";
import ProfileImage from "../../Assets/Images/profile-image.png";
import { Skeleton } from "@mui/material";
export default function Profile() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [subjectCards, setSubjectCards] = useState([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  const history = useHistory();
  const location = useLocation();

  /////////////////////////////////////////////////////  GET USER DETAILS  /////////////////////////////////////////////////////

  useEffect(() => {
    document.title = "Profile | LeaderBridge";
    getUserDetails();
    getAnswers();
    getQuestions();
  }, []);

  const UserData = JSON.parse(localStorage.getItem("userData"));

  const getUserDetails = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`user?userId=${UserData?._id}`)
      .then((res) => {
        console.log("UserDatatatata", res);
        setUserDetails(res?.data?.payload?.findUser);
        setSubjectCards(res?.data?.payload?.findUser[0]?.subject);
        setIsLoaderVisible(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // Move Card
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = subjectCards[dragIndex];
      setSubjectCards(
        update(subjectCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
      onUpdateTopSubject(
        update(subjectCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [subjectCards]
  );

  const onUpdateTopSubject = (subjects) => {
    ApiPut("user/", {
      subject: subjects,
    })
      .then(async (res) => {
        if (res.data.result == 0) {
          console.log(res.data);
        } else {
          // toast.error(res?.data?.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  ///////////////////////////////////////////////////////  GET QUESTIONS  /////////////////////////////////////////////////////

  const getQuestions = async () => {
    await ApiGet("question/get-question?byUser=true")
      .then((res) => {
        console.log(res?.data?.payload?.count);
        setQuestions(res?.data?.payload?.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /////////////////////////////////////////////////////  GET ANSWERS  /////////////////////////////////////////////////////

  const getAnswers = async () => {
    await ApiGet("answer?answerByMe=true")
      .then((res) => {
        setAnswers(res?.data?.payload?.count);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <section className="children-page-align profile-section-align">
        <div className="container-fluid">
          <div className="profile-grid">
            <div className="profile-grid-items">
              {!isLoaderVisible ? (
                <div className="profile-box">
                  <div className="profile-image-center">
                    {console.log("userDetails", userDetails)}
                    <img
                      src={userDetails[0] ? userDetails[0]?.profileImage : ""}
                      alt="Image"
                    />
                  </div>
                  <div className="user-information">
                    <div>
                      <p>{userDetails[0]?.name}</p>
                      <span>{userDetails[0]?.currentRole}</span>
                    </div>
                  </div>
                  <div className="answer-list">
                    <div className="start-block">
                      <p>Questions</p>
                      <span>{questions}</span>
                    </div>
                    <div className="start-block">
                      <p>Answers</p>
                      <span>{answers}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="placeload">
                    <div className="placeload-grid">
                      <div className="placeload-grid-items">
                        <Skeleton variant="circular" />
                      </div>
                      <div className="placeload-grid-items">
                        <Skeleton animation="wave" width={"80%"} height={20} />
                        <div className="top-align-placeload">
                          <Skeleton
                            animation="wave"
                            width={"100%"}
                            height={20}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="profile-grid-items">
              <Tab />
            </div>
            <div className="profile-grid-items">
              <div className="top-subject-box">
                <div className="content-alignment">
                  <p>Top Subjects</p>
                  {/* <i class="far fa-edit"></i> */}
                  {!isLoaderVisible ? (
                    <div
                      className="edit-icon-cetner-align"
                      onClick={() =>
                        history.push({
                          pathname: "/signup-subject",
                          state: {
                            subjectCards: subjectCards,
                          },
                        })
                      }
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
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="list-style-alignment">
                  {!isLoaderVisible ? (
                    <DndProvider backend={HTML5Backend}>
                      {subjectCards?.map((data, i) => (
                        <Card
                          key={data}
                          index={subjectCards[i]}
                          id={data}
                          text={data}
                          moveCard={(dragIndex, hoverIndex) => {
                            moveCard(
                              subjectCards.indexOf(dragIndex),
                              subjectCards.indexOf(hoverIndex)
                            );
                          }}
                          dragenter={onUpdateTopSubject}
                          on
                        />
                      ))}
                    </DndProvider>
                  ) : (
                    <>
                      <div className="profile-skeleton">
                        <Skeleton animation="wave" width={"90%"} height={35} />
                        <Skeleton animation="wave" width={"50%"} height={35} />
                        <Skeleton animation="wave" width={"60%"} height={35} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
