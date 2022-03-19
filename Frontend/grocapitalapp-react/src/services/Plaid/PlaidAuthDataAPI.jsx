import { useEffect, useCallback, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { plaidBaseUrl } from "../util/baseUrl.js";

const PlaidAuthDataAPI = (props) => {
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
    getAuth().then(() => window.location.reload());
  }, []);

  const config = {
    token: accessToken,
    onSuccess,
  };

  const { open } = usePlaidLink(config);

  return (
    <div onClick={() => open()}>
      {props.children}
    </div>
  );
};

export default PlaidAuthDataAPI;
