import {
  Switch,
  Route,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import * as movieApi from '../../../services/movie-api';
import s from './MovieDetailsPage.module.css';
import Loader from '../../Loader';
import ImagesErrorView from '../../../views/ImagesErrorView';
import Status from '../../../services/Status';

import Reviews from '../Review';
import Cast from '../Cast';

export default function MovieDetailsPage() {
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';
  const history = useHistory();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { state } = useLocation();

  console.log('hictory', history);
  console.log('location', location);

  useEffect(() => {
    setStatus(Status.PENDING);
    setTimeout(() => {
      movieApi
        .fetchDetailsMovie(movieId)
        .then(res => {
          setMovie(res);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }, 500);
  }, [movieId]);

  const goBack = () => {
    // history.goBack();
    if (!state) {
      history.push('./');
    }

    history.push(state.from);
  };
  console.log(state);

  return (
    <>
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && (
        <ImagesErrorView message={error.message} />
      )}
      {movie && status === Status.RESOLVED && (
        <>
          <section>
            <button className={s.button} onClick={goBack}></button>
            {/* onClick={goBack} */}
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
                  <span className={s.span}>Release: </span> {movie.release_date}
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
          <hr />
          <section>
            <h3>Additional information</h3>
            <ul>
              <li>
                <NavLink
                  activeStyle={{ color: 'green' }}
                  to={{
                    pathname: `/movies/${movieId}/cast`,
                  }}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeStyle={{ color: 'green' }}
                  to={{
                    pathname: `/movies/${movieId}/reviews`,
                  }}
                >
                  Reviews
                </NavLink>
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
      )}
    </>
  );
}
