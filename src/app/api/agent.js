import axios from "axios";

axios.defaults.baseURL = "https://parknmoveback.azurewebsites.net/";

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

const Login = {
  login: (email, password) => requests.post("user/login", { email, password }),
};

const agent = {
  Login,
};

export default agent;
