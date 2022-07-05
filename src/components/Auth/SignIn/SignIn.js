import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router";
import "./SignIn.scss";
import WriteImage from "../../../Assets/Images/write.svg";
import SigninImge from "../../../Assets/Images/sign-in-banner.jpg";
import Logo from "../../../Assets/Images/logo.png";
import { NavLink } from "react-router-dom";
import Auth from "../../../Helpers/auth";
import { ApiPostNoAuth } from "../../../Helpers/Api/ApiData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import usesignin from "./Usesignin";
import { DataLoaded } from "../../../App";
import UpdateHeader from "../../Layout/UpdateHeader/UpdateHeader";

export default function SignIn() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  const history = useHistory();
  const recaptchaRef = React.createRef();
  const [Errorcaptch, setErrorcaptch] = useState();

  const [inputValue, setinputValue] = useState({});
  const [errors, setErrors] = useState({});
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [Captch, setCaptch] = useState();

  const { answer, myquery, request, answerLaterUser } = useContext(DataLoaded);

  const [myQueryData, setMyQueryData] = myquery;
  const [requestData, setRequestData] = request;
  const [answerByme, setAnswerByme] = answer;
  const [answerLaterData, setanswerLaterData] = answerLaterUser;

  const { LoginConnection } = usesignin();

  useEffect(() => {
    document.title = "Sign in | LeaderBridge";
  }, []);

  const handleOnChnage = (e) => {
    const { name, value } = e.target;

    setinputValue({ ...inputValue, [name]: value });
    if (e.target.name.trim()) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    if (inputValue && !inputValue.email) {
      formIsValid = false;
      errors["email"] = "*Please Enter Email!";
    } else if (
      inputValue.email &&
      !inputValue.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      formIsValid = false;
      errors["email"] = "*Please Enter vaild Email!";
    }
    if (inputValue && !inputValue.password) {
      formIsValid = false;
      errors["password"] = "*Please Enter password!";
    } else if (
      inputValue.password &&
      !inputValue.password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      )
    ) {
      formIsValid = false;
      errors["password"] = "*Please Enter vaild password Format!";
      toast.error(
        "Please enter a password between 8 to 15 characters which contain one lowercase letter, one uppercase letter, one numeric digit, and one special character"
      );
    }

    setErrors(errors);
    return formIsValid;
  };

  const login = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (!Captch) {
        toast.error("Please verify that you are not a robot");
        return;
      }
      ApiPostNoAuth("user/login", inputValue)
        .then((res) => {
          if (res?.data?.result == 0) {
            if (res?.data?.payload?.user?.userType == "user") {
              setMyQueryData(false);
              setRequestData(true);
              setAnswerByme(false);
              setanswerLaterData(false);

              // console.log("DDDDDDDDDDDDDDD0", res.data.payload.user);
              // res.data.payload.user.pwReset === true
              //   ? history.push(
              //       `/organization-reset-password/${res?.data?.payload.user?._id}`
              //     )
              //   : history.push("/request");
              // if (res.data.payload.user.pwReset === false) {
              //   history.push(
              //     `/organization-reset-password/${res?.data?.payload.user?._id}`
              //   );
              // } else if (res.data.payload.user.paymentVerified === false) {
              //   history.push(`/new-pricing`);
              // } else {
              Auth.setAuthToken(res.data.payload.token);
              Auth.setUserData(res.data.payload.user);
              LoginConnection(res?.data?.payload.user?._id);
              history.push("/request");
              // }
            } else {
              toast.error("only user can access this screen!", {
                theme: "colored",
              });
            }
          } else {
            toast.error(res.data.message, { theme: "colored" });
            // toast.error("errrrrrr")
          }
        })
        .catch((err) => {
          if (
            err ===
            "Sorry! Your Email couldn't be verified. So please verify it first then try again."
          ) {
            history.push({
              pathname: "/otp-verification",
              state: { email: inputValue.email },
            });
          } else if (
            err ===
            "Sorry, the Verification form is empty.So Please Fill the verification form first then try again"
          ) {
            history.push({
              pathname: "/verification-form",
              state: { email: inputValue.email },
            });
          } else {
            toast.error(err, { theme: "colored" });
          }
        });
    }
  };

  const handleCaptch = (value) => {
    setCaptch(value);
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

  useKey("Enter", login);
  return (
    <>
      <section>
        <ToastContainer />
        <UpdateHeader />
        <div className="sign-in-grid">
          <div className="sign-in-grid-items">
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
                <p>Join with us?</p>
              </div>
              <NavLink to={"/signup"}>
                <div className="new-phase-signup-button">
                  <button>Sign Up</button>
                </div>
              </NavLink>
            </div> */}
          </div>
          <div className="sign-in-grid-items">
            <div className="sign-in-box">
              {/* <div className="logo-center">
                  <NavLink to="/">
                    <img src={Logo} alt="Logo" />
                  </NavLink>
                </div> */}
              {/* <h3>Welcome back</h3>
                <p>Don't miss your next opportunity.</p>
                <p>Sign in to stay updated on your professional world.</p> */}
              <h3>Join LeaderBridge and Connect With Your Peers</h3>
              <div className="form-details-align">
                {/* <div className="form-group">
 
                    <label>Name</label>
                    <input
                      type="email"
                      placeholder="Enter your"
                    />
                    <span style={{ color: "red" }}>{errors["email"]}</span>
                  </div> */}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    onChange={(e) => handleOnChnage(e)}
                    value={inputValue && inputValue.email}
                    name="email"
                    placeholder="jennadavis@gmail.com"
                  />
                  <span style={{ color: "red" }}>{errors["email"]}</span>
                </div>
                <div className="form-group">
                  {/* <label>Password</label>
                                        <input type="password" placeholder="●●●●●●●" /> */}
                  <label>Password</label>
                  <div className="input-relative-style">
                    <input
                      type={isRevealPwd ? "text" : "password"}
                      onChange={(e) => handleOnChnage(e)}
                      name="password"
                      value={inputValue && inputValue.password}
                      placeholder="●●●●●●●"
                    />

                    {isRevealPwd ? (
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
                  <span style={{ color: "red" }}>{errors["password"]}</span>
                  <div className="forgot-password-style">
                    <NavLink to="/forgot-password">
                      <span>Forgot password?</span>
                    </NavLink>
                  </div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LcM7f8cAAAAAGIAyBKbTByLO8ru2ioUWfUXVYh-"
                    onChange={handleCaptch}
                  />

                  <p style={{ color: "red" }}>{Errorcaptch}</p>
                </div>
                <div className="button-center1">
                  {/* <NavLink to="/profile"> */}
                  <button onClick={(e) => login(e)} className="fill-button">
                    Sign In
                  </button>
                  {/* </NavLink> */}
                </div>
                <div className="dont-have-account">
                  <p>
                    Don't have an account?
                    <NavLink to="/signup">
                      <span>Sign up</span>
                    </NavLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
