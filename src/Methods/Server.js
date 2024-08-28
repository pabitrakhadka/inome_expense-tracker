// Server.js
import axios from 'axios';
import { getCookie } from 'cookies-next'; // Import getCookie from cookies-next

class Server {
  constructor() {
    console.log('Server constructor called');
    this.header = typeof window !== 'undefined' ? this._getAuthHeader() : {};
    console.log('Initial header:', this.header);
  }

  _getAuthHeader() {
    // Retrieve token from cookies using cookies-next
    const token = getCookie('token'); // Gets the 'token' cookie value
    console.log('Token from cookies:', token);

    // Return the authorization header if the token exists
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  setAuth() {
    // Update the header with the latest token from cookies
    if (typeof window !== 'undefined') {
      this.header = this._getAuthHeader();
      console.log('Updated header with new token:', this.header);
    }
  }

  get(path, params) {
    return axios.get(path, {
      params: params,
      headers: this.header,
    });
  }

  post(path, data) {
    return axios.post(path, data, {
      headers: this.header,
    });
  }

  put(path, data) {
    return axios.put(path, data, {
      headers: this.header,
    });
  }

  delete(path, params) {
    return axios.delete(path, {
      params: params,
      headers: this.header,
    });
  }
}

const server = new Server();
export default server;
