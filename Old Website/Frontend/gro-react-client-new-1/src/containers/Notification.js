import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notificationActions } from 'actions/notificationActions';

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  width: 600px;
  box-sizing: border-box;
  left: calc(50% - 300px);
  border-radius: 5px;
  background-color: ${props => props.mode === 'success' ? 
    props.theme.lightGreenColor : props.theme.lightRedColor
  };
  font-family: ${props => props.theme.fontFamily};
  padding: 25px;
  z-index: 1000;
  box-shadow: 0 3px 14px 0 rgba(0,0,0,0.25);
  opacity: ${props => props.visible};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transition: visibility 1s linear,opacity 1s linear;;
`;

const Text = styled.div`
  text-align: center;
  font-size: 20px;
  padding-right: 90px;
  color: #e8f2de;
  min-height: 30px;
`;

const Dismiss = styled.div`
  color: #f7e839;
  position: absolute;
  right: 30px;
  top: calc(50% - 15px);
  padding: 5px;
  cursor: pointer;
`;

class Notification extends Component {

  componentWillReceiveProps(nextProps) {
    // Auto hide notification after 10 seconds
    if (nextProps.visible && this.props.visible !== nextProps.visible) {
      setTimeout(() => {
        this.props.actions.hideNotification();
      }, nextProps.mode === "error" ? 10000 : 5000);
    }
  }

  render() {
    return (
      <Wrapper visible={this.props.visible ? 1 : 0} mode={this.props.mode || 'success'}>
        <Text>{this.props.text}</Text>
        <Dismiss onClick={this.props.actions.hideNotification}>DISMISS</Dismiss>
      </Wrapper>
    );
  }
}

Notification.propTypes = {
  mode: PropTypes.string,
  visible: PropTypes.bool,
  text: PropTypes.string.isRequired,
  actions: PropTypes.object
};

function mapStateToProps({ notification }) {
  return {
    mode: notification.mode,
    visible: notification.visible,
    text: notification.text
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(notificationActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
