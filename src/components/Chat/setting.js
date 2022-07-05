import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "4d3caf0e1c234c1cae229906aa6dd002";
const token =
  "006cfc5828d95354c0aabf836481b92100fIABP613+Vo0VCeTZX1wRrnRwoGeiMF+i86toj6w7lhzLWHOH4eYAAAAAEAC7nPWLLhT6YQEAAQAtFPph";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "vijay";
