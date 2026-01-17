import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import { useAuth } from "./context/AuthContext";

const LandingPages = lazy(() => import("./pages/LandingPages"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const AddStudents = lazy(() => import("./pages/AddStudents"));


function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <LandingPages />} />

          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" replace />} />

          <Route path="/add" element={user ? <AddStudents /> : <Navigate to="/" replace />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
