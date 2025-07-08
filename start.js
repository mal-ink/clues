const loginButton = document.getElementById('login-button');
const signupButton = document.getElementById('signup-button');

document.getElementById('login-button').addEventListener('click', () => {
  window.location.href = 'login.html';
});

document.getElementById('signup-button').addEventListener('click', () => {
  window.location.href = 'signup.html';
});
