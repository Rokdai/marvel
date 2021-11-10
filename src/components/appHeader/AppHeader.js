import "./appHeader.scss";
import { Link, NavLink } from "react-router-dom";

export const AppHeader = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "app__menu__active-link" : null
              }
            >
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink
              to="/comicsList"
              className={({ isActive }) =>
                isActive ? "app__menu__active-link" : null
              }
            >
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
