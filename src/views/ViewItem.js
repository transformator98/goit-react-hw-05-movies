import { useLocation, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import slugify from 'slugify';
import noImages from '../images/no-images.jpg';

export default function ViewItem({ id, title, images, rating }) {
  const location = useLocation();
  const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

  const makeSlug = string =>
    slugify(string, {
      lower: true,
    });
  return (
    <li key={id} className="movies__item">
      <NavLink
        to={{
          pathname: `/movies/${makeSlug(`${title} ${id}`)}`,
          state: { from: location },
        }}
      >
        <div className="movies__images_container"></div>
        <img
          className="movies__images"
          src={images ? `${IMG_URL}${images}` : noImages}
          // src={`${IMG_URL}${images}`}
          alt={title}
          width="300"
        />

        <p className="movies__title">{title}</p>
        <p className="movies__item-rating">{rating}</p>
      </NavLink>
    </li>
  );
}
ViewItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
};
