import React from 'react';
//import styled from 'styled-components';

class LinkedinPopup extends React.Component {

  componentDidMount() {
    const params = location.search.split('&');
    const access_token = params[2].split('=')[1];
    localStorage.setItem('linkedinToken', access_token);
  }

  render() {
    return (
      <React.Fragment>
        <h3 style={{textAlign: 'center'}}>Linkedin Connected</h3>
        <h4 style={{textAlign: 'center'}}>Redirect...</h4>
      </React.Fragment>
    );
  }
}

export default LinkedinPopup;
