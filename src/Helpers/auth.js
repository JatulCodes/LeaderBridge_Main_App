import { STORAGEKEY } from "../config/app.config";

class Auth {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static setAuthToken(token) {
    localStorage.setItem(STORAGEKEY.token, token);
  }
  /*
   * Sets AuthData to sessionStorage
   * */
  static setAuthData(data) {
    localStorage.setItem(STORAGEKEY.authData, JSON.stringify(data));
  }

  /*
   * Get userData
   *
   * */
  static getAuthData() {
    try {
      return JSON.parse(localStorage.getItem(STORAGEKEY.authData));
    } catch (e) {
      return {};
    }
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem(STORAGEKEY.token) !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    // localStorage.removeItem(STORAGEKEY.token);
    // localStorage.removeItem(STORAGEKEY.authData);
    // localStorage.removeItem(STORAGEKEY.userData);
    // localStorage.removeItem(STORAGEKEY.layoutData);
    localStorage.clear();
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */
  static getToken() {
    return localStorage.getItem(STORAGEKEY.token);
  }

  /*
   * Sets userData to localStorage
   * */
  static setUserData(data) {
    localStorage.setItem(STORAGEKEY.userData, JSON.stringify(data));
  }

  /*
   * Get userData
   * */
  static getUserData() {
    try {
      return JSON.parse(localStorage.getItem(STORAGEKEY.userData));
    } catch (e) {
      return {};
    }
  }
}

export default Auth;
