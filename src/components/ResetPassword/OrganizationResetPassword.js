import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./ResetPassword.scss";
import { ToastContainer, toast } from "react-toastify";
import {
  ApiDelete,
  ApiGet,
  ApiGetNoAuth,
  ApiPost,
  ApiPostNoAuth,
  ApiPut,
} from "../../Helpers/Api/ApiData";
import "react-toastify/dist/ReactToastify.css";
export default function OrganizationResetPassword() {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [userdata, setUserData] = useState({});

  //for getting id
  const pathName =
    typeof window !== "undefined" ? window.location.pathname.split("/") : "";

  const [userId, setUserId] = useState(pathName[pathName?.length - 1]);

  const location =
    typeof window !== "undefined" ? window.location.pathname : "";
  useEffect(() => {
    const pName = typeof window !== "undefined" ? location.split("/") : "";
    setUserId(pName[pName?.length - 1]);
  }, [location]);

  useEffect(() => {
    document.title = "Reset Password | LeaderBridge";
  }, []);

  //For validation
  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!password) {
      formIsValid = false;
      errors["password"] = "*Please Enter password!";
    } else if (
      !password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      )
    ) {
      formIsValid = false;
      errors["password"] = "*Please Enter vaild password Format!";
    }

    if (!reEnterPassword) {
      formIsValid = false;
      errors["reEnterPassword"] = "*Please Enter re-enter password!";
    }

    setErrors(errors);
    return formIsValid;
  };

  const resetPassword = () => {
    if (!validateForm()) {
      return;
    }

    if (password != reEnterPassword) {
      toast.error("please enter right reenter password");
      return;
    }
    ApiPost(`user/reset/id=${userId}`, { password: password })
      .then((res) => {
        if (res.data.result == 0) {
          setPassword("");
          setReEnterPassword("");
          userData();
          history.push("/new-pricing");
          toast.success(res?.data?.message, { theme: "colored" });
        } else {
          setPassword("");
          setReEnterPassword("");
          toast.error(res?.data?.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        setPassword("");
        setReEnterPassword("");
        toast.error(err, { theme: "colored" });
      });
  };

  const userData = () => {
    ApiGet(`user?userId=${userId}`)
      .then((res) => {
        console.log("henil", res.data.payload.findUser);
        setUserData(res.data.payload.findUser);

        history.push(`/new-pricing/${userId}`);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <section className="forgot-password-align">
        <ToastContainer />
        <div className="container align-center">
          <div className="grid">
            <div className="grid-items">
              <div className="title-text-style">
                <h3>Reset Password</h3>
                <p>
                  We received your reset password request. Please enter your new
                  password!
                </p>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder=" *******"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setErrors({ ...errors, password: "" });
                    setPassword(e.target.value);
                  }}
                />
                <span style={{ color: "red" }}>{errors["password"]}</span>
              </div>
              <div className="form-group">
                <label>Re-enter Password</label>
                <input
                  type="password"
                  placeholder=" *******"
                  name="reEnterPassword"
                  value={reEnterPassword}
                  onChange={(e) => {
                    setErrors({ ...errors, reEnterPassword: "" });
                    setReEnterPassword(e.target.value);
                  }}
                />
                <span style={{ color: "red" }}>
                  {errors["reEnterPassword"]}
                </span>
              </div>
              <div className="send-button-center">
                <button
                  onClick={() => {
                    resetPassword();
                  }}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
