import React, { useEffect, useState } from "react";
import "./OTPVerification.scss";
import Logo from "../../../Assets/Images/logo.png";
import { Link, NavLink } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import { useLocation, useHistory, Redirect } from "react-router";

import { ApiPutNoAuth } from "../../../Helpers/Api/ApiData";

import OtpInput from "react-otp-input";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    document.title = "Verification Form | LeaderBridge";
    sendVerificationCode();
  }, []);

  const sendVerificationCode = (e) => {
    // e.preventdefault();

    ApiPutNoAuth("user/verify-email", { email: location?.state?.email })
      .then((res) => {
   
        if (res.data.result == 0) {
   

          toast.success(res.data.message, { theme: "colored" });
          // history.push({
          //   pathname: '/otp-verification',
          //   state: { email:  userData.email}
          // })
        } else {
          toast.error(res?.data?.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        toast.error(err?.message, { theme: "colored" });
      });
  };

  const verifyOTPCode = () => {
    if (otp.length != 6) {
      toast.info("Please enter 6 digit code", { theme: "colored" });
      return;
    }
    ApiPutNoAuth("user/verify-code", {
      email: location?.state?.email,
      code: otp,
    })
      .then((res) => {
        if (res.data.result == 0) {
    

          if (res?.data?.payload?.user?.formFilled) {
            history.push({
              pathname: "/profile",
              state: { email: location?.state?.email },
            });
          } else {
            history.push({
              pathname: "/verification-form",
              state: { email: location?.state?.email },
            });
          }
        } else {
          toast.error(res.data.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        toast.error(err.message, { theme: "colored" });
      });
  };

  const handleChange = (e) => {
  
    setOtp(e);
  };

  return location?.state?.email ? (
    <div>
      <div>
        <div className="container-fluid">
          <div className="otp-box-center">
            <div className="otp-box-design">
              <div className="otp-in-grid">
                <div className="otp-in-grid-items">
                  <div className="otp-box-logo-center">
                    <NavLink to="/">
                      <img src={Logo} alt="Logo" />
                    </NavLink>
                  </div>

                  <ToastContainer />
                  <div className="otp-text-style">
                    <h3>
                      Thank you for your interest in exploring LeaderBridge
                      <sup>TM</sup>
                    </h3>

                    <p>
                      To continue with the sign up process, please check your
                      email for the one time passcode. If you don't receive the
                      OTP in 5 minutes, please check your junkmail.
                    </p>
                  </div>
                  <div className="without-signup">
                    <h5>Enter 6 digit otp</h5>
                  </div>
                  <div className="otp-input-style">
                    {/* <input className="otp-input" /> */}
                    <OtpInput
                      inputStyle="otp-input"
                      value={otp}
                      onChange={handleChange}
                      numInputs={6}
                      isInputNum={true}
                    />
                  </div>

                  <div className="verify-button-center">
                    {/* <NavLink to="/profile"> */}
                    <button onClick={verifyOTPCode}>Verify</button>
                    {/* </NavLink> */}
                  </div>
                  <div className="otp-link-style">
                    <span>Haven't received OTP?</span>
                    <p
                      className="cursor-pointer"
                      onClick={sendVerificationCode}
                    >
                      Resend now
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    // history.push("/signin")
    <Redirect to="/signin" />
  );
}
