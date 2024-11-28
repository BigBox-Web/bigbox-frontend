import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserManagementPage from "./pages/admin/UserManagementPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" Component={RegisterPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/admin/users" Component={UserManagementPage} />

        <Route path="*" Component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;
