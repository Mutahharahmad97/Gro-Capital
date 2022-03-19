import { useEffect, useContext } from "react";
import { AppControlContext } from "../context/AppControlContext";
import { useHistory } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import addFreshbooksProfitLoss from "../services/Freshbooks/AddFreshbooksProfitLoss";
import getUserProfile from "../services/Forms/getUserProfile";

const FreshbooksMiddleware = () => {
  const history = useHistory();
  const { setFormStep } = useContext(AppControlContext);

  useEffect(() => {
    const queryParam = new URLSearchParams(window.location.search);
    const data = {
      company_name: queryParam.get("company_name")
        ? queryParam.get("company_name")
        : "",
      currency_code: queryParam.get("currency_code")
        ? queryParam.get("currency_code")
        : "",
      end_date: queryParam.get("end_date") ? queryParam.get("end_date") : "",
      total_expenses: queryParam.get("total_expenses")
        ? queryParam.get("total_expenses")
        : "",
        total_income: queryParam.get("total_income")
        ? queryParam.get("total_income")
        : "",
        net_profit_ytd: queryParam.get("net_profit_ytd")
        ? queryParam.get("net_profit_ytd")
        : "",
        net_profit_1: queryParam.get("net_profit_1")
        ? queryParam.get("net_profit_1")
        : "",
        net_profit_2: queryParam.get("net_profit_2")
        ? queryParam.get("net_profit_2")
        : "",
        net_profit_3: queryParam.get("net_profit_3")
        ? queryParam.get("net_profit_3")
        : "",
        gross_profit_ytd: queryParam.get("gross_profit_ytd")
        ? queryParam.get("gross_profit_ytd")
        : "",
        gross_profit_1: queryParam.get("gross_profit_1")
        ? queryParam.get("gross_profit_1")
        : "",
        gross_profit_2: queryParam.get("gross_profit_2")
        ? queryParam.get("gross_profit_2")
        : "",
        
        gross_profit_3: queryParam.get("gross_profit_3")
        ? queryParam.get("gross_profit_3")
        : "",

        cogs_py_1: queryParam.get("cogs_py_1")
        ? queryParam.get("cogs_py_1")
        : "",
        cogs_py_2: queryParam.get("cogs_py_2")
        ? queryParam.get("cogs_py_2")
        : "",
        cogs_py_3: queryParam.get("cogs_py_3")
        ? queryParam.get("cogs_py_3")
        : "",
    };
    

    addFreshbooksProfitLoss(data)
      .then(async () => {
        getUserProfile()
          .then((res) => {
            if (res.success) {
              if (res.response.form_step === 6) history.push("/dashboard");
              else {
                setFormStep(res.response.form_step);
                history.push("/registration");
              }
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <LoadingOverlay
      active={true}
      spinner
      text="Adding Freshbooks Data to database..."
    ></LoadingOverlay>
  );
};

export default FreshbooksMiddleware;
