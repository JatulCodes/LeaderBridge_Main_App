import React, { useEffect, useState } from "react";
import "./TabView.scss";
import { ApiGet, ApiPutNoAuth } from "../../../Helpers/Api/ApiData";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TabView({ userId }) {
  const [otherDetails, setOtherDetails] = useState([]);

  /////////////////////////////////////////////////////  GET USER DETAILS  /////////////////////////////////////////////////////

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    await ApiGet(`user?userId=${userId}`)
      .then((res) => {
        setOtherDetails(res?.data?.payload?.findUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculate_age = (dob) => {
    var today = new Date();

    var birthDate = new Date(dob);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }

    return age_now;
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="tab-design">
        <ToastContainer />
        <ul>
          <li className={`tab-active`}>
            LeaderBridge<sup>TM</sup>Profile
          </li>
        </ul>
        <div className="details-box-align">
          <div className="personal-details">
            <div className="icon-text-alignment">
              <p>Personal informations</p>
            </div>
            <span>
              Your authorization is required for each of the below demographic
              designations in order for them to be displayed on your profile.
            </span>
          </div>

          <div className="grid-section-align">
            {otherDetails[0]?.gender && otherDetails[0]?.gendereShow ? (
              <div className="info-grid">
                <div className="info-grid-items">
                  <h5>Gender</h5>
                  <p>{otherDetails[0]?.gender}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
            {otherDetails[0]?.region && otherDetails[0]?.regionShow ? (
              <div className="info-grid">
                <div className="info-grid-items">
                  <h5>Regions</h5>
                  <p>{otherDetails[0]?.region}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
            {otherDetails[0]?.currentRole &&
            otherDetails[0]?.currentRoleShow ? (
              <div className="info-grid">
                <div className="info-grid-items">
                  <h5>Leadership role</h5>
                  <p>{otherDetails[0]?.currentRole}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
            {otherDetails[0]?.ethnicity?.length > 0 &&
            otherDetails[0]?.ethnicityShow ? (
              <div className="info-grid">
                <div className="info-grid-items">
                  <h5>Ethnicity</h5>
                  {console.log(
                    "Ethnicity",
                    otherDetails[0].ethnicity.join(",")
                  )}
                  <p>{otherDetails[0].ethnicity.join(", ")}</p>
                </div>
              </div>
            ) : (
              <></>
            )}{" "}
            {otherDetails[0]?.industry && otherDetails[0]?.industryShow ? (
              <div className="info-grid">
                <div className="info-grid-items">
                  <h5>Industry</h5>
                  <p>{otherDetails[0]?.industry}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
            {otherDetails[0]?.DOB && otherDetails[0]?.DOBShow ? (
              <div className="info-grid">
                <div className="info-grid-items">
                  <h5>Age</h5>
                  <p>{calculate_age(otherDetails[0]?.DOB)}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
            {otherDetails[0]?.countryOfOrigin?.length > 0 &&
            otherDetails[0]?.countryOfOriginShow ? (
              <div className="info-grid">
                <div className="info-grid-items">
                  <h5>Country of Origin</h5>
                  <p>{otherDetails[0]?.countryOfOrigin}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
            {otherDetails[0]?.countryOfResidence &&
            otherDetails[0]?.countryOfResidenceShow ? (
              <div className="info-grid">
                <div className="info-grid-items">
                  <h5>Country of Residence</h5>
                  <p>{otherDetails[0]?.countryOfResidence}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
            {otherDetails[0]?.employeeNumber &&
            otherDetails[0]?.employeeNumberShow ? (
              <div className="info-grid">
                <div className="info-grid-items">
                  <h5>Employee Number</h5>
                  <p>{otherDetails[0]?.employeeNumber}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
            {otherDetails[0]?.politicalAffiliation &&
            otherDetails[0]?.politicalAffiliationShow ? (
              <div className="info-grid">
                <div className="info-grid-items">
                  <h5>Political Affiliation</h5>
                  <p>{otherDetails[0]?.politicalAffiliation}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
            {otherDetails[0]?.religiousAffiliation &&
            otherDetails[0]?.religiousAffiliationShow ? (
              <div className="info-grid">
                <div className="info-grid-items">
                  <h5>Religious Affiliation</h5>
                  <p>{otherDetails[0]?.religiousAffiliation}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
            {otherDetails[0]?.sexualOrientation &&
            otherDetails[0]?.sexualOrientationShow ? (
              <div className="info-grid">
                <div className="info-grid-items">
                  <h5>Sexiual Orientation</h5>
                  <p>{otherDetails[0]?.sexualOrientation}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
