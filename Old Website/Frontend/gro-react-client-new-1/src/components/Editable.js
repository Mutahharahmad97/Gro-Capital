import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.p`
  margin: 0;
  color: #616161;
  font-size: 18px;
  text-overflow: ellipsis;
  overflow: hidden;
  overflow-wrap: normal;
  white-space: nowrap;
`;

const Editable = props => (
  <React.Fragment>
    {props.isEnabled 
      ? props.type === 'textarea' 
        ? <textarea 
            name={props.name}
            value={props.value}
            onChange={props.onChange}
          />
        : <input 
            type={props.type} 
            name={props.name} 
            onChange={props.onChange}
            value={props.value}/>
      : <Label>{props.value || '-'}</Label>
    }
  </React.Fragment>
);

Editable.propTypes = {
  isEnabled: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Editable;