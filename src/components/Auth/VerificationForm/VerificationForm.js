import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router";
import "./VerificationForm.scss";
import Logo from "../../../Assets/Images/logo.png";
import { NavLink } from "react-router-dom";
import { ApiGet } from "../../../Helpers/Api/ApiData";

export default function VerificationForm() {
  const history = useHistory();
  const location = useLocation();

  const [verificationData, setVerificationData] = useState({});
  const [verificationError, setVerificationError] = useState({});
  const [organizationNameToggle, setOrganizationNameToggle] = useState(false);
  const [RolefilterData, setRolefilterData] = useState([]);

  useEffect(() => {}, [verificationData]);

  const organigationRoleList = [
    // "Assistant Director",
    // "Assistant Vice President",
    // "Associate Vice President",
    // "Chief Executive Officer",
    // "Chief Financial Officer",
    // "Chief Operating Officer",
    // "Co-Founder",
    // "Director",
    // "Executive Vice President",
    // "Founder",
    // "Manager",
    // "Partner",
    // "President",
    // "Product Manager",
    // "Senior Director",
    // "Senior Vice President",
    // "Vice President",
    // "Other",
  ];

  const regionList = [
    // "Africa",
    // "Asia",
    // "Australia & Oceania",
    // "Central & South America",
    // "Central Asia",
    // "East & Southeast Asia",
    // "Europe",
    // "Middle East",
    // "North America",
    // "South Asia",
  ];

  const howDidFindList = [
    "Facebook",
    "Twitter",
    "Linkedin",
    "Google Search",
    "My Connections",
    "Other",
  ];

  RolefilterData.filter((data) => data.name === "Region").map((item) => {
    item.options
      .filter((stats) => stats.status === true)
      .map((filter) => regionList.push(filter.optionName));
  });
  RolefilterData.filter((data) => data.name === "Level of Leadership").map(
    (item) => {
      item.options
        .filter((stats) => stats.status === true)
        .map((filter) => organigationRoleList.push(filter.optionName));
    }
  );
  const getRoleList = () => {
    ApiGet("filter/get-filter")
      .then((res) => {
        setRolefilterData(res?.data?.payload.filter);
        console.log("ROLE", res?.data?.payload);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getRoleList();
  }, []);
  const validateForm = () => {
    let formIsValid = true;
    if (!verificationData.organizationName) {
      setVerificationError({
        ...verificationError,
        organizationName: "*Please enter organization name",
      });
      formIsValid = false;
    }
    if (!verificationData.currentRole) {
      setVerificationError({
        ...verificationError,
        currentRole: "*Please select organization role",
      });
      formIsValid = false;
    }
    if (!verificationData.region) {
      setVerificationError({
        ...verificationError,
        region: "*Please select region",
      });
      formIsValid = false;
    }
    if (!verificationData.organizationEmail) {
      setVerificationError({
        ...verificationError,
        organizationEmail: "*Please enter organization email",
      });
      formIsValid = false;
    } else if (
      verificationData.organizationEmail &&
      !verificationData.organizationEmail.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setVerificationError({
        ...verificationError,
        organizationEmail: "*Please enter valid organization email",
      });
      formIsValid = false;
    }

    if (!verificationData.linkedinProfile) {
      setVerificationError({
        ...verificationError,
        linkedinProfile: "*Please enter linkedin profile",
      });
      formIsValid = false;
    } else if (
      !verificationData.linkedinProfile.match(
        /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/gm
      )
    ) {
      setVerificationError({
        ...verificationError,
        linkedinProfile: "*Please enter valid linkedin profile",
      });
      formIsValid = false;
    }
    if (!verificationData.organizationWebsite) {
      setVerificationError({
        ...verificationError,
        organizationWebsite: "*Please enter organization website",
      });
      formIsValid = false;
    } else if (
      !verificationData.organizationWebsite.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      )
    ) {
      setVerificationError({
        ...verificationError,
        organizationWebsite: "*Please enter valid organization website",
      });
      formIsValid = false;
    }
    //   if (!verificationData.otherLink) {
    //     setVerificationError({
    //       ...verificationError,
    //       otherLink: "*Please Enter Other Website!",
    //     });
    //     formIsValid = false;
    //   } else if (!verificationData.otherLink.includes("www")) {
    //     setVerificationError({
    //       ...verificationError,
    //       otherLink: "*Please Enter valid Other Website!",
    //     });
    //     formIsValid = false;
    //   }
    if (!verificationData.howDidFind) {
      setVerificationError({
        ...verificationError,
        howDidFind: "*Please select how did you find",
      });
      formIsValid = false;
    }

    return formIsValid;
  };

  const onsubmit = () => {
    // e.preventDefault();
    if (validateForm()) {
      history.push({
        pathname: "/signup-subject",
        state: {
          verificationData: {
            ...verificationData,
            email: location?.state?.email,
          },
        },
      });
    }
  };

  const handleChange = (e) => {
    setVerificationData({
      ...verificationData,
      [e.target.name]: e.target.value,
    });
    setVerificationError({
      ...verificationError,
      [e.target.name]: "",
    });
  };

  return location?.state?.email ? (
    <div>
      <div className="container">
        <div className="verification-form-center">
          <div className="verification-form-box">
            <div className="logo-center-align">
              <img src={Logo} alt="Logo" />
            </div>
            <div className="verification-title">
              <h3>Verification Form</h3>
              <p>
                Please complete the following information so that we can verify
                your Identity and your current Leadership Status. This
                information will not be shared with other subscribers on
                LeaderBridge<sup>TM</sup> or any third party
              </p>
            </div>
            {/* <div className="verification-form-control bottom-align-form">
              <label>Organization Name</label>
              <select
                id="organizationName"
                onChange={(e) => {
                  if (e.target.value == "Other") {
                    setOrganizationNameToggle(true);
                  } else {
                    setOrganizationNameToggle(false);
                  }
                }}
              >
                <option value="Select Organization" selected>
                  Select Organization
                </option>
                <option value="Other">Other</option>
              </select>
              {/* <input type={"text"} value /> */}
            {/* </div> */}
            <div className="verification-form-control bottom-align-form">
              <label>Organization Name</label>
              <input
                type="text"
                name="organizationName"
                placeholder="organization name"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <span style={{ color: "red" }}>
              {verificationError["organizationName"]}
            </span>
            <div className="verification-form-control bottom-align-form">
              <label>
                Current LeaderBridge<sup>TM</sup> Role
              </label>
              <select name="currentRole" onChange={(e) => handleChange(e)}>
                <option value="" selected>
                  Select Organization Role
                </option>
                {organigationRoleList.map((item, index) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
              <span style={{ color: "red" }}>
                {verificationError["currentRole"]}
              </span>
            </div>
            <div className="verification-form-control bottom-align-form">
              <label>Region</label>
              <select name="region" onChange={(e) => handleChange(e)}>
                <option value="" selected>
                  Select Region
                </option>
                {regionList.map((item, index) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
              <span style={{ color: "red" }}>
                {verificationError["region"]}
              </span>
            </div>
            <div className="verification-form-control bottom-align-form">
              <label>
                Your email address for the organization where you hold
                leadership role
              </label>
              <input
                type="email"
                name="organizationEmail"
                placeholder="johndoe@gmail.com"
                onChange={(e) => handleChange(e)}
              />
              <span style={{ color: "red" }}>
                {verificationError["organizationEmail"]}
              </span>
            </div>
            <div className="verification-form-control bottom-align-form">
              <label>
                Link to LinkedIn profile
                <span
                  style={{ color: "#e61952", cursor: "pointer" }}
                  onClick={() =>
                    window.open(
                      "https://leadersbridge.s3.amazonaws.com/site-assets/Linked.gif"
                    )
                  }
                >
                  (How to get your own LinkedIn profile)
                </span>
              </label>
              <input
                type="text"
                name="linkedinProfile"
                placeholder="LinkedIn Profile Link"
                onChange={(e) => handleChange(e)}
              />
              <span style={{ color: "red" }}>
                {verificationError["linkedinProfile"]}
              </span>
            </div>
            <div className="verification-form-control bottom-align-form">
              <label>Link to your Organization's Website</label>
              <input
                type="text"
                name="organizationWebsite"
                placeholder="Website Link"
                onChange={(e) => handleChange(e)}
              />
              <span style={{ color: "red" }}>
                {verificationError["organizationWebsite"]}
              </span>
            </div>
            <div className="verification-form-control bottom-align-form">
              <label>Other Link</label>
              <input
                type="text"
                name="otherLink"
                placeholder="Other Link"
                onChange={(e) => handleChange(e)}
              />
              <span style={{ color: "red" }}>
                {verificationError["otherLink"]}
              </span>
            </div>
            <div className="verification-form-control bottom-align-form">
              <label>How did you find us?</label>
              <select
                id="howDidFind"
                name="howDidFind"
                onChange={(e) => handleChange(e)}
              >
                <option value="" selected>
                  Select Source
                </option>
                {howDidFindList.map((item, index) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
              <span style={{ color: "red" }}>
                {verificationError["howDidFind"]}
              </span>
            </div>
            <div className="verification-button-alignment">
              <button className="back-button-style">Back</button>
              <button className="continue-button" onClick={onsubmit}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}
