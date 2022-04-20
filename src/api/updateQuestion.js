import api from "./api";

/*
 * Updates a question by calling the the API endpoint.
 *
 * @async
 * @param {Object} data The new question data. This object must contain the id
 * of the question.
 * @returns {boolean} True if the update was successful, false otherwise.
 */
export default async function updateQuestion(data) {
  const res = await api.put(`questions/${data.id}`, data);

  return res.status === 201 ? res.data : false;
}
