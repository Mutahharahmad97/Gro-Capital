import { AppControlContext } from "../../context/AppControlContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/swiper.scss";

const SideBar1 = (props) => {
  const { Form2, chosenAmount } = useContext(AppControlContext);
  let amount = chosenAmount;
  if(amount[amount.length - 1] === 'k') {
    amount = amount.slice(0, amount.length - 1)
    amount = `${amount}000`;
  }
  let formattedNumber = new Intl.NumberFormat({style:'currency', currency:'USD'}).format(amount)
  SwiperCore.use([Pagination]);
  return (
    <aside className="dashboard__sidebar dashboard_after">
      <div className="sidebar-inner">
        <div className="circle-info">
          <div className="circle-box">
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
                strokeDasharray="75,100"
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
              <h2>{Form2.Experian ? (Form2.Experian).split('/')[0]:""}</h2>
              <p>out of {Form2.Experian ? (Form2.Experian).split('/')[1]:""}</p>
            </div>
          </div>
          <div className="circle-box__title">Capital Needed</div>
          {formattedNumber && <div className="circle-box__value">${formattedNumber}</div>}
          <div className="circle-box__warning">
            Please fix all issues prior
            <br />
            to apply for a capital
          </div>
        </div>
        <div className="warnings-slider">
          <Swiper pagination={{ clickable: true }} loop slidesPerView={1}>
            {[1, 2].map((i) => {
              return (
                <SwiperSlide key={i}>
                  <h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21.974"
                      height="35.201"
                      viewBox="0 0 21.974 35.201"
                    >
                      <path
                        d="M58.2,13.988a.737.737,0,0,0-.641-.374H47.91L49.528,1.252A.741.741,0,0,0,48.17.771L36.434,21.333a.737.737,0,0,0,.628,1.123h9.507L45.286,34.837a.741.741,0,0,0,1.365.453L58.194,14.73A.737.737,0,0,0,58.2,13.988Z"
                        transform="translate(-36.324 -0.434)"
                        fill="#ffa200"
                      />
                    </svg>
                    Increase your investability
                  </h2>
                  <p>
                    When lenders review your credit report and request a credit
                    score for you, they're very interested in how reliably you
                    pay your bills. That's because past payment performance is
                    usually considered a good predictor of future performance.
                  </p>
                  <p>
                    <Link to="/dashboard">Read article</Link>
                  </p>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </aside>
  );
};

export default SideBar1;
