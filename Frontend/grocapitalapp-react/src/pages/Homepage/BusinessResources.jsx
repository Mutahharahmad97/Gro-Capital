import HeroBottom from "../../components/HeroBottom/HeroBottom"
import LoginPopup from "../../components/Popups/LoginPopup"
import BusinessResourcesItems from "./util/BusinessResources";
import { useContext } from "react";
import { AppControlContext } from "../../context/AppControlContext";

const BusinessResources = () =>{
    const { loginPopupState, setLoginPopupState } = useContext(AppControlContext);
    const changeLoginPopupState = () => {
        setLoginPopupState(!loginPopupState);
    };
    return(
        <div id="dashboard-page" className="white-page">
        <section className="dashboard">
          <div className="container">
            <div className="dashboard__row">
              <div className="dashboard__content dashboard__content--sm">
                <div className="sub-menu">
                    <article className="text">
                      <h1 style={{marginBottom:"0px"}}>Business Resources</h1>
                      {/* <h2 style={{fontSize:"32px", color:"black"}}>Accounting Services</h2> */}
                    </article>
              {BusinessResourcesItems.map((item) => (
                <div>
                  <article className="text">
                      <h2 style={{fontSize:"32px", color:"black"}}>{item.mainHeading}</h2>
                  </article>
                {item.cards.map((card) => (
                  <div
                  style={{
                      top:"302px",
                      left:"231px",
                      width: "904px",
                      height: "auto",
                      border:"1px solid #80B6A9",
                      borderRadius: "4px",
                      opacity:"1",
                      marginBottom:"25px"
                  }}
                  >
                      <div style={{display:"flex"}}>
                          <div style={{justifyContent:"flex-start"}}>
                            <img style={{top:"306px",left:"249px",width:"238px",height:"84px", paddingLeft:"18px"}} src={card.image} alt="" />
                          </div>
                          <div style={{justifyContent:"flex-end", alignSelf:"center"}}>
                          <div style={{paddingLeft:"388px"}}>
                                <div
                                  //   onClick={updatePassword}
                                    style={{width:"243px"}}
                                    className="btn btn--green account_info_form__btn"
                                >
                                  Apply
                                </div>
                            </div>
                          </div>
                      </div>
                      <div style={{
                        backgroundColor: "#EDF5F5",
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px 27px 7px 24px",
                        }}>
                          <div style={{fontSize:"13px"}}>
                              <h3 style={{fontSize:"13px",marginBottom:"0px",marginTop:"5px"}}>{card.heading}</h3>
                              <p style={{marginBottom:"0px",marginTop:"0px"}}>{card.description}</p>
                          </div>
                        </div>
                  </div>
                  ))}
                </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <HeroBottom description="Ready to Fuel Up Your Business?" />
        <LoginPopup
          popupState={loginPopupState}
          onClose={changeLoginPopupState}
        />
      </div>
    )
}
export default BusinessResources