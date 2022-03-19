const Authorization = () => {
    return (
        <div id="settings-pages">
            <div className="account_info_heading">
                <h1 style={{paddingLeft:"307px"}}>
                    Authorizations
                </h1>
            </div>
            <section className="account_info_form" style={{
                justifyContent:"flex-start", 
                backgroundColor:"white", 
                paddingLeft:"25px",
                flexDirection:"column",
                padding:"22px 5px 50px 27px"
                }}>
                <h3 style={{fontSize:"12px", marginBottom:"0px"}}>
                    CASH FLOW
                </h3>
                <p>
                You are currently getting of day balances, overviews, and cash flow reports.
                </p>
                <div style={{display:"flex"}}>
                    <div
                    //   onClick={updateBusinessInfo}
                      className="btn account_info_form__btn"
                      style={{backgroundColor:"#C4FFC8",color:"#016D53", fontSize:"14px"}}
                    >
                      Unlink your business financial account
                    </div>
                  </div>
            </section>
        </div>
    )
}

export default Authorization 