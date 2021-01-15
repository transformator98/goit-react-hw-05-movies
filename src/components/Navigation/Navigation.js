import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav>
      <NavLink exact to="/" activeClassName={s.activeLink} className={s.link}>
        Home
      </NavLink>
      <NavLink to="/movies" activeClassName={s.activeLink} className={s.link}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
