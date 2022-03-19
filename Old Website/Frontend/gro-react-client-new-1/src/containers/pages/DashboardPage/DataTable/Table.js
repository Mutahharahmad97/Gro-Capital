import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  margin-top: 12px;

  th {
    color: #bdbdbd;
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
  }

  tbody > tr {
    height: 35px;
    border-radius: 5px;

    &.even {
      background-color: #F0F7E6;
    }
    &.odd {
      background-color: #FAFCF6;
    }
  }

  td {
    width: 27px;
    color: #424242;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;

    i {
      cursor: pointer;
      font-size: 20px;
      color: #D3E1C4;
    }
  }

  .center {
    text-align: center;
  }
`;

export default Table;
