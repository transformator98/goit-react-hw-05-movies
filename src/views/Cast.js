import { useState, useEffect } from 'react';
import * as movieApi from '../services/movie-api';
import notImages from './notImages.png';
import s from './Cast.module.css';
import Loader from '../components/Loader';
import ImagesErrorView from './ImagesErrorView';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function Cast({ movieId }) {
  const [casts, setCasts] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    setStatus(Status.PENDING);
    setTimeout(() => {
      movieApi
        .fetcthActorsMovie(movieId)
        .then(({ cast }) => {
          setCasts(cast);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }, 500);
  }, [movieId]);

  return (
    <>
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && (
        <ImagesErrorView message={error.message} />
      )}
      {casts && status === Status.RESOLVED && (
        <ul className={s.list}>
          {casts.map(cast => (
            <li className={s.item} key={cast.id}>
              {cast.profile_path ? (
                <img
                  src={`${IMG_URL}${cast.profile_path}`}
                  width="100"
                  height="150"
                  alt={cast.name}
                />
              ) : (
                <img
                  className={s.images}
                  src={notImages}
                  width="100"
                  height="150"
                  alt={cast.name}
                />
              )}

              <p className={s.title}>{cast.name}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
