import { loanConst } from 'constants/index';

export const loanActions = {
  updateTarget,
  updateType,
  updatePurpose
};

function updateTarget(amount) {
  return { type: loanConst.AMOUNT, amount: amount.value };
}

function updateType(targetType) {
  return { type: loanConst.TYPE, targetType: targetType.value };
}

function updatePurpose(purpose) {
  return { type: loanConst.PURPOSE, purpose: purpose.value };
}
