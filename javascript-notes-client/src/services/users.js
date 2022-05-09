//1 - import the API
import Api from "./api";

//2 - create an objet that will have all the requests
const UsersService = {
  //the baseUrl is already set on the axios preconfigurations
  register: (params) => Api.post("/users/register", params),
  login: async (params) => {
    const response = await Api.post("/users/login", params);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);
  },
  logout: () => {
    localStorage.removeItem("user", null);
    localStorage.removeItem("token", null);
  },
};

export default UsersService;
