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
import s from './MovieDetailsPage.module.scss';
import Loader from '../../Loader';
import ImagesErrorView from '../../../views/ImagesErrorView';
import Status from '../../../services/Status';
import noImages from '../../../images/no-images.jpg';
import YouTube from 'react-youtube';

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

  const [movie, setMovie] = useState(null);
  const [movieVideo, setMovieVideo] = useState(null);
  const { url, path } = useRouteMatch();
  const prevPage = useRef();
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];
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
      movieApi
        .fetchDetailsMovieVideo(movieId)
        .then(({ results }) => {
          const video = results.map(el => el.key);
          setMovieVideo(video[0]);
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
  }, [location.state]);

  const goBack = () => {
    if (prevPage && prevPage.current) {
      return history.push(prevPage.current);
    }
    history.push(routes.home);
  };

  const opts = {
    height: '300',
    width: '430',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
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
                src={
                  movie.poster_path
                    ? `${IMG_URL}${movie.poster_path}`
                    : noImages
                }
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
                {movieVideo ? (
                  <YouTube videoId={movieVideo} opts={opts} />
                ) : null}
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
