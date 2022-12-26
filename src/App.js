import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Login from "./pages/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <Dashboard></Dashboard>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="*">
          <Error></Error>
        </Route>
        {/* <Route path="/" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Error />} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
