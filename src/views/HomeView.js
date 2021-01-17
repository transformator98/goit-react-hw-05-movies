import PageHeadimg from '../components/PageHeading';
import { useState, useEffect } from 'react';
import * as movieApi from '../services/movie-api';
import ViewItem from './ViewItem';

export default function HomeView() {
  const [trendings, setTrending] = useState(null);

  useEffect(() => {
    movieApi.fetchTrending().then(({ results }) => setTrending(results));
  }, []);
  return (
    <>
      <PageHeadimg text="Популярные сегодня" />

      {trendings && (
        <ul>
          {trendings.map(trending => (
            <ViewItem
              key={trending.id}
              id={trending.id}
              title={trending.title}
            />
          ))}
        </ul>
      )}
    </>
  );
}
