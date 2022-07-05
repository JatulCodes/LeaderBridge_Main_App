import React, { createContext, Suspense } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Home from "./components/home/Home";
import "./styles/mixins/global.scss";
import { Switch, Route, BrowserRouter, useHistory } from "react-router-dom";
import Layout from "../src/Route/index";
import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import About from "./components/About/About";
import WhyLeaderbridge from "./components/WhyLeaderbridge/WhyLeaderbridge";
import SignIn from "./components/Auth/SignIn/SignIn";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

export const DataLoaded = createContext();

function App() {
  let history = useHistory();
  let path = window.location.pathname;

  useEffect(() => {
    path = window.location.pathname;
  }, [path]);

  const [myQuery, setMyQuery] = React.useState(false);
  const [request, setRequest] = React.useState(false);
  const [answerByme, setAnswerByme] = React.useState(false);
  const [answerLater, setanswerLater] = React.useState(false);
  const [AlldataMessage, setAlldataMessage] = React.useState();
  const [ContentPopup, setContentPopup] = React.useState();
  const [SwipContent, setSwipContent] = React.useState(false);
  const [scrollDown, setScrollDown] = React.useState(false);
  const [ChatCount, setChatCount] = React.useState([]);
  const [activeUser, setActiveUser] = React.useState();
  const [callCut, setCallCut] = React.useState(true);
  const [callData, setCallData] = React.useState([]);
  const [acceptData, setAcceptData] = React.useState([]);
  const [rejectData, setRejectData] = React.useState([]);
  const [ filterOpen , setFilterOpen ] = React.useState(false)

  
  
  const store = {
    myquery: [myQuery, setMyQuery],
    request: [request, setRequest],
    answer: [answerByme, setAnswerByme],
    answerLaterUser: [answerLater, setanswerLater],
    AlldataMessageFun: [AlldataMessage, setAlldataMessage],
    ContentPopupFun: [ContentPopup, setContentPopup],
    SwipContentFun: [SwipContent, setSwipContent],
    scrollDownData: [scrollDown, setScrollDown],
    ChatCountData: [ChatCount, setChatCount],
    ActiveData: [activeUser, setActiveUser],
    CallcutData: [callCut, setCallCut],
    ChatCallData: [callData, setCallData],
    ChatacceptData: [acceptData, setAcceptData],
    ChatReject: [rejectData, setRejectData],
    FilterData:[ filterOpen , setFilterOpen ]
  };

  const loading = () => "Loading...";
  return (
    <BrowserRouter>
      <Switch>
        <DataLoaded.Provider value={store}>
          <Suspense fallback={loading()}>
            {/* <ToastContainer /> */}
            <Route
              path="/"
              render={() => {
                return <Layout />;
              }}
            />
          </Suspense>
        </DataLoaded.Provider>
      </Switch>
    </BrowserRouter>
  );
}
{
  /* <Router>
        <Route exact path="/signin" component={SignIn} />
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/why-leaderbridge" component={WhyLeaderbridge} />
        <Footer />
      </Router> */
}
export default App;
