// import { Link } from "react-router-dom";
import HeroBanner from "../../static/uploads/hero-top.jpg";
import "./HeroSection.scss";
import Amounts from "./json/Amounts.json";
import LinkOrangeButton from "../Buttons/LinkOrangeButton";
import { useContext } from "react";
import { AppControlContext } from "../../context/AppControlContext";
import SecureIcon from '../../icons/secure.svg';

const HeroSection = (props) => {
  const { setChosenAmount } = useContext(AppControlContext);
  const { setChosenFinance } = useContext(AppControlContext);
  const { currentAmountIndex, setCurrentAmountIndex } =
    useContext(AppControlContext);
  const { currentFinanceIndex, setCurrentFinanceIndex } =
    useContext(AppControlContext);
  // const { chosenCustomAmount, setChosenCustomAmount } =
  //   useContext(AppControlContext);

  const AmountChanged = (id, amount) => {
    // if (amount === "Custom") setChosenAmount(chosenCustomAmount);
    // else setChosenAmount(amount);
    setChosenAmount(amount);
    setCurrentAmountIndex(id);
  };

  // const HandleCustomAmount = (event) => {
  //   if (/^([1-4]?[0-9]?[0-9]?){1}[k]?$/.test(event.target.value)) {
  //     setChosenCustomAmount(event.target.value);
  //     setChosenAmount(event.target.value);
  //   }
  // };

  const FinanceChanged = (id, amount) => {
    setCurrentFinanceIndex(id);
    setChosenFinance(amount);
  };

  return (
    <section className="hero" style={{ backgroundImage: `url(${HeroBanner})` }}>
      <div className="wrap wrap--sm" style={{ marginBottom: "20px" }}>
        <h1>Seed Capital Options for Your Business</h1>
        <h2>We provide capital up to $200,000.</h2>
        <div className="registration" style={{ marginBottom: "20px" }}>
          <div className="registration__box">
            <div className="registration__title">
              <h3>How much money do you need to invest in your Business?</h3>
              {/* <h5>No Obligation and Will Not Impact Your Credit Score</h5> */}
            </div>
            <div className="registration__list disabled">
              {Amounts.map((amount) => {
                return (
                  <span
                    className={
                      amount.id === currentAmountIndex
                        ? "registration__select activeGreen"
                        : "registration__select"
                    }
                    key={amount.id}
                    onClick={() => AmountChanged(amount.id, amount.Amount)}
                  >
                    {/* {amount.id === Amounts.length &&
                    amount.id === currentAmountIndex ? (
                      <input
                        className="custom-amount"
                        onChange={HandleCustomAmount}
                        value={chosenCustomAmount}
                      />
                    ) : (
                      <h3>{amount.Amount}</h3>
                    )} */}
                    <h3>{amount.Amount}</h3>
                  </span>
                );
              })}
            </div>
            <input type="hidden" name="money" value="" />
          </div>
          <div className="registration__title">What do you need financing for?</div>
          <div className="registration__box">
            <div className="registration__list disabled">
              {props.data.map(({ id, src, title }) => {
                return (
                  <span
                    className={
                      id === currentFinanceIndex
                        ? "registration__select activeGreen"
                        : "registration__select"
                    }
                    key={id}
                    onClick={() => FinanceChanged(id, title)}
                  >
                    <div className="registration__select-icon">
                      <i
                        className={src}
                        style={
                          id === currentFinanceIndex
                            ? { color: "white" }
                            : { color: "#80b6a9" }
                        }
                      />
                    </div>
                    <p>{title}</p>
                  </span>
                );
              })}
            </div>
            <input type="hidden" name="what" value="" />
          </div>
        </div>
        <div>
          <div className="hero__btn">
            <LinkOrangeButton
              url="/registration"
              name="CHECK YOUR RATE"
            />
          </div>
          <div className="registration__title" style={{display: 'flex', justifyContent: 'center'}}>
            <img src={SecureIcon} alt="secure icon" />
            <h5 style={{ fontWeight: 500, marginLeft: 20 }}>
              Will Not Impact Your Credit Score
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
