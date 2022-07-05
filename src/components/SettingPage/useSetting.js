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

const useSetting = (setBlockUserModal) => {
  const socketRef = useRef();
  const [TotalBlockUser, setTotalBlockUser] = useState();
  //   const userInfo = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    socketRef.current.emit("connection");
    socketRef.current.emit("login", {
      userId: userId?._id,
    });
    socketRef.current.on("get-block-user", function (event) {
      if (event?.blockedUser === "get-block") {
        socketRef.current.emit("get-block-user", {
          user: Auth.getToken(),
          query: "1",
        });
      } else {
        setTotalBlockUser(event?.blockedUser?.payload?.blockUser);
      }
    });

    socketRef.current.emit("get-block-user", {
      user: Auth.getToken(),
      query: "1",
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [socketRef]);

  const UnblockUser = (userId) => {
    socketRef.current.emit("unblock-user", {
      user: Auth.getToken(),
      userId: userId,
    });
    setBlockUserModal(false);
    toast.success("User Unblocked Successfully");
  };

  return { TotalBlockUser, UnblockUser };
};

export default useSetting;
