import { useLocation, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ViewItem({ id, title, images }) {
  const location = useLocation();
  const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
  return (
    <li key={id} className="movies__item">
      <NavLink
        // className="movies__item"
        to={{
          pathname: `/movies/${id}`,
          state: { from: location },
        }}
      >
        <img src={`${IMG_URL}${images}`} alt={title} width="300" />
        {title}
      </NavLink>
    </li>
  );
}
ViewItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
};
