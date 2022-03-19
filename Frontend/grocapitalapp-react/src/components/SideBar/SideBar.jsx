import './sideBar.scss'

const SideBar = (props) => {
  return (
    <aside className="dashboard__sidebar sidebar_custom">
      <div className="sidebar-inner">
        <div className="welcome-msg">
          <h2 style={{marginBottom:"10px"}}>
            {props.heading1}
            <br />
            {props.heading2}
          </h2>
          <p style={{ marginBottom: 70 }}>{props.description}</p>
        </div>
        <div className="circle-info" style={{display: 'flex', justifyContent:'center'}}>
          <div className="circle-box circle-box-2">
            <svg
              className="circle-chart"
              viewBox="0 0 33.83098862 33.83098862"
              width="160"
              height="160"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="circle-chart__background"
                stroke="#065542"
                strokeWidth="1"
                fill="none"
                cx="16.91549431"
                cy="16.91549431"
                r="15.91549431"
              ></circle>
              <circle
                className="circle-chart__circle"
                stroke="#FFA200"
                strokeWidth="2"
                strokeDasharray="20,100"
                strokeLinecap="round"
                fill="none"
                cx="16.91549431"
                cy="16.91549431"
                r="15.91549431"
              ></circle>
            </svg>
            <div className="circle-box__txt">
              <i className="icon-plant"></i>
              <h3>Investability</h3>
              <h2>85</h2>
              <p>out of 800</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
