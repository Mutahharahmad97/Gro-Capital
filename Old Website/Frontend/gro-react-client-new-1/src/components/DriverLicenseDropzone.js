import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';

import { upload } from 'config/env';
import { uploadDL } from 'utils/auth';

const Wrapper = styled.div`
  width: 45%;
  display: inline-block;
  margin: 10px;
  vertical-align: middle;

  .top-section {
    display: flex;
    justify-content: space-between;
    font-size: 10px;

    .side-label {
      color: #616161;
      font-weight: bold;
    }

    .remove-button {
      color: #CB3E41;
      cursor: pointer;
      outline: none;
      border: none;
    }
  }

  .drop-zone {
    width: 100%;
    height: 120px;
    lineHeight: 70px;
    border: 2px dashed #e0e0e0;
    cursor: pointer;
    display: flex;
    alignItems: center;
    textAlign: center;
    boxSizing: border-box;
    outline: none;

    &.dragging {
      opacity: 0.5;
    }

    span {
      line-height: 1;
      text-align: center;
      margin-top: 40px;
      padding: 0 15px;
    }

    img {
      width: 100%;
    }
  }
`;

class DriverLicenseDropzone extends Component {
  static propTypes = {
    image: PropTypes.string,
    isBack: PropTypes.bool,
    onRemove: PropTypes.func.isRequired,
    onValidate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isBack: false,
  };

  state = {
    uploadedImage: this.props.image,
    uploading: false,
  };

  handleDrop = files => {
    this.setState({
      uploading: true
    });

    files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', 'verification');
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
          this.uploadFileToServer(response);
        });
    });
  };

  uploadFileToServer = resp => {
    uploadDL(resp.secure_url, this.props.isBack)
      .then(result => {
        console.log('--result--', result);
        this.props.onValidate(true);
      })
      .catch(err => {
        console.log('--error--', err);
      });
    this.setState({
      uploadedImage: resp.secure_url,
      uploading: false,
    });
  };

  handleRemove = () => {
    uploadDL(null, this.props.isBack)
      .then(result => {
        console.log('--result--', result);
        this.props.onValidate(false);
      })
      .catch(err => {
        console.log('--error--', err);
      });
    this.setState({
      uploadedImage: null,
    });
  };

  render() {
    const { isBack } = this.props;
    const { uploadedImage, uploading } = this.state;
    return (
      <Wrapper>
        <div className="top-section">
          <span className="side-label">{isBack ? 'Back' : 'Front'}</span>
          <button className="remove-button" onClick={this.handleRemove}>Remove</button>
        </div>
        <Dropzone onDrop={this.handleDrop} multiple={false}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'dragging' : ''}`}>
              {uploading && <span>Uploading...</span>}
              {!uploading && uploadedImage && (
                <img src={uploadedImage} />
              )}
              {!uploading && !uploadedImage && (
                <span>Drop a file or click here to upload</span>
              )}
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
      </Wrapper>
    );
  }
}

export default DriverLicenseDropzone;
