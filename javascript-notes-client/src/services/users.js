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
  update: async (info, params) => {
    //the additional 'info' argument was created so we can change which parameter of the user will be changed... if we call 'email', it will go through the email edit route of the api, and it will look for the email parameter on the req.body
    const response = await Api.put(`/users/edit/${info}`, params, {
      headers: { "x-access-token": localStorage.getItem("token") },
    });
    info != "password" &&
      localStorage.setItem("user", JSON.stringify(response.data));
  },
  delete: async () => {
    await Api.delete("/users", {
      headers: { "x-access-token": localStorage.getItem("token") },
    });
    localStorage.removeItem("user", null);
    localStorage.removeItem("token", null);
  },
};

export default UsersService;
