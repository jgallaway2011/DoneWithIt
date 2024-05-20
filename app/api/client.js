import { create } from "apisauce";
import { IP_ADDRESS, PORT } from "@env";

import cache from "../utility/cache";

const apiClient = create({
  baseURL: `http://${IP_ADDRESS}:${PORT}/api`,
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default apiClient;