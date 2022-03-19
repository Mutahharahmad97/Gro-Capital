import GetUserPlan from "../../services/SettingsPage/GetUserPlan"
import { useEffect, useState } from "react";

const BillingPage = (props) => {
    const [userPlans, setUserPlans] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        if (!dataFetched) {
            GetUserPlan().then((response) => {
            if (response.success)
                setUserPlans(response.payload);
                setDataFetched(true)
                console.log(userPlans)
            });
        }
    }, [userPlans, setUserPlans]);

    return (
        <div id="settings-pages">
            <div className="account_info_heading">
                <h1 style={{paddingLeft:"307px"}}>
                    Billing
                </h1>
            </div>
            <section className="account_info_form" style={{
                justifyContent:"flex-start", 
                backgroundColor:"white", 
                paddingLeft:"25px",
                flexDirection:"column",
                padding:"22px 5px 50px 27px"
                }}>
                <h3 style={{fontSize:"12px"}}>
                    PLAN AND PAYMENT METHOD
                </h3>
                {userPlans.map((elem) => (
                    <div>
                        <div style={{display:"flex"}}>
                            <div>
                                <h5 style={{fontSize:"10px",color:"#CFCFCF",marginBottom:"8px"}}>
                                    PLAN DETAILS
                                </h5>
                                <p style={{fontSize:"13px",fontWeight:"500",marginTop:"0px"}}>
                                    {elem.plan.name}
                                </p>
                            </div>
                            <div style={{paddingLeft:"184px"}}>
                                <h5 style={{fontSize:"10px",color:"#CFCFCF",marginBottom:"8px"}}>
                                    SUBSCRIBED ON
                                </h5>
                                <p style={{fontSize:"13px",fontWeight:"500",marginTop:"0px"}}>
                                    {elem.subcribed_on.slice(0,10)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}
export default BillingPage