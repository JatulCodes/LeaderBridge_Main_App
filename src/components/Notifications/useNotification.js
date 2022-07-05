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
const CHANGE_ANSWER = "check-answer";

// const SOCKET_SERVER_URL = "https://api.leaderbridge.rejoicehub.com/";

const useNotification = () => {
  const location = useLocation();
  const socketRef = useRef();
  //   const userInfo = JSON.parse(localStorage.getItem("userData"));
  const [getNotificationData, setGetNotificationData] = useState();
  const [getNotificationCount, setgetNotificationCount] = useState();
  const [slectLoader, setSectLoader] = useState(false);
  const [unseenMessage, setUnseenMessage] = useState([]);

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    socketRef.current.emit("login", {
      userId: userId?._id,
    });

    socketRef.current.emit("connection");

    socketRef.current.on(NEW_NOTIFICATION_COUNT, function (event) {
      setgetNotificationCount(event?.notification?.payload?.count);
    });

    socketRef.current.on("get-notification-count-request", function (event) {
      if (event?.notification === true) {
        socketRef.current.emit("get-notification-count-request", {
          user: Auth.getToken(),
        });
      }
    });

    socketRef.current.emit("get-notification-count-request", {
      user: Auth.getToken(),
    });

    socketRef.current.emit("chat-room", {
      user: Auth.getToken(),
    });

    socketRef.current.on(CHANGE_ANSWER, function (event) {
      socketRef.current.emit("chat-room", {
        user: Auth.getToken(),
      });
    });

    socketRef.current.on("chat-room", function (event) {
      console.log("event!!!!!!!!!!!!!", event?.room);
      setUnseenMessage(event?.room);
    });

    return () => {
      socketRef.current.disconnect();
      setSectLoader(false);
    };
  }, [socketRef]);

  console.log("getNotificationData", getNotificationData);

  const ClickBaleIcon = () => {
    socketRef.current.emit("get-notification-count-request", {
      user: Auth.getToken(),
    });
  };

  const UserGetnotification = () => {
    setSectLoader(true);
    socketRef.current.emit("get-notification-request", {
      user: Auth.getToken(),
      status: false,
    });
    socketRef.current.on(NEW_NOTIFICATION_EVENTS, function (event) {
      setGetNotificationData(event?.notification?.payload?.notification);
      if (event?.notification?.payload?.notification?.length > 0) {
        setSectLoader(false);
      } else if (event?.notification?.payload?.notification?.length === 0) {
        setSectLoader(false);
      }
      ClickBaleIcon();
      // messages.push(event);
      // setMessages([...messages]);
    });
    socketRef.current.on("get-notification-request", function (event) {
      if (event?.notification === true) {
        socketRef.current.emit("get-notification-request", {
          user: Auth.getToken(),
          status: false,
        });
      }
      // messages.push(event);
      // setMessages([...messages]);
    });

    // setSectLoader(false);
  };

  if (getNotificationCount) {
    socketRef.current.emit("get-notification-count-request", {
      user: Auth.getToken(),
    });
  }

  return {
    getNotificationData,
    getNotificationCount,
    ClickBaleIcon,
    UserGetnotification,
    slectLoader,
    unseenMessage,
  };
};

export default useNotification;
