import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function ViewItem({ id, title }) {
  const location = useLocation();
  return (
    <li key={id}>
      <Link
        to={{
          pathname: `/movies/${id}/`,
          state: { from: location },
        }}
      >
        {title}
      </Link>
    </li>
  );
}
