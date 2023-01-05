import { Dashboard, Error, Login, PrivateRoute, AuthWrapper } from "./pages";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute path="/">
                <Dashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </AuthWrapper>
  );
}

export default App;
