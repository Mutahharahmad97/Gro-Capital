/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BackgroundMenuContainer from 'components/BackgroundMenuContainer';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import { menuActions } from 'actions/menuActions';
import { authActions } from "actions/authActions";
import { profileActions } from "actions/profileActions";
import settingsImg from 'images/settings.png';
import uploadImg from 'images/uploadImage.png';
import LoginInput from 'components/auth/LoginInput';
import Button from 'components/Button';
import { UploadField } from '@navjobs/upload';
import uploadFile from 'utils/upload';

const Container = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  background: white;
`;

const ParentContainer = Container.extend`
  width: 1000px;
  height: 100vh;
  box-shadow: -1px 0 10px 0 rgba(0,0,0,0.10);
  margin-right: -1000px;
  transform: translateX(-${props => props.show * 100}%);
  transition-duration: 0.5s;
`;

const ScrollContainer = styled.div`
  position: relative;
  height: 100%;
  overflow: scroll;
`;

const SmallContainer = Container.extend`
  width: 320px;
  height: 100%;
  padding: 40px 0 0 40px;
  left: 0;
`;

const LargeContainer = Container.extend`
  width: 600px;
  padding: 20px;
  right: 0;
`;

const Label = styled.div`
  color: ${props => props.theme.greyColor};
  font-size: 17px;
  margin-top: 20px;
`;

const SmallImg = styled.div`
  border-radius: 50%;
  height: 100px;
  width: 100px;
  background: url(${props => props.src}) center no-repeat;
  background-size: cover;
  margin-right: 20px;
  float: left;
`;

const Username = styled.div`
  font-size: 24px;
  line-height: 32px;
`;

const Logout = styled.div`
  cursor: pointer;
  color: #c2c2c2;
  font-weight: 600;
  font-size: 22px;
  line-height: 25px;
  margin-top: 15px;
  text-decoration: none;
`;

const UsernameContainer = styled.div`
  float: left;
  width: 200px;
  margin-top: 10px;
  position: relative;
`;

const Settings = styled.div`
  position: absolute;
  background-image: url(${props => props.src});
  width: 35px;
  height: 35px;
  top: 15px;
  right: 30px;
  cursor: pointer;
  background-size: contain;
`;

const HideAll = styled.div`
  position: absolute;
  top: 25px;
  left: -25px;
  width: 50px;
  height: 50px;
  border: 2px solid ${props => props.theme.greenColor};
  border-radius: 50%;
  z-index: 12;
  background-color: white;
  text-align: center;
  cursor: pointer;

  & svg {
    color: ${props => props.theme.greenColor};
    font-size: 35px;
    margin-top: -16px;
  }
`;

const HideLarge = styled.div`
  position: absolute;
  right: 5px;
  top: calc(50% - 30px);
  cursor: pointer;
  z-index: 12;
  & svg {
    font-size: 35px;
  }
`;

const ProfilePicture = styled.div`
  background: url(${props => props.src})  center no-repeat;
  background-size: cover;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  margin: 30px auto 0;
`;

const LeftSide = styled.div`
  width: 50%;
  float: left;
  padding-bottom: 100px;
`;

const RightSide = styled.div`
  width: 50%;
  float: right;
`;

const UserLoginInput = styled(LoginInput)`
  width: 100%;
  margin: 5px;
  label {
    margin-bottom: -15px;
  }
  input {
    font-size: 20px;
    color: #74a157;
    border-bottom: none;
    &:focus {
      border-bottom: 1px solid #e8e8e8;
    }
  }
`;

const SaveButton = styled(Button)`
  position: absolute;
  right: 30px;
  bottom: 50px;
  min-width: 120px;
  z-index: 11;
`;

const NameInput = styled.input`
  margin: 30px 0 30px 0;
  border: none;
  width: 35%;
  font-size: 26px;
  letter-spacing: 5px;
  font-weight: 300;
  color: #74a157;
  &::placeholder {
    color: #74a157;
  }
  &:focus {
    border-bottom: 1px solid #e8e8e8;
    outline: none;
  }
`;

const FirstNameInput = NameInput.extend`
  text-align: right;
  margin-left: 14%;
`;
const LastNameInput = NameInput.extend`
  text-align: left;
  margin-left: 15px;
`;

class UserMenu extends React.Component {

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
      loading: false
    };

    this.userKeys = ['first_name', 'last_name', 'email', 'birthday', 'driverLicense', 'ssn', 'profile'];
  }

  componentDidMount() {
    this.reader = new FileReader();
    this.reader.onloadend = () => {
      this.setState({
        loading: true
      });
      uploadFile(this.reader.result)
        .then(response => response.json())
        .catch(
          () => {
            this.setState({
              loading: false
            });
            alert("Something went wrong");
          }
        )
        .then(
          resp => {
            this.setState({
              profile: resp.secure_url,
              loading: false
            });
          }
        );
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showSmallProfileMenu &&
        (nextProps.showSmallProfileMenu !== this.props.showSmallProfileMenu))
    {
      // Scroll to top everytime user open the profile menu
      this._profileContainer.scrollTop = 0;
    }

    // We need to recheck all values, we receive these props later
    for (let i = 0; i < this.userKeys.length; i++) {
      if (nextProps[this.userKeys[i]] != this.props[this.userKeys[i]]) {
        this.setState({[this.userKeys[i]]: nextProps[this.userKeys[i]]});
      }
    }
  }

  logout = () => {
    this.handleHideAll();
    this.props.actions.logout();
  };

  handleHideAll = () => {
    this.props.actions.hideFullProfileMenu();
  };

  handleOnChange = (value, field) => {
    // Save all the inputs` values
    this.setState({ [field]: value });
  };

  saveProfile = () => {
    this.props.actions.saveProfile(this.state);
    this.props.actions.hideFullProfileMenu();
  };

  render() {
    // Percentages hardcoded, relative to parent width and containers
    const show = (this.props.showSmallProfileMenu ? 0.36 : 0) + (this.props.showLargeProfileMenu ? 0.64 : 0);
    return (
      <React.Fragment>
        <ParentContainer show={show}>
          {this.props.showLargeProfileMenu &&
            <HideAll onClick={this.handleHideAll}>
              <FaAngleRight/>
            </HideAll>
          }
          <ScrollContainer innerRef={(ref) => this._profileContainer = ref}>
            <SmallContainer>
              {!this.props.showLargeProfileMenu &&
                <Settings src={settingsImg}
                        onClick={this.props.actions.showLargeProfileMenu}
                />
              }
              <Label>I'm logged in as:</Label>
              <SmallImg src={this.props.profile}/>
              <UsernameContainer>
                <Username>{this.props.username}</Username>
                <Logout onClick={this.logout.bind(this)}>LOGOUT</Logout>
                {this.props.showLargeProfileMenu &&
                  <HideLarge onClick={this.props.actions.hideLargeProfileMenu}>
                    <FaAngleRight/>
                  </HideLarge>
                }
              </UsernameContainer>
            </SmallContainer>
            <LargeContainer>
              <UploadField onFiles={files => this.reader.readAsDataURL(files[0])}
                          containerProps={{className: 'resume_import'}}
                          uploadProps={{accept: '.png, .gif, .jpg, .jpeg',}}>
                <ProfilePicture src={this.state.profile} />
                {this.state.loading && <p style={{color: '#666', margin: "2px 0 -11px 0", textAlign: "center", lineHeight: "13px", height: "28px"}}>uploading...</p>}
              </UploadField>
              <FirstNameInput type="text"
                            value={this.state.first_name}
                            placeholder={"FIRST NAME"}
                            onChange={(e) => this.handleOnChange(e.target.value, 'first_name')}
              />
              <LastNameInput type="text"
                            value={this.state.last_name}
                            placeholder={"LAST NAME"}
                            onChange={(e) => this.handleOnChange(e.target.value, 'last_name')}
              />
              <LeftSide>
                <UserLoginInput inputType={"email"}
                            label={"Email address"}
                            placeholder={"Enter Email"}
                            value={this.state.email}
                            onChange={(e) => this.handleOnChange(e.target.value, 'email')}
                />
                {/* <UserLoginInput inputType={"password"}
                            label={"Password"}
                            placeholder={"Enter Password"}
                            value={this.state.password}
                            onChange={(e) => this.handleOnChange(e.target.value, 'password')}
                /> */}
                <UserLoginInput inputType={"date"}
                            label={"Birthday"}
                            placeholder={"Enter Birthday"}
                            value={this.state.birthday}

                            onChange={(e) => this.handleOnChange(e.target.value, 'birthday')}
                />
                <UserLoginInput inputType={"text"}
                            label={"Driver's license number"}
                            placeholder={"Enter Driver's license"}
                            value={this.state.driverLicense}
                            onChange={(e) => this.handleOnChange(e.target.value, 'driverLicense')}
                />
                <UserLoginInput inputType={"number"}
                                label={"Social Security Number"}
                                placeholder={"Enter Social Security Number"}
                                value={this.state.ssn}
                                onChange={(e) => this.handleOnChange(e.target.value, 'ssn')}
                />
              </LeftSide>
              <RightSide>
                &nbsp;
              </RightSide>
              <SaveButton onClick={this.saveProfile} text={"SAVE"} bgColor={"#8BC34A"}/>
            </LargeContainer>
          </ScrollContainer>
        </ParentContainer>
        { this.props.showSmallProfileMenu &&
          <BackgroundMenuContainer handleOnClick={this.handleHideAll}
                                  opacity={this.props.showLargeProfileMenu ? 0.5 : 0}
          />
        }
      </React.Fragment>
    );
  }
}

UserMenu.propTypes = {
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
  profile: PropTypes.string,
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
  return {actions: bindActionCreators(
    {
      ...menuActions,
      ...authActions,
      ...profileActions
    },
    dispatch
  )};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
