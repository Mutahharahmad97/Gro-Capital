import React, {Component} from 'react';
import PropTypes from 'prop-types';

import FormField from '../FormField';
import Table from './Table';

class DataTable extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
    })),
    rows: PropTypes.array,
    isEditing: PropTypes.bool,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    onView: PropTypes.func,
  };

  render() {
    const {columns, rows, isEditing, onChange, onRemove, onView} = this.props;
    return (
      <Table>
        <tr>
          {columns.map(column => (
            <th key={column.name} className={column.className || ''}>{column.label}</th>
          ))}
          {onRemove &&
          <th className="center">Remove</th>
          }
          {onView &&
          <th className="center th-style">View</th>
          }
        </tr>
        <tbody>
        {rows.map((row, index) => (
          <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
            {columns.map(column => (
              <td key={column.name} className={column.className || ''}>
                {isEditing && column.isEditable ? (
                  <FormField
                    isEnabled
                    center
                    onChange={(e) => onChange(e.target.value, index)}
                    type="text"
                    value={row[column.name]}
                    width="40%"
                  />
                ) : row[column.name]}
              </td>
            ))}
            {onRemove &&
            <td className="center">
              <i className="fa fa-times-circle" onClick={() => onRemove(row)}/>
            </td>
            }
            {onView &&
            <td className="center">
              <i className="fa fa-eye" onClick={() => onView(row.uid)}/>
            </td>
            }
          </tr>
        ))}
        </tbody>
      </Table>
    );
  }
}

export default DataTable;
