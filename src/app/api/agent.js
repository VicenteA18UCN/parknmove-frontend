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
  getUser: (userId) => requests.get(`user/getUser/${userId}`),
};

const GetParkings = {
  getParkings: () => requests.get("parking/getParkings"),
  getParking: (parkingId) => requests.get(`parking/getParking/${parkingId}`),
};

const EditParking = {
  editParking: (newParking) => requests.put(`parking/editParking`, { newParking }),
};

const GetReservations = {
  getReservations: () => requests.get("/reservations/history"),
};


const agent = {
  Login,
  GetUsers,
  GetParkings,
  EditParking,
  GetReservations,
};

export default agent;
