// import { Route, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as movieApi from '../services/movie-api';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    movieApi.fetcthActorsMovie(movieId).then(setCast);
  }, [movieId]);
  console.log(cast);
  return (
    <>
      <h2>{cast.name}</h2>
      <p>{cast.profile_path}</p>
    </>
  );
}
