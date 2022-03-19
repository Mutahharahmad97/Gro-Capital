import Form1 from "../../components/Form/Form1";
import Form2 from "../../components/Form/Form2";
import Form3 from "../../components/Form/Form3";
import Form4 from "../../components/Form/Form4";
// import Form5 from "../../components/Form/Form5";
import PlaidForm from "../../components/Form/PlaidForm";
import AccountingForm from "../../components/Form/AccountingForm";
import { AppControlContext } from "../../context/AppControlContext";
import { useContext } from "react";
import DocForm from "../../components/Form/DocumentsForm";

const Registration = (props) => {
  const { formStep } = useContext(AppControlContext);
  switch (formStep) {
    case 1:
      return <Form2 />;
    case 2:
      return <AccountingForm />
    case 3:
      return <PlaidForm />;
    case 4:
      return <DocForm />;
    case 5:
      return <Form3 />;
    case 6:
      return <Form4 />;
    // case 6:
      // return <Form5 />;

    default:
      return <Form1 />;
  }
};

export default Registration;
