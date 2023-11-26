import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/";

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

const GetUsers = {
  getUsers: () => requests.get("user/getUsers"),
};

const GetParkings = {
  getParkings: () => requests.get("parking/getParkings"),
};

const EditParking = {
  editParking: (parking) => requests.put("parking/editParking", parking),
};

const agent = {
  Login,
  GetUsers,
  GetParkings,
};

export default agent;
