import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
