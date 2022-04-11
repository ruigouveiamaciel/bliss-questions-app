import api from "./api.js";

/*
 * Fetches the API and and retrieves information about a question.
 *
 * @async
 * @param {number} id The id of the question.
 * @returns {(Object|false)} false if the http request failed, otherwise an
 * object containing all the information about the question.
 */
export default async function getQuestionData(id) {
  const res = await api.get(`/questions/${id}`);

  return res.status === 200 ? res.data : false;
}
