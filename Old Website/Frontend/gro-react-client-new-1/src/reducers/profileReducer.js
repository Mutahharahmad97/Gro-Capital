import { profileConst } from 'constants/index';

export function profile(state = {}, action) {
  switch(action.type) {
    case profileConst.LOAD:
      return {
        ...state,
        first_name: action.profile.first_name,
        last_name: action.profile.last_name,
        profile: action.profile.profile,
        email: action.profile.email,
        password: action.profile.password,
        birthday: action.profile.birthday,
        driverLicense: action.profile.driverLicense,
        ssn: action.profile.ssn,
        last_step: action.profile.last_step,
        dl_front: action.profile.dl_front,
        dl_back: action.profile.dl_back,
        admin: action.profile.admin,
      };
    case profileConst.RESET:
      return {
        ...state,
        first_name: '',
        last_name: '',
        profile: '',
        email: '',
        password: '',
        birthday: '',
        driverLicense: '',
        ssn: '',
        last_step: 0,
        dl_front: '',
        dl_back: '',
        admin: '',
      };
    case profileConst.SAVE:
      return {
        ...state,
        first_name: action.profile.first_name,
        last_name: action.profile.last_name,
        profile: action.profile.profile,
        email: action.profile.email,
        password: action.profile.password,
        birthday: action.profile.birthday,
        driverLicense: action.profile.driverLicense,
        ssn: action.profile.ssn,
        last_step: action.profile.last_step,
      };
    default:
      return state;
  }
}
