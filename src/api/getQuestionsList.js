import api from "./api.js";

/*
 * Fetches and returns a list of questions.
 *
 * @async
 * @param {number} limit Number of questions to fetch.
 * @param {number} offset Number of questions to skip.
 * @param {String|undefined} filter The search filter, optional.
 * @returns {(Array|false)} If successful, an array of objects containing
 * information on every fetched question. False if the HTTP request was not
 * successful.
 */
export default async function getQuestionsList(
  limit,
  offset = 0,
  filter = undefined
) {
  const res = await api.get("/questions", {
    params: {
      limit,
      offset,
      filter,
    },
  });

  return res.status === 200 ? res.data : false;
}
