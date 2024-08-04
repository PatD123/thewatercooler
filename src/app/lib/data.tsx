const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDM3MjE5OTJiYmIzMmJmMWIwZDQwYTg0NjU4YmMzNSIsIm5iZiI6MTcyMjYzOTczMS4zNDc5OTQsInN1YiI6IjY2YTNmM2M1ZDI3MzU0ZTcwODE5YWQwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EnJfazuAAyVhGcmer5aJVCpYLoY6n2ZDKYKfAZTOejs",
  },
};

export const fetchTMDBPage = async (query: string, page?: number) => {
  if (!page) page = 1;
  const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=${page}`;
  const response = await fetch(url, options);
  const json = await response.json();
  return json;
};
