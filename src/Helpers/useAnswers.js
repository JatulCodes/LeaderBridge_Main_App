import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import socketIOClient from "socket.io-client";
import { DataLoaded } from "../App";
import { API } from "../config/api.config";
import Auth from "./auth";
const ADD_ANSWER_IN_ROOM = "add-answer";
const GET_ANSWER_FROM_ROOM = "answer";
const CHANGE_ANSWER = "check-answer";
const SOCKET_SERVER_URL = API.hostUrlForSocket;
const userId = Auth.getUserData();

// const SOCKET_SERVER_URL = "https://api.leaderbridge.rejoicehub.com/";

const useAnswers = (
  roomId,
  questionId,
  changeData,
  setinputValue,
  setDataForEdit,
  setOpenModal,
  setOpenModalDelete,
  setOpenConnectionModal,
  setChangeData,
  setOpenModalRemoveQuestionIReceived,
  setIsUserFreind,
  setwithdrawModel,
  RoomquestionId,
  whoCan,
  setWhoCan,
  setOpenReportAbuseModal,
  setInputForReportAbuse,
  setIdReportAbuse,
  setQuestReqest,
  setdeclineReqesut,
  setQuestionReqution,
  QuestionReqest
) => {
  const [answers, setAnswers] = useState([]);
  const [dataToCheckProfileRequest, setDataToCheckProfileRequest] =
    useState("");
  const [requestedBy, setRequestedBy] = useState({});
  const socketRef = useRef();
  const userInfo = JSON.parse(localStorage.getItem("userData"));
  const [Friend, setIsFriend] = useState();
  const [TotalConection, setTotalConection] = useState();
  const [SentConnection, setSentConnection] = useState();

  const [answerRequest, setAnswerRequest] = useState();
  const [ChangeQuestion, setChangeQuestion] = useState(false);

  const history = useHistory();
  const [blockUser, setBlockUser] = useState("");
  const [response, setResponses] = useState("");
  const AuthUser = JSON.parse(localStorage.getItem("userData"));

  const [WhoIs, setWhoIs] = useState();
  const { answer, myquery, request, answerLaterUser } = useContext(DataLoaded);

  const [myQueryData, setMyQueryData] = myquery;
  const [requestData, setRequestData] = request;
  const [answerByme, setAnswerByme] = answer;
  const [answerLaterData, setanswerLaterData] = answerLaterUser;

  let status;

  console.log("RoomquestionId", RoomquestionId);

  if (WhoIs != "please check it") {
    if (WhoIs == "Only can see admin") {
      status = 1;
    } else {
      status = 0;
    }
  } else {
    status = JSON.parse(localStorage.getItem("whoIs"));
  }
  const acceptrequest = (id, questionId, type) => {
    if (type == "request") {
      setQuestReqest(id);
    }
    socketRef.current.emit("accept-request", {
      user: Auth.getToken(),
      requestId: id,
      questionId: questionId,
    });
  };

  const newrequest = (questionId) => {
    setQuestionReqution(true);
    socketRef.current.emit("new-request", {
      user: Auth.getToken(),
      id: questionId,
      roomId: roomId,
    });
  };

  const declinerequest = (id, questionId, type) => {
    if (type == "reject") {
      setdeclineReqesut(id);
    }
    socketRef.current.emit("decline-request", {
      user: Auth.getToken(),
      requestId: id,
      questionId: questionId,
    });
  };

  const sendConnection = (receiverId, message) => {
    socketRef.current.emit("add-connection", {
      user: Auth.getToken(),
      receiverId,
      message,
    });

    toast.success("Connection Request Sent");

    // setOpenConnectionModal(false);
  };

  const withdrawRequestData = (userId) => {
    socketRef.current.emit("withdraw-request", {
      user: Auth.getToken(),
      connectionId: userId,
    });
    setwithdrawModel(false);

    toast.success("Request Withdraw Successfully");
  };

  const DeleteAnswer = (answerId) => {
    if (answerId) {
      socketRef.current.emit("delete-answer", {
        answerId: answerId,
        user: Auth.getToken(),
      });
      setOpenModal(false);
      setOpenModalDelete(false);
    }
  };

  const EditAnswer = (answerId, answer) => {
    socketRef.current.emit("edit-answer", {
      answerId: answerId,
      answer: answer,
    });
    setChangeData(!changeData);
    setinputValue("");
    setDataForEdit({});
  };

  useEffect(() => {
    let RequestByRoom;

    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    socketRef.current.emit("login", {
      userId: userId?._id,
    });

    socketRef.current.emit("connection");
    socketRef.current.emit("login", {
      userId: userId?._id,
    });

    socketRef.current.on(GET_ANSWER_FROM_ROOM, function (event) {
      // reload socket
      setQuestionReqution(false);
      console.log("@@@@@@@@@@@@@@@@@@@@", event);
      setResponses(event?.response);
      if (event?.answer == "answer") {
        socketRef.current.emit(GET_ANSWER_FROM_ROOM, {
          user: Auth.getToken(),
          roomId: RoomquestionId,
          roomListId: false,
          roomMakeid: roomId,
        });
      } else {
        setIsFriend(event?.isFriend);

        if (event && event.answer) {
          let messages = [];
          let RequestData = [];

          messages = [...event.answer];

          let allChats = [
            ...messages,
            ...event.request,
            // ...event?.sentRequest,
          ];

          allChats.sort((a, b) =>
            a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
          );

          const Data = event?.request?.filter((item) => {
            return item?.requestBy?._id == userInfo?._id;
          });

          Data?.length > 0
            ? setRequestedBy(Data[Data?.length - 1])
            : setRequestedBy();
          // setRequestedBy(event);
          setAnswers([...allChats]);
        } else {
          setAnswers([]);
        }
      }

      // reload socket end

      // answer-request

      // end answer-request
    });
    socketRef.current.emit(GET_ANSWER_FROM_ROOM, {
      user: Auth.getToken(),
      roomId: RoomquestionId,
      roomListId: false,
      roomMakeid: roomId,
    });

    // answer-request-data

    socketRef.current.on(CHANGE_ANSWER, function (event) {
      socketRef.current.emit(GET_ANSWER_FROM_ROOM, {
        user: Auth.getToken(),
        roomId: RoomquestionId,
        roomListId: false,
        roomMakeid: roomId,
      });
    });

    // total connection

    socketRef.current.on("connection-connected", function (event) {
      //   setgetNotificationCount(event?.notification?.payload?.count);

      setTotalConection(event?.conection?.payload?.connection);
    });

    socketRef.current.emit("connection-connected", {
      user: Auth.getToken(),
    });

    socketRef.current.on("connection-received-sent", function (event) {
      //   setgetNotificationCount(event?.notification?.payload?.count);

      if (event?.conection == "get") {
        socketRef.current.emit("connection-received-sent", {
          user: Auth.getToken(),
        });
      } else {
        setSentConnection(event?.conection?.payload?.findConnection);
      }
    });

    socketRef.current.emit("connection-received-sent", {
      user: Auth.getToken(),
    });

    socketRef.current.on("who-can-see", function (event) {
      if (event?.WhoSee == "get") {
        socketRef.current.emit("who-can-see", {
          user: Auth.getToken(),
          questionId: RoomquestionId,
        });
      } else {
        setWhoIs(event?.WhoSee?.payload?.message);
      }

      //   setgetNotificationCount(event?.notification?.payload?.count);
    });

    socketRef.current.emit("who-can-see", {
      user: Auth.getToken(),
      questionId: RoomquestionId,
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, RoomquestionId, changeData, ChangeQuestion]);

  const sendAnswer = (question, answer, roomId, user_type) => {
    socketRef.current.on(ADD_ANSWER_IN_ROOM, function (event) {
      // setChangeData(!changeData);
    });
    socketRef.current.emit(ADD_ANSWER_IN_ROOM, {
      user: Auth.getToken(),
      question,
      answer,
      roomId,
      status,
      user_type,
    });
  };

  const BlockUser = (roomId) => {
    socketRef.current.emit("block-user", {
      user: Auth.getToken(),
      userId: roomId,
    });
    setOpenModalRemoveQuestionIReceived(false);
    setMyQueryData(false);
    setRequestData(true);
    setanswerLaterData(false);
    setAnswerByme(false);
    history.push("/request");
  };

  const EveryOne = () => {
    socketRef.current.emit("answer-everyone", {
      user: AuthUser._id,
      questionId: RoomquestionId,
      status: 0,
    });

    setWhoCan(!whoCan);
  };

  const OnlySeeAdmin = () => {
    socketRef.current.emit("answer-admin", {
      user: AuthUser._id,
      questionId: RoomquestionId,
      status: 1,
    });

    setWhoCan(!whoCan);
  };

  const AbuseAnswer = (idReportAbuse, reason) => {
    socketRef.current.emit("abuse-answer", {
      user: Auth.getToken(),
      answerId: idReportAbuse,
      reason: reason,
    });
    setInputForReportAbuse("Its Annoying");
    setOpenReportAbuseModal(false);
    setIdReportAbuse("");
    setChangeData(false);
    toast.success("Report Abuse Successfully");
  };

  return {
    answers,
    dataToCheckProfileRequest,
    requestedBy,
    sendAnswer,
    declinerequest,
    newrequest,
    acceptrequest,
    Friend,
    setAnswers,
    DeleteAnswer,
    EditAnswer,
    sendConnection,
    TotalConection,
    SentConnection,
    BlockUser,
    withdrawRequestData,
    EveryOne,
    OnlySeeAdmin,
    WhoIs,
    AbuseAnswer,
    response,
  };
};

export default useAnswers;
