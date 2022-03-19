const CompanyStakeHolderCard = (props) => {
  return (
    <div className="col-sm-6 col-mb">
      <div className="white-box">
        <div className="white-box__ownership">
          <h3>Single Ownership</h3>
          <span className="open-popup" onClick={props.onclick}>
            <i className="icon-add-file"></i>
            Add Company Stakeholders
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompanyStakeHolderCard;
