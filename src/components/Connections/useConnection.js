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

const useConnection = (
  setIsLoaderVisible,
  setDeclineModal,
  setBlockUserModel,
  setRemoveUserModel,
  setWithdrawReuestModel
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
    TotalConnectionData();
    PendingConnectionData();
    SentConnectionData();

    return () => {
      socketRef.current.disconnect();
    };
  }, [socketRef]);

  const TotalConnectionData = () => {
    setIsLoaderVisible(false);
    socketRef.current.on("connection-connected", function (event) {
      //   setgetNotificationCount(event?.notification?.payload?.count);
      setTotalConection(event?.conection?.payload?.connection?.reverse());
    });

    socketRef.current.emit("connection-connected", {
      user: Auth.getToken(),
    });
    setIsLoaderVisible(false);
  };

  const PendingConnectionData = () => {
    setIsLoaderVisible(false);
    socketRef.current.on("connection-received", function (event) {
      //   setgetNotificationCount(event?.notification?.payload?.count);
      if (event?.conection == "get") {
        socketRef.current.emit("connection-received", {
          user: Auth.getToken(),
        });
      } else {
        setPendingConection(event?.conection?.payload?.findConnection);
      }
    });

    socketRef.current.emit("connection-received", {
      user: Auth.getToken(),
    });
    setIsLoaderVisible(false);
  };

  const SentConnectionData = () => {
    setIsLoaderVisible(false);
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
    setIsLoaderVisible(false);
  };

  const acceptConnectionrequest = (accepted, requestId, connectionId) => {
    socketRef.current.emit("accept-connection", {
      user: Auth.getToken(),
      accepted: accepted,
      receiverId: requestId,
      connectionId: connectionId,
    });
  };

  const declineRequest = (senderId, connectionId) => {
    socketRef.current.emit("decline-connection", {
      user: Auth.getToken(),
      senderId: senderId,
      connectionId: connectionId,
    });
    setDeclineModal(false);
  };

  const BlockUser = (userId) => {
    socketRef.current.emit("block-user", {
      user: Auth.getToken(),
      userId: userId,
    });
    setBlockUserModel(false);
  };

  const RemoveUserConnection = (remove, removeId) => {
    socketRef.current.emit("remove-user", {
      user: Auth.getToken(),
      remove: remove,
      removeId: removeId,
    });
    setRemoveUserModel(false);
  };

  //   const starMessage = (messageId, userId, star) => {
  //     socketRef.current.emit("star-messages", {
  //       messageId: messageId,
  //       userId: userId,
  //       star: star,
  //     });
  //     setAnswerReplayMenu("");
  //     setChangeData(!changeData);
  //   };

  const withDrawRequestData = (userId) => {
    socketRef.current.emit("withdraw-request", {
      user: Auth.getToken(),
      connectionId: userId,
    });
    setWithdrawReuestModel(false);
    toast.success("Request Withdraw Successfully");
  };

  return {
    TotalConection,
    PendingConnectionData,
    PendingConection,
    SentConnection,
    SentConnectionData,
    acceptConnectionrequest,
    declineRequest,
    BlockUser,
    RemoveUserConnection,
    withDrawRequestData,
  };
};

export default useConnection;
