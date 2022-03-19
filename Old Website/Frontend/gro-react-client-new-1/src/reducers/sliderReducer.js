import { sliderConst } from 'constants/index';

export function slider(state = {}, action) {
  switch (action.type) {
    case sliderConst.PART:
      return {
        ...state,
        [action.page]: {
          ...state[action.page],
          currentPart: action.part
        }
      };
    case sliderConst.STEP:
      return {
        ...state,
        [action.page]: {
          ...state[action.page],
          currentStep: action.step
        }
      };
    case sliderConst.SLIDE:
      return {
        ...state,
        [action.page]: {
          ...state[action.page],
          currentSlide: action.slide
        }
      };
    default:
      return state;
  }
}
