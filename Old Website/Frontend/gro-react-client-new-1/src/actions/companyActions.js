import {companyConst} from 'constants/index';
import {getCompany, createNewCompany} from 'utils/company';
import {scoreActions} from 'actions/scoreActions';
import {addCompanyUid} from 'utils/user';

export const companyActions = {
  loadCompany,
  resetCompany,
  updateCompany,
  newCompany
};

function loadCompany() {
  return dispatch => {
    dispatch({type: companyConst.RESET});
    const uid = localStorage.getItem("companyId");
    if (!uid) return;
    getCompany(uid)
      .then((resp) => {
        const userId = localStorage.getItem('userId');
        const company = resp.data.data;
        if (company.company_name === userId) {
          company.company_name = '';
        }
        dispatch({type: companyConst.LOAD, company});
      });
  };
}

function resetCompany() {
  return {type: companyConst.RESET};
}

function updateCompany(value, key) {
  const company = {key, value};
  return {type: companyConst.UPDATE, company};
}

function newCompany() {
  return dispatch => {
    createNewCompany()
      .then(response => {
        if (response.data.data) {
          const cuid = response.data.data.uid;
          localStorage.setItem("companyId", cuid);
          addCompanyUid(cuid);
          dispatch(scoreActions.createScore());
        }
      });
  };
}
