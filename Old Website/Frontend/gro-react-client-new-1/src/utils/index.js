const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function checkEmail(email) {
  return emailRegex.test(email);
}

export function checkPassword(password) {
  return password.length > 5;
}

export function isLoggedIn() {
  return !!localStorage.getItem('authToken');
}
