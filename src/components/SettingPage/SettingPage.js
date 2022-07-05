import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ApiDelete, ApiGet, ApiPost, ApiPut } from "../../Helpers/Api/ApiData";
import "./SettingPage.scss";
import BlockUserImage from "../../Assets/Images/block-user.png";
import UserProfile from "../../Assets/Images/user-profile.png";
import { useHistory } from "react-router";
import useSetting from "./useSetting";
export default function SettingPage() {
  const history = useHistory();
  const [path, setPath] = useState(0);
  const [userData, setUserData] = useState({});
  const [displayNotificationSound, setDisplayNotificationSound] = useState(false);
  const [displayMessageSound, setDisplayMessageSound] = useState(false);
  const [inputValue, setinputValue] = useState({});
  const [inputValuePassword, setInputValuePassword] = useState({});
  const [errors, setErrors] = useState({});
  const [deactiveAccountValue, setDeactiveAccountValue] = useState("I don't find LeaderBridgeTM useful.");
  const [blockUserModal, setBlockUserModal] = useState(false);
  const [deactiveUserModal, setDeactiveUserModal] = useState(false);
  const [unblockUserId, setUnblockUserId] = useState("");
  const { TotalBlockUser, UnblockUser } = useSetting(setBlockUserModal);
  useEffect(() => {
    document.title = "Settings | LeaderBridge";
  }, []);

  const handleOnChnage = (e) => {
    const { name, value } = e.target;
    setinputValue({ ...inputValue, [name]: value });
    // setErrors({});
  };

  let currentUser = JSON.parse(localStorage.getItem("userData"));

  const handleOnChnagePassword = (e) => {
    const { name, value } = e.target;
    setInputValuePassword({ ...inputValuePassword, [name]: value });
    // setErrors({});
    setErrors({ ...errors, [name]: "" });
  };

  const formValidator = () => {
    let isValid = true;

    if (!inputValuePassword.oldPassword) {
      setErrors((cv) => {
        return { ...cv, oldPassword: "* Please enter password" };
      });
    }

    if (!inputValuePassword.newPassword) {
      setErrors((cv) => {
        return { ...cv, newPassword: "* Please enter new Password" };
      });
      isValid = false;
    } else if (!inputValuePassword.newPassword.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)) {
      isValid = false;
      setErrors((cv) => {
        return {
          ...cv,
          newPassword: "Your password must have at least one capital letter,one small letter, one numeric character, one special character, and should be at least 8 characters long.",
        };
      });
    }

    if (!inputValuePassword.retypePassword) {
      setErrors((cv) => {
        return { ...cv, retypePassword: "* Please enter retype Password" };
      });
      isValid = false;
    } else if (inputValuePassword.newPassword !== inputValuePassword.retypePassword) {
      setErrors((cv) => {
        return { ...cv, retypePassword: "* Password doesn't match" };
      });
      isValid = false;
    }

    return isValid;
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    ApiGet(`user?userId=${currentUser._id}`)
      .then((res) => {
        if (res?.data?.payload && res?.status === 200) {
          setUserData(res?.data?.payload?.findUser[0]);
          setDisplayNotificationSound(res?.data?.payload?.findUser[0]?.notificationSound);
          setDisplayMessageSound(res?.data?.payload?.findUser[0]?.messageSound);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  const deactiveUser = async () => {
    if (inputValue.password) {
      await ApiPost(`user/de-activate`, {
        password: inputValue.password,
        message: deactiveAccountValue,
        text: inputValue.description,
        status: false,
      })
        .then((res) => {
          setDeactiveAccountValue("I don't find LeaderBridgeTM useful.");
          setinputValue({});
          setDeactiveUserModal(false);
          toast.success("user deactive");
          localStorage.clear();
          history.push("/signin");
        })
        .catch((err) => {
          setDeactiveUserModal(false);
          toast.error(err);
        });
    } else {
      setDeactiveUserModal(false);
      toast.error("Please enter password");
    }
  };

  const changePassword = async () => {
    if (!formValidator()) {
      return;
    }
    await ApiPost(`user/reset`, {
      email: userData.email,
      password: inputValuePassword.oldPassword,
      newPassword: inputValuePassword.newPassword,
    })
      .then((res) => {
        if (res?.data?.payload && res?.status === 200) {
          setInputValuePassword({});
          setErrors({});
          toast.success(res?.data?.message);
        } else {
          setErrors({});
          toast.error(res?.message);
        }
      })
      .catch((err) => {
        setDeactiveUserModal(false);
        setErrors({});
        toast.error(err);
      });
  };

  const unblockUser = () => {
    UnblockUser(unblockUserId);
  };

  const updateNotoficationSound = (sound) => {
    let dataToUpdate = {
      notificationSound: sound,
    };
    ApiPut(`user/`, dataToUpdate)
      .then((res) => {
        if (res?.data?.payload && res?.status === 200) {
          toast.success("setting updated");
          localStorage.setItem("userData", JSON.stringify(res?.data?.payload?.updateUser));
          getUserData();
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  const updateMessageSound = (sound) => {
    let dataToUpdate = {
      messageSound: sound,
    };
    ApiPut(`user/`, dataToUpdate)
      .then((res) => {
        if (res?.data?.payload && res?.status === 200) {
          toast.success("setting updated");
          localStorage.setItem("userData", JSON.stringify(res?.data?.payload?.updateUser));
          getUserData();
        }
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err.message);
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="container-fluid">
        <div className="children-page-align">
          <div className="setting-page-grid">
            <div className="setting-page-grid-items">
              <div className="setting-sidebar">
                <h3>Settings</h3>
                <div className="setting-sidebar-alignment">
                  <button className={path === 0 ? "active-button" : null} onClick={() => setPath(0)}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <span>Manage Notifications</span>
                  </button>
                  <button className={path === 1 ? "active-button" : null} onClick={() => setPath(1)}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                    </svg>
                    <span>Manage Blocked Users</span>
                  </button>
                  <button className={path === 2 ? "active-button" : null} onClick={() => setPath(2)}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    <span>Deactivate Account</span>
                  </button>
                  <button className={path === 3 ? "active-button" : null} onClick={() => setPath(3)}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>Change Password</span>
                  </button>
                </div>
              </div>
            </div>
            {path === 0 ? (
              <div className="setting-page-grid-items">
                <div className="setting-details-page-alignment">
                  <h2>Manage Notifications</h2>
                  <div className="switch-text-alignment">
                    <div>
                      <label className="f-switch">
                        {/* <input type="checkbox" className="is-switch" id="view_profile" /> */}
                        <input
                          type="checkbox"
                          className="is-switch "
                          id="view_profile"
                          checked={displayNotificationSound}
                          // value={userData?.notificationSound}
                          onChange={(e) => {
                            setDisplayNotificationSound(e.target.checked);
                            updateNotoficationSound(e.target.checked);
                          }}
                        />
                        <i></i>
                      </label>
                    </div>
                    <div className="text-style">
                      <p>Notification Sound</p>
                      <span>Receive a notification when someone you are following posts a new question</span>
                    </div>
                  </div>
                  <div className="switch-text-alignment">
                    <div>
                      <label className="f-switch">
                        {/* <input type="checkbox" className="is-switch " id="view_profile" /> */}
                        <input
                          type="checkbox"
                          className="is-switch "
                          id="view_profile"
                          checked={displayMessageSound}
                          // value={true}
                          onChange={(e) => {
                            setDisplayMessageSound(e.target.checked);
                            updateMessageSound(e.target.checked);
                          }}
                        />
                        <i></i>
                      </label>
                    </div>
                    <div className="text-style">
                      <p>Chat Message Sound</p>
                      <span>Receive a notification when someone starts following you</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {path === 1 ? (
              <div className="setting-page-grid-items">
                <div className="setting-details-page-alignment">
                  <h2>Manage Blocked Users</h2>

                  {}

                  {TotalBlockUser?.length > 0 ? (
                    <div className="block-user-grid">
                      {TotalBlockUser?.map((user) => (
                        <div className="block-user-grid-items">
                          <div className="profile-grid">
                            <div className="profile-grid-items">
                              <img src={UserProfile} alt="UserProfile" />
                            </div>
                            <div className="profile-grid-items">
                              {/* <p>{user?.subject?.join(", ")}</p> */}
                              <p style={{ margin: "10px" }}>{user?.currentRole}</p>
                              {/* <p>{user?.name}</p> */}
                              {/* <span>{user?.currentRole}</span> */}
                            </div>
                          </div>
                          <div
                            className="unblock-button"
                            onClick={() => {
                              setBlockUserModal(!blockUserModal);
                              setUnblockUserId(user?._id);
                            }}
                          >
                            <button>Unblock</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <div className="image-center-setting">
                        <img src={BlockUserImage} alt="BlockUserImage" />
                      </div>
                      <div className="no-user-style">
                        <p>You don't have any blocked connections</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            {path === 2 ? (
              <div className="setting-page-grid-items">
                <div className="setting-details-page-alignment">
                  <h2>Deactivate Account</h2>
                  <div className="setting-profile-grid">
                    <div className="setting-profile-grid-items">
                      <img src={userData?.profileImage} alt="UserProfile" />
                    </div>
                    <div className="setting-profile-grid-items">
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="deactive-form deactive-form-top-align">
                    <label>Password</label>
                    {/* <input type="text" placeholder="******" /> */}
                    <input type="password" id="password" onChange={(e) => handleOnChnage(e)} value={inputValue && inputValue.password} name="password" placeholder="******" />
                  </div>
                  <div className="reason-text-style">
                    <p>Select reason for deactivating account</p>
                    <div className="radio-button-text">
                      <input
                        type="radio"
                        id="huey"
                        name="drone"
                        checked={deactiveAccountValue === "I don't find LeaderBridgeTM useful."}
                        value="I don't find LeaderBridgeTM useful."
                        onChange={(e) => {
                          setDeactiveAccountValue(e.target.value);
                        }}
                      />
                      <span>
                        I don't find LeaderBridge<sup>TM</sup> useful.
                      </span>
                    </div>
                    <div className="radio-button-text">
                      <input
                        type="radio"
                        id="huey"
                        name="drone"
                        checked={deactiveAccountValue === "I have a privacy concern."}
                        value="I have a privacy concern."
                        onChange={(e) => {
                          setDeactiveAccountValue(e.target.value);
                        }}
                      />
                      <span>I have a privacy concern.</span>
                    </div>
                    <div className="sorry-text-style">
                      <p>We’re sorry to see you go! Before you go, please let us know what happened, so we can improve the experience for future users</p>
                    </div>
                    <div className="deactive-form">
                      <textarea id="description" onChange={(e) => handleOnChnage(e)} value={inputValue && inputValue.description} name="description" placeholder="Add description.."></textarea>
                      {/* <textarea id="w3review" name="w3review" placeholder="Add description.."></textarea> */}
                    </div>
                    <div className="deactive-button deactive-button-end">
                      <button onClick={() => setDeactiveUserModal(!deactiveUserModal)}> Deactivate </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {path === 3 ? (
              <div className="setting-page-grid-items">
                <div className="setting-details-page-alignment">
                  <h2>Change Password</h2>
                  <div className="deactive-form deactive-form-top-align">
                    <label>Old password</label>
                    {/* <input type="text" placeholder="******" /> */}
                    <input type="password" id="oldPassword" onChange={(e) => handleOnChnagePassword(e)} value={inputValuePassword.oldPassword || ""} name="oldPassword" placeholder="******" />
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errors["oldPassword"]}
                    </span>
                  </div>
                  <div className="change-password-grid">
                    <div className="change-password-grid-items">
                      <div className="deactive-form">
                        <label>New password</label>
                        {/* <input type="text" placeholder="******" /> */}
                        <input type="password" id="newPassword" onChange={(e) => handleOnChnagePassword(e)} value={inputValuePassword.newPassword || ""} name="newPassword" placeholder="******" />
                        <span
                          style={{
                            color: "red",
                            top: "5px",
                            fontSize: "12px",
                          }}
                        >
                          {errors["newPassword"]}
                        </span>
                      </div>
                    </div>
                    <div className="change-password-grid-items">
                      <div className="deactive-form">
                        <label>Retype new password</label>
                        {/* <input type="text" placeholder="******" /> */}
                        <input type="password" id="retypePassword" onChange={(e) => handleOnChnagePassword(e)} value={inputValuePassword.retypePassword || ""} name="retypePassword" placeholder="******" />
                        <span
                          style={{
                            color: "red",
                            top: "5px",
                            fontSize: "12px",
                          }}
                        >
                          {errors["retypePassword"]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="deactive-button deactivate-button-center">
                    <button
                      onClick={() => {
                        changePassword();
                      }}
                    >
                      {" "}
                      Save{" "}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {blockUserModal ? (
        <div className="block-user-modal-center-align">
          <div className="block-user-modal-design">
            <div className="modal-header">
              <p>Unblock</p>
              <div className="close-icon-design" onClick={() => setBlockUserModal(!blockUserModal)}>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </div>
            <div className="modal-body">
              <p>Sure you want to unblock this user</p>
            </div>
            <div className="modal-footer">
              <div className="button-alignment">
                <button className="cancel-button-style">Cancel</button>
                <button className="confirm-button-style" onClick={() => unblockUser()}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {deactiveUserModal ? (
        <div className="block-user-modal-center-align">
          <div className="block-user-modal-design">
            <div className="modal-header">
              <p>Deactivate Account</p>
              <div className="close-icon-design" onClick={() => setDeactiveUserModal(!deactiveUserModal)}>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </div>
            {/* <div>
              <p>We deactivate your account. After deactivate account no one will be able to see your questions.</p>
            </div> */}
            <div className="modal-body">
              <p>We deactivate your account. After deactivate account no one will be able to see your questions.</p>
              <p>Sure to deactivate your account.</p>
            </div>
            <div className="modal-footer">
              <div className="button-alignment">
                <button className="cancel-button-style" onClick={() => setDeactiveUserModal(!deactiveUserModal)}>
                  Cancel
                </button>
                <button
                  className="confirm-button-style"
                  onClick={() => {
                    deactiveUser();
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
