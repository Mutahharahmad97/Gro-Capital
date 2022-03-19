import styled from 'styled-components';

const Box = styled.div`
  background-color: #fff;
  box-shadow: 0px 5px 20px 0 rgba(0, 0, 0, .2);
  box-sizing: border-box;
  border-radius: 5px;
  font-family: Roboto, sans-serif;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px;
  margin: 12px 6px;
  width: 100%;

  @media all and (min-width: 820px) {
    width: auto;
  }
`;

export default Box;
