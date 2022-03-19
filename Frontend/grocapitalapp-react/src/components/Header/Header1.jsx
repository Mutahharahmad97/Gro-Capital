import { Link, useLocation } from "react-router-dom";
import { AppControlContext } from "../../context/AppControlContext";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import logout from "../../services/Auth/userLogout";
import logo from "../../static/logo.svg";

const Header1 = () => {
  const history = useHistory();
  const {
    notificationPanelState,
    setNotificationPanelState,
    editProfileAsideState,
    setEditProfileAsideState,
    Form
  } = useContext(AppControlContext);
  const [sideBarState, setsideBarState] = useState(false);
  const currentPath = useLocation().pathname;

  const notificationPanelStateHandler = () => {
    setNotificationPanelState(!notificationPanelState);
  };

  const ediProfileAsideStateHandler = () => {
    setEditProfileAsideState(!editProfileAsideState);
  };

  const openSideMenu = () => {
    if (sideBarState) {
      setsideBarState(false);
      return document.body.classList.remove("mm-visible");
    }

    setsideBarState(true);
    return document.body.classList.add("mm-visible");
  };

  const Logout = async () => {
    logout()
      .then(() => localStorage.clear())
      .catch((e) => {
        console.log(e);
        localStorage.clear();
      });

    history.push("/");
    window.location.reload();
  };

  return (
    <header className="header-dashboard">
      <div className="header-dashboard__row">
        <div className="header-dashboard__left">
          <Link to="/dashboard" className="header-dashboard__logo">
            <img src={logo} alt="dashboard" />
          </Link>
          <nav className="header-dashboard__nav">
            <div className="header-dashboard__close-mm" onClick={openSideMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
              >
                <g transform="translate(.414 .414)">
                  <path d="M12.2928932,0.292893219 C12.6834175,-0.0976310729 13.3165825,-0.0976310729 13.7071068,0.292893219 C14.0675907,0.65337718 14.0953203,1.22060824 13.7902954,1.61289944 L13.7071068,1.70710678 L1.70710678,13.7071068 C1.31658249,14.0976311 0.683417511,14.0976311 0.292893219,13.7071068 C-0.0675907428,13.3466228 -0.0953202783,12.7793918 0.209704612,12.3871006 L0.292893219,12.2928932 L12.2928932,0.292893219 Z" />
                  <path d="M0.292893219,0.292893219 C0.65337718,-0.0675907428 1.22060824,-0.0953202783 1.61289944,0.209704612 L1.70710678,0.292893219 L13.7071068,12.2928932 C14.0976311,12.6834175 14.0976311,13.3165825 13.7071068,13.7071068 C13.3466228,14.0675907 12.7793918,14.0953203 12.3871006,13.7902954 L12.2928932,13.7071068 L0.292893219,1.70710678 C-0.0976310729,1.31658249 -0.0976310729,0.683417511 0.292893219,0.292893219 Z" />
                </g>
              </svg>
            </div>
            <ul className="header-dashboard__menu">
              <li className={currentPath === "/dashboard" ? "active" : ""}>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li
                className={
                  currentPath === "/loan-history" ||
                  currentPath === "/transactions"
                    ? "active"
                    : ""
                }
              >
                <a href="/loan-history">Current Loans</a>
              </li>
              <li>
                <a>Business Line of Credits</a>
              </li>
              <li>
                <a>Equity Investment</a>
              </li>
              <li>
                <a>Convertible Debt</a>
              </li>
              <li className="has-dropdown">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid  */} {/* eslint-disable-next-line jsx-a11y/aria-role */}
                <a role="span">
                  Help
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="6"
                    viewBox="0 0 7 6"
                    className="has-dropdown__icon"
                  >
                    <path
                      d="M3.068,0.248254074 C3.15757718,0.0945381914 3.3220881,-2.20589373e-08 3.5,-2.20589373e-08 C3.6779119,-2.20589373e-08 3.84242282,0.0945381914 3.932,0.248254074 L6.561,4.75625407 C6.65125251,4.91091958 6.65190132,5.10204163 6.56270096,5.25731633 C6.4735006,5.41259102 6.30807242,5.5082541 6.129,5.5082541 L0.871,5.5082541 C0.691927577,5.5082541 0.5264994,5.41259102 0.437299042,5.25731633 C0.348098684,5.10204163 0.348747487,4.91091958 0.439,4.75625407 L3.068,0.248254074 Z"
                      transform="rotate(180 3.5 2.754)"
                    />
                  </svg>
                </a>
                <ul className="dropdown">
                  <li>
                    <Link>Support</Link>
                  </li>
                  <li>
                    <Link to="/dashboard-terms">Rates & Terms</Link>
                  </li>
                  <li>
                    <Link to="/dashboard-contact-us">Contact us</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-dashboard__center">
          <div className="header-dashboard__notification has-notification">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="21"
              viewBox="0 0 19 21"
            >
              <path
                d="M9.25284322 0C12.7646539 0 15.6259938 2.78499621 15.7487402 6.26686587L15.7562215 6.9347533C15.8027623 9.22097535 16.2177809 10.9892846 16.8780981 12.3108472L17.0047521 12.5534223C17.4035361 13.2845746 17.7755236 13.7030655 17.9992303 13.8773687L18.0564736 13.9189032C18.8468601 14.4457317 18.5204355 15.6495099 17.6176537 15.7449692L17.5018432 15.751 1.00184322 15.751C.0520948456 15.751-.344021021 14.5685481.354011541 13.9883073L.447003401 13.9190428C.66074052 13.7764996 1.06413992 13.3505709 1.49940454 12.5524143 2.23304935 11.2071099 2.69858943 9.36287022 2.7483989 6.93459848L2.75284322 6.5C2.75284322 2.91014913 5.66299234 0 9.25284322 0zM9.25284322 2C6.76756184 2 4.75284322 4.01471863 4.75284321 6.50015584 4.75240478 9.31352695 4.25401972 11.5376092 3.40075445 13.2323876L3.25528217 13.50996 3.11884322 13.75 15.3838432 13.75 15.2489343 13.5110777C14.3565707 11.8749696 13.8113517 9.71250443 13.7564321 6.96359238L13.7528432 6.487 13.7479452 6.2881643C13.6405856 3.97144027 11.7814029 2.11225759 9.46467892 2.00489799L9.25284322 2zM9.97359499 17.9166563C10.2504795 17.4387929 10.8623235 17.2758673 11.3401869 17.5527518 11.8180503 17.8296363 11.9809759 18.4414803 11.7040914 18.9193437 11.1974523 19.7937311 10.2634057 20.332037 9.25284322 20.332037 8.24228074 20.332037 7.30823412 19.7937311 6.80159499 18.9193437 6.52471051 18.4414803 6.68763612 17.8296363 7.16549952 17.5527518 7.60922982 17.2956448 8.16848425 17.4177617 8.46780302 17.819123L8.53209145 17.9166563C8.68106088 18.1737564 8.95570289 18.332037 9.25284322 18.332037 9.512841 18.332037 9.75561352 18.2108534 9.91204206 18.0083205L9.97359499 17.9166563z"
                transform="translate(-.002)"
              />
            </svg>
            <span></span>
            <div
              onClick={notificationPanelStateHandler}
              className="open-sidebar"
            ></div>
          </div>
        </div>
        <div className="header-dashboard__right">
          <div className="header-dashboard__open-mm" onClick={openSideMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              viewBox="0 0 384 278"
            >
              <path d="M368 154.667969L16 154.667969C7.167969 154.667969 0 147.5 0 138.667969 0 129.835938 7.167969 122.667969 16 122.667969L368 122.667969C376.832031 122.667969 384 129.835938 384 138.667969 384 147.5 376.832031 154.667969 368 154.667969zM368 32L16 32C7.167969 32 0 24.832031 0 16 0 7.167969 7.167969 0 16 0L368 0C376.832031 0 384 7.167969 384 16 384 24.832031 376.832031 32 368 32zM368 277.332031L16 277.332031C7.167969 277.332031 0 270.164062 0 261.332031 0 252.5 7.167969 245.332031 16 245.332031L368 245.332031C376.832031 245.332031 384 252.5 384 261.332031 384 270.164062 376.832031 277.332031 368 277.332031z" />
            </svg>
          </div>
          <div className="header-dashboard__user has-dropdown">
            <div className="header-dashboard__name">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
              >
                <g fill="none" fillRule="evenodd" transform="translate(1 1)">
                  <circle cx="14" cy="14" r="14"></circle>
                  <path
                    fill="#CFCFCF"
                    fillRule="nonzero"
                    d="M14,0 C6.2680135,0 0,6.2680135 0,14 C0,21.7319865 6.2680135,28 14,28 C21.7319865,28 28,21.7319865 28,14 C28,6.2680135 21.7319865,0 14,0 Z M14,2 C20.627417,2 26,7.372583 26,14 C26,20.627417 20.627417,26 14,26 C7.372583,26 2,20.627417 2,14 C2,7.372583 7.372583,2 14,2 Z"
                  ></path>
                  <g transform="translate(9 6)">
                    <circle cx="5" cy="5" r="5"></circle>
                    <path
                      fill="#CFCFCF"
                      fillRule="nonzero"
                      d="M5,-1.11022302e-16 C2.23857625,-1.11022302e-16 -1.11022302e-16,2.23857625 -1.11022302e-16,5 C-1.11022302e-16,7.76142375 2.23857625,10 5,10 C7.76142375,10 10,7.76142375 10,5 C10,2.23857625 7.76142375,-1.11022302e-16 5,-1.11022302e-16 Z M5,2 C6.65685425,2 8,3.34314575 8,5 C8,6.65685425 6.65685425,8 5,8 C3.34314575,8 2,6.65685425 2,5 C2,3.34314575 3.34314575,2 5,2 Z"
                    ></path>
                  </g>
                  <path
                    fill="#CFCFCF"
                    fillRule="nonzero"
                    d="M14.028,17.501 C16.6098382,17.501 19.3161865,18.3132408 22.0028801,19.6600317 C22.9330203,20.1262941 23.7952091,20.6253984 24.5696067,21.125269 L25.0410584,21.436869 L25.4882248,21.7507024 L25.5660156,21.8085156 L24.3619844,23.4054844 L24.1301506,23.2379295 L23.7803285,22.9992308 L23.4849558,22.805606 C22.7684941,22.3431328 21.968261,21.8798934 21.1066199,21.4479683 C18.6739385,20.2285092 16.2499118,19.501 14.028,19.501 L13.9150787,19.5016333 C11.7206232,19.526179 9.31949744,20.2508946 6.90264737,21.4498298 C6.03107104,21.8821957 5.22029515,22.3459156 4.49334493,22.8088996 L4.06212326,23.0898138 L3.83797601,23.2419724 L3.60199791,23.409986 L2.41000209,21.804014 L2.68818826,21.60551 L2.94167071,21.4331281 L3.41896757,21.1219754 C4.20303297,20.6226156 5.07483521,20.1239918 6.01385263,19.6581702 C8.52016727,18.4148541 11.0358993,17.6269093 13.4427331,17.5148043 L13.8927094,17.5017584 L14.028,17.501 Z"
                  ></path>
                </g>
              </svg>
              <span>{Form.FName + " " + Form.LName} </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="6"
                viewBox="0 0 7 6"
                className="has-dropdown__icon"
              >
                <path
                  d="M3.068,0.248254074 C3.15757718,0.0945381914 3.3220881,-2.20589373e-08 3.5,-2.20589373e-08 C3.6779119,-2.20589373e-08 3.84242282,0.0945381914 3.932,0.248254074 L6.561,4.75625407 C6.65125251,4.91091958 6.65190132,5.10204163 6.56270096,5.25731633 C6.4735006,5.41259102 6.30807242,5.5082541 6.129,5.5082541 L0.871,5.5082541 C0.691927577,5.5082541 0.5264994,5.41259102 0.437299042,5.25731633 C0.348098684,5.10204163 0.348747487,4.91091958 0.439,4.75625407 L3.068,0.248254074 Z"
                  transform="rotate(180 3.5 2.754)"
                />
              </svg>
            </div>
            <ul className="dropdown dropdown--right">
              <li>
                <span onClick={ediProfileAsideStateHandler} className="open-sidebar">
                  Edit profile
                </span>
              </li>
              <li>
                <a href="/settings">Settings</a>
              </li>
              <li>
                <span onClick={Logout}>Log Out</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header1;
