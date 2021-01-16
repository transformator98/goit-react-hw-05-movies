// import PageHeadimg from '../components/PageHeading';

import {
  Switch,
  Route,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as movieApi from '../services/movie-api';
import s from './MovieDetailsPage.module.css';

import Reviews from './Reviews';
import Cast from './Cast';

export default function MovieDetailsPage() {
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';
  const hictory = useHistory();
  // const location = useLocation();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  // console.log('hictory', hictory);
  // console.log('location', location);

  useEffect(() => {
    movieApi
      .fetchDetailsMovie(movieId)
      // .then(({ results }) => setMovie(results));
      .then(setMovie);
  }, [movieId]);

  // const genres = movie.genres.map(genres => genres.name);

  const goBack = () => {
    hictory.goBack();
  };

  return (
    <>
      {movie && (
        <section>
          {/* <PageHeadimg text={movie.title} /> */}
          <button className={s.button} onClick={goBack}></button>
          <div className={s.movie}>
            <img
              className={s.images}
              src={`${IMG_URL}${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={s.text}>
              <h2>{movie.title}</h2>
              <p className={s.title}>
                <span className={s.span}>Vote average: </span>{' '}
                {movie.vote_average}
              </p>
              <p className={s.title}>
                <span className={s.span}>Overview: </span> {movie.overview}
              </p>
              <p className={s.title}>
                <span className={s.span}>Genres: </span>

                {movie.genres.map(genres => genres.name).join(', ')}
              </p>
            </div>
          </div>
        </section>
      )}
      <hr />
      <section>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/cast`}>Cast </Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`}>Reviews </Link>
          </li>
        </ul>
      </section>

      <Switch>
        <Route path="/movies/:movieId/cast">
          {movie && <Cast movieId={movieId} />}
        </Route>
        <Route path="/movies/:movieId/reviews">
          {movie && <Reviews movieId={movieId} />}
        </Route>
      </Switch>
      <hr />
    </>
  );
}
