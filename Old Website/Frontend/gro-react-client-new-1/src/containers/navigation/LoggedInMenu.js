import React, {Fragment} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Popover} from 'antd';

import BackgroundMenuContainer from 'components/BackgroundMenuContainer';

const MenuContainer = styled.div`
  width: 160px;
  font-family: ${props => props.theme.fontFamily};
  padding: 10px;
`;

const LinkItem = styled(NavLink)`
  display: block;
  cursor: pointer;
  margin-bottom: ${props => (props.marginBottom ? '15px' : 0)};
  font-size: 14px;
  color: #ffffff;
`;

const LinkSubItem = styled(LinkItem)`
  margin-bottom: ${props => (props.marginBottom ? '15px' : '3px')};
  padding-left: 15px;
  font-size: 12px;
  font-weight: 300;
`;

class LoggedInMenu extends React.Component {
  state = {visible: false};

  hideMenu = () => {
    this.setState({visible: false});
  };

  showMenu = () => {
    this.setState({visible: true});
  };

  render() {
    const {visible} = this.state;

    const childrenWithExtraProp = React.Children.map(
      this.props.children,
      child => {
        return React.cloneElement(child, {
          onClick: this.showMenu
        });
      }
    );
    let isAdmin = localStorage.getItem("is_grocapital_admin");
    console.log("is_adminm", isAdmin);
    const content = (
      <Fragment>
        <MenuContainer>
          <LinkItem to={'/dashboard'} onClick={this.hideMenu} marginBottom>
            Dashboard
          </LinkItem>
          <LinkItem to={'/services'} onClick={this.hideMenu}>
            Services
          </LinkItem>
          <LinkSubItem to={'/services'} onClick={this.hideMenu}>
            Business Line of Credit
          </LinkSubItem>
          <LinkSubItem to={'/equity-investment'} onClick={this.hideMenu}>
            Equity Investment
          </LinkSubItem>
          <LinkSubItem to={'/services'} onClick={this.hideMenu} marginBottom>
            Convertible Debt
          </LinkSubItem>
          {
            isAdmin == "true" ? <LinkItem to={'/companies'} onClick={this.hideMenu} marginBottom>
              Companies List
            </LinkItem> : ''
          }
          <LinkItem to={'/terms'} onClick={this.hideMenu} marginBottom>
            Rates & Terms
          </LinkItem>
          <LinkItem to={'/contact-us'} onClick={this.hideMenu} marginBottom>
            Contact Us
          </LinkItem>
          <LinkItem to={'/faq'} onClick={this.hideMenu}>
            FAQS
          </LinkItem>
          {/*<LinkItem activeStyle={{color: themeVars.greenColor}}
                  to={"/notifications"}
                  onClick={this.props.actions.hideLeftMenu}>
          <Icon src={menuSide} pos={"-52px"}/>
          <LinkText>NOTIFICATIONS</LinkText>
        </LinkItem> */}
          {/* <LinkItem activeStyle={{color: themeVars.greenColor}}
                  to={"/resources"}
                  onClick={this.props.actions.hideLeftMenu}>
          <Icon src={menuSide} pos={"-110px"}/>
          <LinkText>RESOURCES</LinkText>
        </LinkItem> */}
          {/* <LinkItem activeStyle={{color: themeVars.greenColor}}
                  to={"/team-list"}
                  onClick={this.props.actions.hideLeftMenu}>
          <Icon src={menuSide} pos={"-167px"}/>
          <LinkText>TEAM LIST</LinkText>
        </LinkItem>
        <LinkItem activeStyle={{color: themeVars.greenColor}}
                  to={"/glossary"}
                  onClick={this.props.actions.hideLeftMenu}>
          <Icon src={menuSide} pos={"-227px"}/>
          <LinkText>GLOSSARY</LinkText>
        </LinkItem> */}
          {/* <LinkItem activeStyle={{color: themeVars.greenColor}}
                  to={"/payments"}
                  onClick={this.props.actions.hideLeftMenu}>
          <Icon src={menuSide} pos={"-283px"}/>
          <LinkText>PAYMENTS</LinkText>
        </LinkItem>
        <LinkItem activeStyle={{color: themeVars.greenColor}}
                  to={"/files"}
                  onClick={this.props.actions.hideLeftMenu}>
          <Icon src={menuSide} pos={"-343px"}/>
          <LinkText>FILES</LinkText>
        </LinkItem> */}
          {/* <BottomLinksContainer>
            <BottomLink
              activeStyle={{ color: themeVars.greenColor }}
              to={'/faq'}
              onClick={this.props.actions.hideLeftMenu}
            >
              FAQS
            </BottomLink> */}
          {/* <BottomLink activeStyle={{color: themeVars.greenColor}}
                    to={"/contact-us"}
                    onClick={this.props.actions.hideLeftMenu}>
          CONTACT US
        </BottomLink> */}
          {/* <BottomLink
              activeStyle={{ color: themeVars.greenColor }}
              to={'/terms'}
              onClick={this.props.actions.hideLeftMenu}
            >
              TERMS
            </BottomLink>
          </BottomLinksContainer> */}
        </MenuContainer>
        {visible && <BackgroundMenuContainer handleOnClick={this.hideMenu}/>}
      </Fragment>
    );

    return (
      <Popover
        placement="bottomLeft"
        content={content}
        style={{marginLeft: 15}}
        overlayStyle={{position: 'fixed'}}
        visible={visible}
        trigger="click"
      >
        {childrenWithExtraProp}
      </Popover>
    );
  }
}

LoggedInMenu.propTypes = {
  showMenu: PropTypes.bool,
  children: PropTypes.node
};

export default LoggedInMenu;
