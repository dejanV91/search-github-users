import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import { Login, PrivateRoute, AuthWrapper } from "./pages";
import { HashRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <AuthWrapper>
      <HashRouter>
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
      </HashRouter>
    </AuthWrapper>
  );
}

export default App;
