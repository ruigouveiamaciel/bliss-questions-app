import api from "./api.js";

/*
 * Returns whether or not the API is healthy.
 *
 * @async
 * @returns {boolean} true if the api is healthy, false otherwise.
 */
export default async function getHealthStatus() {
  const res = await api.get("/health");

  return res.status === 200 && res.data && res.data.status === "OK";
}
