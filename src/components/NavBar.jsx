import { NavLink } from "react-router-dom";

const activeNavLink = ({ isActive }) => (isActive ? "active-menu" : "");

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink className={activeNavLink} to="/about">
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink className={activeNavLink} to="/posts">
            Посты
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;
