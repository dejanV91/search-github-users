import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import { Login, PrivateRoute, AuthWrapper } from "./pages";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <AuthWrapper>
      <BrowserRouter basename="/">
        <Switch>
          <PrivateRoute path="/" exact={true}>
            <Dashboard></Dashboard>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="*">
            <Error></Error>
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
