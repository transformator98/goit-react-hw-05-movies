const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'd3b87655564f8a42f6e62db19b735baf'; //Ключ API (v3 auth)
// const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}
//список самых популярных фильмов на сегодня для создания коллекции на главной странице.
export function fetchTrending() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
  );
}
// поиск кинофильма по ключевому слову на странице фильмов.
export function fetchSearchMovie(query) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
  );
  //
}
//запрос полной информации о фильме для страницы кинофильма.
export function fetchDetailsMovie(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  );
}
//запрос информации о актёрском составе для страницы кинофильма.
export function fetcthActorsMovie(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  );
}
//запрос обзоров для страницы кинофильма.
export function fetcthReviewsMovie(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  );
}
