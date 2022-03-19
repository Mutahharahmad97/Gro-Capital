import styled from 'styled-components';

const BoxHeader = styled.div`
  display: flex;
  border-bottom: 1.5px solid #78787825;
  padding-bottom: 10px;
  position: relative;
  line-height: 1;

  .action-buttons button {
    position: absolute;
    right: 0;
    height: 23px;
    border-radius: 4px;
    background-color: #98C25F !important;
    color: #FFFFFF;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 400;
    top: -3px;
    border: none !important;
    outline: none;
    cursor: pointer;
  }
`;

export default BoxHeader;
