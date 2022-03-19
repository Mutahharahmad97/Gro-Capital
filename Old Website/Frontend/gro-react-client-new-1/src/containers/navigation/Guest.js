/* eslint-disable import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { navActions } from 'actions/navActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Visible, Hidden } from 'react-grid-system';
import menuBars from 'images/icons/Menu.svg';
import close from 'images/icons/x.svg';
import logo from 'images/GroLogo.png';

const Logo = styled.img`
  height: 44px;
  margin: 7px 33px 7px 40px;
`;

const StyledLink = styled(NavLink)`
  color: #424242;
  font-size: 19px;
  font-weight: 100;
  text-decoration: none;
  margin-right: ${props => (props.last ? '40' : '22')}px;
  margin-left: ${props => (props.last ? '35px' : 'initial')};
`;

const MenuBars = styled.img`
  box-sizing: initial;
  height: 20px;
  padding: 20px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
`;

const SmallMenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: white;
  opacity: 0.99;
  display: flex;
  justify-content: center;
  flex-direction: column;
  & a {
    width: 100%;
    display: block;
    text-align: center;
    font-weight: 500;
    font-size: 28px;
  }
`;

const CloseMenu = styled.img`
  position: fixed;
  top: 30px;
  right: 30px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
`;

const MenuContainer = styled.div`
  float: ${props => props.align};
  height: 60px;
`;

class Guest extends React.Component {
  state = {
    smallMenu: false
  };

  handleOnClick = () => {
    this.props.actions.menuClick();
    this.setState({
      smallMenu: false
    });

    // this is dirty, but this way we simulate emit an event using redux state
    setTimeout(() => {
      this.props.actions.eraseClick();
    }, 1);
  };

  openMenu = () => {
    this.setState({
      smallMenu: true
    });
  };

  closeMenu = () => {
    this.setState({
      smallMenu: false
    });
  };

  activeStyle = { color: '#8bc34a', fontWeight: 'bold' };

  getLinks = last => {
    return (
      <React.Fragment>
        {/* <StyledLink onClick={this.handleOnClick} activeStyle={this.activeStyle} to="/about-us">ABOUT US</StyledLink> */}
        <StyledLink
          onClick={this.handleOnClick}
          activeStyle={this.activeStyle}
          to="/our-team"
        >
          OUR TEAM
        </StyledLink>
        <StyledLink
          onClick={this.handleOnClick}
          activeStyle={this.activeStyle}
          to="/get-started"
        >
          GET STARTED
        </StyledLink>
        <StyledLink
          onClick={this.handleOnClick}
          activeStyle={this.activeStyle}
          last={last}
          to="/login"
        >
          LOGIN
        </StyledLink>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <MenuContainer align={'left'}>
          <Logo src={logo} />
          <StyledLink style={{ float: 'right' }} to="/">
            Gro Capital
          </StyledLink>
        </MenuContainer>
        <MenuContainer align={'right'}>
          <Hidden xs sm>
            {this.getLinks('true')}
          </Hidden>
          <Visible xs sm>
            <MenuBars src={menuBars} onClick={this.openMenu} />
            {this.state.smallMenu && (
              <SmallMenuContainer>
                <CloseMenu src={close} onClick={this.closeMenu} />
                {this.getLinks()}
              </SmallMenuContainer>
            )}
          </Visible>
        </MenuContainer>
      </React.Fragment>
    );
  }
}

Guest.propTypes = {
  handleOnOpen: PropTypes.func,
  actions: PropTypes.object.isRequired,
  theme: PropTypes.object
};

function mapStateToProps({ navigation }) {
  return {
    clicked: navigation.clicked
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(navActions, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Guest);
