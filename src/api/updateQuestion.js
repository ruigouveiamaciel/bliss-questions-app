import api from "./api";

export default async function updateQuestion(data) {
  const res = await api.put(`questions/${data.id}`, data);

  return res.status === 201 ? res.data : false;
}
