import { Link } from "react-router-dom";

const LinkButton = (props) => {
  return (
    <Link to={props.url} className="btn btn--outline">
      {props.name}
    </Link>
  );
};

export default LinkButton;
