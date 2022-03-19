import React from 'react';
import {getStartedData} from '../../../store/dataSource';
import './style.css';
import PropTypes from 'prop-types';

const HowMuchBox=props=>
{
    return (
        <div className="coverbox">
            <div className="howmuch">
                <p>How much capital does your company require?</p>
                <select onChange={props.onChange}>
                    {getStartedData.loan_amount_applied.options.map(amount=><option value={amount.value} key={amount.value}>{amount.label}</option>)}
                </select>
            </div>
        </div>
    );
};
HowMuchBox.propTypes = {
    onChange: PropTypes.func,
    dataNav: PropTypes.string
  };
export default HowMuchBox;
