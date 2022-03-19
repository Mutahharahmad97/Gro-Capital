import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import { apiVars, upload } from 'config/env';
/* eslint-disable import/extensions */
import quickBooksImg from 'images/quickBooks.png';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notificationActions } from '../actions/notificationActions';
import { updateUserQBInfo } from 'utils/user';

const Text = styled.p`
  align-items: center;
  line-height: 1;
  text-align: center;
`;

class QuickBooks extends React.Component {
  state = {
    uploading: false
  };

  componentDidMount() {
    if (location.pathname === '/quickbooks') {
      const params = location.search && location.search.split('&');
      const access_token = params && params[2].split('=')[1];
      const realmId = params && params[3].split('=')[1];
      localStorage.setItem('accountingToken', access_token);
      localStorage.setItem('accountingRealmId', realmId);
      updateUserQBInfo(realmId, access_token);
      window.close();
    } else {
      this.checkValidation();
    }
  }

  loginWindow = null;

  connect = () => {
    this.loginWindow = window.open(
      '',
      'Connect to QuickBooks',
      'status=1,width=600,height=650'
    );
    const req = axios.get(apiVars.url + '/accounting/connectToQuickbooks');
    req.then(response => {
      this.loginWindow.location = response.data.data;
      this.startChecking();
    });
  };

  startChecking = () => {
    const i = setInterval(() => {
      if (this.checkValidation()) {
        clearInterval(i);
      }
    }, 500);
  };

  checkValidation = () => {
    if (localStorage.getItem('accountingToken')) {
      this.props.validate();
      return true;
    }
    return false;
  };

  handleDrop = files => {
    const that = this;

    this.setState({
      uploading: true
    });

    files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', `accounting`);
      formData.append('upload_preset', 's1ugqnrl'); // Replace the preset name with your own
      formData.append('api_key', '366138934397762'); // Replace API key with your own Cloudinary key
      formData.append('timestamp', (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return fetch(upload.url, {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        body: formData
      })
        .then(response => response.json())
        .then(response => {
          that.uploadFileToServer(response);
        });
    });
  };

  uploadFileToServer = resp => {
    const uid = localStorage.getItem('userId');
    axios.post(apiVars.url + '/accounting/uploadDocuments', {
      uid,
      name: resp.original_filename,
      link: resp.secure_url
    });

    this.setState({
      uploading: false
    });
    this.props.validate();
    this.props.actions.showNotification(
      '"' + resp.original_filename + '" uploaded!'
    );
    if (this.props.handleResponse) {
      this.props.handleResponse(resp);
    }
  };

  render() {
    const { isDashboard } = this.props;

    if (location.pathname === '/quickbooks') {
      return '';
    }

    return !this.props.children ? (
      <React.Fragment>
        {!this.props.connected && (
          <React.Fragment>
            <h3>To connect to your Quickbooks account click the logo below</h3>
            <img
              onClick={this.connect}
              style={{ height: 'auto', cursor: 'pointer', width: '100%' }}
              src={quickBooksImg}
            />
            <br />
            <br />
            <br />
          </React.Fragment>
        )}
        <Dropzone onDrop={this.handleDrop} multiple>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              style={{
                width: isDashboard ? '49%' : '100%',
                height: isDashboard ? '70px' : '100px',
                fontSize: isDashboard ? 12 : 14,
                lineHeight: '70px',
                border: '2px dashed #E0E0E0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0 15px',
                textAlign: 'center',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            >
              <input {...getInputProps()} />
              {!this.state.uploading && (
                <Text>
                  Simply drag &amp; drop your files here or upload them by
                  clicking here.
                </Text>
              )}
              {this.state.uploading && <Text>Uploading... please wait</Text>}
            </div>
          )}
        </Dropzone>
      </React.Fragment>
    ) : (
        <div onClick={this.connect}>{this.props.children}</div>
      );
  }
}

QuickBooks.propTypes = {
  actions: PropTypes.object,
  validate: PropTypes.func,
  handleResponse: PropTypes.func,
  connected: PropTypes.bool,
  children: PropTypes.node,
  isDashboard: PropTypes.bool
};

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(notificationActions, dispatch) };
}

export default connect(
  null,
  mapDispatchToProps
)(QuickBooks);

/*

redirect_uri=http%3A%2F%2Fec2-54-175-153-92.compute-1.amazonaws.com%3A5000%2Faccounting%2FauthCodeHandler&client_id=Q0qlHtvrfP8gWXQQ0y7mY9JqIaya8t3IKPkaXo5VR3GcJjKFZZ&state=vd7ac09l6oq9317ufc408rmdmccz3b2d5z15ehtg&response_type=code&scope=com.intuit.quickbooks.accounting



*/
