import "./BiLateral.scss";

const BiLateral = (props) => {
  const imagePlacement = props.left ? "" : "flex-row-reverse";
  return (
    <section className="box">
      <div className="wrap wrap--sm">
        <div
          className={"row align-items-center row--article " + imagePlacement}
        >
          <div className="col-12 col-sm-6">
            <article className="box__article" style={props.title2 ? {maxWidth:"456px"}:{}}>
              <h2>{props.title}</h2>
              {props.title2 &&
                <div>
                  <h4 style={{fontSize:"22px"}}>{props.title2}</h4>
                </div>
              }
              {props.description.map((para) =>
                <div>
                  <p style={props.title2 ? {fontSize:"14px", fontWeight:"100", color:"#000000"}:{}}>{para}</p> <br />
                </div>
              )}
              <div className="box__article-link">
                {!props.title2 && (
                  <a href="/" className="link-with-arrow">
                  {props.buttonText}
                  <i className="icon-arrow"></i>
                </a>)
                }
              </div>
            </article>
          </div>
          <div className="col-12 col-sm-6">
            <div className="box__img">
              {props.ovpimg ?
              (<div style={{content:' ', display:"table", clear:"both"}}>
                <div style={{
                  float: "left",
                  width: "66%",
                  marginRight: "-100%",
                  paddingBottom: "15%",
                  position: "relative",
                  zIndex: "1"
                }}>
                  <img style={{border:"solid white 7px"}} src={props.img} alt="" />
                </div>
                <div style={{float:"right", width:"75%", paddingTop: "55%"}}>
                  <img src={props.ovpimg} alt="" />
                </div>
              </div>):
              (
                <div>
                  <img src={props.img} alt="" />
                </div>
              )
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiLateral;
