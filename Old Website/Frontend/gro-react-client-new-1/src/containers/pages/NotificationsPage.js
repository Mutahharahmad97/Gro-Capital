import React from "react";
import styled from "styled-components";
//import PropTypes from 'prop-types';

import Notification from "components/Notification";
import PageTitle from "components/PageTitle";
// import { notification } from 'utils/notification';

const Container = styled.div`
  max-width: 980px;
  width: 100%;
  font-family: ${props => props.theme.fontFamily};
  margin: 0 auto;
  box-sizing: border-box;
  min-height: calc(100vh - 349px);
`;

const testNotifcations = [
  {
    id: "0",
    type: "message",
    date: "Today",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
  },
  {
    id: "1",
    type: "message",
    date: "Yesterday",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "2",
    type: "alert",
    date: "November 12, 2018",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    highlight: "Missing Documents"
  },
  {
    id: "3",
    type: "alert",
    date: "November 10, 2018",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "4",
    type: "message",
    date: "November 05, 2018",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
  }
];

class NotificationsPage extends React.Component {
  state = {
    notifications: []
  };

  handleRemove = notification => {
    console.log("TODO: Remove notification", notification);
  };

  render() {
    return (
      <React.Fragment>
        <PageTitle>Notifications</PageTitle>
        <Container>
          {testNotifcations.map(notification => (
            <Notification
              key={notification.id}
              onRemove={() => this.handleRemove(notification)}
              {...notification}
            />
          ))}
        </Container>
      </React.Fragment>
    );
  }
}

NotificationsPage.propTypes = {};

export default NotificationsPage;
