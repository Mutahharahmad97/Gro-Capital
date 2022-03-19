import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import authorizeUserToken from "../../services/Auth/authorizeUserToken";

const AuthHOC = ({ Component }) => {
  const [authorized, setAuthorized] = useState(false);
  const history = useHistory();
  useEffect(() => {
    authorizeUserToken().then((res) => {
      if (!res) history.push("/");
      else setAuthorized(true);
    });
    return () => setAuthorized(false);
  }, [history]);

  return <div>{authorized && <Component />}</div>;
};

export default AuthHOC;
