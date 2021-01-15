const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'd3b87655564f8a42f6e62db19b735baf'; //Ключ API (v3 auth)
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

// 'https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}' - базовый запрос

//'https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}' - список самых популярных фильмов на сегодня для создания коллекции на главной странице.

// 'https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&language=en-US&page=1&include_adult=false' - поиск кинофильма по ключевому слову на странице фильмов.

// 'https://api.themoviedb.org/3/movie/{movie_id}?api_key=${API_KEY}&language=en-US' - запрос полной информации о фильме для страницы кинофильма.

// 'https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=${API_KEY}&language=en-US' - запрос информации о актёрском составе для страницы кинофильма.

// 'https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=${API_KEY}&language=en-US&page=1' - запрос обзоров для страницы кинофильма.

const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'Accept-Charset': 'utf-8',
  },
};

const fetchApi = () => {
  return fetch(url, options).then(response => console.log(response));
};

export default fetchApi;
