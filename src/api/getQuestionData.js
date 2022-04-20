import api from "./api.js";

/*
 * Fetches and returns all the information about the question with the given ID.
 *
 * @async
 * @param {number} id The id of the question.
 * @returns {(Object|false)} If successful, an object containing all the
 * information about the question. False if the the HTTP request was not
 * successful.
 */
export default async function getQuestionData(id) {
  const res = await api.get(`/questions/${id}`);

  return res.status === 200 ? res.data : false;
}
