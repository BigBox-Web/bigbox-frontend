import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserManagementPage from "./pages/admin/user/UserManagementPage";
import CreateUserPage from "./pages/admin/user/CreateUserPage";
import EditUserPage from "./pages/admin/user/EditUserPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" Component={RegisterPage} />
        <Route path="/login" Component={LoginPage} />

        <Route path="/admin">
          <Route path="users" Component={UserManagementPage} />
          <Route path="users/create" Component={CreateUserPage} />
          <Route path="users/edit/:userId" Component={EditUserPage} />
        </Route>

        <Route path="*" Component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;
