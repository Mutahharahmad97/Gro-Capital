const PlanDetails = (props) => {
    return (
        <div id="settings-pages">
            <div className="account_info_heading">
                <h1 style={{paddingLeft:"307px"}}>
                    Plan details
                </h1>
            </div>
            <section className="account_info_form" style={{
                justifyContent:"flex-start", 
                backgroundColor:"white", 
                paddingLeft:"25px",
                flexDirection:"column",
                padding:"22px 27px 50px 27px",
                marginBottom: "30px"
                }}>
                <h3 style={{fontSize:"12px"}}>
                    PLAN
                </h3>
                <div>
                    <div style={{display:"flex"}}>
                        <div>
                            <h5 style={{fontSize:"10px",color:"#CFCFCF",marginBottom:"8px"}}>
                                PLAN DETAILS
                            </h5>
                            <p style={{fontSize:"13px",fontWeight:"500",marginTop:"0px"}}>
                                Paid
                            </p>
                        </div>
                        <div style={{paddingLeft:"184px"}}>
                            <h5 style={{fontSize:"10px",color:"#CFCFCF",marginBottom:"8px"}}>
                                SUBSCRIBED ON
                            </h5>
                            <p style={{fontSize:"13px",fontWeight:"500",marginTop:"0px"}}>
                                3/4/2020
                            </p>
                        </div>
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:"20px"}}>
                        <div style={{display:"flex" ,justifyContent:"flex-start", maxWidth:"260px"}}>
                            <div
                            //   onClick={updateBusinessInfo}
                            className="btn account_info_form__btn"
                            style={{backgroundColor:"#C4FFC8",color:"#016D53", fontSize:"14px"}}
                            >
                                Cancel Account
                            </div>
                        </div>
                        <div style={{display:"flex", justifyContent:"flex-end", maxWidth:"260px"}}>
                            <div
                            //   onClick={updateBusinessInfo}
                            className="btn account_info_form__btn"
                            style={{backgroundColor:"rgb(1 109 83)",color:"white", fontSize:"14px"}}
                            >
                                Change plan
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div>
          <div className="account_info_form" style={{display:"block", paddingLeft:"0px", paddingRight:"0px"}}>
            <div className="account_info_form__fields" style={{display:"flex",flexDirection:"column",backgroundColor:"#D7EAE6"}}>
              <div style={{display:"flex"}}>
                <a href="/" className="faq-link" style={{alignSelf:"center",paddingRight:"45px"}}>
                    <i className="icon-faq" style={{fontSize:"20px",color:"#FFA200"}}></i>
                  </a>
                <h2 style={{fontSize:"12px"}}>
                CCANCELLING ACCOUNT WILL REMOVE YOUR DATA FROM OUR SYSTEMS. YOU CAN REACTIVATE YOUR ACCOUNT AT ANY TIME.
                </h2>
              </div>
              {/* <ul style={{fontSize:"16px",fontWeight:"500",lineHeight:"30px"}}>
                <li>
                Business credit Reports for the selected business credit bureau.
                </li>
                <li>
                Cash flow connection
                </li>
              </ul> */}
              <div style={{ display:"flex" ,justifyContent:"flex-start", maxWidth:"260px", marginTop:"20px", marginBottom:"10px"}}>
                    <div
                    //   onClick={updateAccountInfo}
                      className="btn btn--green account_info_form__btn"
                      style={{ backgroundColor:"#C4FFC8",color:"#016D53", fontSize:"14px"}}
                    >
                      Change plan
                    </div>
                  </div>
            </div>
          </div>
          </div>
        </div>
    )
}
export default PlanDetails