import LinkOrangeButton from "../Buttons/LinkOrangeButton";
import HeroBottomBanner from "../../static/uploads/hero.jpg";
import chk from "../../static/checkmark.svg"


const HeroBottom = (props) => {
  console.log(props.bullets)
  return (
    <section
      className="hero-bottom"
      style={{ backgroundImage: `url(${HeroBottomBanner})` }}
    >
      <div className="wrap wrap--sm">
        <div className="hero-bottom__inner">
          {props.bullets ?(
              <div style={{textAlign:"justify"}}>
                <h2>{props.description}</h2>
                <div style={{display:"flex"}}>
                  <img src={chk} alt="" />
                  <p style={{color:"white", paddingLeft:"15px", margin:"5px"}}>A Guide with Information on Building and Establishing your Business</p>
                </div>
                <div style={{display:"flex"}}>
                  <img src={chk} alt="" />
                  <p style={{color:"white", paddingLeft:"15px", margin:"5px"}}>A Business Line of Credit Based on your Investability Score</p>
                </div>
                <div style={{display:"flex"}}>
                  <img src={chk} alt="" />
                  <p style={{color:"white", paddingLeft:"15px", margin:"5px"}}>Links to Important Resources, All In One Place!</p>
                </div>
                <div style={{display:"flex"}}>
                  <img src={chk} alt="" />
                  <p style={{color:"white", paddingLeft:"15px", margin:"5px"}}>Blogs and Articles with Advice and Relevant </p>
                </div>
                <div style={{display:"flex"}}>
                  <img src={chk} alt="" />
                  <p style={{color:"white", paddingLeft:"15px", margin:"5px"}}>News Networking Tools and Contact with Angel Investors and Equity Loans</p>
                </div>
                <br />
                <br />
                <br />
                <LinkOrangeButton url="/registration" name="Get Started" />
              </div>)
              :(
                <div>
                    <h2>{props.description}</h2>
                    <LinkOrangeButton url="/registration" name="Get Started" />
                </div>
              )
          }
          {/* {props.bullets &&(
            props.bullets.map((item) => {
              <div style={{display:"flex"}}>
                <img src={chk} alt="" />
                <p>{item}</p>
              </div>
              })
          )} */}
        </div>
      </div>
    </section>
  );
};

export default HeroBottom;
