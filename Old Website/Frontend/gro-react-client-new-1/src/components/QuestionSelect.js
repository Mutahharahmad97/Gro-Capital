import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import '../styles/global.css';

const QSelect = styled(Select)`
  & .Select-control {
    border-color: #ccc!important;
    box-shadow: none!important;
    text-indent: 15px;
    padding: 5px;
  }

  & .Select-option {
    color: ${props => props.theme.darkerBlack};
    text-align: left;
    text-indent: 15px;
  }

  & .Select-option.is-focused {
    background-color: whitesmoke;
    color: ${props => props.theme.darkerBlack};
  }

  & .Select-placeholder {
    color: ${props => props.theme.lightBlack};
    text-align: left;
    font-size: 18px;
    line-height: 42px;
  }

  & .Select-control .Select-value {
    line-height: 42px!important;
    text-align: left;
  }

  .Select-menu-outer {
    max-height: 400px;
  }

  & .Select-menu {
    padding: 20px 0 30px 0;
    max-height: 398px;
  }
`;

const QuestionSelect = (props) => {
  return (
    <QSelect
      className={props.className}
      disabled={props.disabled}
      name={props.name}
      value={props.selectedOption}
      clearable={props.clearable || false}
      searchable={props.searchable || false}
      onChange={props.handleChange}
      autosize={false}
      placeholder={props.placeholder || "Please choose..."}
      wrapperStyle={{ margin: "20px 0 0 0" }}
      options={props.options}
    />
  );
};

QuestionSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  selectOption: PropTypes.string,
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  placeholder: PropTypes.string,
  selectedOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  handleChange: PropTypes.func
};

export default QuestionSelect;
