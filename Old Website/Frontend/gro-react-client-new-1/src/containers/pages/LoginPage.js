import React from 'react';
import styled from 'styled-components';
import Authentication from '../auth/Authentication';

const Wrapper = styled.div`
  min-height: calc(${window.innerHeight}px - 200px);
  display: flex;
`;

const LoginPage = () => {
  return (
    <Wrapper>
      <Authentication />
    </Wrapper>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
