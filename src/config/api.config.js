const protocol = "https"; //live
const host = "api.leaderbridge.com"; // for production live

// const protocol = "https"; //live
// const host = "api.leaderbridge.rejoicehub.com"; // for development  live

// const protocol = "http"; //live
// const host = "192.168.29.48:8088"; // for local live

// const protocol = "http"; //live
// const host = "localhost:8088"; // for local live
const hostUrl = `${protocol}://${host}/api/v1/`;
const hostUrlForSocket = `${protocol}://${host}/`;

export const API = {
  protocol: protocol,
  host: host,
  hostUrl: hostUrl,
  hostUrlForSocket: hostUrlForSocket,
};
