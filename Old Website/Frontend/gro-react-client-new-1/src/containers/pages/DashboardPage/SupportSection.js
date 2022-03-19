import styled from 'styled-components';

const SupportSection = styled.div`
  h3 {
    color: #616161;
    margin-top: 10px;
    margin-bottom: 3px;
  }

  a {
    color: #000;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    &:hover {
      color: #000;
    }
  }
`;

SupportSection.displayName = 'SupportSection';

export default SupportSection;
