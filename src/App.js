import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import { Login, PrivateRoute } from "./pages";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
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
  );
}

export default App;
