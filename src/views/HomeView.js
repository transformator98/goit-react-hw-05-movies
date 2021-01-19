import PageHeadimg from '../components/PageHeading';
import { useState, useEffect } from 'react';
import * as movieApi from '../services/movie-api';
import ViewItem from './ViewItem';
import './HomeView.scss';

export default function HomeView() {
  const [trendings, setTrending] = useState(null);

  useEffect(() => {
    movieApi.fetchTrending().then(({ results }) => setTrending(results));
  }, []);
  return (
    <>
      <PageHeadimg text="Популярные сегодня" />

      {trendings && (
        <ul className="movies">
          {trendings.map(trending => (
            <ViewItem
              key={trending.id}
              images={trending.poster_path}
              id={trending.id}
              title={trending.title}
            />
          ))}
        </ul>
      )}
    </>
  );
}
