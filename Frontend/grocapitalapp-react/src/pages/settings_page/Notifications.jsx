import Switch from "react-switch";
import { useState } from "react";

const Notifications = () => {
    const [checked, setChecked] = useState(false)
    return (
        <div id="settings-pages">
            <div className="account_info_heading">
                <h1 style={{paddingLeft:"307px"}}>
                    Notifications
                </h1>
            </div>
            <section className="account_info_form" style={{
                justifyContent:"flex-start", 
                backgroundColor:"white", 
                paddingLeft:"25px",
                flexDirection:"column",
                padding:"22px 25px 132px 27px"
                }}>
                <h3 style={{fontSize:"12px", marginBottom:"0px"}}>
                    RECEIVE EMAIL ALERTS
                </h3>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <p style={{fontSize:"13px",fontWeight:"500",marginBottom:"0px"}}>
                        Get notified when there are changes to your business or personal reports
                    </p>
                    <div style={{alignSelf:"center"}}>
                    <Switch onChange={()=>setChecked(!checked)} checked={checked} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Notifications 