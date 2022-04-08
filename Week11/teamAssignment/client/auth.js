import { makeRequest } from './authHelpers.js';

export default class Auth {
  constructor(errorHandler) {
    this.jwtToken = '';
    this.user = {};
    this.errors = errorHandler;
  }

  async login(callback) {
    const password = document.getElementById('password');
    const username = document.getElementById('username');
    const postData = {
      email: username.value,
      password: password.value
    };
    try {
      const data = await makeRequest('login', 'POST', postData);
      this.jwtToken = data.accessToken;
      this.user = await this.getCurrentUser(username.value);
      console.log(data);

      hideLogin();
      password.value = '';
      this.errors.clearError();
      callback();
    } catch (error) {
      this.errors.handleError(error);
      console.log(error);
    }
  }
  async getCurrentUser(email) {
    try {
      const data = await makeRequest(
        'users?email=' + email,
        'GET',
        null,
        this.jwtToken
      );

      console.log(data);
      return data[0];
    } catch (error) {
      this.errors.handleError(error);

      console.log(error);
    }
  }
  async updateUser() {
    this.user.age = 40;
    try {
      const result = await makeRequest(
        'users/' + this.user.id,
        'PUT',
        this.user,
        this.jwtToken
      );
      console.log('Update user:', result);
    } catch (error) {
      this.errors.handleError(error, showLogin);
    }
  }

  set token(value) {
  }
  get token() {
    return this.jwtToken;
  }
}

function showLogin() {
  document.getElementById('login').classList.remove('hidden');
}

function hideLogin() {
  document.getElementById('login').classList.add('hidden');
}
