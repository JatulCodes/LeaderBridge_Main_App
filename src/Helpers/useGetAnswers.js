import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import socketIOClient from "socket.io-client";
import { API } from "../config/api.config";
import Auth from "./auth";
const GET_ALL_ANSWER_ROOM = "answer-room";

const ADD_ANSWER_IN_ROOM = "add-answer";
const GET_ANSWER_FROM_ROOM = "answer";
const CHANGE_ANSWER = "check-answer";
const SOCKET_SERVER_URL = API.hostUrlForSocket;
const userId = Auth.getUserData();

// const SOCKET_SERVER_URL = "https://api.leaderbridge.rejoicehub.com/";

const useGetAnswers = (
  questionId,
  roomId,
  changeData,
  setChangeData,
  displayStarMessagesList,
  setIdForEdit,
  setisEditable,
  setOpenModelAnswerRemove,
  setAnswerPut,
  setCustomMessage,
  setOpenModal,
  setBlockUserModel,
  setwithdrawModel,
  chatData,
  setUnblockuser,
  setQuestReqest,
  setdeclineReqesut,
  setQuestionReqution
) => {
  const [Toplocation, setToplocation] = useState();
  const [Friend, setFriend] = useState({});
  const [answerRooms, setAnswerRooms] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [dataToCheckProfileRequest, setDataToCheckProfileRequest] =
    useState("");
  const [requestedBy, setRequestedBy] = useState({});
  const socketRef = useRef();
  const socketRefGetAnswer = useRef();
  const [SentConnection, setSentConnection] = useState();
  const [response, setResponses] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userData"));
  const [Blocked, setBlocked] = useState();

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

  const newrequest = (id) => {
    setQuestionReqution(true);
    socketRef.current.emit("new-request", {
      user: Auth.getToken(),
      id: id,
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

  const DeleteAnswer = (answerId) => {
    if (answerId) {
      socketRef.current.emit("delete-answer", {
        answerId: answerId,
        user: Auth.getToken(),
      });
      setIdForEdit("");
      setChangeData(!changeData);
      setisEditable(false);
      setOpenModelAnswerRemove(false);
    }
  };

  const EditAnswer = (answerId, answer) => {
    socketRef.current.emit("edit-answer", {
      answerId: answerId,
      answer: answer,
    });
    // setChangeData(!changeData);
    // setinputValue("");
    // setDataForEdit({});
    setAnswerPut("");
    setisEditable(false);
    setIdForEdit("");
    setChangeData(!changeData);
  };

  useEffect(() => {
    // get all RoomID
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    socketRef.current.emit("login", {
      userId: userId?._id,
    });

    socketRef.current.emit("connection");

    socketRef.current.on(GET_ALL_ANSWER_ROOM, function (event) {
      setQuestionReqution(false);
      event && setAnswerRooms([...event]);
      var mf = 1;
      var m = 0;
      var item;
      for (var i = 0; i < event.length; i++) {
        for (var j = i; j < event.length; j++) {
          if (event[i].createdBy.region == event[j].createdBy.region) {
            m++;
          }
          if (mf < m) {
            mf = m;
            item = event[i].createdBy.region;
          } else if (mf <= m) {
            mf = m;
            item = event[i].createdBy.region;
          }
        }
        m = 0;
      }

      setToplocation(item);
    });

    socketRef.current.emit(GET_ALL_ANSWER_ROOM, {
      user: Auth.getToken(),
      question: questionId,
    });

    socketRef.current.on(CHANGE_ANSWER, function (event) {
      socketRef.current.emit(GET_ALL_ANSWER_ROOM, {
        user: Auth.getToken(),
        question: questionId,
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [changeData, socketRef]);

  useEffect(() => {
    // get all RoomID
    if (roomId) {
      socketRefGetAnswer.current = socketIOClient(SOCKET_SERVER_URL);
      socketRef.current.emit("login", {
        userId: userId?._id,
      });

      socketRefGetAnswer.current.emit("connection");

      socketRefGetAnswer.current.emit(GET_ANSWER_FROM_ROOM, {
        user: Auth.getToken(),
        roomId: false,
        roomListId: roomId,
        roomMakeid: roomId,
      });

      socketRefGetAnswer.current.on(GET_ANSWER_FROM_ROOM, function (event) {
        setResponses(event?.response);

        let answer = event.answer;
        if (event && event.answer) {
          setFriend(event);

          let messages = [];
          if (displayStarMessagesList === true && answer) {
            messages = answer.filter((message) => {
              return message?.isStar;
            });
          } else {
            // setAnswers([...answer]);
            messages = [...answer];
          }

          let allChats = [
            ...messages,
            ...event?.request,
            // ...event?.sentRequest,
          ];
          allChats.sort((a, b) =>
            a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
          );

          // let AddNewMessage = [];
          // AddNewMessage = [...event?.receivedRequest, ...event?.sentRequest];
          // AddNewMessage.sort((a, b) =>
          //   a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
          // );

          const Data = event?.request?.filter((item) => {
            return item?.requestBy?._id == userInfo?._id;
          });

          Data?.length > 0
            ? setRequestedBy(Data[Data?.length - 1])
            : setRequestedBy();
          // setRequestedBy(event);
          setAnswers([...allChats]);
        } else {
        }
      });
      socketRefGetAnswer.current.on(CHANGE_ANSWER, function (event) {
        socketRefGetAnswer.current.emit(GET_ANSWER_FROM_ROOM, {
          user: Auth.getToken(),
          roomId: false,
          roomListId: roomId,
          roomMakeid: roomId,
        });
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

      // block user

      blockUserstatus();

      return () => {
        socketRefGetAnswer.current.disconnect();
      };
    }
  }, [roomId, changeData, displayStarMessagesList, socketRefGetAnswer]);

  const addAnswer = (question, answer, roomId) => {
    socketRefGetAnswer.current.emit(ADD_ANSWER_IN_ROOM, {
      user: Auth.getToken(),
      question,
      answer,
      roomId,
    });
  };

  // block user status

  const blockUserstatus = () => {
    if (chatData?.createdBy?._id) {
      socketRef.current.on("get-block-status", function (event) {
        if (event?.blockedUser == "get-block") {
          socketRef.current.emit("get-block-status", {
            user: Auth.getToken(),
            userId: chatData?.createdBy?._id,
          });
        } else {
          setBlocked(event?.blockedUser?.payload?.isBlocked);
        }
      });

      socketRef.current.emit("get-block-status", {
        user: Auth.getToken(),
        userId: chatData?.createdBy?._id,
      });
    }
  };

  const sendConnection = (receiverId, message) => {
    socketRefGetAnswer.current.emit("add-connection", {
      user: Auth.getToken(),
      receiverId: receiverId,
      message: message,
    });
    setCustomMessage("Hi, I want to connect with you ..");
    setOpenModal(false);
    setFriend({
      answer: Friend.answer,
      request: Friend.request,
      isFriend: "pending",
    });
    toast.success("Connection Request Sent");
  };

  const BlockUser = (userId) => {
    socketRef.current.emit("block-user", {
      user: Auth.getToken(),
      userId: userId,
    });
    setBlockUserModel(false);
    toast.success("User Blocked Successfully");
  };

  const GetBlockUser = (query) => {
    socketRefGetAnswer.current.on("get-block-user", function (event) {
      // answers.push(event);
      // setAnswers([...answers]);
      setChangeData(!changeData);
    });
    socketRefGetAnswer.current.emit("get-block-user", {
      user: Auth.getToken(),
      query,
    });
  };

  const withDrawRequestData = (userId) => {
    socketRef.current.emit("withdraw-request", {
      user: Auth.getToken(),
      connectionId: userId,
    });
    setBlockUserModel(false);
    setFriend({
      answer: Friend.answer,
      request: Friend.request,
      isFriend: "false",
    });
    setwithdrawModel(false);
    toast.success("Request withdrawn successfully");
  };

  const UnBlockuser = () => {
    socketRef.current.emit("unblock-user", {
      user: Auth.getToken(),
      userId: chatData?.createdBy?._id,
    });
    setUnblockuser(false);
    toast.success("User unblocked successfully");
  };

  return {
    answerRooms,
    answers,
    requestedBy,
    addAnswer,
    acceptrequest,
    declinerequest,
    newrequest,
    Friend,
    DeleteAnswer,
    EditAnswer,
    setFriend,
    Toplocation,
    sendConnection,
    SentConnection,
    BlockUser,
    GetBlockUser,
    withDrawRequestData,
    Blocked,
    UnBlockuser,
    response,
  };
};

export default useGetAnswers;
