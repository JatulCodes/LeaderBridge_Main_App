import { useEffect, useRef, useState } from "react";
import { EVENTS } from "react-joyride";
import socketIOClient from "socket.io-client";
import { API } from "../../../config/api.config";
import Auth from "../../../Helpers/auth";

const SOCKET_SERVER_URL = API.hostUrlForSocket;

// const SOCKET_SERVER_URL = "https://api.leaderbridge.rejoicehub.com/";

const userId = JSON.parse(localStorage.getItem("userData"));

const Usesignin = () => {
  const socketRef = useRef();
  //   const userInfo = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    // console.log("roomIdIn", roomId);
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    socketRef.current.emit("login", {
      userId: userId?._id,
    });
    socketRef.current.emit("connection");

    return () => {
      socketRef.current.disconnect();
    };
  }, [socketRef]);

  const LoginConnection = (userId) => {
    socketRef.current.emit("login", {
      userId,
    });
  };

  return {
    LoginConnection,
  };
};

export default Usesignin;
