// import { Route, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as movieApi from '../services/movie-api';
import notImages from './notImages.png';
import s from './Cast.module.css';

export default function Cast({ movieId }) {
  const [casts, setCasts] = useState(null);
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    movieApi.fetcthActorsMovie(movieId).then(({ cast }) => setCasts(cast));
  }, [movieId]);

  return (
    <>
      {casts && (
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
