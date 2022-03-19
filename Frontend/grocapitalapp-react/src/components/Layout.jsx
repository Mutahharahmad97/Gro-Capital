import React from "react";
import { useLocation } from "react-router-dom";
import "../assets/sass/style.scss";
import { AppControlProvider } from "../context/AppControlContext";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Header1 from "./Header/Header1";

const Layout = ({ children, deviceview }) => {
  const currentPath = useLocation().pathname;
  const isHeader = ["/", "/blog", "/terms", "/privacy", "/faq","/business-resources", "/how-it-works"].includes(currentPath);
  const isFooter = ["/", "/blog", "/terms", "/privacy", "/faq","/business-resources", "/how-it-works"].includes(currentPath);
  const isHeader1 = [
    "/dashboard",
    "/dashboard-terms",
    "/dashboard-contact-us",
    "/loan-history",
    "/transactions",
    "/settings",
    "/account-details",
    "/security",
    "/business-information",
    "/billing",
    "/authorization",
    "/notifications",
    "/plan-details"
  ].includes(currentPath);

  if (!deviceview) return <div>{children}</div>;

  const childrenWithProps = React.Children.map(children, (child) => {
    if (child.props.path === currentPath)
      return React.cloneElement(child, { deviceview });
  });

  return (
    <AppControlProvider>
      {isHeader && <Header deviceview={deviceview} />}
      {isHeader1 && <Header1 deviceview={deviceview} />}
      <div>{childrenWithProps}</div>
      {isFooter && <Footer deviceview={deviceview} />}
    </AppControlProvider>
  );
};
export default Layout;
