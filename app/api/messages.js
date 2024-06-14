import client from "./client";

const send = async (message, listingId) => {
  return client.post("/messages", { message, listingId });
};

export default {
  send,
};
