import Searchbar from '../components/Searchbar';
import { useState, useEffect } from 'react';
import * as movieApi from '../services/movie-api';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Loader from '../components/Loader';
import ImagesErrorView from './ImagesErrorView';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesView() {
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const querryName = new URLSearchParams(location.search).get('querry');

  const handleFormSubmit = querry => {
    history.push({
      ...location,
      search: `querry=${querry}`,
    });
  };

  useEffect(() => {
    if (!querryName) {
      return;
    }
    setStatus(Status.PENDING);

    movieApi
      .fetchSearchMovie(querryName)
      .then(({ results }) => {
        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [querryName]);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && (
        <ImagesErrorView message={error.message} />
      )}
      {movies && status === Status.RESOLVED && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
