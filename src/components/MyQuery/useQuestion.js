import { useEffect, useRef, useState } from "react";
import { EVENTS } from "react-joyride";
import socketIOClient from "socket.io-client";
import { API } from "../../config/api.config";
import Auth from "../../Helpers/auth";

const SOCKET_SERVER_URL = API.hostUrlForSocket;
const userId = Auth.getUserData();

const useQuestion = () => {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    socketRef.current.emit("connection");
    TotalQuestion();

    return () => {
      socketRef.current.disconnect();
    };
  }, [socketRef]);

  const TotalQuestion = () => {
    socketRef.current.on("get-question", function (event) {});

    socketRef.current.emit("get-question", {
      user: Auth.getToken(),
      question: false,
      byUser: true,
      search: false,
    });
  };

  return { TotalQuestion };
};

export default useQuestion;
