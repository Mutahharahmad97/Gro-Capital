import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border-radius: 3px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  background-color: #FFFFFF;
  margin-bottom: 12px;

  .notification-type {
    font-size: 16px;
    color: white;
    width: 150px;

    span {
      display: block;
      text-align: center;
      position: relative;
      top: 50%;
      transform: translateY(-50%); 
    }
    &.alert {
      background-color: #C62529;
    }
    &.message {
      background-color: #618B3B;
    }
  }

  .notification-content {
    position: relative;
    font-family: Roboto;
    font-size: 12px;
    line-height: 14px;
    flex: 1;
    padding: 10px 20px 15px;

    .notification-date {
      color: #C2C2C2;
      font-family: Roboto;
      font-weight: 500;
    }
    .notification-message {
      color: #9E9E9E;
    }
    .notifcation-highlight {
      color: #1B1B1B;
      font-weight: 500;
    }
    .notification-delete {
      position: absolute;
      right: 14px;
      top: 14px;
      i {
        cursor: pointer;
        font-size: 24px;
        color: #EEE;
      }
    }
  }
`;

function Notification({ type, date, message, highlight, onRemove}) {
  const notificationType = type === 'alert'
    ? 'GRO Alerts'
    : 'GRO Messages';
  return (
    <Wrapper>
      <div className={`notification-type ${type}`}>
        <span>{notificationType}</span>
      </div>
      <div className="notification-content">
        <div className="notification-date">{date}</div>
        <div className="notification-message">
          {highlight && (
            <span>
              <span className="notifcation-highlight">{highlight}</span>
              &nbsp;-&nbsp;
            </span>
          )}
          {message}
        </div>
        <div className="notification-delete">
          <i className="fas fa-times-circle" onClick={onRemove} />
        </div>
      </div>
    </Wrapper>
  );
}

Notification.propTypes = {
  type: PropTypes.string,
  date: PropTypes.string,
  message: PropTypes.string,
  highlight: PropTypes.string,
  onRemove: PropTypes.func,
};

export default Notification;
