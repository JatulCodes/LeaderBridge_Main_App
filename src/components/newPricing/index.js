import React, { useEffect, useState } from "react";
import "./newPricing.scss";
import UpdateHeader from "../Layout/UpdateHeader/UpdateHeader";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import CardInputs from "../Payments/Cardinput";
import { ApiGet, ApiPost, ApiPut } from "../../Helpers/Api/ApiData";
import UserHeader from "../Layout/UserHeader/UserHeader";
import { Router } from "react-router-dom";

export default function NewPricing() {
  const [paymentBox, setPaymentBox] = useState(false);
  const [Getplan, setplan] = useState();
  const stripe = useStripe();
  const elements = useElements();

  const localStorageData = JSON.parse(localStorage.getItem("userPayment"));

  // console.log("localStorageData", JSON.parse(localStorageData));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
    GetPlan();
  }, []);

  const GetPlan = async () => {
    await ApiGet("plan")
      .then((res) => {
        console.log("res@@@@@@@@@", res);
        setplan(res.data.payload.allPlan);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [Boxpayment, setboxpayment] = useState();

  console.log("Boxpayment", Boxpayment);

  const handlePaymentBox = (data) => {
    if (data === "1") {
      setboxpayment(Getplan[1]?._id);
    } else if (data === "0") {
      setboxpayment(Getplan[0]?._id);
    }
    setPaymentBox(!paymentBox);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const res = await ApiPost("payment/pay", {
      pid: Boxpayment,
      email: localStorageData.email,
    });

    console.log("res3333", res);

    // return;

    const clientSecret = res.data.payload.client_secret;
    if (clientSecret) {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: "dev@gmail.com",
            address: {
              city: "SUrat",
              country: "US",
              line1: "null demo",
              line2: "null",
              state: "Gujarat",
            },
            name: "STRIPE NAME",
          },
        },
      });
      if (result.error) {
        toast.error(result?.error?.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const payData = {
            pid: Boxpayment,
            paymentId: clientSecret,
            planCost: "100",
            validity: "6",
          };

          const response = await ApiPost("payment/myPlan/", payData)
            .then((res) => {
              toast.success("Payment successfully completed!");
              setPaymentBox(!paymentBox);
              // history.push("/");
              // router;
            })
            .catch((err) => {
              console.log("err", err);
            });
        } else {
          toast.error("Payment failed");
        }
      }
    }
  };

  return (
    <div>
      <>
        {window.location.pathname === `/new-organization-pricing` ? (
          <div style={{ height: "70px" }}>
            {/* <UserHeader /> */}
            <UpdateHeader />
          </div>
        ) : (
          <UpdateHeader />
        )}
      </>
      <div className="container">
        <div className="new-pricing-banner">
          <div className="content-alignment">
            <h1>Transparent Pricing Plan</h1>
            <p>Choose the plan that best suits your needs</p>
            {window.location.pathname === `/new-organization-pricing` ? (
              <></>
            ) : (
              <a href="/signup">
                <button>Sign Up</button>
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="new-pricing-content-alignment-all">
        <div className="container">
          <div className="page-title-alignment">
            <h1>FREE For Now Insert “and Your 1st Year at ½ Price When You Join During Pre-Launch”</h1>
            <p>Like all new platforms, we need to reach a critical mass of users. Until we reach that level, LeaderBridge is FREE to use – ask as many questions as you like and invite your colleagues to join</p>
            <p>Once we reach that critical mass of users “we will notify you so you can choose your subscription and our pricing will be:</p>
          </div>
          <div className="pricing-enter-type-text">
            <h3>Standard pricing</h3>
          </div>
          <div className="grid">
            <div>
              <div className="new-prizing-grid-area">
                {localStorageData?.isOrganization ? (
                  <>
                    <div className="grid-items">
                      <div className="box-title primary-background-color monthly-button-center">
                        <h2>{Getplan && Getplan[0]?.planName}</h2>
                      </div>
                      <div className="box-body-alignment">
                        <table>
                          <tr>
                            <th align="left"></th>
                            <th align="center">Regular</th>
                            <th align="right">Pre-Launch</th>
                          </tr>
                          <tr>
                            <td align="left">Just You </td>
                            <td align="center">{Getplan && Getplan[0]?.planCost}</td>
                            <td align="right"> $24.99</td>
                          </tr>
                          <tr>
                            <td align="left">
                              Your C-Suite <br /> Up to 5 Users{" "}
                            </td>
                            <td align="center">$129.99</td>
                            <td align="right"> $64.99</td>
                          </tr>
                        </table>
                        <div className="plan-choose-alignment plan-choose-alignment-top-align">
                          {console.log("payment boxxxxxxx", paymentBox)}
                          <button onClick={() => handlePaymentBox("0")}>Choose Plan</button>
                        </div>
                      </div>
                    </div>
                    <div className="grid-items">
                      <div className="box-title">
                        <h2>{Getplan && Getplan[1]?.planName}</h2>
                        <span>(20% discount)</span>
                      </div>
                      <div className="box-body-alignment">
                        <table>
                          <tr>
                            <th align="left"></th>
                            <th align="center">Regular</th>
                            <th align="right">Pre-Launch</th>
                          </tr>
                          <tr>
                            <td align="left">Just You </td>
                            <td align="center">
                              {" "}
                              {Getplan && Getplan[1]?.planCost}
                              <br />
                              ($04.00/mth)
                            </td>
                            <td align="right">
                              {" "}
                              $240.00 <br /> ($20.00/mth)
                            </td>
                          </tr>
                          <tr>
                            <td align="left">
                              Your C-Suite <br /> Up to 5 Users{" "}
                            </td>
                            <td align="center">
                              {" "}
                              $1250.00 <br /> ($104.00/mth)
                            </td>
                            <td align="right">
                              {" "}
                              $627.00 <br /> ($52.25/mth)
                            </td>
                          </tr>
                        </table>
                        <div className="plan-choose-alignment">
                          <button onClick={() => handlePaymentBox("1")}>Choose Plan</button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid-items">
                      <div className="box-title primary-background-color monthly-button-center">
                        <h2>Monthly</h2>
                      </div>
                      <div className="box-body-alignment">
                        <table>
                          <tr>
                            <th align="left"></th>
                            <th align="center">Regular</th>
                            <th align="right">Pre-Launch</th>
                          </tr>
                          <tr>
                            <td align="left">Just You </td>
                            <td align="center">$45</td>
                            <td align="right"> $24.99</td>
                          </tr>
                          <tr>
                            <td align="left">
                              Your C-Suite <br /> Up to 5 Users{" "}
                            </td>
                            <td align="center">$129.99</td>
                            <td align="right"> $64.99</td>
                          </tr>
                        </table>
                        <div className="plan-choose-alignment plan-choose-alignment-top-align">
                          {console.log("payment boxxxxxxx", paymentBox)}
                          <button>Choose Plan</button>
                        </div>
                      </div>
                    </div>
                    <div className="grid-items">
                      <div className="box-title">
                        <h2>Annual</h2>
                        <span>(20% discount)</span>
                      </div>
                      <div className="box-body-alignment">
                        <table>
                          <tr>
                            <th align="left"></th>
                            <th align="center">Regular</th>
                            <th align="right">Pre-Launch</th>
                          </tr>
                          <tr>
                            <td align="left">Just You </td>
                            <td align="center">
                              {" "}
                              $20
                              <br />
                              ($04.00/mth)
                            </td>
                            <td align="right">
                              {" "}
                              $240.00 <br /> ($20.00/mth)
                            </td>
                          </tr>
                          <tr>
                            <td align="left">
                              Your C-Suite <br /> Up to 5 Users{" "}
                            </td>
                            <td align="center">
                              {" "}
                              $1250.00 <br /> ($104.00/mth)
                            </td>
                            <td align="right">
                              {" "}
                              $627.00 <br /> ($52.25/mth)
                            </td>
                          </tr>
                        </table>
                        <div className="plan-choose-alignment">
                          <button>Choose Plan</button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="grid-items">
              <div className="box-title primary-background-color ">
                <h6 style={{ fontWeight: "700", wordBreak: "break-word" }}>
                  Accelerators, Incubators, <br />
                  Co-Working Spaces
                </h6>
              </div>
              <div className="box-body-alignment">
                <div className="group-picing-alignment-text">
                  <h5>Contact Us For Group Pricing</h5>
                </div>
                <div className="plan-choose-alignment new-button-top-alignment">
                  <a href="/new-contact">
                    <button>contact us</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="pricing-enter-type-text">
            <h3>Pricing if enter a valid Organization Code for an organization that has signed up, but is not paying for subscriptions</h3>
          </div>
          <div className="grid">
            <div>
              {!localStorageData?.isOrganization && (
                <>
                  <div className="new-prizing-grid-area">
                    <div className="grid-items">
                      <div className="box-title primary-background-color monthly-button-center">
                        <h2>Monthly</h2>
                      </div>
                      <div className="box-body-alignment">
                        <table>
                          <tr>
                            <th align="left"></th>
                            <th align="center">Regular</th>
                            <th align="right">Pre-Launch</th>
                          </tr>
                          <tr>
                            <td align="left">Just You </td>
                            <td align="center"> $37.50</td>
                            <td align="right"> $18.75</td>
                          </tr>
                          <tr>
                            <td align="left">
                              Your C-Suite <br /> Up to 5 Users{" "}
                            </td>
                            <td align="center">$112.50 </td>
                            <td align="right"> $56.25</td>
                          </tr>
                        </table>
                        <div className="plan-choose-alignment plan-choose-alignment-top-align">
                          <button>Choose Plan</button>
                        </div>
                      </div>
                    </div>
                    <div className="grid-items">
                      <div className="box-title">
                        <h2>Annual</h2>
                        <span>(20% discount)</span>
                      </div>
                      <div className="box-body-alignment">
                        <table>
                          <tr>
                            <th align="left"></th>
                            <th align="center">Regular</th>
                            <th align="right">Pre-Launch</th>
                          </tr>
                          <tr>
                            <td align="left">Just You </td>
                            <td align="center">
                              {" "}
                              $359.00 <br />
                              ($29.99/mth)
                            </td>
                            <td align="right">
                              {" "}
                              $179.50 <br /> ($14.95/mth)
                            </td>
                          </tr>
                          <tr>
                            <td align="left">
                              Your C-Suite <br /> Up to 5 Users{" "}
                            </td>
                            <td align="center">
                              {" "}
                              $1089.00 <br /> ($90.75/mth)
                            </td>
                            <td align="right">
                              {" "}
                              $544.00 <br /> ($45.33/mth)
                            </td>
                          </tr>
                        </table>
                        <div className="plan-choose-alignment">
                          <button>Choose Plan</button>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </>
              )}
            </div>
            <div></div>
          </div>
          {/* <div className="pricing-enter-type-text">
                <h4>Your Subscription is Paid by the Organization You Belong To</h4>
              </div> */}
        </div>
      </div>
      <div className="join-leaderbridge">
        <div className="container-md">
          <div className="content-alignment">
            <div>
              <h1>LeaderBridge - Pennies A Day For Priceless Advice</h1>
            </div>
            <div>
              <a href="/signup">
                <button>Join Now</button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {paymentBox && (
        <>
          <ToastContainer style={{ zIndex: "10000000000" }} />
          <div className="payment-modal-blur">
            <div className="payment-modal-box">
              <div className="payment-modal-header">
                <h2>Payment Details</h2>
                <h2>
                  <i
                    className="fas fa-times"
                    onClick={handlePaymentBox}
                    style={{
                      cursor: "pointer",
                    }}
                  ></i>
                </h2>
              </div>
              <div className="payment-modal-body">
                <div className="payment-feilds">Enter Card Detail</div>
                <div
                  style={{
                    border: "1px solid #D8D8D8",
                    padding: "15px",
                    borderRadius: "5px",
                  }}
                >
                  <CardInputs />
                </div>
                <div className="button-payment">
                  <button className="fill-buttons" onClick={(e) => handlePayment(e)}>
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
