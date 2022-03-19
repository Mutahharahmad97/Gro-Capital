import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  font-size: 12px;
  color: #000;
  border: none;
  outline: none;
  padding: 0 10px;
`;

class LinkButton extends Component {
  static propTypes = {
    isEditing: PropTypes.bool,
    onEdit: PropTypes.func,
    onSave: PropTypes.func,
  };

  render() {
    const { isEditing, onEdit, onSave } = this.props;
    return (
      <Button onClick={isEditing ? onSave : onEdit}>
        {isEditing ? 'Save' : 'Edit'}
      </Button>
    );
  }
}

export default LinkButton;
