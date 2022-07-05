import React, { useEffect, useState } from "react";
import "./SignUpSubject.scss";
import Logo from "../../../Assets/Images/logo.png";
import { NavLink } from "react-router-dom";
import { useLocation, useHistory, Redirect } from "react-router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiGet, ApiPut, ApiPutNoAuth } from "../../../Helpers/Api/ApiData";
import Auth from "../../../Helpers/auth";
import { STORAGEKEY } from "../../../config/app.config";

import imageToBase64 from "image-to-base64/browser";
import mergeImages from "merge-images";

import Loader from "react-loader-spinner";
import { Skeleton } from "@mui/material";
import Usesignin from "../SignIn/Usesignin";

export default function SignUpSubject() {
  const location = useLocation();
  const history = useHistory();

  const [subjectsList, setSubjectList] = useState([]);
  const [allSubjectList, setAllSubjectList] = useState([]);
  const [allSubjectListWithImage, setAllSubjectListWithImage] = useState([]);
  const [signupLoader, setSignupLoader] = useState(false);
  const [initLoader, setInitLoader] = useState(true);

  useEffect(() => {
    document.title = "Subject | LeaderBridge";
    getSubjectList();
  }, []);

  // disconecct

  const { LoginConnection } = Usesignin();

  const getSubjectList = () => {
    setInitLoader(true);
    if (location?.state?.subjectCards) {
      setSubjectList(location.state.subjectCards);
    }
    ApiGet(`legend`)
      .then((res) => {
        let allAnswer = [];
        res?.data?.payload?.map((legend) => {
          allAnswer.push(legend?.legendsName);
        });
        setAllSubjectList(allAnswer);
        // allSubjectList = res?.data?.payload;
        setAllSubjectListWithImage(res?.data?.payload);
        setInitLoader(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const uploadData = () => {
    if (subjectsList.length < 4) {
      toast.error("Please select atleast four subject");
    } else {
      setSignupLoader(true);

      const userData = {
        ...location?.state?.verificationData,
        subject: subjectsList,
      };
      ApiPutNoAuth("user/verification-form", userData)
        .then((res) => {
          if (res.data.result == 0) {
            Auth.setAuthToken(res.data.payload?.token);
            Auth.setUserData(res.data.payload.fillForm);
            LoginConnection(res?.data?.payload.fillForm?._id);

            setSignupLoader(false);

            history.push("/welcome");
          } else {
            toast.error(res?.data?.message, { theme: "colored" });
          }
        })
        .catch((err) => {
          toast.error(err.message, { theme: "colored" });
        });
    }
  };

  const updateTopSubjects = async () => {
    if (subjectsList.length < 4) {
      toast.error("Please select atleast four subject");
    } else {
      setSignupLoader(true);

      ApiPut("user/", {
        subject: subjectsList,
      })
        .then((res) => {
          if (res.data.result == 0) {
            localStorage.setItem(
              STORAGEKEY.userData,
              JSON.stringify(res.data.payload.updateUser)
            );
            setSignupLoader(false);
            history.push("/request");
            window.location.reload();
          } else {
            toast.error(res?.data?.message, { theme: "colored" });
          }
        })
        .catch((err) => {
          toast.error(err?.message, { theme: "colored" });
        });
    }
  };

  return location?.state?.verificationData || location?.state?.subjectCards ? (
    <div>
      <ToastContainer />
      <div className="signup-subject-alignment">
        <div className="signup-subject-box">
          <div className="logo-center-align">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="verification-title">
            <h3>Select Subjects</h3>
            <p>
              From the list below, please rank order the 4 subjects you like
              most. Begin with checking the plus sign next to your favorite
              subject, then your 2nd favorite, 3rd, and 4th. This list will help
              other subscribers to find you.
            </p>
          </div>

          {!initLoader ? (
            <div className="profile-grid">
              <div className="profile-grid-items">
                <div className="subject-profile">
                  {/* <NavLink to="/welcome"> */}
                  <div className="profile-icon-design">
                    <div className="child-image-grid">
                      {subjectsList.map((subject, index) => (
                        <div className="child-image-grid-items">
                          <img
                            src={
                              allSubjectListWithImage.find(
                                (sub) => sub.legendsName === subject
                              )?.legendsIcon
                            }
                            alt="MoneyImage"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* </NavLink> */}
                  <p>Subject Profile</p>
                </div>
              </div>
              <div className="profile-grid-items">
                <span>
                  {subjectsList.length > 0
                    ? `${subjectsList.length} subject selected`
                    : ""}
                </span>
                <div className="all-text-icon-alignment">
                  {allSubjectList.map((subject, index) => (
                    <div
                      className="icon-text-alignment"
                      onClick={() => {
                        if (subjectsList.find((sub) => sub === subject)) {
                          // const index = subjectsList.indexOf(subject);
                          // if (index > -1) {
                          //   subjectsList.splice(index, 1);

                          // }
                          setSubjectList(
                            subjectsList.filter((sub) => sub !== subject)
                          );
                        } else if (subjectsList.length < 4) {
                          setSubjectList([...subjectsList, subject]);
                        } else {
                          toast.error(
                            "You can only select maximum 4 subjects!",
                            {
                              theme: "colored",
                            }
                          );
                        }
                      }}
                    >
                      <div className="icon-align">
                        {subjectsList.find((sub) => sub === subject) ? (
                          <div className="icon-align-counter-design">
                            {subjectsList.indexOf(subject) + 1}
                          </div>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="css-i6dzq1 icon-signup"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        )}
                      </div>

                      <div className="text">
                        <p>{subject}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="continue-button-style">
                  {location?.state?.subjectCards ? (
                    <button
                      className="cancel-button-style-sec"
                      onClick={() => history.goBack()}
                    >
                      Cancel
                    </button>
                  ) : (
                    ""
                  )}
                  <button
                    className="continue-button-style-first"
                    style={{
                      display: subjectsList.length === 4 ? "block" : "none",
                    }}
                    onClick={() =>
                      !signupLoader
                        ? location?.state?.subjectCards
                          ? updateTopSubjects()
                          : uploadData()
                        : null
                    }
                  >
                    {signupLoader ? "" : "Continue"}
                    <Loader
                      type="Oval"
                      color="#FFF"
                      height={25}
                      width={25}
                      visible={signupLoader}
                    />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="40%" />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}
