import React, { useContext } from "react";
import "./SwipePage.scss";
import TinderCard from "react-tinder-card";
import { useState } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import SwipeProfile from "../../Assets/Images/swip-profile.png";
import { useEffect } from "react";
import { ApiGet, ApiPost } from "../../Helpers/Api/ApiData";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@mui/material";
import { DataLoaded } from "../../App";
export default function SwipePage() {
  const [swipeCard, setSwipeData] = useState([]);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    getDataFromSwipe();
  }, []);

  const i = 1;
  const getDataFromSwipe = async (index) => {
    setDisable(true);
    await ApiGet(`matching/user?page=${index === 0 ? i + 1 : i}&limit=10`)
      .then((res) => {
        console.log("region-----", res);
        let ConvertYear = res?.data?.payload?.findSameSubjectUser;
        for (let index = 0; index < ConvertYear?.length; index++) {
          const startTime = moment(new Date());
          const end = moment.utc(ConvertYear[index]?.createdAt);
          const duration = moment.duration(end.diff(startTime));
          const hours = duration.asYears();

          ConvertYear[index].Experience = Math.floor(hours);
          // ConvertYear[index].Experience = hours.toFixed();
        }

        // console.log("ConvertYear-----", ConvertYear);

        // console.log("ConvertYear-----", ConvertYear);
        setSwipeData(res?.data?.payload?.findSameSubjectUser);
        setDisable(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const startTime = moment(new Date());
  const end = moment.utc("2024-03-24T09:29:20.106+00:00");
  const duration = moment.duration(end.diff(startTime));
  const hours = duration.asYears();
  console.log(Math.round(hours) !== NaN, "qqqqqqqqqq");

  const onSwipe = (direction) => {};

  useEffect(() => {}, [swipeCard]);

  const onCardLeftScreen = (myIdentifier) => {};
  const db = [
    {
      name: "Richard Hendricks",
      url: "./img/richard.jpg",
    },
    {
      name: "Erlich Bachman",
      url: "./img/erlich.jpg",
    },
    {
      name: "Monica Hall",
      url: "./img/monica.jpg",
    },
    {
      name: "Jared Dunn",
      url: "./img/jared.jpg",
    },
    {
      name: "Dinesh Chugtai",
      url: "./img/dinesh.jpg",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(swipeCard.length - 1);

  console.log("currentIndex", currentIndex);
  const [lastDirection, setLastDirection] = useState();

  useEffect(() => {
    console.log("000000000000000000000", swipeCard, currentIndex);
    setCurrentIndex(swipeCard.length - 1);
  }, [swipeCard]);
  // used for outOfFrame closure

  // console.log("currentIndex", currentIndex);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(swipeCard.length)
        .fill(0)
        .map((i) => React.createRef()),
    [swipeCard]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < swipeCard.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    console.log("swip", direction);
    setLastDirection(direction);

    updateCurrentIndex(index - 1);
    if (index === 0) {
      // getDataFromSwipe(index);
    }

    if (direction && direction === "right") {
      Right(nameToDelete, direction, index);
    } else if (direction && direction === "left") {
      Left(nameToDelete, direction, index);
    } else if (index === 0) {
      // getDataFromSwipe(index);
    }
  };

  const Left = async (nameToDelete, direction, index) => {
    await ApiPost(`matching/reject/id=${nameToDelete}`)
      .then((res) => {
        toast.success("Suggestion rejected");
        console.log("reject", index);

        if (index === 0) {
          getDataFromSwipe(index);
        }
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
  };

  const Right = async (nameToDelete, direction, index) => {
    await ApiPost(`matching/accept/id=${nameToDelete}`)
      .then((res) => {
        toast.success("Request sent");
        if (index === 0) {
          getDataFromSwipe(index);
        }
      })
      .catch((err) => {
        // setOpenConnectionModal(false);
        toast.error("something went wrong");
        console.log("ERROR", err);
      });
  };

  const outOfFrame = (name, idx) => {
    // handle the case in which go back is pressed before card goes outOfFrame
    if (currentIndexRef?.current) {
      currentIndexRef?.current >= idx && childRefs[idx]?.current?.restoreCard();
    }
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };
  useEffect(() => {
    if (currentIndex === -1) {
      setCurrentIndex(0);
    }
  }, [currentIndex]);
  const swipe = async (dir) => {
    // e.preventDefault()
    console.log("currentIndex", canSwipe, currentIndex, swipeCard, dir, childRefs);
    if (childRefs?.[currentIndex]?.current && canSwipe && currentIndex < swipeCard?.length) {
      await childRefs[currentIndex]?.current?.swipe(dir); // Swipe the card!
    }
  };

  const { SwipContentFun } = useContext(DataLoaded);

  const [SwipContent, setSwipContent] = SwipContentFun;

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[currentIndex]?.current?.restoreCard();
  };

  // window.addEventListener("load", (event) => {
  //   var image = document.querySelector("img");
  //   const DataLoad = image.complete;
  //   if (!DataLoad) {
  //     image.src = SwipeProfile;
  //   }
  // });

  const ImageOnerror = (e) => {
    e.preventDefault();
    console.log();
    e.target.src = { SwipeProfile };
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div className="swipe-section-alignment">
          <div className="container swipe-card-center-alignment">
            <div className="cardContainer">
              <div className="button-wrapper">
                {swipeCard?.length !== 0 && (
                  <>
                    <button style={{ backgroundColor: !canSwipe && "#c3c4d3" }} onClick={(e) => swipe("left")} disabled={disable}>
                      Reject
                    </button>
                    <button style={{ backgroundColor: !canSwipe && "#c3c4d3" }} onClick={(e) => swipe("right")} disabled={disable}>
                      Accept
                    </button>
                  </>
                )}
              </div>
              {swipeCard?.length > 0 ? (
                <>
                  {swipeCard.map((character, index) => (
                    <TinderCard
                      ref={childRefs[index]}
                      className="swipe"
                      key={character?._id}
                      onSwipe={(dir) => {
                        swiped(dir, character?._id, index);
                        console.log("swipping", dir, character?._id, index);
                      }}
                      onCardLeftScreen={() => outOfFrame(character?._id, index)}
                    >
                      <div
                        style={{
                          backgroundImage: character?.profileImage,
                        }}
                        className="card"
                      >
                        <div className="card-alignment-all">
                          <div className="swipe-profile-center-alignment">
                            <div className="swipe-profile">
                              <img
                                src={character?.profileImage}
                                alt="SwipeProfile"
                                // onerror={ImageOnerror}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = SwipeProfile;
                                }}
                              />
                            </div>
                          </div>
                          {character?.currentRole && (
                            <div className="swipe-title">
                              <h1>{character?.currentRole}</h1>
                              <i class="fas fa-info-circle"></i>
                            </div>
                          )}
                          {/* <div className="media-text">
                            {console.log("ataqqqqqqqqq", character)}
                            <p>Media and Entertainment</p>
                            {character.name}
                          </div> */}
                          <div className="icon-text-alignment">
                            <div>
                              <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div>
                              <span>{character?.region}</span>
                            </div>
                          </div>
                          <div className="icon-text-alignment">
                            <div>
                              <i class="far fa-clock"></i>
                            </div>
                            <div>
                              <span>
                                {console.log("qqqqqqqqqqq", character)}
                                Member Since {moment(character?.createdAt).format("MM/DD/YYYY")}
                                {console.log("character", character)}
                              </span>
                            </div>
                          </div>
                          <div className="icon-text-alignment">
                            <div>
                              <i class="fas fa-shopping-bag"></i>
                            </div>
                            <div>
                              <span>
                                {console.log("character?.Experience > 0", character?.Experience)}
                                {character?.Experience < 0 ? 0 : character?.Experience}
                                {character?.Experience !== 0 && "+"} Year Of Experience
                              </span>
                            </div>
                          </div>
                          <div className="icon-text-alignment">
                            <div>
                              <i class="fas fa-wifi"></i>
                            </div>
                            <div>
                              <span>Connected to {character?.accepted?.length} people</span>
                            </div>
                          </div>
                          <div className="sub-titl-alignment">
                            <h1>Activities on the Platform</h1>
                          </div>
                          <div className="icon-text-alignment">
                            <div>
                              <i class="fas fa-chart-line"></i>
                            </div>
                            <div>
                              <span>Last active on {moment(character?.lastLogin).format("MM/DD/YYYY")}</span>
                            </div>
                          </div>
                          <div className="icon-text-alignment">
                            <div>
                              <i class="far fa-comments"></i>
                            </div>
                            <div>
                              <span>{character?.questionCount} Questions Asked</span>
                            </div>
                          </div>
                          <div className="icon-text-alignment">
                            <div>
                              <i class="far fa-comments"></i>
                            </div>
                            <div>
                              <span>{character?.answerCount} Answers</span>
                            </div>
                          </div>
                          <div className="sub-titl-alignment">
                            <h1>Top Subjects</h1>
                          </div>
                          {character?.subject?.map((sub) => (
                            <div className="icon-text-alignment">
                              <div>
                                <i class="far fa-user-circle"></i>
                              </div>
                              <div>
                                <span>{sub}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TinderCard>
                  ))}

                  {SwipContent && (
                    <>
                      <div className="content-modal custom-swipe-modal ">
                        <div className="modal-center-align">
                          <div className="modal-header">
                            <h3>Matching screen information</h3>
                          </div>
                          <div className="modal-body">
                            <div className="form-group-modal">
                              <p>
                                Welcome to Matching screen. This section allows you to send a match request. Swipe right if you want to send the match request. Swipe left if you don’t want to send a match request. If you both send a match request to each other then you can start the conversation with other in the chat room.
                                {/* <p>{renderHTML(ContentPopup[0].description)}</p> */}
                              </p>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <div className="modal-footer-button-alignment" onClick={() => setSwipContent(false)}>
                              <div className="custom-btn-wrapper">
                                <Button
                                  class="custom-btn"
                                  // onClick={(e) =>
                                  //   PostContent(e, ContentPopup[0]._id)
                                  // }
                                >
                                  Continue
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <></>
                    </>
                  )}
                </>
              ) : (
                <div className="see-answer-grid-items animate__animated animate__slideInRight wow" data-wow-offset="200">
                  <div className="chat-list-answer-style center-align-image-no-data ">
                    <div className="no-answer-alignment">
                      <div className="no-answer-image-center">
                        <img src={require("../../Assets/Images/no-answer.svg").default} alt="img" />
                      </div>
                      <p>No matches available for you right now</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
