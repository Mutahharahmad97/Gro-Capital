import styled from 'styled-components';

const PersonalInfoContent = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    width: 33%;
  }
`;

PersonalInfoContent.displayName = 'PersonalInfoContent';

export default PersonalInfoContent;
