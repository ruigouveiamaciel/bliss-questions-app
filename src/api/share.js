import api from "./api";

export default async function share(email, url) {
  const res = await api.post("/share", {
    destination_email: email,
    content_url: url,
  });

  return res.status === 200 && res.data.status === "OK";
}
