import { scoreConst } from 'constants/index';
import { update, create, getScore as get } from 'utils/score';

export const scoreActions = {
  createScore,
  updateScore,
  getScore
};

function getScore() {
  return dispatch => {
    get().then( response => {
      if (response) {
        dispatch({type: scoreConst.UPDATE, score: response.data.data_score || response.data.data_core || 0});      
      }
    });
  };
}

function createScore() {
  create();
  return { type: scoreConst.CREATE };
}

function updateScore(score) {
  update(score);
  return { type: scoreConst.UPDATE, score };
}