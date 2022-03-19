const LogoCTA = (props) => {
  return (
    <section id={"Business-Tools"} className="box">
      <div className="wrap wrap--sm">
        <div className="box__title">
          <h2>Built-in Business Tools</h2>
        </div>
        <div className="row align-items-center row--logos">
          {props.data.map(({ id, src }, index) => {
            return (
              <div className="col-6 col-sm-3" key={index+1}>
                <img src={src} alt="" />
              </div>
            );
          })}
        </div>
        <div className="box__more">
          <a href="/">And much more</a>
        </div>
      </div>
    </section>
  );
};

export default LogoCTA;
