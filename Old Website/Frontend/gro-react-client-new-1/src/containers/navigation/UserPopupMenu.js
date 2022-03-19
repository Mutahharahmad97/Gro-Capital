import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';
import { DatePicker, Drawer, Popover } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UploadField } from '@navjobs/upload';

import { authActions } from 'actions/authActions';
import { profileActions } from 'actions/profileActions';

import Button from 'components/Button';
import LoginInput from 'components/auth/LoginInput';
import BackgroundMenuContainer from 'components/BackgroundMenuContainer';

import uploadFile from 'utils/upload';

import uploadImg from 'images/uploadImage.png';

const MenuContainer = styled.div`
  width: 88px;
  font-family: ${props => props.theme.fontFamily};
  padding: 10px;
`;

const LinkItem = styled.div`
  display: block;
  cursor: pointer;
  margin-bottom: ${props => (props.marginBottom ? '15px' : 0)};
  font-size: 14px;
  color: #ffffff;
  text-align: right;
`;

const StyledDrawer = styled(Drawer)`
  .ant-drawer-content-wrapper {
    height: 600px !important;
  }

  .ant-drawer-body {
    padding: 10px;
  }
`;

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .content-header {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;

    button {
      font-size: 14px;
      color: #000000;
      font-family: Roboto;
      outline: none;
      border: none;
    }
  }

  .input-forms {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 0 25px 0;

    button {
      margin-top: 18px;
    }
  }
`;

const UserLoginInput = styled(LoginInput)`
  width: 150px;
  margin: 0 0 15px 0;

  label {
    text-align: center;
    color: #777777;
    font-size: 14px;
    height: auto;
    line-height: normal;
  }

  input {
    font-size: 12px;
    color: #000000;
    text-align: center;
    height: auto;

    &:focus {
      border-bottom: 1px solid #e8e8e8;
    }
  }
`;

const ProfilePicture = styled.div`
  background: url(${props => props.src}) center no-repeat;
  background-size: cover;
  height: 140px;
  width: 140px;
  border-radius: 50%;
  margin: auto;
`;

const UploadButton = styled.button`
  color: #000000;
  font-size: 14px;
  font-family: Roboto;
  font-weight: bold;
  margin-top: 10px;
  outline: none;
  border: none;
  width: 100%;
  text-align: center;
`;

const StyledDatePicker = styled(DatePicker)`
  margin-top: 5px;
  margin-bottom: 10px;
  width: 150px;

  input {
    border: none;
    border-bottom: 1px solid #e8e8e8 !important;
    text-align: center;
    border-radius: 0;
    font-size: 12px;

    &:hover {
      border-color: #e8e8e8;
    }

    &:focus {
      border-color: #e8e8e8;
    }
  }
`;

const StyledLabel = styled.div`
  text-align: center;
  color: #777777;
  font-size: 14px;
  height: auto;
  line-height: normal;
`;

class UserPopupMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: props.first_name || '',
      last_name: props.last_name || '',
      email: props.email,
      password: '',
      birthday: props.birthday,
      driverLicense: props.driverLicense,
      ssn: props.ssn || 0,
      profile: props.profile || uploadImg,
      loading: false,
      visible: false,
      visibleDrawer: false
    };

    this.userKeys = [
      'first_name',
      'last_name',
      'email',
      'birthday',
      'driverLicense',
      'ssn',
      'profile'
    ];
  }

  componentDidMount() {
    this.reader = new FileReader();
    this.reader.onloadend = () => {
      this.setState({
        loading: true
      });
      uploadFile(this.reader.result)
        .then(response => response.json())
        .catch(() => {
          this.setState({
            loading: false
          });
          alert('Something went wrong');
        })
        .then(resp => {
          this.setState({
            profile: resp.secure_url,
            loading: false
          });
        });
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props) {
      this.setState({
        first_name: nextProps.first_name || '',
        last_name: nextProps.last_name || '',
        email: nextProps.email,
        birthday: nextProps.birthday,
        driverLicense: nextProps.driverLicense,
        ssn: nextProps.ssn || 0,
        profile: nextProps.profile || uploadImg,
      });
    }
  }

  editProfile = () => {
    this.setState({ visibleDrawer: true });

    this.hideMenu();
  };

  hideMenu = () => {
    this.setState({ visible: false }, this.fixPositionForFirefox);
    setTimeout(this.fixPositionForFirefox, 0);
  };

  showMenu = () => {
    this.setState({ visible: true }, this.fixPositionForFirefox);
    setTimeout(this.fixPositionForFirefox, 0);
  };

  onCloseDrawer = () => {
    this.setState({ visibleDrawer: false });
  };

  handleOnChange = (value, field) => {
    // Save all the inputs` values
    this.setState({ [field]: value });
  };

  fixPositionForFirefox = () => {
    const popoverElement = document.getElementsByClassName('user-popover')[0];
    if (popoverElement) {
      popoverElement.className = 'ant-popover user-popover ant-popover-placement-bottomRight';
    }
  };

  saveProfile = () => {
    this.props.actions.saveProfile(this.state);
    this.onCloseDrawer();
  };

  logout = () => {
    this.hideMenu();
    this.props.actions.logout();
  };

  onChangeDate = (_, dateString) => {
    this.setState({ birthday: dateString });
  };

  render() {
    const { visible } = this.state;

    const childrenWithExtraProp = React.Children.map(
      this.props.children,
      child => {
        return React.cloneElement(child, {
          onClick: this.showMenu
        });
      }
    );

    const content = (
      <Fragment>
        <MenuContainer>
          <LinkItem onClick={this.editProfile} marginBottom>
            Edit Profile
          </LinkItem>
          <LinkItem to={'/services'} onClick={this.hideMenu} marginBottom>
            Settings
          </LinkItem>
          <LinkItem onClick={this.logout}>Log Out</LinkItem>
        </MenuContainer>
        {visible && <BackgroundMenuContainer handleOnClick={this.hideMenu} />}
      </Fragment>
    );

    return (
      <Fragment>
        <Popover
          placement="bottomRight"
          content={content}
          overlayClassName="user-popover"
          overlayStyle={{ position: 'fixed' }}
          visible={visible}
          trigger="click"
        >
          {childrenWithExtraProp}
        </Popover>
        <StyledDrawer
          placement="right"
          closable={false}
          visible={this.state.visibleDrawer}
          width={360}
        >
          <DrawerContent>
            <div className="content-header">
              <button
                onClick={this.onCloseDrawer}
                style={{ cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
            <UploadField
              onFiles={files => this.reader.readAsDataURL(files[0])}
              containerProps={{ className: 'resume_import' }}
              uploadProps={{ accept: '.png, .gif, .jpg, .jpeg' }}
            >
              <ProfilePicture src={this.state.profile} />
              {this.state.loading && (
                <p
                  style={{
                    color: '#666',
                    margin: '2px 0 -11px 0',
                    textAlign: 'center',
                    lineHeight: '13px',
                    height: '28px'
                  }}
                >
                  Uploading...
                </p>
              )}
              <UploadButton>Add/Edit Image</UploadButton>
            </UploadField>
            <div className="input-forms">
              <UserLoginInput
                inputType={'email'}
                label={'Email address'}
                placeholder={'Enter Email'}
                value={this.state.email}
                onChange={e => this.handleOnChange(e.target.value, 'email')}
              />
              <UserLoginInput
                inputType={'password'}
                label={'Password'}
                placeholder={'Enter Password'}
                value={this.state.password}
                onChange={e => this.handleOnChange(e.target.value, 'password')}
              />
              <StyledLabel>Birthday</StyledLabel>
              <StyledDatePicker
                placeholder=""
                onChange={this.onChangeDate}
                defaultValue={moment(this.state.birthday)}
                format="MM/DD/YYYY"
              />
              {/* <UserLoginInput
                inputType={'date'}
                label={'Birthday'}
                placeholder={'Enter Birthday'}
                value={this.state.birthday}
                onChange={e => this.handleOnChange(e.target.value, 'birthday')}
              /> */}
              <UserLoginInput
                inputType={'text'}
                label={"Driver's license number"}
                placeholder={"Enter Driver's license"}
                value={this.state.driverLicense}
                onChange={e =>
                  this.handleOnChange(e.target.value, 'driverLicense')
                }
              />
              <UserLoginInput
                inputType={'number'}
                label={'Social Security Number'}
                placeholder={'Enter Social Security Number'}
                value={this.state.ssn}
                onChange={e => this.handleOnChange(e.target.value, 'ssn')}
              />
              <Button
                onClick={this.saveProfile}
                text="SAVE"
                bgColor="#98C25F"
                textColor="#FFFFFF"
              />
            </div>
          </DrawerContent>
        </StyledDrawer>
      </Fragment>
    );
  }
}

UserPopupMenu.propTypes = {
  showMenu: PropTypes.bool,
  children: PropTypes.node,
  username: PropTypes.string,
  showSmallProfileMenu: PropTypes.bool,
  showLargeProfileMenu: PropTypes.bool,
  actions: PropTypes.object,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.string,
  driverLicense: PropTypes.string,
  ssn: PropTypes.number,
  profile: PropTypes.string
};

function mapStateToProps(state) {
  const { menuLoggedIn } = state;
  const { profile } = state;

  return {
    showSmallProfileMenu: menuLoggedIn.showSmallProfile,
    showLargeProfileMenu: menuLoggedIn.showLargeProfile,
    first_name: profile.first_name,
    last_name: profile.last_name,
    profile: profile.profile,
    email: profile.email,
    birthday: profile.birthday,
    driverLicense: profile.driverLicense,
    ssn: profile.ssn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...authActions,
        ...profileActions
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPopupMenu);
