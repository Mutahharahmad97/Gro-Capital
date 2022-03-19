import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

function NewStakeholderForm({ onChange, stakeholder }) {
  return (
    <Form>
      <Form.Item label="Name">
        <Input name="name" value={stakeholder.name} onChange={onChange} />
      </Form.Item>
      <Form.Item label="% Owned">
        <Input name="percentage" value={stakeholder.percentage} onChange={onChange} />
      </Form.Item>
    </Form>
  );
}

NewStakeholderForm.propTypes = {
  onChange: PropTypes.func,
  stakeholder: PropTypes.object,
};

export default NewStakeholderForm;
