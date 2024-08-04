const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB}`,
  },
};

export const fetchTMDBPage = async (query: string, page?: number) => {
  if (!page) page = 1;
  const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=${page}`;
  const response = await fetch(url, options);
  const json = await response.json();
  return json;
};
