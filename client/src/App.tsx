import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { useAuth } from "./context/AuthContext";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { LoginForm, SignupForm } from "./components/_Forms/Forms";
import { UserProvider } from "./context/UserContext";


const App = () => {  
  const { authState } = useAuth();
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            authState?.authenticated ? <Navigate to="/dashboard" /> : <LoginForm />
          } />
          <Route path="/register" element={
            authState?.authenticated ? <Navigate to="/dashboard" /> : <SignupForm />
          } />
          <Route path="/dashboard" element={
            authState?.authenticated ? <UserProvider><Dashboard /></UserProvider> : <Navigate to="/login" />
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>

  );
};

export default App;
