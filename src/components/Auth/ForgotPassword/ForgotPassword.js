import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./ForgotPassword.scss";
import { ToastContainer, toast } from "react-toastify";
import {
  ApiDelete,
  ApiGet,
  ApiPost,
  ApiPut,
} from "../../../Helpers/Api/ApiData";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
export default function ForgotPassword() {
  // window.dataLayer = window.dataLayer || [];
  // function gtag() {
  //   dataLayer.push(arguments);
  // }
  // gtag("js", new Date());
  // gtag("config", "UA-177946855-1");
  useEffect(() => {
    document.title = "Reset Password | LeaderBridge";
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  const [errors, setErrors] = useState({});
  const [inputValue, setinputValue] = useState({});
  const history = useHistory();
  const [email, setEmail] = useState("");

  const handleOnChnage = (e) => {
    const { name, value } = e.target;

    setinputValue({ ...inputValue, [name]: value });
    if (e.target.name.trim()) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  console.log("email@@@", email);

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

    setErrors(errors);
    return formIsValid;
  };

  const forgotPassword = () => {
    if (validateForm()) {
      ApiPut(`user/forget`, { email: inputValue.email })
        .then((res) => {
          if (res.data.result == 0) {
            setEmail("");
            history.push("/signin");
            toast.success(res?.data?.message, { theme: "colored" });
          } else {
            setEmail("");
            toast.error(res?.data?.message, { theme: "colored" });
          }
        })
        .catch((err) => {
          setEmail("");
          toast.error(err, { theme: "colored" });
        });
    }
  };
  return (
    <>
      <section className="forgot-password-align">
        <ToastContainer />
        <div className="container align-center">
          <div className="grid">
            <div className="grid-items">
              <div className="title-text-style">
                <h3>Forgot Password?</h3>
                <p>
                  No issues just enter the registered email and you will receive
                  the link to reset your password in your inbox.
                </p>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  placeholder=" jennadavis@gmail.com"
                  name="email"
                  value={inputValue && inputValue.email?.toLowerCase()}
                  onChange={(e) => handleOnChnage(e)}
                />
                {!email && (
                  <span style={{ color: "red" }}>{errors["email"]}</span>
                )}
              </div>
              {/* <p className="loginText align-center">
                Already having account{" "}
                <NavLink to="/signin">
                  <a href="#"> &nbsp; Sign In &nbsp;</a>
                </NavLink>{" "}
                /
                <NavLink to="/signup">
                  <a href="#"> &nbsp;&nbsp;Sign Up</a>
                </NavLink>{" "}
              </p> */}
              <div className="send-button-center">
                <button
                  onClick={() => {
                    forgotPassword();
                  }}
                >
                  Send mail
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
