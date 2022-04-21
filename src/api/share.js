import api from "./api";

/*
 * Shares an URL through email by calling the API endpoint.
 *
 * @async
 * @param {String} email The email address to share the URL to.
 * @param {String} url The URL to share.
 * @returns {boolean} If successful, returns true, otherwise returns false.
 */
export default async function share(email, url) {
  const res = await api.post("/share", {
    destination_email: email,
    content_url: url,
  });

  return res.status === 200 && res.data && res.data.status === "OK";
}
