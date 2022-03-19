import moment from 'moment';

import {companyConst} from 'constants/index';

export function company(state = {}, action) {
  switch (action.type) {
    case companyConst.LOAD:
      return {
        ...state,
        company_name: action.company.company_name,
        ein: action.company.ein,
        duns: action.company.duns,
        address: action.company.address,
        company_phone: action.company.company_phone,
        structure: action.company.structure,
        industry: action.company.industry,
        established_date: moment(action.company.established_date).format('MM/DD/YYYY'),
        revenue: action.company.annual_revenue,
        city: action.company.city,
        state: action.company.state,
        zipcode: action.company.zipcode,
        loan_amount_applied: action.company.loan_amount_applied,
        amount: action.company.amount || 0,
        loan_type: action.company.loan_type,
        loan_reason: action.company.loan_reason,
        loan_reason_other: action.company.loan_reason_other,
        rating: action.company.rating,
        last_time_rating_fetched: action.company.last_time_rating_fetched,
      };
    case companyConst.UPDATE:
      return {
        ...state,
        [action.company.key]: action.company.value
      };
    case companyConst.RESET:
      return {
        ...state,
        company_name: '',
        ein: '',
        duns: '',
        address: '',
        phone: '',
        structure: '',
        industry: '',
        date: '',
        revenue: '',
        city: '',
        state: '',
        zipcode: '',
        loan_amount_applied: '',
        loan_type: '',
        loan_reason: '',
        rating: '',
        last_time_rating_fetched: ''
      };
    default:
      return state;
  }
}
