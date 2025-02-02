import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import EmailVerify from "./components/EmailVerify/EmailVerify";
import Get from './pages/Get'
import Integration from './pages/Integration'
import IntegrationSuccess from './pages/TestIntegrationSuccess'

const App = () => {
  const user = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/get" element={<Get />}/>
              <Route path="/integration-and-testing" element={<Integration />} />
              <Route path="/integration-success" element={<IntegrationSuccess />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="users/:id/verify/:token" element={<EmailVerify />} />
            </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
