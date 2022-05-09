import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import RegisterScreen from "./screens/auth/register";
import LoginScreen from "./screens/auth/login";
import NotesScreen from "./screens/notes/index";
import UserEditScreen from "./screens/users/edit";
import HomeScreen from "./screens/home";
import PrivateRoute from "./components/auth/private_route";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route exact path="/register" element={<RegisterScreen />} />
        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path="/notes" element={<PrivateRoute />}>
          <Route exact path="/notes" element={<NotesScreen />} />
        </Route>
        <Route exact path="/users/edit" element={<PrivateRoute />}>
          <Route exact path="/users/edit" element={<UserEditScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
