import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.hasNotif ? '#98C25F' : '#EEEEEE'};
  text-align: center;
  color: white;
  margin: 15px;
  cursor: pointer;

  a {
    color: white;
    text-decoration: none;
  }
  i {
    display: block;
    font-size: 16px;
    line-height: 30px;
  };
  .count-badge {
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    border: 1px solid #FFFFFF;
    background-color: #618B3B;
    color: white;
    position: absolute;
    top: -2px;
    right: -4px;
    border-radius: 7px;
    line-height: 14px;
    font-family: Roboto;
    font-size: 8px;
    font-weight: 500;
  }
`;

function NotificationMenu({ count }) {
  const hasNotif = count > 0;
  return (
    <Wrapper hasNotif={hasNotif}>
      <Link to="/notifications">
        <i className="fas fa-bell" />
        {count && <div className="count-badge">{count}</div>}
      </Link>
    </Wrapper>
  );
}

NotificationMenu.propTypes = {
  count: PropTypes.number,
};

NotificationMenu.defaultProps = {
  count: 0,
};

export default NotificationMenu;
