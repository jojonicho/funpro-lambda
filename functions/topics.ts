const axios = require("axios");

const ITEMS_PER_PAGE = 3;

const getRepositories = async (topic: string, page: number) => {
  const TOPICS_URL = `https://api.github.com/search/repositories?q=${topic}&per_page=${ITEMS_PER_PAGE}&page=${page}`;
  const { data } = await axios.get(TOPICS_URL);

  return {
    items: data.items.map(
      ({
        name,
        description,
        featured,
        stargazers_count,
        owner: { avatar_url },
        html_url,
      }) => ({
        name,
        description,
        featured,
        stars: stargazers_count,
        avatar_url,
        html_url,
      })
    ),
  };
};

exports.handler = async (event: any = {}, ctx): Promise<any> => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  // get post body
  const body = JSON.parse(event.body);
  const { topic, page } = body;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: await getRepositories(topic.toLowerCase(), page || 1),
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTION",
    },
  };
};
