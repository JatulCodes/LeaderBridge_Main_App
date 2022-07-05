import { useContext, useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { DataLoaded } from "../App";
import { API } from "../config/api.config";

import Auth from "./auth";
const NEW_CHAT_MESSAGE_EVENT = "new-message";
const CHANGE_ANSWER = "check-answer";
const SOCKET_SERVER_URL = API.hostUrlForSocket;
// const SOCKET_SERVER_URL = "https://api.leaderbridge.rejoicehub.com/";
const userId = Auth.getUserData();

const useLastMessages = (lastChangeData) => {
  const [message, setMessages] = useState([]);
  const socketRef = useRef();
  const { answer, myquery, request, answerLaterUser, AlldataMessageFun } =
    useContext(DataLoaded);

  const [AlldataMessage, setAlldataMessage] = AlldataMessageFun;

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    // socketRef.current.emit("login", {
    //   userId: userId?._id,
    // });
    socketRef.current.emit("connection");

    socketRef.current.on("chat-room", function (event) {
      if (event && event?.room) {
        setMessages([...event?.room]);
      }
    });

    socketRef.current.emit("chat-room", {
      user: Auth.getToken(),
    });

    socketRef.current.on(CHANGE_ANSWER, function (event) {
      socketRef.current.emit("chat-room", {
        user: Auth.getToken(),
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [lastChangeData, socketRef, AlldataMessage]);

  return { message };
};

export default useLastMessages;
