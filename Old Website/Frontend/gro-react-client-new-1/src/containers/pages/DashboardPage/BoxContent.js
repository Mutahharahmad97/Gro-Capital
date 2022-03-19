import styled from 'styled-components';

const BoxContent = styled.div`
  display: ${props => props.flex ? 'flex' : 'block'};
  padding-top: ${props => props.padded ? '12px' : 0};
`;

export default BoxContent;
