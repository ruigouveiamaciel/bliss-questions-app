import api from "./api.js";

/*
 * Fetches the API and retrieves a list of questions.
 *
 * @async
 * @param {number} limit Number of questions to fetch.
 * @param {number} offset Number of questions to skip.
 * @param {String|undefined} filter The search filter.
 * @returns {(Array|false)} false if the http request failed, otherwise an array
 * of questions according to the API specification.
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
