import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ViewItem({ id, title }) {
  const location = useLocation();

  return (
    <li key={id}>
      <Link
        to={{
          pathname: `/movies/${id}`,
          state: { from: location },
        }}
      >
        {title}
      </Link>
    </li>
  );
}
ViewItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
};
