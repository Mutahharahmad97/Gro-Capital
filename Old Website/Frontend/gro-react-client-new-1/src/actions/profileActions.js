import { profileConst } from 'constants/index';
import { storeProfile } from 'utils/user';
import { updateServerProfile, updateUserStatus } from '../utils/user';

export const profileActions = {
  loadProfile,
  saveProfile,
  updateStatus
};

function loadProfile(profile) {
  return { type: profileConst.LOAD, profile };
}

function saveProfile(profile) {
  storeProfile(profile);
  updateServerProfile(profile);
  return { type: profileConst.SAVE, profile };
}

function updateStatus(status) {
  const profileJSON = localStorage.getItem('profile');
  if (!profileJSON) return;
  const profile = JSON.parse(profileJSON);
  profile.status = status;
  localStorage.setItem('profile', JSON.stringify(profile));
  updateUserStatus(status);
}
