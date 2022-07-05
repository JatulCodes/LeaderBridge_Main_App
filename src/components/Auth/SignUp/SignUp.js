import React, { useEffect, useRef, useState } from "react";
import "./SignUp.scss";
import "../SignIn/SignIn.scss";
import Logo from "../../../Assets/Images/logo.png";
import { NavLink } from "react-router-dom";
import { ApiPostNoAuth } from "../../../Helpers/Api/ApiData";
import SigninImge from "../../../Assets/Images/sign-in-banner.jpg";

import { useHistory } from "react-router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Tooltip } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ReCAPTCHA from "react-google-recaptcha";
import usesignin from "../../../components/Auth/SignIn/Usesignin";
import { handleBreakpoints, styled } from "@mui/system";
import UpdateHeader from "../../Layout/UpdateHeader/UpdateHeader";

export default function SignUp() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});
  const [checkedButton, setCheckedButton] = useState(false);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [UserKeypres, setUserKeypres] = useState();
  const [ConformisRevealPwd, setConformisRevealPwd] = useState(false);
  const recaptchaRef = React.createRef();
  const [clickbox, setClickbox] = useState({ checkbox: true });

  const history = useHistory();
  const [Captch, setCaptch] = useState();
  const [Errorcaptch, setErrorcaptch] = useState();

  const handleCaptch = (value) => {
    setCaptch(value);
  };

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 400,
    },
  });

  console.log("userData", userData);

  const handleData = (e) => {
    setUserKeypres(e.key);
    if (/[a-z]/i.test(e.key)) {
      console.log("has a lowercase letter", e.key);
    }
  };

  // const handleChange = (e) => {
  //   let { name, value } = e.target;

  //   // if (e.target.name == "name") {
  //   //   let val = e.target.value.replace(/\D/g, "");
  //   //   setUserData((prevState) => ({
  //   //     ...prevState,
  //   //     [name]: val,
  //   //   }));
  //   //   // setUserData({ ...userData, [name]: val });
  //   //   // setErrors({ ...errors, [name]: "" });
  //   // } else {
  //   setUserData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  //   // }

  //   if (value.trim() || name == "password" || name == "confirm_password") {
  //     setErrors({ ...errors, [name]: "" });
  //   }
  // };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    // if (e.target.name === "name") {
    // let val = e.target.value.replace(/[^a-zA-Z]/g, "");
    // setUserData({ ...userData, [name]: val });
    // setErrors({ ...errors, [name]: "" });
    // } else {
    // const { name, value } = e.target;

    setUserData({ ...userData, ...clickbox, [name]: value });

    setErrors({ ...errors, [name]: "" });
    // }
  };

  console.log("userDatatatatatatatta", userData);

  const saveUser = (e) => {
    // e.preventdefault();
    if (!formValidator()) {
      return;
    }
    if (!Captch) {
      toast.error("Please verify that you are not a robot");
      return;
    }
    ApiPostNoAuth("user/registration", userData)
      .then((res) => {
        if (res.data.result == 0) {
          history.push({
            pathname: "/otp-verification",
            state: { email: userData.email },
          });
        } else {
          toast.error(res.data.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        toast.error(err, { theme: "colored" });
      });
  };

  useEffect(() => {
    document.title = "Sign up | Leaderbridge";
  }, []);

  const formValidator = () => {
    let isValid = true;

    if (!userData?.name?.trim()) {
      setErrors((cv) => {
        return { ...cv, name: "* Please enter name" };
      });
      isValid = false;
    }

    if (!userData.email?.trim()) {
      setErrors((cv) => {
        return { ...cv, email: "* Please enter email" };
      });
      isValid = false;
    } else if (
      userData.email?.trim() &&
      !userData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setErrors((cv) => {
        return { ...cv, email: "* Please enter valid email" };
      });
      isValid = false;
    }

    if (!userData.password) {
      setErrors((cv) => {
        return { ...cv, password: "* Please enter password" };
      });
      isValid = false;
    } else if (
      !userData.password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      )
    ) {
      isValid = false;
      setErrors((cv) => {
        return {
          ...cv,
          password:
            "Your password must have at least one capital letter,one small letter, one numeric character, one special character, and should be at least 8 characters long.",
        };
      });
    }

    // if (!userData.confirm_password) {
    //   setErrors((cv) => {
    //     return { ...cv, confirm_password: "* Please enter password" };
    //   });
    //   isValid = false;
    // } else if (userData.password != userData.confirm_password) {
    //   setErrors((cv) => {
    //     return { ...cv, confirm_password: "* Password doesn't match" };
    //   });
    //   isValid = false;
    // }

    if (!checkedButton) {
      setErrors((cv) => {
        return { ...cv, condition: "* Please accept terms & conditions" };
      });
      isValid = false;
    }

    // if (!Captch) {
    //   isValid = false;

    //   setErrorcaptch("* Please varify that you are not a robot");
    // }

    return isValid;
  };

  function useKey(key, cb) {
    const callback = useRef(cb);
    useEffect(() => {
      callback.current = cb;
    });
    useEffect(() => {
      function handle(event) {
        if (event.code === key) {
          callback.current(event);
        }
      }
      document.addEventListener("keypress", handle);
      return () => document.removeEventListener("keypress", handle);
    }, [key]);
  }
  useKey("Enter", saveUser);

  return (
    <div>
      <UpdateHeader />
      <div className="">
        <div className="sign-in-grid">
          <div className="sign-in-grid-items">
            <ToastContainer />

            <img src={SigninImge} alt="SigninImge" />
            {/* <div className="new-phase-auth-change-box">
              <div className="new-phase-alignment-logo">
                <div>
                  <NavLink to="/">
                    <img src={Logo} alt="Logo" />
                  </NavLink>
                  <span>LeaderBridge</span>
                </div>
              </div>
              <div className="child-text-phase-text-style">
                <p>
                  Lets you connect anonymously and stay anonymous if you wish
                </p>
                <p>Does not allow sales, job hunting, or recruitment</p>
                <p>Vets all members to confirm their professional identity</p>
                <p>
                  We've launched our beta offering and we welcome you to
                  experience our platform completely free. You will not be asked
                  for any payment information when you sign up. in return, we'd
                  love to hear your feedback on how we could bring you a better
                  experience from time to time.
                </p>
                <p>Already a member?</p>
              </div>
              <div className="new-phase-signup-button">
                <NavLink to="/signin">
                  <button>Join</button>
                </NavLink>
              </div>
            </div> */}
          </div>
          <div className="sign-in-grid-items">
            <div className="signup-box-height">
              <h3>Sign up</h3>
              <div className="form-details-align">
                <div className="form-group">
                  {/* <Tooltip title="Profile" arrow placement="right"> */}
                  <label>
                    Name{" "}
                    <span style={{ color: "red", paddingLeft: "3px" }}>*</span>
                  </label>
                  {/* </Tooltip> */}
                  <input
                    type="name"
                    name="name"
                    value={userData["name"]}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onKeyDown={(e) => handleData(e)}
                    placeholder="John Doe"
                  />

                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["name"]}
                  </span>
                </div>
                <div className="form-group">
                  <div className="signup-lable-icon-alignment">
                    <label>
                      Email
                      <span style={{ color: "red", paddingLeft: "3px" }}>
                        *
                      </span>
                    </label>
                    <CustomWidthTooltip
                      title={
                        <p style={{ fontSize: "13px" }}>
                          Please provide your work email address. Your work
                          email is necessary for confirming your identity and it
                          will not be shared with subscribers or any third
                          party. After you have received and submitted your one
                          time passcode (OTP), we will only communicate with you
                          via your preferred contact email.
                        </p>
                      }
                      placement="right-start"
                    >
                      <div className="info-icon">
                        <svg
                          viewBox="0 0 24 24"
                          width="19"
                          height="19"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="css-i6dzq1"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      </div>
                    </CustomWidthTooltip>
                  </div>
                  <input
                    type="Email"
                    name="email"
                    value={userData["email"]}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Enter you personal email"
                  />
                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["email"]}
                  </span>
                </div>
                <div className="form-group">
                  <div className="signup-lable-icon-alignment">
                    <label>
                      Password{" "}
                      <span style={{ color: "red", paddingLeft: "3px" }}>
                        *
                      </span>
                    </label>
                    <CustomWidthTooltip
                      title={
                        <p style={{ fontSize: "13px" }}>
                          Your password must have at least one capital letter,
                          one small letter, one numeric character, one special
                          character, and should be at least 8 characters long.
                        </p>
                      }
                      placement="right-start"
                    >
                      <div className="info-icon">
                        <svg
                          viewBox="0 0 24 24"
                          width="19"
                          height="19"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="css-i6dzq1"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      </div>
                    </CustomWidthTooltip>
                  </div>
                  <div className="input-relative-style">
                    <input
                      type={isRevealPwd ? "text" : "password"}
                      name="password"
                      value={userData["password"]}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      placeholder="●●●●●●●"
                    />

                    {isRevealPwd ? (
                      // <i
                      //   class="fa fa-eye"
                      //   aria-hidden="true"
                      //   onClick={() => setIsRevealPwd((prevState) => !prevState)}
                      // ></i>
                      <div
                        className="show-pass-style"
                        onClick={() =>
                          setIsRevealPwd((prevState) => !prevState)
                        }
                      >
                        <svg
                          id="eye_icon"
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
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </div>
                    ) : (
                      // <i
                      //   class="fas fa-eye-slash"
                      //   onClick={() => setIsRevealPwd((prevState) => !prevState)}
                      // ></i>
                      <div
                        className="dont-show-pass-style"
                        onClick={() =>
                          setIsRevealPwd((prevState) => !prevState)
                        }
                      >
                        <svg
                          id="eye_icon"
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
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["password"]}
                  </span>
                </div>
                <div className="form-group">
                  <div className="signup-lable-icon-alignment">
                    <label>
                      Confirm Password{" "}
                      <span style={{ color: "red", paddingLeft: "3px" }}>
                        *
                      </span>
                    </label>
                    <CustomWidthTooltip
                      title={
                        <div>
                          <p style={{ fontSize: "13px" }}>
                            Your password must have at least one capital letter,
                            one small letter , one numeric character, one
                            special character, and should be at least 8
                            characters long.
                          </p>
                        </div>
                      }
                      placement="right-start"
                    >
                      <div className="info-icon">
                        <svg
                          viewBox="0 0 24 24"
                          width="19"
                          height="19"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="css-i6dzq1"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      </div>
                    </CustomWidthTooltip>
                  </div>
                  <div className="input-relative-style">
                    <input
                      type={ConformisRevealPwd ? "text" : "password"}
                      name="confirm _password"
                      value={userData["confirm_password"]}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      placeholder="●●●●●●●"
                    />

                    {ConformisRevealPwd ? (
                      // <i
                      //   class="fa fa-eye"
                      //   aria-hidden="true"
                      //   onClick={() =>
                      //     setConformisRevealPwd((prevState) => !prevState)
                      //   }
                      // ></i>
                      <div
                        className="show-pass-style"
                        onClick={() =>
                          setConformisRevealPwd((prevState) => !prevState)
                        }
                      >
                        <svg
                          id="eye_icon"
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
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </div>
                    ) : (
                      // <i
                      //   class="fas fa-eye-slash"
                      //   onClick={() =>
                      //     setConformisRevealPwd((prevState) => !prevState)
                      //   }
                      // ></i>
                      <div
                        className="dont-show-pass-style"
                        onClick={() =>
                          setConformisRevealPwd((prevState) => !prevState)
                        }
                      >
                        <svg
                          id="eye_icon"
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
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["confirm_password"]}
                  </span>
                </div>
                <div className="terms-align">
                  <div className="check-box-align-box">
                    <input
                      type="checkbox"
                      name="condition"
                      onChange={(e) => {
                        setCheckedButton(e.target.checked);
                        setErrors({
                          ...errors,
                          [e.target.name]: e.target.checked,
                        });
                      }}
                    />
                  </div>
                  <span>
                    I accept the{" "}
                    <NavLink to="/privacy" target="_blank">
                      <u>Privacy Policy</u>
                    </NavLink>
                    ,{" "}
                    <NavLink to="/terms" target="_blank">
                      <u>Terms of Services</u>
                    </NavLink>
                    , and{" "}
                    <NavLink to="/cookie" target="_blank">
                      <u>Cookies Policy</u>
                    </NavLink>{" "}
                    set forth by LeaderBridge
                    <sup>TM</sup>.{/* Add new  */}
                    {/* End  */}
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errors["condition"]}
                    </span>
                  </span>
                </div>

                <div className="terms-align">
                  <div
                    className="check-box-align-box"
                    style={{ marginTop: "13px" }}
                  >
                    <input
                      type="checkbox"
                      name="checkbox"
                      defaultChecked
                      onChange={(e) => {
                        setClickbox({ checkbox: e.target.checked });
                      }}
                    />
                  </div>
                  <span style={{ marginTop: "10px" }}>
                    By ticking this box, you are opting in to receiving our
                    emails
                    <sup>TM</sup>.{/* Add new  */}
                    {/* End  */}
                    <div style={{ marginTop: "20px" }}>
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LcM7f8cAAAAAGIAyBKbTByLO8ru2ioUWfUXVYh-"
                        onChange={handleCaptch}
                      />
                    </div>
                  </span>
                </div>

                <div className="button-center1">
                  <button className="fill-button" onClick={(e) => saveUser(e)}>
                    Sign Up
                  </button>
                  {/* <button
                    className="fill-button"
                    style={{ marginLeft: "30px" }}
                  >
                    <NavLink to="/register">
                      <span style={{ color: "white" }}>
                        Organization Register
                      </span>
                    </NavLink>
                  </button> */}
                </div>
                <div className="dont-have-account">
                  <p>
                    Already a member?
                    <NavLink to="/signin">
                      <span>Sign In</span>
                    </NavLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
