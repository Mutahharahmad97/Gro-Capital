import "./Footer.scss";
import { Link } from "react-router-dom";
import { footerLinks } from "../utils/links";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer__row">
          <div className="site-footer__col site-footer__col--flex">
            <p>Gro.Capital HQ: 20 Nassau Street, Princeton NJ 08540,</p>
          </div>
          <div className="site-footer__col site-footer__social">
            <a href="https://twitter.com/capital_gro" target="_blank">
              <i className="icon-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/company/modocapital/" target="_blank">
              <i className="icon-linkedin"></i>
            </a>
            <a href="mailto:contact@gro.capital/">
              <i className="icon-email"></i>
            </a>
          </div>
          <div className="site-footer__col site-footer__col--flex">
            <ul>
              {footerLinks.map((link, index) => {
                return (
                  <li key={index+1}>
                    <Link to={link.url}>{link.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="site-footer__copy">
          <p>Copyright Gro Capital Inc., {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
