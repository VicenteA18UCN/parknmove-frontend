import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../store/store";

axios.defaults.baseURL = "http://localhost:4000/";

const responseBody = (response) => response.data;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  if (token) config.headers.Authorization = "Bearer " + token;
  return config;
});

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

const Login = {
  login: (email, password) => requests.post("user/login", { email, password }),
};

const GetUsers = {
  getUsers: () => requests.get("user/getUsers"),
};

const Update = {
  update: (user) =>
  requests.put(`user/updateUser/`, { user }),
};

const GetParkings = {
  getParkings: () => requests.get("parking/getParkings"),
};

const Search = {
  searchUser: (
    searchData
  ) => requests.post("user/searchUser", { searchData }),
};

const agent = {
  Login,
  GetUsers,
  Update,
  GetParkings,
  Search
};

export default agent;
