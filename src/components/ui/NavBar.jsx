import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn, getIsAdmin} from "../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  // const isAdmin=useSelector(getIsAdmin())

  return (
    <nav className="navbar navbar-light-hover-color   mb-3 ">
      <div className="container-md ">
        <ul className="nav nav-pills  justify-content-center">
          <li className="nav-item background:fff">
            <Link className="nav-link active" to="/">
              Main
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/rooms">
              Отели
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/userPage">
                Выбранные отели
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {/*{isLoggedIn && isAdmin && <Link className="nav-link" to="/admin">*/}
          {/*  Admin*/}
          {/*</Link> }*/}
          {/*    {isLoggedIn ? (*/}
          {/*  <NavProfile />*/}
          {/*) : (*/}
            <Link className="nav-link" to="/login">
              Войти
            </Link>
          {/*)}*/}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
