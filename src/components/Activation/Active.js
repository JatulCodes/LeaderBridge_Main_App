import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ApiGet, ApiPut } from "../../Helpers/Api/ApiData";
import "./Active.scss";

export default function Active(props) {
  const history = useHistory();

  const [Submit, setSubmit] = React.useState(false);
  const [status, setStatus] = React.useState(true);
  const [loader, setLoader] = React.useState(false);

  console.log("props.match.params.token", props.match.params.id);
  // const ConfirmPage = () => {
  // ApiGet("/api/account/confirm/" + props.match.params.token)
  // }

  const handelUpdatestatusDetails = async () => {
    setLoader(true);
    // setLoading(true);

    console.log("status@@@@@@@@@", status);
    await ApiPut(
      `user/form-submit/id=${props.match.params.id}&status=${status}`
    )
      .then((res) => {
        GetByIdUser();

        setLoader(false);

        // toast.success(
        //   "Thank you for your interest in the program. We will contact you shortly."
        // );
      })
      .catch((err) => {
        // setLoading(false);
        setLoader(false);
        toast.error(err);

        console.log(err);
      });
  };

  const Changestatus = async (status) => {
    // console.log("status", status);
    setStatus(true);
  };

  const ChangestatusNO = async (status) => {
    // console.log("status@@@@", status.target.value);
    setStatus(false);
  };

  console.log(status, "status####");

  const GetByIdUser = async () => {
    await ApiGet(`user/submited-user?userId=${props.match.params.id}`)
      .then((res) => {
        // console.log("rescccc", res);
        setSubmit(res?.data?.payload?.findUser[0]?.isSubmit);
        console.log(res?.data?.payload?.findUser[0]?.isSubmit, "payloaduser");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GetByIdUser();
    console.log("DDDDDDDD");
  }, []);
  return (
    <>
      <ToastContainer />
      {Submit == "Yes" ? (
        <>
          <div className="thankyou-message-style-alignment">
            <p>
              <span>Thank You for continuing with LeaderBridge.</span>
              <span>We Will keep you up to date on our progress.</span>
            </p>
            {/* <p></p> */}
          </div>
        </>
      ) : Submit == "No" ? (
        <>
          <div className="thankyou-message-style-alignment">
            <p>Thank you for your response.</p>
          </div>
        </>
      ) : Submit == false ? (
        <>
          <div className="active-page-section-alignment">
            <div className="container">
              <div
                className="page-title-alignment"
                style={{ width: "850px", margin: "auto" }}
              >
                <h1>I would keep it very simple with something like this:</h1>
                <div className="checkbox-text-alignment-one-without">
                  <div>
                    <input
                      type="radio"
                      // name="radio_one"
                      checked={status == true ? true : false}
                      // onClick={() => setStatus("Yes")}
                      onChange={(e) => Changestatus(e)}
                    />
                  </div>
                  <div>
                    <p>
                      Yes, I am the founder or part of a startup or early-stage
                      company and I want to remain on LeaderBridge. Please
                      retain my account and notify me when the site goes live
                      again.
                    </p>
                  </div>
                </div>

                <div className="checkbox-text-alignment-one-without">
                  <div>
                    <input
                      type="radio"
                      // name="radio_one"
                      // checked={false}
                      checked={status == false ? true : false}
                      // onClick={() => setStatus("No")}
                      onChange={(e) => ChangestatusNO(e)}
                    />
                  </div>
                  <div>
                    <p>
                      No, I don't want to remain on LeaderBridge. Please close
                      my account.
                    </p>
                  </div>
                </div>
                <div className="two-button-style">
                  {/* <button onClick={() => handelUpdatestatusDetails()}>
                    Submit
                  </button> */}

                  <button
                    // onClick={() => !loader && SendMail()}
                    onClick={() => handelUpdatestatusDetails()}
                    // onClick={(e) => HandleBox(e)}
                  >
                    <span>Submit</span>

                    {/* {loader && (
                      <span className="mx-3 spinner spinner-white"></span>
                    )} */}
                  </button>
                </div>
                {/* <p>
                  Thank You for continuing with LeaderBridge. We will keep you
                  up to date on our progress!
                </p> */}
                {/* <p>Thank you for details submiting Successfully!</p> */}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

// export default Active;
