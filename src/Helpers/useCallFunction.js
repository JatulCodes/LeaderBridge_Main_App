import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import socketIOClient from "socket.io-client";
import { DataLoaded } from "../App";
import { API } from "../config/api.config";
import Auth from "./auth";
const NEW_CHAT_MESSAGE_EVENT = "new-message";
const CHANGE_ANSWER = "check-answer";
const SOCKET_SERVER_URL = API.hostUrlForSocket;
// const SOCKET_SERVER_URL = "https://api.leaderbridge.rejoicehub.com/";
const userId = Auth.getUserData();

const useCallFunction = (
  userId,
  setBlockUserModel,
  setLastChangeData,
  lastChangeData
) => {
  console.log("userId", userId);
  // const [callData, setCallData] = useState([]);
  // const [rejectData, setRejectData] = useState([]);
  // const [acceptData, setAcceptData] = useState([]);
  const socketRef = useRef();
  const { ChatCallData, ChatacceptData, ChatReject } = useContext(DataLoaded);
  const [acceptData, setAcceptData] = ChatacceptData;
  const [callData, setCallData] = ChatCallData;
  const [rejectData, setRejectData] = ChatReject;

  console.log("acce33444443", acceptData);

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    socketRef.current.emit("login", {
      userId: userId?._id,
    });

    socketRef.current.emit("connection");

    socketRef.current.emit("join-profile", {
      profileId: userId,
    });

    socketRef.current.on("onCallRequest", function (event) {
      !acceptData && setCallData(event);
    });

    socketRef.current.on("onAcceptCall", function (event) {
      setAcceptData(event);
    });

    socketRef.current.on("onRejectCall", function (event) {
      if (acceptData) {
        if (acceptData === rejectData) {
          setRejectData(event);
        }
      } else {
        setRejectData(event);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId]);

  const makeCallRequest = (channelName, otherId, isForVideoCall, token) => {
    socketRef.current.emit("connectCall", {
      channelName,
      otherId,
      isForVideoCall,
      token,
    });
    // setCallForCHange(!callForChange);
  };

  const acceptCallRequest = (channelData) => {
    socketRef.current.emit("acceptCall", channelData);
  };

  const rejectCallRequest = (channelData) => {
    console.log("channelData", channelData);
    socketRef.current.emit("rejectCall", channelData);
  };

  const BlockUser = (userId) => {
    socketRef.current.emit("block-user", {
      user: Auth.getToken(),
      userId: userId,
    });
    // setBlockUserModel(false);
    setBlockUserModel(false);
    setLastChangeData(!lastChangeData);
    toast.success("User Blocked Successfully");
  };

  return {
    makeCallRequest,
    acceptCallRequest,
    rejectCallRequest,
    BlockUser,
  };
};

export default useCallFunction;
