import PageHeadimg from '../components/PageHeading';
import { Route, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as movieApi from '../services/movie-api';

import Reviews from './Reviews';
import Cast from './Cast';

export default function HomeView() {
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    movieApi
      .fetchDetailsMovie(movieId)
      // .then(({ results }) => setMovie(results));
      .then(setMovie);
  }, [movieId]);

  // const genres = movie.genres.map(genres => genres.name);

  return (
    <>
      {movie && (
        <>
          <PageHeadimg text={movie.title} />
          <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>
            Vote average: <span>{movie.vote_average}</span>{' '}
          </p>
          <p>
            Overview: <span>{movie.overview}</span>{' '}
          </p>
          <p>
            Genres: <span>{movie.genres.map(genres => genres.name)}</span>{' '}
          </p>
        </>
      )}
      <hr />

      <Link to={`/movies/${movieId}/cast`}>Cast </Link>

      <Route path="/movies/:movieId/cast">
        {movie && <Cast movieId={movieId} />}
      </Route>

      <Route path="/movies/:movieId/reviews">
        <Reviews />
      </Route>
    </>
  );
}
