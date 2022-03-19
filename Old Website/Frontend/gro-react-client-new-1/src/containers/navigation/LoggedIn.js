/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import noPictureProfile from 'images/noPictureProfile.png';
import LoggedInMenu from 'containers/navigation/LoggedInMenu';
import { menuActions } from 'actions/menuActions';
import { routeNames } from 'store/routeNames';
import menuIcon from 'images/icons/menu_icon.png';

import NotificationMenu from './NotificationMenu';
import UserPopupMenu from './UserPopupMenu';

const MenuContainer = styled.div`
  float: ${props => props.align};
  height: 60px;
`;

const UserImgSmall = styled.div`
  background: url(${props => props.src}) center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-size: cover;
`;

const Username = styled.div`
  cursor: pointer;
  color: #000000;
  display: none;
  font-size: 16px;
  font-weight: 400;
  padding: 0 10px;

  @media all and (min-width: 820px) {
    display: block;
  }
`;

const MenuItem = styled.div`
  display: inline-block;
  float: left;
`;

const LeftMenu = styled.img`
  width: 20px;
  margin-left: 20px;
  cursor: pointer;
  float: left;
  margin-top: 20px;
`;

const Breadcrumb = MenuItem.extend`
  margin-left: 30px;
  font-size: 18px;
  font-weight: 300;
  color: #a2a2a2;

  span {
    color: #000000;
    font-weight: 500;
  }
`;

const ActiveMenu = MenuItem.extend`
  color: ${props => props.theme.blackColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 5px;
`;

const Ellipsis = styled.div`
  display: flex;
  padding: 0 15px 0 0;

  i {
    font-size: 22px;
    color: #98c25f;
    margin: auto;
  }
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

class LoggedIn extends React.Component {
  render() {
    const routeName = routeNames[this.props.location.pathname]
      ? routeNames[this.props.location.pathname].name
      : '';
    const routeNameExtra = routeNames[this.props.location.pathname]
      ? routeNames[this.props.location.pathname].extra
      : '';
    const name =
      (this.props.first_name || '') + ' ' + (this.props.last_name || '');
    return (
      <React.Fragment>
        <MenuContainer align={'left'}>
          <LoggedInMenu>
            <LeftMenu src={menuIcon} />
          </LoggedInMenu>
          <Breadcrumb>
            GRO | <span>{routeName}</span>
          </Breadcrumb>
          <ActiveMenu>{routeNameExtra}</ActiveMenu>
        </MenuContainer>
        <MenuContainer
          align={'right'}
          onClick={this.props.actions.showSmallProfileMenu}
        >
          <UserPopupMenu>
            <RightMenu>
              <UserImgSmall src={this.props.profile || noPictureProfile} />
              <Username>{name}</Username>
              <Ellipsis>
                <i className="fas fa-ellipsis-v" />
              </Ellipsis>
            </RightMenu>
          </UserPopupMenu>
        </MenuContainer>
        <MenuContainer align={'right'}>
          <NotificationMenu count={5} />
        </MenuContainer>
      </React.Fragment>
    );
  }
}

LoggedIn.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  actions: PropTypes.object,
  location: PropTypes.object,
  profile: PropTypes.string
};

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(menuActions, dispatch) };
}

function mapStateToProps(state) {
  const { profile } = state;
  return {
    first_name: profile.first_name,
    last_name: profile.last_name,
    profile: profile.profile
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoggedIn)
);
