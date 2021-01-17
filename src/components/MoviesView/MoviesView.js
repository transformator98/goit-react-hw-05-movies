import Searchbar from '../Searchbar';
import { useState, useEffect } from 'react';
import * as movieApi from '../../services/movie-api';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import Loader from '../Loader';
import ImagesErrorView from '../../views/ImagesErrorView';
import ViewItem from '../../views/ViewItem';
import { toast } from 'react-toastify';
import Status from '../../services/Status';

export default function MoviesView() {
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();
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
        if (results.length === 0) {
          toast.error('По вашему запросу нет нужного результата!');
        }
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
            <ViewItem
              key={movie.id}
              id={movie.id}
              title={movie.title}
              from={`${url}${location.search}`}
            />
          ))}
        </ul>
      )}
    </>
  );
}
