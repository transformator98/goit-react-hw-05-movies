import PageHeadimg from '../components/PageHeading';
import { Link } from 'react-router-dom';
// import { Link, useRouteMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as movieApi from '../services/movie-api';

export default function HomeView() {
  const [trendings, setTrending] = useState(null);
  // const { url } = useRouteMatch();

  useEffect(() => {
    movieApi.fetchTrending().then(({ results }) => setTrending(results));
  }, []);
  return (
    <>
      <PageHeadimg text="Популярные сегодня" />

      {trendings && (
        <ul>
          {trendings.map(trending => (
            <li key={trending.id}>
              <Link to={`movies/${trending.id}`}>{trending.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
// return (
//   <>
//     <PageHeadimg text="Популярные сегодня" />

//     {trendings && (
//       <ul>
//         {trendings.map(trending => (
//           <li key={trendings.id}>
//             <Link to={`${url}/${trending.id}`}>{trending.title}</Link>
//           </li>
//         ))}
//       </ul>
//     )}
//   </>
// );
