import { sliderConst } from "constants/index";
import { sliderData } from 'store/dataSource';

export const sliderActions = {
  updateStep,
  updateSlide
};

function updateStep(currentStep, currentPart, page, direct = false) {
  if (direct) {
    return (dispatch) => {
      dispatch({type: sliderConst.STEP, step: 0, page});
      dispatch({type: sliderConst.PART, part: currentPart, page});
    };
  }

  const totalSteps = sliderData[currentPart];

  if (currentStep !== -1 && totalSteps !== currentStep) {
    return {type: sliderConst.STEP, step: currentStep, page};
  }

  const partsKeys = Object.keys(sliderData);
  const partsReverse = Object.assign({}, ...Object.entries(partsKeys).map(([a,b]) => ({ [b]: a })));
  const currentKey = +partsReverse[currentPart];

  if (totalSteps === currentStep) {
    return (dispatch) => {
      dispatch({type: sliderConst.STEP, step: 0, page});
      dispatch({type: sliderConst.PART, part: partsKeys[currentKey + 1], page});
    };
  }

  if (currentStep === -1) {
    return (dispatch) => {
      dispatch({type: sliderConst.STEP, step: sliderData[partsKeys[currentKey - 1]] - 1, page});
      dispatch({type: sliderConst.PART, part: partsKeys[currentKey - 1], page});
    };
  }
}

function updateSlide(slide, page) {
  return {type: sliderConst.SLIDE, slide, page};
}
