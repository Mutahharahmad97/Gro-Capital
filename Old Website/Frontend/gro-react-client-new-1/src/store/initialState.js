const initialState = () => {
  const profileJson = localStorage.getItem('profile');

  let profile = {};

  if (profileJson) {
    profile = JSON.parse(profileJson);
  }

  return {
    slider: {
      getStarted: {
        currentPart: 'introduction',
        currentStep: 0,
        currentSlide: 0
      },
      learnMore: {
        currentSlide: 0
      }
    },
    auth: {
      loggedIn: !!localStorage.getItem('authToken')
    },
    notification: {
      visible: false,
      text: ""
    },
    profile: profile,
    loading: {
      show: false
    },
    company: {
      company_name: '',
      ein: '',
      duns: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      loan_amount_applied: '',
      loan_type: '',
      loan_reason: ''
    },
    score: {
      value: 0
    }
  };
};

export default initialState;