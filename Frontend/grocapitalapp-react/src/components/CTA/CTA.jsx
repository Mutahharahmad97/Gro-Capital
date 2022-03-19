const CTA = (props) => {
  const iconStyle =
    props.type === "CTA1" ? "box__info-icon" : "box__info-icon-bg";
  return (
    <section className="box">
      <div className="wrap wrap--sm">
        <div className="box__title">
          {props.heading && <h2>{props.heading}</h2>}
          {props.subHeading && <h3>{props.subHeading}</h3>}
        </div>
        <div className="box__row">
          {props.data.map((item) => {
            return (
              <div className="box__col" key={item.id}>
                <div className="box__info">
                  {item.img ? (
                    <div>
                      <img src={item.img} alt="" />
                    </div>):
                    (<div className={iconStyle}>
                      <i className={item.src}></i>
                    </div>)
                  }
                  <h3 style={item.headColor ? {color: item.headColor}:{}}>{item.title}</h3>
                  {item.para && (
                    <p>{item.para}</p>
                  )
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CTA;
