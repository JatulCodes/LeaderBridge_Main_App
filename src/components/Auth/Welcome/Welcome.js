import React, { useContext, useEffect } from "react";
import "./Welcome.scss";
import Logo from "../../../Assets/Images/logo.png";
import { NavLink } from "react-router-dom";
import { DataLoaded } from "../../../App";
import { ApiGet } from "../../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
export default function Welcome() {
  useEffect(() => {
    document.title = "Welcome | LeaderBridge";
  }, []);

  const { answer, myquery, request, answerLaterUser } = useContext(DataLoaded);

  const [myQueryData, setMyQueryData] = myquery;
  const [requestData, setRequestData] = request;
  const [answerByme, setAnswerByme] = answer;
  const [answerLaterData, setanswerLaterData] = answerLaterUser;

  // useEffect(() => {
  //   GetQuestionData();
  // }, []);

  return (
    <div>
      <div className="welcome-box-alignment">
        <div className="Welcome-box">
          <div className="logo-center-align">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="welcome-text">
            <h1>
              Welcome to
              <span className="logo-text">
                <b>
                  {" "}
                  LeaderBridge<sup>TM</sup>
                </b>
              </span>
            </h1>
            <p>
              Thank you for joining an elite network of industry leaders.
              Validated industry leaders across the globe join our network to
              Connect with other Industry Stalwarts, Ask Queries, Share
              Knowledge, Uncover unique Solutions, Broaden perspective and much
              more while being anonymous.
            </p>
            <h6>
              Lets see how LeaderBridge<sup>TM</sup> works.
            </h6>
          </div>
          <div className="next-button-center-align">
            <NavLink to="/request">
              <button
                onClick={() => {
                  setMyQueryData(false);
                  setRequestData(true);
                  setAnswerByme(false);
                  setanswerLaterData(false);
                }}
              >
                Next
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
