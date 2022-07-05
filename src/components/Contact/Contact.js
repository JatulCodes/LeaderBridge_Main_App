import React, { useEffect, useState } from "react";
import "./Contact.scss";
import { ApiGet, ApiPost } from "../../Helpers/Api/ApiData";
import renderHTML from "react-render-html";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function About() {
  const [inputValue, setinputValue] = useState({});
  const [errors, setErrors] = useState({});
  const [CmdDesc, setCmdDesc] = useState();

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  const handleOnChnage = (e) => {
    const { name, value } = e.target;
    setinputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  let sendletter = document.getElementById("sendLetter");

  function addClass() {
    document.body.classList.add("sent");
  }

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    if (inputValue && !inputValue.name) {
      formIsValid = false;
      errors["name"] = "*Please Enter Name!";
    }
    if (inputValue && !inputValue.email) {
      formIsValid = false;
      errors["email"] = "*Please Enter email!";
    }

    if (inputValue && !inputValue.subject) {
      formIsValid = false;
      errors["subject"] = "*Please Select subject!";
    }

    if (inputValue && !inputValue.message) {
      formIsValid = false;
      errors["message"] = "*Please Enter message!";
    }

    setErrors(errors);
    return formIsValid;
  };

  const contactUS = (e) => {
    e.preventDefault();
    if (validateForm()) {
      ApiPost("contact/createcontact", inputValue)
        .then((res) => {
          document.getElementById("email").value = "";
          document.getElementById("name").value = "";
          document.getElementById("subject").value = "";
          document.getElementById("message").value = "";
          setinputValue({});

          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  useEffect(() => {
    cmsapi();
  }, []);

  const cmsapi = () => {
    ApiGet("cms/get-cms")
      .then((res) => {
        setCmdDesc(res.data.payload.Cms);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer />
      {CmdDesc?.map((data) => {
        return (
          <>
            {data.title == "Contact Us" && data.isActive == true && (
              <section className="children-page-align-contact">
                <div className="container">
                  <div className="contact-box-alignment-screen-center">
                    <div className="contact-fix-box">
                      <div className="contact-title">
                        <h1>Contact Us</h1>
                        <div className="letter">
                          <div className="side">
                            <form onSubmit={(e) => contactUS(e)}>
                              <div className="form-group">
                                <label>Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="name"
                                  value={inputValue.name}
                                  name="name"
                                  placeholder="Jenna Davis"
                                  // required
                                  onChange={(e) => handleOnChnage(e)}
                                />
                                <span style={{ color: "red" }}>
                                  {errors["name"]}
                                </span>
                              </div>
                              <div className="form-group">
                                <label>Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  value={inputValue.email}
                                  name="email"
                                  placeholder="jennadavis@gmail.com"
                                  // required
                                  onChange={(e) => handleOnChnage(e)}
                                />
                                <span style={{ color: "red" }}>
                                  {errors["email"]}
                                </span>
                              </div>
                              <div className="form-group">
                                <label>Subjects</label>
                                <select
                                  id="subject"
                                  name="subject"
                                  className="form-control"
                                  onChange={(e) => handleOnChnage(e)}
                                  // required
                                >
                                  <option value="" disabled selected hidden>
                                    Select Subject
                                  </option>
                                  <option value="technical issue">
                                    Technical Issue
                                  </option>
                                  <option value="support">Support</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                              <span style={{ color: "red" }}>
                                {errors["subject"]}
                              </span>
                              {/* <div className="form-group">
                                <label>Subjects</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="subject"
                                  id="subject"
                                  value={inputValue.subject}
                                  placeholder="Name"
                                  required
                                  onChange={(e) => handleOnChnage(e)}
                                />
                                <span style={{ color: "red" }}>
                                  {errors["subject"]}
                                </span>
                              </div> */}
                              <div className="form-group">
                                <label>Message</label>
                                <textarea
                                  // required
                                  rows="4"
                                  cols="50"
                                  id="message"
                                  name="message"
                                  value={inputValue.message}
                                  className="form-control"
                                  onChange={(e) => handleOnChnage(e)}
                                ></textarea>
                                <span style={{ color: "red" }}>
                                  {errors["message"]}
                                </span>
                              </div>
                              <div className="submit-button-center-contact">
                                <button className="">Submit</button>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div class="envelope front"></div>
                        <div class="envelope back"></div>
                      </div>
                      {/* <p class="result-message centered">Thank you for your message</p> */}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        );
      })}
    </>
  );
}
