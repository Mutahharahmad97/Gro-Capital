import { useEffect, useCallback, useState, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import { plaidBaseUrl } from "../../services/util/baseUrl.js";
import { useHistory } from "react-router-dom";
import { AppControlContext } from "../../context/AppControlContext";
import patchFormStep from "../../services/Forms/patchFormStep";

const Plaid = (props) => {
  const history = useHistory();
  const { setFormStep, setFormBackSteps, formBackSteps } = useContext(AppControlContext);
  const [accessToken, setAccessToken] = useState("");
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  const generateToken = useCallback(async () => {
    const path = plaidBaseUrl() + "create-link-token/";
    const response = await fetch(path, {
      method: "POST",
    });
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    if (data) {
      localStorage.setItem("link_token", data.link_token);
      setAccessToken(data.link_token);
    }
  }, []);

  useEffect(() => {
    generateToken();
  }, [generateToken]);

  const onSuccess = useCallback((public_token) => {
    // send public_token to server
    // const setToken = async () => {
    //   const response = await fetch(plaidBaseUrl() + "set-access-token/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    //     },
    //     body: `public_token=${public_token}`,
    //   });
    //   if (!response.ok) {
    //     return;
    //   }
    // };

    const getAuth = async () => {
      const response = await fetch(plaidBaseUrl() + "plaid-auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: `public_token=${public_token}`,
      });
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      const authData = data.numbers.ach.map((achNumbers) => {
        const account = data.accounts.filter((a) => {
          return a.account_id === achNumbers.account_id;
        })[0];
        const obj = {
          name: account.name,
          balance:
            formatter.format(account.balances.available) ||
            formatter.format(account.balances.current),
          account_id: achNumbers.account_id,
          account_number: achNumbers.account,
          routing_number: achNumbers.routing,
        };
        return obj;
      });
      const add_bank_auth_data = await fetch(plaidBaseUrl() + "banking-auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(authData),
      });

      const res = await add_bank_auth_data.json();
      console.log(res);
    };
    // setToken();
    getAuth().then(async () => {
      const patchFormStep_ = await patchFormStep(3);
      if (!patchFormStep_.success) {
        props.setApiErrorMessage(patchFormStep_.message);
        props.setApiErrorState(true);
      } else {
        // setFormBackSteps(formBackSteps > 0 ? formBackSteps-1:formBackSteps);
        setFormStep(3);
        history.push("/registration");
      }
    });
    //   window.history.pushState("", "", "/plaid");
  }, []);

  const config = {
    token: accessToken,
    onSuccess,
  };

  // const { open, ready } = usePlaidLink(config);
  const { open } = usePlaidLink(config);

  return (
    <div>
      <button
        style={{ marginTop: "2%" }}
        className="btn btn--full btn--green open-popup"
        onClick={() => open()}
      >
        Add Bank Information
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="21"
            viewBox="0 0 12 21"
          >
            <path
              d="M-0.293106781,-0.293106781 C0.0673771804,-0.653590743 0.634608236,-0.681320278 1.02689944,-0.376295388 L1.12110678,-0.293106781 L10.9652136,9.551 L1.12110678,19.3951068 C0.730582489,19.7856311 0.0974175106,19.7856311 -0.293106781,19.3951068 C-0.653590743,19.0346228 -0.681320278,18.4673918 -0.376295388,18.0751006 L-0.293106781,17.9808932 L8.136,9.551 L-0.293106781,1.12110678 C-0.653590743,0.76062282 -0.681320278,0.193391764 -0.376295388,-0.198899443 L-0.293106781,-0.293106781 Z"
              transform="translate(1 1)"
            />
          </svg>
      </button>
    </div>
  );
};

export default Plaid;
