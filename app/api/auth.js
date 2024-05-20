import client from "./client";

const login = async (email, password) => {
  return await client.post("/auth", { email, password });
};

export default {
  login,
};
