import {
  Switch,
  Route,
  useParams,
  useHistory,
  useLocation,
  useRouteMatch,
  NavLink,
} from 'react-router-dom';
import routes from '../../../routes';
import { useState, useEffect, lazy, Suspense, useRef } from 'react';

import * as movieApi from '../../../services/movie-api';
import s from './MovieDetailsPage.module.css';
import Loader from '../../Loader';
import ImagesErrorView from '../../../views/ImagesErrorView';
import Status from '../../../services/Status';

const Cast = lazy(() => import('../Cast' /* webpackChunkName: "Cast" */));
const Reviews = lazy(() =>
  import('../Review' /* webpackChunkName: "Review" */),
);

export default function MovieDetailsPage() {
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';
  const history = useHistory();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url, path } = useRouteMatch();
  const prevPage = useRef();

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

  useEffect(() => {
    if (location.state && location.state.from) {
      prevPage.current = { ...location.state.from };
    }
  }, []);

  const goBack = () => {
    if (prevPage && prevPage.current) {
      return history.push(prevPage.current);
    }
    history.push(routes.home);
  };

  return (
    <>
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && (
        <ImagesErrorView message={error.message} />
      )}
      {movie && status === Status.RESOLVED && (
        <>
          <section>
            <button
              type="button"
              className={s.button}
              onClick={goBack}
            ></button>

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
                  to={`${url}/cast`}
                  onClick={() =>
                    history.push(history.location?.state?.from || routes.home)
                  }
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeStyle={{ color: 'green' }}
                  to={{
                    pathname: `${url}/reviews`,
                    state: { from: location },
                  }}
                  onClick={() =>
                    history.push(history.location?.state?.from || routes.home)
                  }
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </section>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path={`${path}/cast`}>
                {movie && <Cast movieId={movieId} />}
              </Route>
              <Route path={`${path}/reviews`}>
                {movie && <Reviews movieId={movieId} />}
              </Route>
            </Switch>
          </Suspense>
          <hr />
        </>
      )}
    </>
  );
}
