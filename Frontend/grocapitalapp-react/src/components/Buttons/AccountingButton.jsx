const AccountingButton = (props) => {
  return (
    <button
      style={{ marginTop: "2%" }}
      className="btn btn--green open-popup"
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};

export default AccountingButton;
