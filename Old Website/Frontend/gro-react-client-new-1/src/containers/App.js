import React, { Component } from 'react';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import AuthRoute from 'components/AuthRoute';

import LandingPage from 'containers/pages/LandingPage';
import LoginPage from 'containers/pages/LoginPage';
import SignupPage from 'containers/pages/SignupPage';
import LearnMorePage from 'containers/pages/LearnMorePage';
import GetStartedPage from 'containers/pages/GetStartedPage';
import TermsAndConditionsPage from 'containers/pages/TermsAndConditionsPage';
import PrivacyPolicy from 'containers/pages/PrivacyPolicy';
import ContactUsPage from 'containers/pages/ContactUsPage';
import DashboardPage from 'containers/pages/DashboardPage';
import FAQPage from 'containers/pages/FAQPage';

import EquityInvestmentPage from 'containers/pages/EquityInvestmentPage';
import FilesPage from 'containers/pages/FilesPage';
import GlossaryPage from 'containers/pages/GlossaryPage';
import PaymentsPage from 'containers/pages/PaymentsPage';
import RatesPage from 'containers/pages/RatesPage';
import ResourcesPage from 'containers/pages/ResourcesPage';
import TeamListPage from 'containers/pages/TeamListPage';
import NotificationsPage from 'containers/pages/NotificationsPage';
import OurTeamPage from 'containers/pages/OurTeamPage';
import CompaniesPage from 'containers/pages/CompaniesPage';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Notification from 'containers/Notification';
import LoadingScreen from 'components/LoadingScreen';
import { themeVars } from 'theme';
import setAuthToken from 'utils/authAxios';
import QuickBooks from './QuickBooks';
import LinkedinPopup from './LinkedinPopup';

class App extends Component {
  componentDidMount() {
    setAuthToken();
  }

  render() {
    return (
      <ThemeProvider theme={themeVars}>
        <React.Fragment>
          <Header />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/our-team" component={OurTeamPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/learn-more" component={LearnMorePage} />
            <Route path="/terms" component={TermsAndConditionsPage} />
            <Route path="/privacy" component={PrivacyPolicy} />
            <Route path="/contact-us" component={ContactUsPage} />
            <Route path="/faq" component={FAQPage} />
            <Route path="/equity-investment" component={EquityInvestmentPage} />
            <Route path="/quickbooks" component={QuickBooks} />
            <Route path="/linkedin" component={LinkedinPopup} />
            <AuthRoute path="/get-started" component={GetStartedPage} />
            <AuthRoute path="/dashboard/:status" component={DashboardPage} />
            <AuthRoute path="/dashboard" component={DashboardPage} />
            <AuthRoute path="/files" component={FilesPage} />
            <AuthRoute path="/glossary" component={GlossaryPage} />
            <AuthRoute path="/notifications" component={NotificationsPage} />
            <AuthRoute path="/payments" component={PaymentsPage} />
            <AuthRoute path="/companies" component={CompaniesPage} />
            <Route path="/rates" component={RatesPage} />
            <AuthRoute
              path="/resources"
              name={'resources'}
              component={ResourcesPage}
            />
            <AuthRoute path="/team-list" component={TeamListPage} />
            <Route component={LandingPage} />
          </Switch>
          <Notification />
          <Footer />
          <LoadingScreen />
        </React.Fragment>
      </ThemeProvider >
    );
  }
}

injectGlobal`
  body {
    margin: 0;
    background-color: #f5f5f5;
  }

  .ant-popover-inner {
    background-color: #98C25F;
  }

  .ant-popover-placement-bottomLeft > .ant-popover-content > .ant-popover-arrow {
    border-color: #98C25F;
    left: 26px;
  }

  .ant-popover.ant-popover-placement-bottomLeft {
    top: 40px !important;
    left: 0 !important;
  }

  .ant-popover-placement-bottomRight > .ant-popover-content > .ant-popover-arrow {
    border-color: #98C25F;
  }

  .ant-popover.ant-popover-placement-bottomRight {
    top: 40px !important;
    left: calc(100% - 120px) !important;
  }
`;

export default App;
