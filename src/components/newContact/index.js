import React, { useEffect, useState } from "react";
import UpdateHeader from "../Layout/UpdateHeader/UpdateHeader";
import "./newContact.scss";
import GoogleMapReact from "google-map-react";
import { ApiPost } from "../../Helpers/Api/ApiData";
import { toast, ToastContainer } from "react-toastify";

const Marker = () => (
  <div className="marker">
    <img src="https://rejoicetech.com/static/media/home.7b449fa0.svg" alt="" />
  </div>
);

export default function NewContact() {
  const [inputValue, setinputValue] = useState({});
  const [errors, setErrors] = useState({});
  const [checkbox, setCheckBox] = useState(false);
  const [chek, setchek] = useState();
  const key = "AIzaSyBwyQ2fI1UgcPSJJ8HuYLhVQRFHYpB0iRE";
  const mapOptions = (maps) => ({
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_TOP,
    },
  });
  const textarea = document.getElementById("message");
  console.log("inputValue@@@@@", inputValue);

  const checkboxValue = (e) => {
    setCheckBox(e.target.checked);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      // behavior: "smooth",
    });
  }, []);

  const handleOnChnage = (e) => {
    const { name, value } = e.target;
    // if (name == "number") {
    // setinputValue({
    //   ...inputValue,
    //   [name]: value.replace(
    //     /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    //     ""
    //   ),
    // });

    // let val = e.target.value.replace(
    //   /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g,
    //   ""
    // );
    // setinputValue((prevState) => ({
    //   ...prevState,
    //   [name]: val,
    // }));
    // setinputValue({ ...inputValue, [name]: val });
    // setErrors({ ...errors, [name]: "" });
    // } else {
    setinputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
    // }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    if (inputValue && !inputValue.name) {
      formIsValid = false;
      errors["name"] = "*Please Enter Name!";
    }

    // if (inputValue && !inputValue.checkbox) {
    //   formIsValid = false;
    //   errors["checkbox"] = "*Please Enter checkbox!";
    // }

    if (inputValue && !inputValue.company) {
      formIsValid = false;
      errors["company"] = "*Please Enter company!";
    }

    if (inputValue && !inputValue.number) {
      formIsValid = false;
      errors["number"] = "*Please Enter phone number!";
    } else if (inputValue.number && !inputValue.number.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)) {
      formIsValid = false;
      errors["number"] = "*Please Enter vaild number!";
    }
    // if (inputValue && !inputValue.information) {
    //   formIsValid = false;
    //   errors["information"] = "*Please Enter information!";
    // }

    if (inputValue && !inputValue.extension) {
      formIsValid = false;
      errors["extension"] = "*Please Enter extension!";
    }
    if (inputValue && !inputValue.email) {
      formIsValid = false;
      errors["email"] = "*Please Enter Email!";
    } else if (inputValue.email && !inputValue.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      formIsValid = false;
      errors["email"] = "*Please Enter vaild Email!";
    }
    if (inputValue && !inputValue.message) {
      // if (inputValue && !inputValue.subject) {
      //   formIsValid = false;
      //   errors["subject"] = "*Please Select subject!";
      // }

      formIsValid = false;
      errors["message"] = "*Please Enter message!";
    }

    setErrors(errors);
    return formIsValid;
  };
  const form = document.getElementById("my_form");
  const contactUS = (e) => {
    e.preventDefault();

    console.log("checkbox", checkbox);
    if (validateForm()) {
      if (!checkbox) {
        setchek("*Please Enter checkbox!");

        return;
      }
      ApiPost("contact/createcontact", inputValue)
        .then((res) => {
          // debugger;
          // document.getElementById("name").value = "";
          // document.getElementById("company").value = "";
          // document.getElementById("email").value = "";
          // document.getElementById("number").value = "";
          // document.getElementById("extension").value = "";
          textarea.value = "";
          document.getElementById("checkbox").checked = false;
          form.reset();
          setCheckBox(false);
          setErrors({});
          setchek("");
          setinputValue({});
          // setinputValue({});

          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  const MaxLength = (e) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  return (
    <div>
      <ToastContainer />
      <>
        <UpdateHeader />
      </>

      <div className="container">
        <div className="new-contact-banner-design">
          <div className="page-title-alignment">
            <h1>We Want To Hear From You</h1>
            {/* <p>Any questions or remarks? Just write us a message!</p> */}
            {/* <a href="/signup">
              <button>Sign Up</button>
            </a> */}
          </div>
        </div>
      </div>
      <div className="new-contact-section-alignment">
        <div className="container">
          <div className="page-title">
            <h1>Have a Question? Want More Information? Dealing with a Challenge?</h1>
            <p>Give us a little information and we’ll get in touch within one business day.</p>
          </div>
          <div className="grid">
            <div className="grid-items">
              <div className="map" id="map">
                <GoogleMapReact
                  options={mapOptions}
                  bootstrapURLKeys={{
                    key,
                  }}
                  center={{
                    lat: 41.8828972,
                    lng: -87.6370984,
                  }}
                  zoom={15}
                >
                  <Marker lat={41.8828972} lng={-87.6370984} text="My Marker" />
                </GoogleMapReact>
              </div>
            </div>
            <div className="grid-items">
              <form id="my_form">
                <div className="contact-input">
                  <label>
                    Name <span>*</span>
                  </label>
                  <input type="text" name="name" id="name" value={inputValue.name} placeholder="Enter Your Name" autoComplete="off" onChange={(e) => handleOnChnage(e)} />
                  <span style={{ color: "red" }}>{errors["name"]}</span>
                </div>
                <div className="contact-input">
                  <label>
                    Company<span>*</span>
                  </label>
                  <input type="text" id="company" value={inputValue.company} name="company" placeholder="Enter Your Company" autoComplete="off" onChange={(e) => handleOnChnage(e)} />
                  <span style={{ color: "red" }}>{errors["company"]}</span>
                </div>
                <div className="contact-input">
                  <label>
                    Email<span>*</span>
                  </label>
                  <input type="text" placeholder="Enter Your Email" name="email" id="email" value={inputValue.email} autoComplete="off" onChange={(e) => handleOnChnage(e)} />
                  <span style={{ color: "red" }}>{errors["email"]}</span>
                </div>
                <div className="two-input-grid">
                  <div className="two-input-grid-items">
                    <div className="contact-input">
                      <label>Phone</label>
                      <input
                        type="number"
                        name="number"
                        id="number"
                        maxLength={"10"}
                        // maxlength="10"
                        onInput={(e) => MaxLength(e)}
                        onWheel={() => document.activeElement.blur()}
                        value={inputValue.number}
                        placeholder="Enter Your phone "
                        autoComplete="off"
                        onChange={(e) => handleOnChnage(e)}
                      />
                      <span style={{ color: "red" }}>{errors["number"]}</span>
                    </div>
                  </div>
                  <div className="two-input-grid-items">
                    <div className="contact-input">
                      <label>Extension</label>
                      <input type="text" id="extension" placeholder="Enter Your Extension" name="extension" autoComplete="off" value={inputValue.extension} onChange={(e) => handleOnChnage(e)} />
                      <span style={{ color: "red" }}>{errors["extension"]}</span>
                    </div>
                  </div>
                </div>
                <div className="contact-input">
                  <label>
                    Any background information you want to share<span>*</span>
                  </label>
                  <textarea placeholder="Type here...." name="message" id="message" autoComplete="off" value={inputValue.message} onChange={(e) => handleOnChnage(e)}></textarea>
                  <span style={{ color: "red" }}>{errors["message"]}</span>
                </div>
                <div className="checkbox-text-alignment">
                  <div>
                    <input type="checkbox" id="checkbox" name="checkbox" autoComplete="off" value={inputValue.checkbox} onChange={(e) => checkboxValue(e)} />
                  </div>
                  <div>
                    <span>All Information is Confidential</span>
                    {!checkbox && <span style={{ color: "red" }}>{chek}</span>}
                  </div>
                </div>
              </form>

              <div className="contact-button-design" onClick={(e) => contactUS(e)}>
                <button>Contact Us</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-infor-section-alignment">
        <div className="container">
          <div className="grid">
            {/* <div className="grid-items">
              <div className="sub-grid">
                <div className="sub-grid-items">
                  <div className="icon-design">
                    <i class="fa-solid fa-phone"></i>
                  </div>
                </div>
                <div className="sub-grid-items">
                  <h3>Phone: </h3>
                  <span>212-517-7900</span>
                </div>
              </div>
            </div> */}
            <div className="grid-items">
              <div className="sub-grid">
                <div className="sub-grid-items">
                  <div className="icon-design">
                    <i class="fa-solid fa-envelope"></i>
                  </div>
                </div>
                <div className="sub-grid-items">
                  <h3>Email: </h3>
                  <span>support@leaderbridge.com</span>
                </div>
              </div>
            </div>
            <div className="grid-items">
              <div className="sub-grid">
                <div className="sub-grid-items">
                  <div className="icon-design">
                    <i class="fa-solid fa-location-dot"></i>
                  </div>
                </div>
                <div className="sub-grid-items">
                  <h3>Address </h3>
                  <span>John Behr Group, LLC, 225 West Washington Street, Suite 2200, Chicago, IL 60606, United States</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="join-leaderbridge">
        <div className="container-md">
          <div className="content-alignment">
            <div>
              <h1>Join LeaderBridge And Get The Advice You Need</h1>
            </div>
            <div>
              <a href="/signup">
                <button>Join Now</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
