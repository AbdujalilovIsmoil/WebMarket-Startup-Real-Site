import { links } from "data";
import { storage } from "services";
import { get, truncate } from "lodash";
import { Icon } from "assets/images/png";
import { Button } from "components/field";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_NAVBAR, CLOSE_NAVBAR } from "store/actions";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FiSun,
  FiMenu,
  FaTimes,
  CgProfile,
  CgWebsite,
  WiMoonAltNew,
} from "assets/icons";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const username = storage.get("username");
  const { navbar } = useSelector((state) => state);
  const [dataUserName, setDataUserName] = useState("");
  const [themeColorState, setThemeColorState] = useState(
    JSON.parse(storage.get("theme")) || false
  );

  useEffect(() => {
    setDataUserName(username);
  }, [username]);

  const themeFunction = () => {
    if (themeColorState) {
      storage.set("theme", JSON.stringify(true));
      document.body.classList.add("light");
      setThemeColorState((preThemeState) => !preThemeState);
    } else {
      storage.set("theme", JSON.stringify(false));
      document.body.classList.remove("light");
      setThemeColorState((preThemeState) => !preThemeState);
    }
  };

  useEffect(() => {
    if (themeColorState) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, []);

  const token = storage.get("token") || "";

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="nav-intro">
            {location.pathname === "/" && (
              <div className="nav-intro-menu">
                {navbar ? (
                  <FaTimes
                    className="nav-intro-menu__icon"
                    onClick={() => dispatch(CLOSE_NAVBAR())}
                  />
                ) : (
                  <FiMenu
                    className="nav-intro-menu__icon"
                    onClick={() => dispatch(OPEN_NAVBAR())}
                  />
                )}
              </div>
            )}

            <Link className="nav-intro-link" to="/">
              <img
                src={Icon}
                alt="Intro"
                title="Intro"
                className="nav-intro-link__img"
              />
              <h1 className="nav-intro-link__title">WebMarket</h1>
            </Link>
          </div>
          <ul className="nav-list">
            {links?.length > 0 &&
              links?.map((el) => (
                <li className="nav-list-item" key={el.id}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-list-item__link nav-list-item__link--active"
                        : "nav-list-item__link"
                    }
                    to={el.link}
                  >
                    {el.title}
                  </NavLink>
                </li>
              ))}
          </ul>
          <div className="nav-buttons">
            {token ? (
              <div className="nav-buttons-dropDown">
                <Button type="button" className="nav-buttons-dropDown-btn">
                  <h4 className="nav-buttons-dropDown-btn__name">
                    {truncate(dataUserName, {
                      length: 1,
                      omission: "",
                    })}
                  </h4>
                </Button>
                <ul className="nav-buttons-dropDown-list">
                  <li className="nav-buttons-dropDown-list-item">
                    <Link
                      to="pages/profile"
                      className="nav-buttons-dropDown-list-item-link"
                    >
                      Profile
                      <CgProfile className="nav-buttons-dropDown-list-item-link__icon" />
                    </Link>
                  </li>
                  <li className="nav-buttons-dropDown-list-item">
                    <Link
                      to="pages/product"
                      className="nav-buttons-dropDown-list-item-link"
                    >
                      Product
                      <CgWebsite className="nav-buttons-dropDown-list-item-link__icon" />
                    </Link>
                  </li>
                </ul>
              </div>
            ) : null}

            <div
              className="nav-buttons-animation"
              onClick={() => themeFunction()}
            >
              <FiSun className="nav-buttons-animation__sun" />
              <WiMoonAltNew className="nav-buttons-animation__moon" />
            </div>
            {!token && (
              <Link
                to="pages/registration"
                className="nav-buttons-animation__btn"
              >
                Registr
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
