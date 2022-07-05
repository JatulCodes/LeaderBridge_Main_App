import React, { useEffect, useState } from "react";
import "./Tab.scss";
import {
  ApiDelete,
  ApiGet,
  ApiPost,
  ApiPut,
  ApiPutNoAuth,
} from "../../../Helpers/Api/ApiData";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Multiselect from "multiselect-react-dropdown";
import { Skeleton, Tooltip } from "@mui/material";
import Loader from "react-loader-spinner";

export default function Tab() {
  const [tab, setTab] = useState("Confidential");
  const [otherDetails, setOtherDetails] = useState([]);
  const [openConfidentialModal, setOpenConfidentialModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [verificationError, setVerificationError] = useState({});
  const [updateConfidential, setUpdateConfidential] = useState({});
  const [updatePersonalData, setUpdatePersonalData] = useState({});
  const [UpdatePersonalOtherData, setUpdatePersonalOtherData] = useState({});
  const [updateSettingList, setUpdateSettingList] = useState({});
  const [isOpenOrganizationName, setIsOpenOrganizationName] = useState(true);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [onSaveLoader, setOnSaveLoader] = useState(false);
  const [RolefilterData, setRolefilterData] = useState([]);
  const [isActiveConfidential, setisActiveConfidential] = useState(false);
  const [isActivePersonalInformations, setisActivePersonalInformations] =
    useState(false);

  const originCountryList = [
    // "Afghanistan",
    // "Albania",
    // "Algeria",
    // "American Samoa",
    // "Andorra",
    // "Angola",
    // "Anguilla",
    // "Antarctica",
    // "Antigua and Barbuda",
    // "Argentina",
    // "Armenia",
    // "Aruba",
    // "Australia",
    // "Austria",
    // "Azerbaijan",
    // "Bahamas (the)",
    // "Bahrain",
    // "Bangladesh",
    // "Barbados",
    // "Belarus",
    // "Belgium",
    // "Belize",
    // "Benin",
    // "Bermuda",
    // "Bhutan",
    // "Bolivia (Plurinational State of)",
    // "Bonaire, Sint Eustatius and Saba",
    // "Bosnia and Herzegovina",
    // "Botswana",
    // "Bouvet Island",
    // "Brazil",
    // "British Indian Ocean Territory (the)",
    // "Brunei Darussalam",
    // "Bulgaria",
    // "Burkina Faso",
    // "Burundi",
    // "Cabo Verde",
    // "Cambodia",
    // "Cameroon",
    // "Canada",
    // "Cayman Islands (the)",
    // "Central African Republic (the)",
    // "Chad",
    // "Chile",
    // "China",
    // "Christmas Island",
    // "Cocos (Keeling) Islands (the)",
    // "Colombia",
    // "Comoros (the)",
    // "Congo (the Democratic Republic of the)",
    // "Congo (the)",
    // "Cook Islands (the)",
    // "Costa Rica",
    // "Croatia",
    // "Cuba",
    // "Curaçao",
    // "Cyprus",
    // "Czechia",
    // "Côte d'Ivoire",
    // "Denmark",
    // "Djibouti",
    // "Dominica",
    // "Dominican Republic (the)",
    // "Ecuador",
    // "Egypt",
    // "El Salvador",
    // "Equatorial Guinea",
    // "Eritrea",
    // "Estonia",
    // "Eswatini",
    // "Ethiopia",
    // "Falkland Islands (the) [Malvinas]",
    // "Faroe Islands (the)",
    // "Fiji",
    // "Finland",
    // "France",
    // "French Guiana",
    // "French Polynesia",
    // "French Southern Territories (the)",
    // "Gabon",
    // "Gambia (the)",
    // "Georgia",
    // "Germany",
    // "Ghana",
    // "Gibraltar",
    // "Greece",
    // "Greenland",
    // "Grenada",
    // "Guadeloupe",
    // "Guam",
    // "Guatemala",
    // "Guernsey",
    // "Guinea",
    // "Guinea-Bissau",
    // "Guyana",
    // "Haiti",
    // "Heard Island and McDonald Islands",
    // "Holy See (the)",
    // "Honduras",
    // "Hong Kong",
    // "Hungary",
    // "Iceland",
    // "India",
    // "Indonesia",
    // "Iran (Islamic Republic of)",
    // "Iraq",
    // "Ireland",
    // "Isle of Man",
    // "Israel",
    // "Italy",
    // "Jamaica",
    // "Japan",
    // "Jersey",
    // "Jordan",
    // "Kazakhstan",
    // "Kenya",
    // "Kiribati",
    // "Korea (the Democratic People's Republic of)",
    // "Korea (the Republic of)",
    // "Kuwait",
    // "Kyrgyzstan",
    // "Lao People's Democratic Republic (the)",
    // "Latvia",
    // "Lebanon",
    // "Lesotho",
    // "Liberia",
    // "Libya",
    // "Liechtenstein",
    // "Lithuania",
    // "Luxembourg",
    // "Macao",
    // "Madagascar",
    // "Malawi",
    // "Malaysia",
    // "Maldives",
    // "Mali",
    // "Malta",
    // "Marshall Islands (the)",
    // "Martinique",
    // "Mauritania",
    // "Mauritius",
    // "Mayotte",
    // "Mexico",
    // "Micronesia (Federated States of)",
    // "Moldova (the Republic of)",
    // "Monaco",
    // "Mongolia",
    // "Montenegro",
    // "Montserrat",
    // "Morocco",
    // "Mozambique",
    // "Myanmar",
    // "Namibia",
    // "Nauru",
    // "Nepal",
    // "Netherlands (the)",
    // "New Caledonia",
    // "New Zealand",
    // "Nicaragua",
    // "Niger (the)",
    // "Nigeria",
    // "Niue",
    // "Norfolk Island",
    // "Northern Mariana Islands (the)",
    // "Norway",
    // "Oman",
    // "Pakistan",
    // "Palau",
    // "Palestine, State of",
    // "Panama",
    // "Papua New Guinea",
    // "Paraguay",
    // "Peru",
    // "Philippines (the)",
    // "Pitcairn",
    // "Poland",
    // "Portugal",
    // "Puerto Rico",
    // "Qatar",
    // "Republic of North Macedonia",
    // "Romania",
    // "Russian Federation (the)",
    // "Rwanda",
    // "Réunion",
    // "Saint Barthélemy",
    // "Saint Helena, Ascension and Tristan da Cunha",
    // "Saint Kitts and Nevis",
    // "Saint Lucia",
    // "Saint Martin (French part)",
    // "Saint Pierre and Miquelon",
    // "Saint Vincent and the Grenadines",
    // "Samoa",
    // "San Marino",
    // "Sao Tome and Principe",
    // "Saudi Arabia",
    // "Senegal",
    // "Serbia",
    // "Seychelles",
    // "Sierra Leone",
    // "Singapore",
    // "Sint Maarten (Dutch part)",
    // "Slovakia",
    // "Slovenia",
    // "Solomon Islands",
    // "Somalia",
    // "South Africa",
    // "South Georgia and the South Sandwich Islands",
    // "South Sudan",
    // "Spain",
    // "Sri Lanka",
    // "Sudan (the)",
    // "Suriname",
    // "Svalbard and Jan Mayen",
    // "Sweden",
    // "Switzerland",
    // "Syrian Arab Republic",
    // "Taiwan",
    // "Tajikistan",
    // "Tanzania, United Republic of",
    // "Thailand",
    // "Timor-Leste",
    // "Togo",
    // "Tokelau",
    // "Tonga",
    // "Trinidad and Tobago",
    // "Tunisia",
    // "Turkey",
    // "Turkmenistan",
    // "Turks and Caicos Islands (the)",
    // "Tuvalu",
    // "Uganda",
    // "Ukraine",
    // "United Arab Emirates (the)",
    // "United Kingdom of Great Britain and Northern Ireland (the)",
    // "United States Minor Outlying Islands (the)",
    // "United States of America (the)",
    // "Uruguay",
    // "Uzbekistan",
    // "Vanuatu",
    // "Venezuela (Bolivarian Republic of)",
    // "Viet Nam",
    // "Virgin Islands (British)",
    // "Virgin Islands (U.S.)",
    // "Wallis and Futuna",
    // "Western Sahara",
    // "Yemen",
    // "Zambia",
    // "Zimbabwe",
    // "Åland Islands",
  ];

  const genderList = [
    // "Agender",
    // "Bigender",
    // "Female",
    // "Gender Fluid",
    // "Genderqueer",
    // "Male",
    // "Non-binary",
    // "Transgender female",
    // "Transgender male",
  ];

  const industryList = [
    // "Administrative & Support Services",
    // "Advertising Marketing & Public Relations",
    // "Aerospace & Defense",
    // "Agriculture",
    // "Arts & Culture",
    // "Consulting",
    // "Educational Institutions",
    // "Energy & Natural Resources",
    // "Engineering, Construction & Infrastructure",
    // "Financial Services",
    // "Food & Beverage",
    // "Government",
    // "Healthcare",
    // "Hospitality",
    // "Human Resources",
    // "Law",
    // "Manufacturing",
    // "Media",
    // "Pharmaceuticals",
    // "Professional services",
    // "Real estate",
    // "Retail & Consumer Goods",
    // "Sports",
    // "Technology",
    // "Telecommunications",
    // "Transportation",
    // "Travel",
  ];

  const regionList = [
    // "Africa",
    // "Asia",
    // "Australia & Oceania",
    // "Central & South America",
    // "Central Asia",
    // "East & Southeast Asia",
    // "Europe",
    // "Middle East",
    // "North America",
    // "South Asia",
  ];

  const noOfEmployeesList = [
    // "1-4",
    // "5-9",
    // "10-19",
    // "20-49",
    // "50-99",
    // "100-249",
    // "250-499",
    // "500-999",
    // "1000+",
  ];

  const ehnicityList = [
    // "Spanish",
    // "Sudanese",
    // "Sukuma",
    // "Tajik",
    // "Thai",
    // "Tigrayan",
    // "Uyghur",
    // "Uzbek",
    // "Visayan",
    // "Welsh",
    // "Yoruba",
    // "Zhuang",
    // "Zomi",
  ];
  const politicalAffiliationList = [
    // "Aam Aadmi Party",
    // "Bharatiya Janata Party",
    // "Brazilian Democratic Movement",
    // "Cambodian People's Party",
    // "Chama Cha Mapinduzi",
    // "Communist Party of China",
    // "Communist Party of Vietnam",
    // "Democratic Party",
    // "Indian National Congress",
    // "Indian People's Party",
    // "Justice and Development Party",
    // "Justicialist Party",
    // "Pakistan Tehreek-e-Insaf",
    // "Radical Civic Union",
    // "Republican Party",
    // "United Malays National Organisation",
    // "United Russia",
    // "United Socialist Party of Venezuela",
    // "Worker's Party",
    // "Worker's Party of Korea",
  ];

  const religiousAffiliationList = [
    // "African traditional religions",
    // "Baháʼí",
    // "Buddhism",
    // "Cao Dai",
    // "Chinese traditional religion[c]",
    // "Christianity",
    // "Hinduism",
    // "Islam",
    // "Jainism",
    // "Judaism",
    // "Neo-Paganism",
    // "Secular[a]/Nonreligious[b]/Agnostic/Atheist",
    // "Shinto",
    // "Sikhism",
    // "Spiritism",
    // "Tenrikyo",
    // "Unitarian Universalism",
    // "Zoroastrianism",
  ];

  const levelOfEducationList = [
    // "Associate", "Bachelor", "Doctoral", "Master"
  ];

  const sexualOrientationList = [
    // "Homosexual",
    // "Heterosexual",
    // "Bisexual",
    // "Asexual",
    // "Pansexual",
    // "Polysexual",
    // "Androsexual",
    // "Gynesexual",
  ];

  RolefilterData.filter((data) => data.name === "Country Of Origin").map(
    (item) => {
      item.options
        .filter((stats) => stats.status === true)
        .map((filter) => originCountryList.push(filter.optionName));
    }
  );
  RolefilterData.filter((data) => data.name === "Gender").map((item) => {
    item.options
      .filter((stats) => stats.status === true)
      .map((filter) => genderList.push(filter.optionName));
  });
  RolefilterData.filter((data) => data.name === "Region").map((item) => {
    item.options
      .filter((stats) => stats.status === true)
      .map((filter) => regionList.push(filter.optionName));
  });
  RolefilterData.filter((data) => data.name === "Industry").map((item) => {
    item.options
      .filter((stats) => stats.status === true)
      .map((filter) => industryList.push(filter.optionName));
  });
  RolefilterData.filter((data) => data.name === "Ethnicity").map((item) => {
    item.options
      .filter((stats) => stats.status === true)
      .map((filter) => ehnicityList.push(filter.optionName));
  });
  RolefilterData.filter((data) => data.name === "Political Affiliation").map(
    (item) => {
      item.options
        .filter((stats) => stats.status === true)
        .map((filter) => politicalAffiliationList.push(filter.optionName));
    }
  );
  RolefilterData.filter((data) => data.name === "Religious Affilation").map(
    (item) => {
      item.options
        .filter((stats) => stats.status === true)
        .map((filter) => religiousAffiliationList.push(filter.optionName));
    }
  );
  RolefilterData.filter(
    (data) => data.name === "Education Level of Recipient"
  ).map((item) => {
    item.options
      .filter((stats) => stats.status === true)
      .map((filter) => levelOfEducationList.push(filter.optionName));
  });
  RolefilterData.filter((data) => data.name === "Sexual Orientation").map(
    (item) => {
      item.options
        .filter((stats) => stats.status === true)
        .map((filter) => sexualOrientationList.push(filter.optionName));
    }
  );
  RolefilterData.filter((data) => data.name === "Organization Size").map(
    (item) => {
      item.options
        .filter((stats) => stats.status === true)
        .map((filter) => noOfEmployeesList.push(filter.optionName));
    }
  );
  RolefilterData.filter(
    (data) => data.name === "Education Level of Recipient"
  ).map((item) => {
    item.options
      .filter((stats) => stats.status === true)
      .map((filter) => levelOfEducationList.push(filter.optionName));
  });

  const CountryOfOrigin = RolefilterData?.filter((item) => {
    // return (
    //   <>
    //     {item.name == "Country Of Origin" && (
    //       <>
    //         {item.options.filter((item) => {
    //           return item.options;
    //         })}
    //       </>
    //     )}
    //   </>
    // );

    return item.name == "Country Of Origin";
  });

  console.log("CountryOfOrigin", CountryOfOrigin);
  /////////////////////////////////////////////////////  GET USER DETAILS  /////////////////////////////////////////////////////

  useEffect(() => {
    getUserDetails();
  }, []);

  const getRoleList = () => {
    ApiGet("filter/get-filter")
      .then((res) => {
        setRolefilterData(res?.data?.payload.filter);
        console.log("ROLE", res?.data?.payload);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getRoleList();
  }, []);

  const Data = levelOfEducationList.sort(function (a, b) {
    var textA = a.toUpperCase();
    var textB = b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  const validateConfidentialForm = () => {
    let formIsValid = true;
    if (!updateConfidential.organizationName.trim()) {
      setVerificationError({
        ...verificationError,
        organizationName: "*Please Enter Organization Name!",
      });
      setOnSaveLoader(false);
      formIsValid = false;
    }
    if (!updateConfidential.organizationEmail.trim()) {
      setVerificationError({
        ...verificationError,
        organizationEmail: "*Please Enter Organization Email!",
      });
      setOnSaveLoader(false);
      formIsValid = false;
    } else if (
      updateConfidential.organizationEmail.trim() &&
      !updateConfidential.organizationEmail.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setVerificationError({
        ...verificationError,
        organizationEmail: "*Please Enter valid Organization Email!",
      });
      setOnSaveLoader(false);
      formIsValid = false;
    }
    if (!updateConfidential.linkedinProfile.trim()) {
      setVerificationError({
        ...verificationError,
        linkedinProfile: "*Please Enter linkedin Profile!",
      });
      formIsValid = false;
    } else if (
      !updateConfidential.linkedinProfile.match(
        /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/gm
      )
    ) {
      setVerificationError({
        ...verificationError,
        linkedinProfile: "*Please Enter valid linkedin Profile!",
      });
      formIsValid = false;
    }
    if (!updateConfidential.organizationWebsite?.trim()) {
      setVerificationError({
        ...verificationError,
        organizationWebsite: "*Please Enter Organization Website!",
      });
      formIsValid = false;
    } else if (
      !updateConfidential.organizationWebsite.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      )
    ) {
      setVerificationError({
        ...verificationError,
        organizationWebsite: "*Please Enter valid Organization Website!",
      });
      formIsValid = false;
    }

    return formIsValid;
  };

  useEffect(() => {
    console.log(updateConfidential);
  }, [updateConfidential]);

  const onSaveConfidential = (e) => {
    setOnSaveLoader(true);
    e.preventDefault();
    if (validateConfidentialForm()) {
      const newData = {
        organizationName: updateConfidential.organizationName,
        organizationEmail: updateConfidential.organizationEmail,
        linkedinProfile: updateConfidential.linkedinProfile,
        organizationWebsite: updateConfidential.organizationWebsite,
        otherLink: updateConfidential.otherLink,
      };
      ApiPut("user/", newData)
        .then(async (res) => {
          if (res.data.result == 0) {
            await getUserDetails();
            toast.success("Confidential details Updated!", {
              theme: "colored",
            });
            setOnSaveLoader(false);
            setOpenConfidentialModal(!openConfidentialModal);
          } else {
            toast.error(res?.data?.message, { theme: "colored" });
          }
        })
        .catch((err) => {
          toast.error(err.message, { theme: "colored" });
          setOnSaveLoader(false);
        });
    } else {
      return;
    }
  };

  const onChangeDisplaySetting = (setting, val) => {
    ApiPut("user/", setting)
      .then(async (res) => {
        if (res.data.result == 0) {
          await getUserDetails();
          if (val === true) {
            toast.success("Visible to Others !", {
              theme: "colored",
            });
          } else {
            toast.success("Restrict from Others !", {
              theme: "colored",
            });
          }
        } else {
          toast.error(res?.data?.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        toast.error(err?.message, { theme: "colored" });
      });
  };

  const onSavePersonalDetails = (e) => {
    setOnSaveLoader(true);
    e.preventDefault();

    // setUpdatePersonalOtherData({
    //   countryOfResidence: "",
    //   region: "",
    //   industry: "",
    //   politicalAffiliation: "",
    //   religiousAffiliation: "",
    //   sexualOrientation: "",
    // });

    let newObject = updatePersonalData;

    if (updatePersonalData.countryOfResidence === "Other") {
      newObject = {
        ...newObject,
        countryOfResidence: UpdatePersonalOtherData.countryOfResidence,
      };
    }
    if (updatePersonalData.region === "Other") {
      newObject = {
        ...newObject,
        region: UpdatePersonalOtherData.region,
      };
    }
    if (updatePersonalData.industry === "Other") {
      newObject = {
        ...newObject,
        industry: UpdatePersonalOtherData.industry,
      };
    }
    if (updatePersonalData.politicalAffiliation === "Other") {
      newObject = {
        ...newObject,
        politicalAffiliation: UpdatePersonalOtherData.politicalAffiliation,
      };
    }
    if (updatePersonalData.religiousAffiliation === "Other") {
      newObject = {
        ...newObject,
        religiousAffiliation: UpdatePersonalOtherData.religiousAffiliation,
      };
    }
    if (updatePersonalData.levelOfEducation === "Other") {
      newObject = {
        ...newObject,
        levelOfEducation: UpdatePersonalOtherData.levelOfEducation,
      };
    }
    if (updatePersonalData.sexualOrientation === "Other") {
      newObject = {
        ...newObject,
        sexualOrientation: UpdatePersonalOtherData.sexualOrientation,
      };
    }

    ApiPut("user/", newObject)
      .then(async (res) => {
        if (res.data.result == 0) {
          await getUserDetails();
          toast.success("Profile Updated!", {
            theme: "colored",
          });
          setOnSaveLoader(false);
          setOpenProfileModal(!openProfileModal);
        } else {
          setOnSaveLoader(false);
          toast.error(res?.data?.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        setOnSaveLoader(false);
        toast.error(err?.message, { theme: "colored" });
      });
  };
  const UserData = JSON.parse(localStorage.getItem("userData"));
  const getUserDetails = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`user?userId=${UserData?._id}`)
      .then((res) => {
        setOtherDetails(res?.data?.payload?.findUser);
        setUpdateSettingList({
          regionShow: res?.data?.payload?.findUser[0]?.regionShow,
          currentRoleShow: res?.data?.payload?.findUser[0]?.currentRoleShow,
          DOBShow: res?.data?.payload?.findUser[0]?.DOBShow,
          countryOfOriginShow:
            res?.data?.payload?.findUser[0]?.countryOfOriginShow,
          gendereShow: res?.data?.payload?.findUser[0]?.gendereShow,
          countryOfResidenceShow:
            res?.data?.payload?.findUser[0]?.countryOfResidenceShow,
          industryShow: res?.data?.payload?.findUser[0]?.industryShow,
          employeeNumberShow:
            res?.data?.payload?.findUser[0]?.employeeNumberShow,
          ethnicityShow: res?.data?.payload?.findUser[0]?.ethnicityShow,
          politicalAffiliationShow:
            res?.data?.payload?.findUser[0]?.politicalAffiliationShow,
          religiousAffiliationShow:
            res?.data?.payload?.findUser[0]?.religiousAffiliationShow,
          levelOfEducationShow:
            res?.data?.payload?.findUser[0]?.levelOfEducationShow,
          sexualOrientationShow:
            res?.data?.payload?.findUser[0]?.sexualOrientationShow,
        });
        setIsLoaderVisible(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleConfidentialChange = (e) => {
    setisActiveConfidential(false);
    setUpdateConfidential({
      ...updateConfidential,
      [e.target.name]: e.target.value,
    });
    if (e.target.value?.trim() != "") {
      setVerificationError({
        ...verificationError,
        [e.target.name]: "",
      });
    }
  };

  const handlePersonalDetailChange = (e) => {
    setUpdatePersonalData({
      ...updatePersonalData,
      [e.target.name]: e.target.value,
    });
    if (e.target.value?.trim() != "") {
      setVerificationError({
        ...verificationError,
        [e.target.name]: "",
      });
    }
  };

  const calculate_age = () => {
    var today = new Date();
    if (updatePersonalData?.DOB) {
      var birthDate = new Date(updatePersonalData?.DOB);
      var age_now = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age_now--;
      }
      return age_now;
    } else {
      return 0;
    }
  };

  const calculate_age_all = () => {
    var today = new Date();

    var birthDate = new Date(otherDetails[0]?.DOB);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }

    return age_now;
  };

  const verifyWOrkEmail = (email) => {
    ApiPut("user/work-email", {
      organizationEmail: email,
    })
      .then((res) => {
        toast?.success(res?.data?.message);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="tab-design">
        <ToastContainer />
        <ul style={{ zIndex: 10 }}>
          <div
            onClick={() => {
              setTab("Confidential");
              console.log("Confidential111111");
            }}
          >
            <li
              className={tab == "Confidential" && `tab-active`}
              style={{ cursor: "pointer" }}
            >
              Confidential
            </li>
          </div>
          <li
            className={tab == "LeaderBridge" && `tab-active`}
            onClick={() => {
              setTab("LeaderBridge");
              console.log("LeaderBridge");
            }}
          >
            LeaderBridge<sup>TM</sup>Profile
          </li>
        </ul>
        {tab == "LeaderBridge" && (
          <>
            <div className="details-box-align">
              <div className="personal-details">
                <div className="icon-text-alignment">
                  <p>Personal informations</p>
                  {/* <p >asas</p> */}
                  {!isLoaderVisible ? (
                    <div
                      className="edit-icon-cetner-align"
                      onClick={() => {
                        setisActivePersonalInformations(false);
                        setUpdatePersonalData({
                          DOB: otherDetails[0]?.DOB,
                          countryOfOrigin: otherDetails[0]?.countryOfOrigin,
                          gender: otherDetails[0]?.gender,
                          countryOfResidence:
                            originCountryList.find(
                              (country) =>
                                country === otherDetails[0]?.countryOfResidence
                            ) || otherDetails[0]?.countryOfResidence == ""
                              ? otherDetails[0]?.countryOfResidence
                              : "Other",
                          region:
                            regionList.find(
                              (country) => country === otherDetails[0]?.region
                            ) || otherDetails[0]?.region == ""
                              ? otherDetails[0]?.region
                              : "Other",
                          politicalAffiliation:
                            politicalAffiliationList.find(
                              (country) =>
                                country ===
                                otherDetails[0]?.politicalAffiliation
                            ) || otherDetails[0]?.politicalAffiliation == ""
                              ? otherDetails[0]?.politicalAffiliation
                              : "Other",
                          industry:
                            industryList.find(
                              (country) => country === otherDetails[0]?.industry
                            ) || otherDetails[0]?.industry == ""
                              ? otherDetails[0]?.industry
                              : "Other",
                          currentRole: otherDetails[0]?.currentRole,
                          employeeNumber: otherDetails[0]?.employeeNumber,
                          ethnicity: otherDetails[0]?.ethnicity,
                          religiousAffiliation:
                            religiousAffiliationList.find(
                              (country) =>
                                country ===
                                otherDetails[0]?.religiousAffiliation
                            ) || otherDetails[0]?.religiousAffiliation == ""
                              ? otherDetails[0]?.religiousAffiliation
                              : "Other",
                          levelOfEducation:
                            levelOfEducationList.find(
                              (country) =>
                                country === otherDetails[0]?.levelOfEducation
                            ) || otherDetails[0]?.levelOfEducation == ""
                              ? otherDetails[0]?.levelOfEducation
                              : "Other",
                          sexualOrientation:
                            sexualOrientationList.find(
                              (country) =>
                                country === otherDetails[0]?.sexualOrientation
                            ) || otherDetails[0]?.sexualOrientation == ""
                              ? otherDetails[0]?.sexualOrientation
                              : "Other",
                        });

                        setUpdatePersonalOtherData({
                          countryOfResidence:
                            originCountryList.find(
                              (country) =>
                                country === otherDetails[0]?.countryOfResidence
                            ) || otherDetails[0]?.countryOfResidence == ""
                              ? ""
                              : otherDetails[0]?.countryOfResidence,
                          region:
                            regionList.find(
                              (country) => country === otherDetails[0]?.region
                            ) || otherDetails[0]?.region == ""
                              ? ""
                              : otherDetails[0]?.region,
                          industry:
                            industryList.find(
                              (country) => country === otherDetails[0]?.industry
                            ) || otherDetails[0]?.industry == ""
                              ? ""
                              : otherDetails[0]?.industry,
                          politicalAffiliation:
                            politicalAffiliationList.find(
                              (country) =>
                                country ===
                                otherDetails[0]?.politicalAffiliation
                            ) || otherDetails[0]?.politicalAffiliation == ""
                              ? ""
                              : otherDetails[0]?.politicalAffiliation,
                          religiousAffiliation:
                            religiousAffiliationList.find(
                              (country) =>
                                country ===
                                otherDetails[0]?.religiousAffiliation
                            ) || otherDetails[0]?.religiousAffiliation == ""
                              ? ""
                              : otherDetails[0]?.religiousAffiliation,
                          levelOfEducation:
                            levelOfEducationList.find(
                              (country) =>
                                country === otherDetails[0]?.levelOfEducation
                            ) || otherDetails[0]?.levelOfEducation == ""
                              ? ""
                              : otherDetails[0]?.levelOfEducation,
                          sexualOrientation:
                            sexualOrientationList.find(
                              (country) =>
                                country === otherDetails[0]?.sexualOrientation
                            ) || otherDetails[0]?.sexualOrientation == ""
                              ? ""
                              : otherDetails[0]?.sexualOrientation,
                        });

                        setOpenProfileModal(!openProfileModal);
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="css-i6dzq1"
                      >
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <span>
                  Your authorization is required for each of the below
                  demographic designations in order for them to be displayed on
                  your profile.
                </span>
              </div>
              {!isLoaderVisible ? (
                <div className="grid-section-align">
                  {otherDetails[0]?.DOB && (
                    <div className="info-grid">
                      <div className="info-grid-items">
                        <h5>Age</h5>
                        <p>{calculate_age_all()}</p>
                      </div>
                      <div className="info-grid-items">
                        <div className="switch-end-side">
                          <label className="f-switch">
                            <input
                              type="checkbox"
                              className="is-switch "
                              id="DOBShow"
                              checked={updateSettingList?.DOBShow}
                              // value={updateSettingList?.DOBShow}
                              onChange={(e) => {
                                setUpdateSettingList({
                                  ...updateSettingList,
                                  DOBShow: e.target.checked,
                                });
                                onChangeDisplaySetting(
                                  {
                                    DOBShow: e.target.checked,
                                  },
                                  e.target.checked
                                );
                              }}
                            />
                            <i></i>
                          </label>
                        </div>
                        {updateSettingList?.DOBShow ? (
                          <span>Display in profile</span>
                        ) : (
                          <span>Don't display in profile</span>
                        )}
                      </div>
                    </div>
                  )}
                  {otherDetails[0]?.countryOfOrigin.length > 0 && (
                    <div className="info-grid">
                      <div className="info-grid-items">
                        <h5>Country of Origin</h5>
                        <p>{otherDetails[0]?.countryOfOrigin.join(", ")}</p>
                      </div>
                      <div className="info-grid-items">
                        <div className="switch-end-side">
                          <label className="f-switch">
                            <input
                              type="checkbox"
                              className="is-switch "
                              id="DOBShow"
                              checked={updateSettingList?.countryOfOriginShow}
                              // value={updateSettingList?.DOBShow}
                              onChange={(e) => {
                                setUpdateSettingList({
                                  ...updateSettingList,
                                  countryOfOriginShow: e.target.checked,
                                });
                                onChangeDisplaySetting(
                                  {
                                    countryOfOriginShow: e.target.checked,
                                  },
                                  e.target.checked
                                );
                              }}
                            />
                            <i></i>
                          </label>
                        </div>
                        {updateSettingList?.countryOfOriginShow ? (
                          <span>Display in profile</span>
                        ) : (
                          <span>Don't display in profile</span>
                        )}
                      </div>
                    </div>
                  )}
                  {otherDetails[0]?.gender && (
                    <div className="info-grid">
                      <div className="info-grid-items">
                        <h5>Gender</h5>
                        <p>{otherDetails[0]?.gender}</p>
                      </div>
                      <div className="info-grid-items">
                        <div className="switch-end-side">
                          <label className="f-switch">
                            <input
                              type="checkbox"
                              className="is-switch "
                              id="DOBShow"
                              checked={updateSettingList?.gendereShow}
                              // value={updateSettingList?.DOBShow}
                              onChange={(e) => {
                                setUpdateSettingList({
                                  ...updateSettingList,
                                  gendereShow: e.target.checked,
                                });
                                onChangeDisplaySetting(
                                  {
                                    gendereShow: e.target.checked,
                                  },
                                  e.target.checked
                                );
                              }}
                            />
                            <i></i>
                          </label>
                        </div>
                        {updateSettingList?.gendereShow ? (
                          <span>Display in profile</span>
                        ) : (
                          <span>Don't display in profile</span>
                        )}
                      </div>
                    </div>
                  )}
                  {otherDetails[0]?.countryOfResidence && (
                    <div className="info-grid">
                      <div className="info-grid-items">
                        <h5>Country of Residence</h5>
                        <p>{otherDetails[0]?.countryOfResidence}</p>
                      </div>
                      <div className="info-grid-items">
                        <div className="switch-end-side">
                          <label className="f-switch">
                            <input
                              type="checkbox"
                              className="is-switch "
                              id="DOBShow"
                              checked={
                                updateSettingList?.countryOfResidenceShow
                              }
                              // value={updateSettingList?.DOBShow}
                              onChange={(e) => {
                                setUpdateSettingList({
                                  ...updateSettingList,
                                  countryOfResidenceShow: e.target.checked,
                                });
                                onChangeDisplaySetting(
                                  {
                                    countryOfResidenceShow: e.target.checked,
                                  },
                                  e.target.checked
                                );
                              }}
                            />
                            <i></i>
                          </label>
                        </div>
                        {updateSettingList?.countryOfResidenceShow ? (
                          <span>Display in profile</span>
                        ) : (
                          <span>Don't display in profile</span>
                        )}
                      </div>
                    </div>
                  )}
                  {otherDetails[0]?.region && (
                    <div className="info-grid">
                      <div className="info-grid-items">
                        <h5>Regions</h5>
                        <p>{otherDetails[0]?.region}</p>
                      </div>
                      <div className="info-grid-items">
                        <div className="switch-end-side">
                          <label className="f-switch">
                            <input
                              type="checkbox"
                              className="is-switch "
                              id="DOBShow"
                              checked={updateSettingList?.regionShow}
                              // value={updateSettingList?.DOBShow}
                              onChange={(e) => {
                                setUpdateSettingList({
                                  ...updateSettingList,
                                  regionShow: e.target.checked,
                                });
                                onChangeDisplaySetting(
                                  {
                                    regionShow: e.target.checked,
                                  },
                                  e.target.checked
                                );
                              }}
                            />
                            <i></i>
                          </label>
                        </div>
                        {updateSettingList?.regionShow ? (
                          <span>Display in profile</span>
                        ) : (
                          <span>Don't display in profile</span>
                        )}
                      </div>
                    </div>
                  )}
                  {otherDetails[0]?.industry && (
                    <div className="info-grid">
                      <div className="info-grid-items">
                        <h5>Industry</h5>
                        <p>{otherDetails[0]?.industry}</p>
                      </div>
                      <div className="info-grid-items">
                        <div className="switch-end-side">
                          <label className="f-switch">
                            <input
                              type="checkbox"
                              className="is-switch "
                              id="DOBShow"
                              checked={updateSettingList?.industryShow}
                              // value={updateSettingList?.DOBShow}
                              onChange={(e) => {
                                setUpdateSettingList({
                                  ...updateSettingList,
                                  industryShow: e.target.checked,
                                });
                                onChangeDisplaySetting(
                                  {
                                    industryShow: e.target.checked,
                                  },
                                  e.target.checked
                                );
                              }}
                            />
                            <i></i>
                          </label>
                        </div>
                        {updateSettingList?.industryShow ? (
                          <span>Display in profile</span>
                        ) : (
                          <span>Don't display in profile</span>
                        )}
                      </div>
                    </div>
                  )}
                  {otherDetails[0]?.employeeNumber && (
                    <div className="info-grid">
                      <div className="info-grid-items">
                        <h5>No of employees</h5>
                        <p>{otherDetails[0]?.employeeNumber}</p>
                      </div>
                      <div className="info-grid-items">
                        <div className="switch-end-side">
                          <label className="f-switch">
                            <input
                              type="checkbox"
                              className="is-switch "
                              id="DOBShow"
                              checked={updateSettingList?.employeeNumberShow}
                              // value={updateSettingList?.DOBShow}
                              onChange={(e) => {
                                setUpdateSettingList({
                                  ...updateSettingList,
                                  employeeNumberShow: e.target.checked,
                                });
                                onChangeDisplaySetting(
                                  {
                                    employeeNumberShow: e.target.checked,
                                  },
                                  e.target.checked
                                );
                              }}
                            />
                            <i></i>
                          </label>
                        </div>
                        {updateSettingList?.employeeNumberShow ? (
                          <span>Display in profile</span>
                        ) : (
                          <span>Don't display in profile</span>
                        )}
                      </div>
                    </div>
                  )}
                  {otherDetails[0]?.ethnicity.length > 0 && (
                    <div className="info-grid">
                      <div className="info-grid-items">
                        <h5>Ethnicity</h5>
                        <p>{otherDetails[0]?.ethnicity.join(", ")}</p>
                      </div>
                      <div className="info-grid-items">
                        <div className="switch-end-side">
                          <label className="f-switch">
                            <input
                              type="checkbox"
                              className="is-switch "
                              id="DOBShow"
                              checked={updateSettingList?.ethnicityShow}
                              // value={updateSettingList?.DOBShow}
                              onChange={(e) => {
                                setUpdateSettingList({
                                  ...updateSettingList,
                                  ethnicityShow: e.target.checked,
                                });
                                onChangeDisplaySetting(
                                  {
                                    ethnicityShow: e.target.checked,
                                  },
                                  e.target.checked
                                );
                              }}
                            />
                            <i></i>
                          </label>
                        </div>
                        {updateSettingList?.ethnicityShow ? (
                          <span>Display in profile</span>
                        ) : (
                          <span>Don't display in profile</span>
                        )}
                      </div>
                    </div>
                  )}
                  {otherDetails[0]?.politicalAffiliation && (
                    <div className="info-grid">
                      <div className="info-grid-items">
                        <h5>Political Affiliation</h5>
                        <p>{otherDetails[0]?.politicalAffiliation}</p>
                      </div>
                      <div className="info-grid-items">
                        <div className="switch-end-side">
                          <label className="f-switch">
                            <input
                              type="checkbox"
                              className="is-switch "
                              id="DOBShow"
                              checked={
                                updateSettingList?.politicalAffiliationShow
                              }
                              // value={updateSettingList?.DOBShow}
                              onChange={(e) => {
                                setUpdateSettingList({
                                  ...updateSettingList,
                                  politicalAffiliationShow: e.target.checked,
                                });
                                onChangeDisplaySetting(
                                  {
                                    politicalAffiliationShow: e.target.checked,
                                  },
                                  e.target.checked
                                );
                              }}
                            />
                            <i></i>
                          </label>
                        </div>
                        {updateSettingList?.politicalAffiliationShow ? (
                          <span>Display in profile</span>
                        ) : (
                          <span>Don't display in profile</span>
                        )}
                      </div>
                    </div>
                  )}
                  {otherDetails[0]?.religiousAffiliation && (
                    <div className="info-grid">
                      <div className="info-grid-items">
                        <h5>Religious Affiliation</h5>
                        <p>{otherDetails[0]?.religiousAffiliation}</p>
                      </div>
                      <div className="info-grid-items">
                        <div className="switch-end-side">
                          <label className="f-switch">
                            <input
                              type="checkbox"
                              className="is-switch "
                              id="DOBShow"
                              checked={
                                updateSettingList?.religiousAffiliationShow
                              }
                              // value={updateSettingList?.DOBShow}
                              onChange={(e) => {
                                setUpdateSettingList({
                                  ...updateSettingList,
                                  religiousAffiliationShow: e.target.checked,
                                });
                                onChangeDisplaySetting(
                                  {
                                    religiousAffiliationShow: e.target.checked,
                                  },
                                  e.target.checked
                                );
                              }}
                            />
                            <i></i>
                          </label>
                        </div>
                        {updateSettingList?.religiousAffiliationShow ? (
                          <span>Display in profile</span>
                        ) : (
                          <span>Don't display in profile</span>
                        )}
                      </div>
                    </div>
                  )}
                  {otherDetails[0]?.levelOfEducation && (
                    <div className="info-grid">
                      <div className="info-grid-items">
                        <h5>Level Of Education</h5>
                        <p>{otherDetails[0]?.levelOfEducation}</p>
                      </div>
                      <div className="info-grid-items">
                        <div className="switch-end-side">
                          <label className="f-switch">
                            <input
                              type="checkbox"
                              className="is-switch "
                              id="DOBShow"
                              checked={updateSettingList?.levelOfEducationShow}
                              // value={updateSettingList?.DOBShow}
                              onChange={(e) => {
                                setUpdateSettingList({
                                  ...updateSettingList,
                                  levelOfEducationShow: e.target.checked,
                                });
                                onChangeDisplaySetting(
                                  {
                                    levelOfEducationShow: e.target.checked,
                                  },
                                  e.target.checked
                                );
                              }}
                            />
                            <i></i>
                          </label>
                        </div>
                        {updateSettingList?.levelOfEducationShow ? (
                          <span>Display in profile</span>
                        ) : (
                          <span>Don't display in profile</span>
                        )}
                      </div>
                    </div>
                  )}
                  {otherDetails[0]?.sexualOrientation && (
                    <div className="info-grid">
                      <div className="info-grid-items">
                        <h5>Sexual Orientation</h5>
                        <p>{otherDetails[0]?.sexualOrientation}</p>
                      </div>
                      <div className="info-grid-items">
                        <div className="switch-end-side">
                          <label className="f-switch">
                            <input
                              type="checkbox"
                              className="is-switch "
                              id="DOBShow"
                              checked={updateSettingList?.sexualOrientationShow}
                              // value={updateSettingList?.DOBShow}
                              onChange={(e) => {
                                setUpdateSettingList({
                                  ...updateSettingList,
                                  sexualOrientationShow: e.target.checked,
                                });
                                onChangeDisplaySetting(
                                  {
                                    sexualOrientationShow: e.target.checked,
                                  },
                                  e.target.checked
                                );
                              }}
                            />
                            <i></i>
                          </label>
                        </div>
                        {updateSettingList?.sexualOrientationShow ? (
                          <span>Display in profile</span>
                        ) : (
                          <span>Don't display in profile</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="tab-skeleton-design">
                    <Skeleton animation="wave" width={"90%"} height={35} />
                    <Skeleton animation="wave" width={"50%"} height={35} />
                    <Skeleton animation="wave" width={"70%"} height={35} />
                  </div>
                </>
              )}
            </div>
          </>
        )}
        {tab == "Confidential" && (
          <div>
            <div className="details-box-align">
              <div className="personal-details">
                <div className="icon-text-alignment">
                  <p>Confidential Information</p>
                  {/* <p >asas</p> */}
                  {!isLoaderVisible ? (
                    <div
                      className="edit-icon-cetner-align"
                      onClick={() => {
                        setisActiveConfidential(true);
                        setOpenConfidentialModal(!openConfidentialModal);
                        setUpdateConfidential(otherDetails[0]);
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="css-i6dzq1"
                      >
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <span>
                  This information will never be displayed to subscribers.
                </span>
              </div>
              {!isLoaderVisible ? (
                <div className="grid-section-align">
                  <div className="info-grid">
                    <div className="info-grid-items">
                      <h5>Organization Name</h5>
                      <p>{otherDetails[0]?.organizationName}</p>
                    </div>
                  </div>
                  <div className="info-grid">
                    <div className="info-grid-items">
                      <h5>
                        Your work email address
                        {otherDetails[0]?.organizationEmailVerified ===
                        false ? (
                          <a
                            onClick={() => {
                              verifyWOrkEmail(
                                otherDetails[0]?.organizationEmail
                              );
                            }}
                          >
                            Verify Now
                          </a>
                        ) : (
                          <a>
                            <svg
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                              stroke="currentColor"
                              stroke-width="2"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="css-i6dzq1"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          </a>
                        )}
                      </h5>
                      <p>{otherDetails[0]?.organizationEmail}</p>
                    </div>
                  </div>
                  <div className="info-grid">
                    <div className="info-grid-items email-icon-alignment">
                      <h5 className="">
                        Your email address{" "}
                        <a>
                          <svg
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="css-i6dzq1"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        </a>
                      </h5>
                      <p>{otherDetails[0]?.email}</p>
                    </div>
                  </div>
                  {/* <div className="info-grid">
                          <div className="info-grid-items">
                            <h5>Your Website Link </h5>
                            <p>{otherDetails[0]?.organizationWebsite}</p>
                          </div>
                        </div> */}
                  <div className="info-grid">
                    <div className="info-grid-items linkdin-profile-alignment">
                      <Tooltip
                        title="You can find your LinkedIn profile URL in your profile Section."
                        arrow
                      >
                        <h5 style={{ width: "290px" }}>
                          Link to LinkedIn profile
                          <a>
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              stroke="currentColor"
                              stroke-width="2"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="css-i6dzq1"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="16" x2="12" y2="12"></line>
                              <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                          </a>
                        </h5>
                      </Tooltip>
                      <p>{otherDetails[0]?.linkedinProfile}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="tab-skeleton-design">
                    <Skeleton animation="wave" width={"90%"} height={35} />
                    <Skeleton animation="wave" width={"50%"} height={35} />
                    <Skeleton animation="wave" width={"70%"} height={35} />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {openProfileModal ? (
        <div className="profile-modal-design">
          <div className="profile-modal">
            <div className="profile-header">
              <h1>Edit personal information</h1>
              <div
                className="close-icon"
                onClick={() => setOpenProfileModal(!openProfileModal)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="css-i6dzq1"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </div>
            <div className="profile-modal-body">
              <div className="profile-form-grid profile-form-bottom-align">
                <div className="profile-form-grid-items">
                  <div className="profile-form-control">
                    <label>DOB</label>
                    <DatePicker
                      selected={
                        updatePersonalData?.DOB
                          ? new Date(updatePersonalData?.DOB)
                          : new Date()
                      }
                      excludeDates={[new Date()]}
                      onChange={(date) => {
                        setisActivePersonalInformations(true);
                        setUpdatePersonalData({
                          ...updatePersonalData,
                          DOB: date,
                        });
                      }}
                      maxDate={new Date()}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                  </div>
                </div>
                <div className="profile-form-grid-items">
                  <div className="profile-form-control">
                    <label>Age</label>
                    <input
                      type="text"
                      placeholder="Ex. 40yrs"
                      value={calculate_age()}
                    />
                  </div>
                </div>
              </div>
              <div className="profile-form-bottom-align">
                <label>Country Of Origin</label>
                <Multiselect
                  //  style={{chips: { background: '#FFF'},option:{color: '#FFF'}}}
                  options={originCountryList.sort(function (a, b) {
                    var textA = a.toUpperCase();
                    var textB = b.toUpperCase();
                    return textA < textB ? -1 : textA > textB ? 1 : 0;
                  })} // Options to display in the dropdown
                  //selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                  onSelect={(selectedList, selectedItem) => {
                    setisActivePersonalInformations(true);
                    setUpdatePersonalData({
                      ...updatePersonalData,
                      countryOfOrigin: selectedList,
                    });
                  }} // Function will trigger on select event
                  onRemove={(selectedList, removedItem) => {
                    setisActivePersonalInformations(true);
                    setUpdatePersonalData({
                      ...updatePersonalData,
                      countryOfOrigin: selectedList,
                    });
                  }} // Function will trigger on remove event
                  isObject={false}
                  // disablePreSelectedValues="true"
                  // closeIcon="circle"
                  selectedValues={updatePersonalData.countryOfOrigin}
                />
              </div>
              <div className="profile-form-control profile-form-bottom-align">
                <label>Gender</label>
                <select
                  name="gender"
                  id="gender"
                  defaultValue={updatePersonalData?.gender}
                  onChange={(e) => {
                    setisActivePersonalInformations(true);
                    handlePersonalDetailChange(e);
                  }}
                >
                  <option value="">Select Gender</option>
                  {genderList.map((gender) => (
                    <option value={gender}>{gender}</option>
                  ))}
                </select>
              </div>

              <div className="profile-form-control profile-form-bottom-align">
                <label>Country of Residence</label>
                <select
                  name="countryOfResidence"
                  id="countryOfResidence"
                  defaultValue={updatePersonalData?.countryOfResidence}
                  onChange={(e) => {
                    setisActivePersonalInformations(true);
                    if (e.target.value !== "Other") {
                      setUpdatePersonalOtherData({
                        ...UpdatePersonalOtherData,
                        [e.target.name]: "",
                      });
                      handlePersonalDetailChange(e);
                    } else {
                      handlePersonalDetailChange(e);
                    }
                  }}
                >
                  <option value="">Select Country of Residence</option>
                  {originCountryList.map((origin) => (
                    <option value={origin}>{origin}</option>
                  ))}
                  <option value="Other">Other</option>`
                </select>
              </div>
              {updatePersonalData?.countryOfResidence == "Other" && (
                <div className="profile-form-control profile-form-bottom-align">
                  <input
                    id="countryOfResidence"
                    placeholder="Country of Residence"
                    name="countryOfResidence"
                    value={UpdatePersonalOtherData?.countryOfResidence}
                    onChange={(e) => {
                      setisActivePersonalInformations(true);
                      setUpdatePersonalOtherData({
                        ...UpdatePersonalOtherData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </div>
              )}
              <div className="profile-form-control profile-form-bottom-align">
                <label>Regions</label>
                <select
                  name="region"
                  id="region"
                  defaultValue={updatePersonalData?.region}
                  onChange={(e) => {
                    setisActivePersonalInformations(true);
                    if (e.target.value !== "Other") {
                      setUpdatePersonalOtherData({
                        ...UpdatePersonalOtherData,
                        [e.target.name]: "",
                      });
                      handlePersonalDetailChange(e);
                    } else {
                      handlePersonalDetailChange(e);
                    }
                  }}
                >
                  <option value="">Select Region</option>
                  {regionList.map((origin) => (
                    <option value={origin}>{origin}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              {updatePersonalData?.region == "Other" && (
                <div className="profile-form-control profile-form-bottom-align">
                  <input
                    id="region"
                    placeholder="Region"
                    name="region"
                    value={UpdatePersonalOtherData?.region}
                    onChange={(e) => {
                      setisActivePersonalInformations(true);
                      setUpdatePersonalOtherData({
                        ...UpdatePersonalOtherData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </div>
              )}
              <div className="profile-form-control profile-form-bottom-align">
                <label>Industry</label>
                <select
                  name="industry"
                  id="industry"
                  defaultValue={updatePersonalData?.industry}
                  onChange={(e) => {
                    setisActivePersonalInformations(true);
                    if (e.target.value !== "Other") {
                      setUpdatePersonalOtherData({
                        ...UpdatePersonalOtherData,
                        [e.target.name]: "",
                      });
                      handlePersonalDetailChange(e);
                    } else {
                      handlePersonalDetailChange(e);
                    }
                  }}
                >
                  <option value="">Select Industry</option>
                  {industryList.map((origin) => (
                    <option value={origin}>{origin}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              {updatePersonalData?.industry == "Other" && (
                <div className="profile-form-control profile-form-bottom-align">
                  <input
                    id="region"
                    placeholder="Industry"
                    name="industry"
                    value={UpdatePersonalOtherData?.industry}
                    onChange={(e) => {
                      setisActivePersonalInformations(true);
                      setUpdatePersonalOtherData({
                        ...UpdatePersonalOtherData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </div>
              )}
              <div className="profile-form-control profile-form-bottom-align">
                <label>Your current leadership role</label>
                <select
                  name="currentRole"
                  id="currentRole"
                  defaultValue={otherDetails[0]?.currentRole}
                  // onClick={(e) => handlePersonalDetailChange(e)}
                  disabled
                >
                  <option value="Country Of Origin">
                    {otherDetails[0]?.currentRole}
                  </option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div className="profile-form-control profile-form-bottom-align">
                <label>No of employees</label>
                <select
                  name="employeeNumber"
                  id="employeeNumber"
                  defaultValue={updatePersonalData?.employeeNumber}
                  onChange={(e) => {
                    setisActivePersonalInformations(true);
                    handlePersonalDetailChange(e);
                  }}
                >
                  <option value="">Select Number of Employees</option>
                  {noOfEmployeesList.map((origin) => (
                    <option value={origin}>{origin}</option>
                  ))}
                </select>
              </div>
              <div className="profile-form-bottom-align">
                <label>Ethnicity</label>
                <Multiselect
                  //  style={{chips: { background: '#FFF'},option:{color: '#FFF'}}}
                  options={ehnicityList.sort(function (a, b) {
                    var textA = a.toUpperCase();
                    var textB = b.toUpperCase();
                    return textA < textB ? -1 : textA > textB ? 1 : 0;
                  })} // Options to display in the dropdown
                  //selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                  onSelect={(selectedList, selectedItem) => {
                    setisActivePersonalInformations(true);
                    setUpdatePersonalData({
                      ...updatePersonalData,
                      ethnicity: selectedList,
                    });
                  }} // Function will trigger on select event
                  onRemove={(selectedList, removedItem) => {
                    setisActivePersonalInformations(true);
                    setUpdatePersonalData({
                      ...updatePersonalData,
                      ethnicity: selectedList,
                    });
                  }} // Function will trigger on remove event
                  isObject={false}
                  // disablePreSelectedValues="true"
                  // closeIcon="circle"
                  selectedValues={updatePersonalData.ethnicity}
                />
              </div>
              <div className="profile-form-control profile-form-bottom-align">
                <label>Political Affiliation</label>
                <select
                  name="politicalAffiliation"
                  id="politicalAffiliation"
                  defaultValue={updatePersonalData?.politicalAffiliation}
                  onChange={(e) => {
                    if (e.target.value !== "Other") {
                      setisActivePersonalInformations(true);
                      setUpdatePersonalOtherData({
                        ...UpdatePersonalOtherData,
                        [e.target.name]: "",
                      });
                      handlePersonalDetailChange(e);
                    } else {
                      handlePersonalDetailChange(e);
                    }
                  }}
                >
                  <option value="">Select Political Affiliation</option>
                  {politicalAffiliationList.map((origin) => (
                    <option value={origin}>{origin}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              {updatePersonalData?.politicalAffiliation == "Other" && (
                <div className="profile-form-control profile-form-bottom-align">
                  <input
                    id="politicalAffiliationList"
                    placeholder="Political Affiliation"
                    name="politicalAffiliationList"
                    value={UpdatePersonalOtherData?.politicalAffiliationList}
                    onChange={(e) => {
                      setisActivePersonalInformations(true);
                      setUpdatePersonalOtherData({
                        ...UpdatePersonalOtherData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </div>
              )}
              <div className="profile-form-control profile-form-bottom-align">
                <label>Religious Affiliation</label>
                <select
                  name="religiousAffiliation"
                  id="religiousAffiliation"
                  defaultValue={updatePersonalData?.religiousAffiliation}
                  onChange={(e) => {
                    if (e.target.value !== "Other") {
                      setisActivePersonalInformations(true);
                      setUpdatePersonalOtherData({
                        ...UpdatePersonalOtherData,
                        [e.target.name]: "",
                      });
                      handlePersonalDetailChange(e);
                    } else {
                      handlePersonalDetailChange(e);
                    }
                  }}
                >
                  <option value="">Select Religious Affiliation</option>
                  {religiousAffiliationList.map((origin) => (
                    <option value={origin}>{origin}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              {updatePersonalData?.religiousAffiliation == "Other" && (
                <div className="profile-form-control profile-form-bottom-align">
                  <input
                    id="religiousAffiliation"
                    placeholder="Religious Affiliation"
                    name="religiousAffiliation"
                    value={UpdatePersonalOtherData?.religiousAffiliation}
                    onChange={(e) => {
                      setisActivePersonalInformations(true);
                      setUpdatePersonalOtherData({
                        ...UpdatePersonalOtherData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </div>
              )}
              <div className="profile-form-control profile-form-bottom-align">
                <label>Level Of Education</label>
                <select
                  name="levelOfEducation"
                  id="levelOfEducation"
                  defaultValue={updatePersonalData?.levelOfEducation}
                  onChange={(e) => {
                    if (e.target.value !== "Other") {
                      setisActivePersonalInformations(true);
                      setUpdatePersonalOtherData({
                        ...UpdatePersonalOtherData,
                        [e.target.name]: "",
                      });
                      handlePersonalDetailChange(e);
                    } else {
                      handlePersonalDetailChange(e);
                    }
                  }}
                >
                  <option value="">Select Level Of Education</option>
                  {Data?.map((origin) => (
                    <option value={origin}>{origin}</option>
                  ))}

                  <option value="Other">Other</option>
                </select>
              </div>
              {updatePersonalData?.levelOfEducation == "Other" && (
                <div className="profile-form-control profile-form-bottom-align">
                  <input
                    id="region"
                    placeholder="Level of Education"
                    name="levelOfEducation"
                    value={UpdatePersonalOtherData?.levelOfEducation}
                    onChange={(e) => {
                      setisActivePersonalInformations(true);
                      setUpdatePersonalOtherData({
                        ...UpdatePersonalOtherData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </div>
              )}
              <div className="profile-form-control profile-form-bottom-align">
                <label>Sexual Orientation</label>
                <select
                  name="sexualOrientation"
                  id="sexualOrientation"
                  defaultValue={updatePersonalData?.sexualOrientation}
                  onChange={(e) => {
                    setisActivePersonalInformations(true);
                    if (e.target.value !== "Other") {
                      setUpdatePersonalOtherData({
                        ...UpdatePersonalOtherData,
                        [e.target.name]: "",
                      });
                      handlePersonalDetailChange(e);
                    } else {
                      handlePersonalDetailChange(e);
                    }
                  }}
                >
                  <option value="">Select Level Of Education</option>
                  {sexualOrientationList.map((origin) => (
                    <option value={origin}>{origin}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              {updatePersonalData?.sexualOrientation == "Other" && (
                <div className="profile-form-control profile-form-bottom-align">
                  <input
                    id="sexualOrientation"
                    placeholder="Sexual Orientation"
                    name="sexualOrientation"
                    value={UpdatePersonalOtherData?.sexualOrientation}
                    onChange={(e) => {
                      setisActivePersonalInformations(true);
                      setUpdatePersonalOtherData({
                        ...UpdatePersonalOtherData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </div>
              )}
              <div className="profile-modal-footer">
                <button
                  className="cancel-button-style"
                  onClick={() => setOpenProfileModal(!openProfileModal)}
                >
                  Cancel
                </button>
                {/* <button
                  className="save-button-style"
                  style={{
                    backgroundColor: isActivePersonalInformations
                      ? "#e61952"
                      : "#f08aa7",
                    cursor: isActivePersonalInformations
                      ? "pointer"
                      : "not-allowed",
                  }}
                  onClick={(e) =>
                    isActivePersonalInformations ? onSavePersonalDetails(e) : ""
                  }
                >
                  Save
                </button> */}

                {!onSaveLoader ? (
                  <button
                    className="save-button-style"
                    style={{
                      backgroundColor: isActivePersonalInformations
                        ? "#e61952"
                        : "#f08aa7",
                      cursor: isActivePersonalInformations
                        ? "pointer"
                        : "not-allowed",
                    }}
                    onClick={(e) =>
                      isActivePersonalInformations
                        ? onSavePersonalDetails(e)
                        : ""
                    }
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="save-button-style"
                    style={{
                      backgroundColor: "#e61952",
                      cursor: !isActiveConfidential ? "pointer" : "not-allowed",
                    }}
                  >
                    <Loader
                      className=""
                      type="Puff"
                      color="#FFF"
                      height={30}
                      width={30}
                      visible={onSaveLoader}
                    />
                  </button>
                )}
              </div>
            </div>
            {/* <p >Close</p> */}
          </div>
        </div>
      ) : null}
      {openConfidentialModal ? (
        <div className="profile-modal-design">
          <div className="profile-modal">
            <div className="profile-header">
              <h1>Edit confidential information</h1>
              <div
                className="close-icon"
                onClick={() => setOpenConfidentialModal(!openConfidentialModal)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="css-i6dzq1"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </div>
            <div className="profile-modal-body">
              <div className="profile-form-control profile-form-bottom-align">
                <label>Organization Name</label>
                <select
                  name="organizationName"
                  id="organizationName"
                  onChange={(e) => {
                    if (e?.target?.value === "Other") {
                      setIsOpenOrganizationName(true);
                    } else if (e?.target?.value !== "Other") {
                      setisActiveConfidential(false);
                      setIsOpenOrganizationName(false);
                      setUpdateConfidential({
                        ...updateConfidential,
                        organizationName: "",
                      });
                    }
                  }}
                >
                  <option value="">Select Organization</option>
                  <option value="Other" selected>
                    Other
                  </option>
                </select>
              </div>
              <div
                className="profile-form-control profile-form-bottom-align"
                style={{ display: isOpenOrganizationName ? "block" : "none" }}
              >
                {/* <label>Other</label> */}
                <input
                  type="text"
                  placeholder="Google"
                  name="organizationName"
                  value={updateConfidential?.organizationName}
                  onChange={(e) => handleConfidentialChange(e)}
                />
              </div>
              <span style={{ color: "red" }}>
                {verificationError["organizationName"]}
              </span>
              <div className="profile-form-control profile-form-bottom-align">
                <label>Your work email address</label>
                <input
                  type="text"
                  name="organizationEmail"
                  placeholder="Ex. johndeo@google.com"
                  value={updateConfidential?.organizationEmail}
                  onChange={(e) => handleConfidentialChange(e)}
                />
              </div>
              <span style={{ color: "red" }}>
                {verificationError["organizationEmail"]}
              </span>
              <div className="profile-form-control profile-form-bottom-align">
                <label>
                  Link to LinkedIn profile (Find in contacts section with your
                  LinkedIn profile)
                </label>
                <input
                  type="text"
                  name="linkedinProfile"
                  placeholder="Ex. https://www.linkedin.com/abc"
                  value={updateConfidential?.linkedinProfile}
                  onChange={(e) => handleConfidentialChange(e)}
                />
              </div>
              <span style={{ color: "red" }}>
                {verificationError["linkedinProfile"]}
              </span>
              <div className="profile-form-control profile-form-bottom-align">
                <label>Link to your organization's website</label>
                <input
                  type="text"
                  name="organizationWebsite"
                  placeholder="Website Link"
                  value={updateConfidential?.organizationWebsite}
                  onChange={(e) => handleConfidentialChange(e)}
                />
              </div>
              <span style={{ color: "red" }}>
                {verificationError["organizationWebsite"]}
              </span>
              <div className="profile-form-control profile-form-bottom-align">
                <label>Other links</label>
                <input
                  type="text"
                  name="otherLink"
                  placeholder="Website Link"
                  value={updateConfidential?.otherLink}
                  onChange={(e) => handleConfidentialChange(e)}
                />
              </div>
              <span style={{ color: "red" }}>
                {verificationError["otherLink"]}
              </span>
              <div className="profile-modal-footer">
                <button
                  className="cancel-button-style"
                  onClick={() =>
                    setOpenConfidentialModal(!openConfidentialModal)
                  }
                >
                  Cancel
                </button>

                {/* <button
                  className="save-button-style"
                  style={{
                    backgroundColor: !isActiveConfidential
                      ? "#e61952"
                      : "#f08aa7",
                    cursor: !isActiveConfidential ? "pointer" : "not-allowed",
                  }}
                  onClick={(e) =>
                    !isActiveConfidential ? onSaveConfidential(e) : ""
                  }
                >
                  Save
                </button> */}

                {!onSaveLoader ? (
                  <button
                    className="save-button-style"
                    style={{
                      backgroundColor: !isActiveConfidential
                        ? "#e61952"
                        : "#f08aa7",
                      cursor: !isActiveConfidential ? "pointer" : "not-allowed",
                    }}
                    onClick={(e) =>
                      !isActiveConfidential ? onSaveConfidential(e) : ""
                    }
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="save-button-style"
                    style={{
                      backgroundColor: "#e61952",
                      cursor: !isActiveConfidential ? "pointer" : "not-allowed",
                    }}
                  >
                    <Loader
                      className=""
                      type="Puff"
                      color="#FFF"
                      height={30}
                      width={30}
                      visible={onSaveLoader}
                    />
                  </button>
                )}
              </div>
            </div>
            {/* <p >Close</p> */}
          </div>
        </div>
      ) : null}
    </>
  );
}
{
  /* <div
className="edit-icon-cetner-align"
onClick={() => setOpenProfileModal(!openProfileModal)}
>
<svg
  viewBox="0 0 24 24"
  width="24"
  height="24"
  stroke="currentColor"
  stroke-width="2"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="css-i6dzq1"
>
  <path d="M12 20h9"></path>
  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
</svg>
</div> */
}
