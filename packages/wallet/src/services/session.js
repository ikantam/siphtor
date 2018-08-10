
export default async function () {
  const response = await axios.post('/api/session');
  return response.json;
}
