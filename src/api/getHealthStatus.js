import api from "./api.js";

/*
 * Fetches the API and checks the server health.
 *
 * @async
 * @returns {boolean} true if the server is healthy, false otherwise.
 */
export default async function getHealthStatus() {
  const res = await api.get("/health");

  return res.status === 200 && res.data.status === "OK";
}
