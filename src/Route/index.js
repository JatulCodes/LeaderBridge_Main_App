import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from "../components/Layout/Header/Header";
import Home from "../components/home/Home";
import SignIn from "../components/Auth/SignIn/SignIn";
import Footer from "../components/Layout/Footer/Footer";
import About from "../components/About/About";
import Terms from "../components/terms/terms";
import Contact from "../components/Contact/Contact";
import Privacy from "../components/privacy/privacy";
import Cookie from "../components/cookie/cookie";

import WhyLeaderbridge from "../components/WhyLeaderbridge/WhyLeaderbridge";
import SignUp from "../components/Auth/SignUp/SignUp";
import SwipePage from "../components/SwipePage/SwipePage";
import Profile from "../components/Profile/Profile";
import UserHeader from "../components/Layout/UserHeader/UserHeader";
import ProfileSearch from "../components/ProfileSearch/ProfileSearch";
import AskQuestion from "../components/AskQuestion/AskQuestion";
import Connections from "../components/Connections/Connections";
import MyQuery from "../components/MyQuery/MyQuery";
import Notifications from "../components/Notifications/Notifications";
import ForgotPassword from "../components/Auth/ForgotPassword/ForgotPassword";
import Chat from "../components/Chat/Chat";
import OTPVerification from "../components/Auth/OtpVarification/OTPVerification";
import { ApiGet, ApiPost } from "../Helpers/Api/ApiData";
import ProtectedRoute from "./ProtectedRoute";
import SignedInRoute from "./SignedInRoute";
import RouteWrapper from "./RouteWrapper";
import Answer from "../components/Answer/Answer";
import VerificationForm from "../components/Auth/VerificationForm/VerificationForm";
import SignUpSubject from "../components/Auth/SignUpSubject/SignUpSubject";
import Welcome from "../components/Auth/Welcome/Welcome";
import SettingPage from "../components/SettingPage/SettingPage";
import SeeAnswer from "../components/SeeAnswer/SeeAnswer";
import ViewProfile from "../components/ViewProfile/ViewProfile";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import { ToastContainer } from "react-toastify";
import PasswordChange from "../components/Auth/PasswordChange/PasswordChange";
import VerifyWorkEMail from "../components/VerifyWorkEmail/VerifyWorkEMail";
import Query from "../components/MyQuery/Query";
import Request from "../components/MyQuery/Request";
import AnswerByMe from "../components/MyQuery/Answerby";
import AnswerLater from "../components/MyQuery/AnswerLater";
import LandingPage from "../components/landingPage/landingPage";
import NewFooter from "../components/Layout/newFooter/newFooter";
import NewHowItWork from "../components/NewHowItWork/NewHowItWork";
import NewContact from "../components/newContact";
import NewAbout from "../components/newAbout";
import NewPricing from "../components/newPricing";
import UpdateHeader from "../components/Layout/UpdateHeader/UpdateHeader";
import UpdateFooter from "../components/Layout/newFooter/newFooter";
import Active from "../components/Activation/Active";
import Register from "../components/Auth/Register/Register";
import OrganizationResetPassword from "../components/ResetPassword/OrganizationResetPassword";
const stripePromise = loadStripe(
  "pk_test_51Kgp43SAWW5S1jq9BzQXhv45F23h1KUTepGNorS8CjsIwy3EnipO5am6gEKLfI5kqTCsgR4CG5wsSNwoPeYy9kPj00O5iBR1uQ"
);

const UserSubLayout = ({ children }) => (
  <>
    <UserHeader />
    {children}

    <Footer />
  </>
);
const DefaultLayout = ({ children, match }) => (
  <>
    <Header match={match} />
    {children}
    <Footer />
  </>
);
const DefaultLayout1 = ({ children, match }) => (
  <>
    <UpdateHeader match={match} />
    {children}
    <UpdateFooter />
  </>
);
const withoutHeader = ({ children, match }) => (
  <>
    {children}
    <Footer />
  </>
);
const withoutFooter = ({ children, match }) => <>{children}</>;
const NewLayout = ({ children, match }) => (
  <>
    {children}
    {/* <Footer /> */}
    <NewFooter />
  </>
);

function Layout() {
  const [CmdDesc, setCmdDesc] = useState();
  const [Allaboutpage, setAllaboutpage] = useState();
  const [allabouttrue, setallabouttrue] = useState();

  let storeAbout;
  let storeBlog;
  let storeContact;
  let storePrivacy;
  let storeCookie;
  let storeterms;

  const functiondata = CmdDesc?.map((data) => (
    <>
      {data.title == "about" && data.isActive == true && (storeAbout = true)}

      {data.title == "contact" &&
        data.isActive == true &&
        (storeContact = true)}

      {data.title == "privacy" &&
        data.isActive == true &&
        (storePrivacy = true)}

      {data.title == "cookie" && data.isActive == true && (storeCookie = true)}

      {data.title == "terms" && data.isActive == true && (storeterms = true)}

      {data.title == "blog" && data.isActive == true && (storeBlog = true)}
    </>
  ));

  useEffect(() => {
    AllCms();
  }, []);
  const AllCms = () => {
    ApiGet("cms/get-cms")
      .then((res) => {
        setCmdDesc(res.data.payload.Cms);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, [Allaboutpage]);

  const [show, setShow] = useState({});

  return (
    <BrowserRouter>
      {/* <ToastContainer /> */}
      <Switch>
        {/* <SignedInRoute
          exact={true}
          path="/"
          component={Home}
          layout={DefaultLayout}
        /> */}
        <SignedInRoute
          exact={true}
          path="/why-leaderbridge"
          component={WhyLeaderbridge}
          layout={DefaultLayout}
        />
        <SignedInRoute
          exact={true}
          path="/signin"
          component={SignIn}
          layout={withoutFooter}
        />
        <SignedInRoute
          exact={true}
          path="/forgot-password"
          component={ForgotPassword}
          // layout={withoutHeader}
          layout={DefaultLayout1}
        />
        <SignedInRoute
          exact={true}
          path="/password-change"
          component={PasswordChange}
          layout={withoutHeader}
        />
        <SignedInRoute
          exact={true}
          path="/signup"
          component={SignUp}
          layout={withoutFooter}
        />
        <SignedInRoute
          exact={true}
          path="/register"
          component={Register}
          layout={withoutHeader}
        />
        <RouteWrapper
          exact={true}
          path="/verification-form"
          component={VerificationForm}
          layout={withoutHeader}
        />
        <SignedInRoute
          exact={true}
          path="/"
          component={LandingPage}
          layout={NewLayout}
        />
        <RouteWrapper
          exact={true}
          path="/new-how-it-works"
          component={NewHowItWork}
          layout={NewLayout}
        />
        <RouteWrapper
          exact={true}
          path="/new-about"
          component={NewAbout}
          layout={NewLayout}
        />
        {/* <Elements stripe={stripePromise}> */}
        <RouteWrapper
          exact={true}
          path="/new-pricing"
          component={NewPricing}
          layout={NewLayout}
        />
        <RouteWrapper
          exact={true}
          path="/new-organization-pricing"
          component={NewPricing}
          layout={NewLayout}
        />
        {/* </Elements> */}

        <RouteWrapper
          exact={true}
          path="/new-contact"
          component={NewContact}
          layout={NewLayout}
        />

        <RouteWrapper
          exact={true}
          path="/active/:id"
          component={Active}
          layout={NewLayout}
        />
        <RouteWrapper
          exact={true}
          path="/VerifyWorkEmail/:id"
          component={VerifyWorkEMail}
          layout={DefaultLayout}
        />
        <ProtectedRoute
          exact={true}
          path="/view-profile/:id"
          component={ViewProfile}
          layout={UserSubLayout}
        />

        <ProtectedRoute
          exact={true}
          path="/profile"
          component={Profile}
          layout={UserSubLayout}
        />
        <ProtectedRoute
          exact={true}
          path="/profile-search"
          component={ProfileSearch}
          layout={UserSubLayout}
        />
        <ProtectedRoute
          exact={true}
          path="/ask-question"
          component={AskQuestion}
          layout={UserSubLayout}
        />
        <ProtectedRoute
          exact={true}
          path="/connections"
          component={Connections}
          layout={UserSubLayout}
        />
        <ProtectedRoute
          exact={true}
          path="/my-query"
          component={Query}
          layout={UserSubLayout}
        />
        <ProtectedRoute
          exact={true}
          path="/setting-page"
          component={SettingPage}
          layout={UserSubLayout}
        />
        <ProtectedRoute
          exact={true}
          path="/request"
          component={Request}
          layout={UserSubLayout}
        />
        <ProtectedRoute
          exact={true}
          path="/answer-by-me"
          component={AnswerByMe}
          layout={UserSubLayout}
        />
        <ProtectedRoute
          exact={true}
          path="/answer-later"
          component={AnswerLater}
          layout={UserSubLayout}
        />
        <ProtectedRoute
          exact={true}
          path="/notifications"
          component={Notifications}
          layout={UserSubLayout}
        />
        <ProtectedRoute
          exact={true}
          path="/chat"
          component={Chat}
          layout={UserSubLayout}
        />
        <ProtectedRoute
          exact={true}
          path="/answer/:id"
          component={Answer}
          layout={UserSubLayout}
        />
        <ProtectedRoute
          exact={true}
          path="/see-answer"
          component={SeeAnswer}
          layout={UserSubLayout}
        />

        {/* ///////////////////////////////////////////////////////////////////////// */}

        <RouteWrapper
          exact={true}
          path="/otp-verification"
          component={OTPVerification}
          layout={withoutHeader}
        />
        <RouteWrapper
          exact={true}
          path="/swipe-page"
          component={SwipePage}
          layout={UserSubLayout}
        />
        <RouteWrapper
          exact={true}
          path="/signup-subject"
          component={SignUpSubject}
          layout={withoutHeader}
        />
        <RouteWrapper
          exact={true}
          path="/welcome"
          component={Welcome}
          layout={withoutHeader}
        />
        <RouteWrapper
          exact={true}
          path="/terms"
          component={Terms}
          layout={DefaultLayout1}
        />
        <RouteWrapper
          exact={true}
          path="/about"
          component={About}
          layout={DefaultLayout1}
        />
        <RouteWrapper
          exact={true}
          path="/contact"
          component={Contact}
          layout={DefaultLayout1}
        />
        <RouteWrapper
          exact={true}
          path="/privacy"
          component={Privacy}
          layout={DefaultLayout1}
        />
        <RouteWrapper
          exact={true}
          path="/cookie"
          component={Cookie}
          layout={DefaultLayout1}
        />
        <RouteWrapper
          exact={true}
          path="/reset-password/:id"
          component={ResetPassword}
          layout={DefaultLayout1}
        />
        <RouteWrapper
          exact={true}
          path="/organization-reset-password/:id"
          component={OrganizationResetPassword}
          layout={DefaultLayout1}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Layout;
