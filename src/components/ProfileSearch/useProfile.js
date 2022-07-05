import { useEffect, useRef, useState } from "react";
import { EVENTS } from "react-joyride";
import socketIOClient from "socket.io-client";
import { API } from "../../config/api.config";
import Auth from "../../Helpers/auth";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const NEW_NOTIFICATION_EVENTS = "get-notification";
const NEW_NOTIFICATION_COUNT = "get-notification-count";

const SOCKET_SERVER_URL = API.hostUrlForSocket;
const userId = Auth.getUserData();

// const SOCKET_SERVER_URL = "https://api.leaderbridge.rejoicehub.com/";

const useProfile = (
  setOpenModal,
  setCustomMessage,
  getSearchedUserData,
  setOpenWithdrawModal,
  setConnectionId
) => {
  const [TotalConection, setTotalConection] = useState();
  const [PendingConection, setPendingConection] = useState();
  const [SentConnection, setSentConnection] = useState();
  const socketRef = useRef();
  //   const userInfo = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    socketRef.current.emit("login", {
      userId: userId?._id,
    });
    socketRef.current.emit("connection");

    return () => {
      socketRef.current.disconnect();
    };
  }, [socketRef]);

  const sendConnection = (receiverId, message) => {
    socketRef.current.emit("add-connection", {
      user: Auth.getToken(),
      receiverId,
      message,
    });
    setCustomMessage("Hi, I want to connect with you ..");
    getSearchedUserData();
    setOpenModal(false);
    toast.success("Connection Request Send successfully");
  };

  const withDrawRequestData = (connectionId) => {
    socketRef.current.emit("withdraw-request", {
      user: Auth.getToken(),
      connectionId: userId,
    });

    setConnectionId("");
    setOpenWithdrawModal(false);
    getSearchedUserData();

    toast.success("Request Withdraw Successfully");
  };

  return { sendConnection, withDrawRequestData };
};

export default useProfile;
