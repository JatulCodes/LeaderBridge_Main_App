import React, { useEffect, useRef, useState } from "react";
import "./Register.scss";
// import Logo from "../../../Assets/Images/logo.png";
// import { NavLink } from "react-router-dom";
import { ApiPostNoAuth, ApiGetNoAuth } from "../../../Helpers/Api/ApiData";
import SigninImge from "../../../Assets/Images/sign-in-banner.jpg";

import { useHistory } from "react-router";

import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Tooltip } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// import ReCAPTCHA from "react-google-recaptcha";
// import usesignin from "../../../components/Auth/SignIn/Usesignin";
import { styled } from "@mui/system";
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
  const [UserKeypres, setUserKeypres] = useState();
  const recaptchaRef = React.createRef();
  const [clickbox, setClickbox] = useState({ checkbox: true });

  const history = useHistory();
  const [Captch, setCaptch] = useState();
  const [Errorcaptch, setErrorcaptch] = useState();
  const [dropdowndata, setDropDownData] = useState([]);

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
    const { name, value } = e.target;
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

    const body = {
      email: userData.contact_email,
      phone: userData.contact_phone,
      fname: userData.contact_first_name,
      lname: userData.contact_last_name,
      organizationName: userData.organization_name,
      currentRole: "organization",
      organizationEmail: userData.contact_email,
      organizationWebsite: userData.organization_website_address,
      programName: userData.program_name,
      programType: userData.program_type,
      permission: userData.checkbox,
    };
    console.log("first", body);
    ApiPostNoAuth("user/organization-signup", body)
      .then((res) => {
        if (res.data.result == 0) {
          history.push({
            pathname: "/signin",
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
    dropdown();
  }, []);

  useEffect(() => {
    document.title = "Organization Registrataion | Leaderbridge";
  }, []);

  const dropdown = () => {
    ApiGetNoAuth("option/get-all")
      .then((res) => {
        setDropDownData(res.data.payload.option);
        // toast.error(res.data.message, { theme: "colored" });
      })
      .catch((err) => {
        toast.error(err, { theme: "colored" });
      });
  };

  const formValidator = () => {
    let isValid = true;

    if (!userData?.organization_name?.trim()) {
      setErrors((cv) => {
        return { ...cv, organization_name: "* Please enter organization name" };
      });
      isValid = false;
    }
    if (!userData?.program_type?.trim()) {
      setErrors((cv) => {
        return { ...cv, program_type: "* Please select program type" };
      });
      isValid = false;
    }
    if (!userData?.program_name?.trim()) {
      setErrors((cv) => {
        return { ...cv, program_name: "* Please enter program name" };
      });
      isValid = false;
    }

    if (!userData?.organization_website_address?.trim()) {
      setErrors((cv) => {
        return {
          ...cv,
          organization_website_address:
            "* Please enter organization website address",
        };
      });
      isValid = false;
    }
    if (!userData?.program_website_address?.trim()) {
      setErrors((cv) => {
        return {
          ...cv,
          program_website_address: "* Please enter program website addresse",
        };
      });
      isValid = false;
    }
    if (!userData?.contact_first_name?.trim()) {
      setErrors((cv) => {
        return {
          ...cv,
          contact_first_name: "* Please enter contact first name",
        };
      });
      isValid = false;
    }
    if (!userData?.contact_last_name?.trim()) {
      setErrors((cv) => {
        return { ...cv, contact_last_name: "* Please enter contact last name" };
      });
      isValid = false;
    }

    if (!userData.contact_email?.trim()) {
      setErrors((cv) => {
        return { ...cv, contact_email: "* Please enter contact email" };
      });
      isValid = false;
    } else if (
      userData.contact_email?.trim() &&
      !userData.contact_email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setErrors((cv) => {
        return { ...cv, contact_email: "* Please enter valid email" };
      });
      isValid = false;
    }

    if (!userData?.contact_phone?.trim()) {
      setErrors((cv) => {
        return { ...cv, contact_phone: "* Please enter contact phone" };
      });
      isValid = false;
    }

    if (!checkedButton) {
      setErrors((cv) => {
        return { ...cv, condition: "* Please accept terms & conditions" };
      });
      isValid = false;
    }

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
          </div>
          <div className="sign-in-grid-items">
            <div className="signup-box-height">
              <h3>Organization Registration</h3>
              <div className="form-details-align">
                <div className="form-group">
                  {/* <Tooltip title="Profile" arrow placement="right"> */}
                  <label>
                    Organization Name{" "}
                    <span style={{ color: "red", paddingLeft: "3px" }}>*</span>
                  </label>
                  {/* </Tooltip> */}
                  <input
                    type="text"
                    name="organization_name"
                    value={userData["organization_name"]}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onKeyDown={(e) => handleData(e)}
                    // placeholder="John Doe"
                  />

                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["organization_name"]}
                  </span>
                </div>
                <div className="form-group">
                  {/* <Tooltip title="Profile" arrow placement="right"> */}
                  <label>
                    Program Type{" "}
                    <span style={{ color: "red", paddingLeft: "3px" }}>*</span>
                  </label>
                  {/* </Tooltip> */}

                  <select
                    name="program_type"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    {dropdowndata?.map((data) => (
                      <>
                        <option value={null}>Select</option>
                        <option value={data._id}>{data.name}</option>
                      </>
                    ))}
                  </select>

                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["program_type"]}
                  </span>
                </div>
                <div className="form-group">
                  <div className="signup-lable-icon-alignment">
                    <label>
                      Program Name
                      <span style={{ color: "red", paddingLeft: "3px" }}>
                        *
                      </span>
                    </label>
                  </div>
                  <input
                    type="text"
                    name="program_name"
                    value={userData["program_name"]}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    // placeholder="Enter Program Name"
                  />
                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["program_name"]}
                  </span>
                </div>
                <div className="form-group">
                  {/* <Tooltip title="Profile" arrow placement="right"> */}
                  <label>
                    Organization Website Address{" "}
                    <span style={{ color: "red", paddingLeft: "3px" }}>*</span>
                  </label>
                  {/* </Tooltip> */}
                  <input
                    type="text"
                    name="organization_website_address"
                    value={userData["organization_website_address"]}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onKeyDown={(e) => handleData(e)}
                    // placeholder="John Doe"
                  />

                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["organization_website_address"]}
                  </span>
                </div>
                <div className="form-group">
                  {/* <Tooltip title="Profile" arrow placement="right"> */}
                  <label>
                    Program Website Address{" "}
                    <span style={{ color: "red", paddingLeft: "3px" }}>*</span>
                  </label>
                  {/* </Tooltip> */}
                  <input
                    type="text"
                    name="program_website_address"
                    value={userData["program_website_address"]}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onKeyDown={(e) => handleData(e)}
                    // placeholder="John Doe"
                  />

                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["program_website_address"]}
                  </span>
                </div>
                <div className="form-group">
                  {/* <Tooltip title="Profile" arrow placement="right"> */}
                  <label>
                    Contact First Name{" "}
                    <span style={{ color: "red", paddingLeft: "3px" }}>*</span>
                  </label>
                  {/* </Tooltip> */}
                  <input
                    type="text"
                    name="contact_first_name"
                    value={userData["contact_first_name"]}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onKeyDown={(e) => handleData(e)}
                    // placeholder="John Doe"
                  />

                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["contact_first_name"]}
                  </span>
                </div>

                <div className="form-group">
                  {/* <Tooltip title="Profile" arrow placement="right"> */}
                  <label>
                    Contact Last Name{" "}
                    <span style={{ color: "red", paddingLeft: "3px" }}>*</span>
                  </label>
                  {/* </Tooltip> */}
                  <input
                    type="text"
                    name="contact_last_name"
                    value={userData["contact_last_name"]}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onKeyDown={(e) => handleData(e)}
                    // placeholder="John Doe"
                  />

                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["contact_last_name"]}
                  </span>
                </div>

                <div className="form-group">
                  {/* <Tooltip title="Profile" arrow placement="right"> */}
                  <label>
                    Contact email
                    <span style={{ color: "red", paddingLeft: "3px" }}>*</span>
                  </label>
                  {/* </Tooltip> */}
                  <input
                    type="text"
                    name="contact_email"
                    value={userData["contact_email"]}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onKeyDown={(e) => handleData(e)}
                    // placeholder="John Doe"
                  />

                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["contact_email"]}
                  </span>
                </div>
                <div className="form-group">
                  {/* <Tooltip title="Profile" arrow placement="right"> */}
                  <label>
                    Contact Phone{" "}
                    <span style={{ color: "red", paddingLeft: "3px" }}>*</span>
                  </label>
                  {/* </Tooltip> */}
                  <input
                    type="number"
                    name="contact_phone"
                    value={userData["contact_phone"]}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onKeyDown={(e) => handleData(e)}
                    // placeholder="John Doe"
                  />

                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["contact_phone"]}
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
                    Permission to use organization and program logos in our
                    marketing
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

                <div className="button-center1">
                  <button className="fill-button" onClick={() => saveUser()}>
                    <span style={{ color: "white" }}> Register</span>
                  </button>
                </div>
                {/* <div className="dont-have-account">
                  <p>
                    Already a member?
                    <NavLink to="/signin">
                      <span>Sign In</span>
                    </NavLink>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
