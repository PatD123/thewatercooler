"use server";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB}`,
  },
};

export const fetchTMDBPage = async (
  query: string,
  qtype: string,
  page?: number
) => {
  if (!page) page = 1;
  let url = "";
  if (qtype === "Favorite TV Show" || qtype === "Current TV Show")
    url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=${page}`;
  else
    url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
  const response = await fetch(url, options);
  const json = await response.json();
  return json;
};

export const getPopular = async () => {
  const url = "https://api.themoviedb.org/3/trending/tv/week?language=en-US";
  const response = await fetch(url, options);
  const json = await response.json();
  return json;
};
