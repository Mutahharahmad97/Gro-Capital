import { AppControlContext } from "../../context/AppControlContext";
import { useState, useContext } from "react";
import { HashLink as NLink } from 'react-router-hash-link';
import { Link } from "react-router-dom";
import logo from "../../static/logo.svg";
import { headerLinks } from "../utils/links.js";
import LinkBorderButton from "../Buttons/LinkBorderButton";
import "./Header.scss";
import profileIcon from "../../static/profileIcon.svg";
import hamburgerIcon from "../../static/hamburgerIcon.svg";
import closeIcon from "../../static/closeIcon.svg";

const Header = (props) => {
  const [sideBarState, setsideBarState] = useState(false);
  const { loginPopupState, setLoginPopupState } = useContext(AppControlContext);

  const openSideMenu = () => {
    if (sideBarState) {
      setsideBarState(false);
      return document.body.classList.remove("mm-visible");
    }

    setsideBarState(true);
    return document.body.classList.add("mm-visible");
  };

  return (
    <header className="site-header">
      <div className="wrap">
        <div className="site-header__row">
          <Link to="/" className="site-header__logo">
            <img src={logo} alt="" />
          </Link>
          <nav className="site-header__nav">
            <div onClick={openSideMenu} className="header-dashboard__close-mm">
              <img src={closeIcon} alt="close icon"></img>
            </div>
            <ul>
              {headerLinks.map((link, index) => {
                if (link.title === "Business Resourses") {
                  return (
                    <li key={index + 1}>
                      <NLink
                        to={link.url}
                        onClick={props.deviceview.IsMobile ? openSideMenu : null}
                      >
                        {link.title}
                      </NLink>
                    </li>
                  );
                } else {
                  return (
                    <li key={index + 1}>
                      <Link
                        to={link.url}
                        onClick={props.deviceview.IsMobile ? openSideMenu : null}
                      >
                        {link.title}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
            <Link to="/registration" className="btn btn--green">
              Get started
            </Link>
          </nav>
          <div className="site-header__controls">
            <div onClick={openSideMenu} className="site-header__open-mm">
              <img src={hamburgerIcon} alt="hamburger"></img>
            </div>

            <div
              className="site-header__login"
              onClick={() => setLoginPopupState(!loginPopupState)}
            >
              <img src={profileIcon} alt="profile"></img>
              <span>Login</span>
            </div>
            <LinkBorderButton url="/registration" name="Get Started" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
