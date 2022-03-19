import { Link } from "react-router-dom";

const LinkOrangeButton = (props) => {
  return (
    <Link to={props.url} className="btn btn--orange">
      {props.name}
    </Link>
  );
};

export default LinkOrangeButton;
