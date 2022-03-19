const FormInput = (props) => {
  const helpTextFields = {
    DateOfEstablishment: "",
    // DUNS:'',
    Zip: "",
    SocialSecurityNumber: "",
    TotalMonthlyIncome: "",
    TotalMonthlyExpenses: "",
    Birthday: "",
  };
  return (
    <div
      className={props.class ? props.class : "col-12 col-sm-6"}
      style={props.customStyle ? props.customStyle : {}}
    >
      <div className="form-group">
        <input
          className={`${
            props.value && props.value.length > 0 ? "has-value" : ""
          } ${!props.validate ? "error" : ""}`}
          style={
            props.disabled && {
              backgroundColor: "#edf5f5",
              borderColor: "#edf5f5",
            }
          }
          type={props.type}
          id={props.id}
          name={props.name}
          onChange={props.onchange}
          onBlur={props.onblur}
          onFocus={props.onfocus}
          value={props.value}
          ref={props.Ref}
          onKeyDown={props.onkeydown}
          onKeyUp={props.onkeyup}
          maxLength={props.maxLength}
          disabled={props.disabled}
        />
        <label htmlFor={props.id}>{props.title}</label>
        {
          !props.validate ? (
            <span className="has-error">*Required: {props.message}</span>
          ) : props.name in helpTextFields && props.validate ? (
            <span style={{ fontSize: "x-small", fontStyle: "italic" }}>
              hint: {props.message}
            </span>
          ) : (
            props.name === "EIN" && (
              <div>
                <span
                  style={{
                    display: "flex",
                    fontSize: "x-small",
                    fontStyle: "italic",
                  }}
                >
                  hint: {props.message}
                </span>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    fontSize: "13px",
                  }}
                >
                  Don't Have One -{" "}
                  <a
                    style={{ color: "#016d53", fontWeight: "600" }}
                    href="https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    Click Here
                  </a>
                </span>
              </div>
            )
          )
          // props.name === 'DUNS' &&
          // (<div>
          //   <span style={{display:"flex",fontSize:"x-small",fontStyle:"italic"}}>hint: {props.message}</span>
          //   <span style={{display:"flex",justifyContent:"flex-end",fontSize:"13px"}}>
          //       Don't Have One - <a style={{color:"#016d53",fontWeight:"600"}} href="/" target={"_blank"}>Click Here</a>
          //   </span>
          // </div>)
        }
      </div>
    </div>
  );
};

export default FormInput;
