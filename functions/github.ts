import fetch from "node-fetch";
const GITHUB_API = "https://api.github.com/users/";

const bob = async (username) => {
  const url = GITHUB_API + username;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

exports.handler = async (event: any = {}, ctx): Promise<any> => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  // get post body
  const body = JSON.parse(event.body);
  const username = body.username;
  console.log(username);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: await bob(username),
    }),
  };
};
