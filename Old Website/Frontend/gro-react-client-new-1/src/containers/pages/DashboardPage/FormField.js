import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Editable from 'components/Editable';

const Wrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 8px;
  margin-left: ${props => props.center ? 'auto' : 'inherit'};
  margin-right: ${props => props.center ? 'auto' : 'inherit'};
  width: ${props => props.width || 'initial'};

  & input,
  & textarea {
    box-sizing: border-box;
    border: 1px solid #ccc;
    flex: 1;
    font-size: 14px;
    padding: 5px 10px;
    max-width: 100%;
    outline: 0;
    resize: none;
    width: 90%;

    &:focus {
      outline: 0;
    }
  }

  @media all and (min-width: 820px) {
    flex-direction: row;
  }
`;

const Label = styled.label`
  display: block;
  color: #bdbdbd;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
`;

const ValueLabel = styled.p`
  margin: 0;
  color: #616161;
  font-size: 18px;
  text-overflow: ellipsis;
  overflow: hidden;
  overflow-wrap: normal;
  white-space: nowrap;
`;

class FormField extends Component {
  renderComponent = (component, isEnabled, value) => {
    return isEnabled
      ? component
      : <ValueLabel>{value}</ValueLabel>;
  };

  render() {
    const { name, label, center, width, component, isEnabled, value, ...rest } = this.props;
    return (
      <Wrapper width={width} center={center}>
        <Label htmlFor={name}>{label}</Label>
        {component
          ? this.renderComponent(component, isEnabled, value)
          : <Editable name={name} isEnabled={isEnabled} value={value} {...rest} />
        }
      </Wrapper>
    );
  }
}

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  center: PropTypes.bool,
  width: PropTypes.string,
  component: PropTypes.node,
  isEnabled: PropTypes.bool,
  value: PropTypes.string,
};

FormField.defaultProps = {
  width: 'initial',
};

export default FormField;
