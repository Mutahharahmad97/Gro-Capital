import Homepage from "./pages/Homepage/index";
import Registration from "./pages/Registration/index";
import Dashboard from "./pages/Dashboard/index";
import DashboardProgress from "./pages/Dashboard/DashboardProgress";
import Terms from "./pages/TermsAndPrivacy/Terms";
import Privacy from "./pages/TermsAndPrivacy/Privacy";
import Blog from "./pages/Homepage/Blog";
import FAQ from "./pages/Homepage/FAQ";
import DashboardTerms from "./pages/TermsAndPrivacy/DashboardTerms";
import DashboardContactUs from "./pages/TermsAndPrivacy/DashboardContactUs";
import LoanHistory from "./pages/LoanHistoryAndTransactions/LoanHistory";
import Transactions from "./pages/LoanHistoryAndTransactions/Transactions";
import QuickBooksMiddleware from "./middlewares/QuickBooksMiddleware";
import FreshbooksMiddleware from "./middlewares/FreshbooksMiddleware";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LayoutContainer from "./containers/Layout";
import AuthHOC from "./components/HOC/AuthHOC";
import { LinkedInPopUp } from "react-linkedin-login-oauth2";
import SettingsPage from "./pages/settings_page";
import AccountInformationForm from "./pages/settings_page/accountInformationForm";
import SecurityPage from "./pages/settings_page/securityPage";
import BusinessInformationForm from "./pages/settings_page/BusinessInformationForm";
import BusinessResources from "./pages/Homepage/BusinessResources";
import BillingPage from "./pages/settings_page/BillingPage";
import Authorization from "./pages/settings_page/Authorization";
import Notifications from "./pages/settings_page/Notifications";
import PlanDetails from "./pages/settings_page/PlanDetails";
import HowItWorks from "./pages/Homepage/HowItWorks";

function App() {
  return (
    <Router>
      <Switch>
        <LayoutContainer>
          <Route exact path="/dashboard-progress" component={DashboardProgress} />
          <Route exact path="/linkedin" component={LinkedInPopUp} />
          <Route exact path="/freshbooks-middleware">
            <FreshbooksMiddleware />
          </Route>
          <Route exact path="/quickbooks-middleware">
            <QuickBooksMiddleware />
          </Route>
          <Route exact path="/transactions">
            <AuthHOC Component={Transactions} />
          </Route>
          <Route exact path="/loan-history">
            <AuthHOC Component={LoanHistory} />
          </Route>
          <Route exact path="/faq">
            <FAQ />
          </Route>
          <Route exact path="/blog">
            <Blog />
          </Route>
          <Route exact path="/business-resources">
            <BusinessResources />
          </Route>
          <Route exact path="/dashboard-contact-us">
            <AuthHOC Component={DashboardContactUs} />
          </Route>
          <Route exact path="/dashboard-terms">
            <AuthHOC Component={DashboardTerms} />
          </Route>
          <Route exact path="/privacy">
            <Privacy />
          </Route>
          <Route exact path="/terms">
            <Terms />
          </Route>
          <Route exact path="/dashboard">
            <AuthHOC Component={Dashboard} />
          </Route>
          <Route exact path="/registration">
            <Registration />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
          <Route path="/settings">
          <AuthHOC Component={SettingsPage} />
          </Route>
          <Route path="/account-details">
          <AuthHOC Component={AccountInformationForm} />
          </Route>
          <Route path="/security">
          <AuthHOC Component={SecurityPage} />
          </Route>
          <Route path="/business-information">
          <AuthHOC Component={BusinessInformationForm} />
          </Route>
          <Route path="/billing">
          <AuthHOC Component={BillingPage} />
          </Route>
          <Route path="/authorization">
          <AuthHOC Component={Authorization} />
          </Route>
          <Route path="/notifications">
          <AuthHOC Component={Notifications} />
          </Route>
          <Route path="/plan-details">
          <AuthHOC Component={PlanDetails} />
          </Route>
          <Route path="/how-it-works">
            <HowItWorks />
          </Route>
        </LayoutContainer>
      </Switch>
    </Router>
  );
}

export default App;
