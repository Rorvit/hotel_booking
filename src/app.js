import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import LogOut from "./layouts/logout";
import Users from "./layouts/users"
import Hotels from "./layouts/hotels";
import NotFound from "./components/ui/notFound";
import AppLoader from "./components/ui/hoc/appLoader";
import ProtectedRoute from "./components/common/protectedRoute";
import AdminPage from "./components/pages/adminPage";

function App() {
  return (
    <>
      <AppLoader>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route path="/hotels/:HotelsId?" component={Hotels} />
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <ProtectedRoute path="/admin" component={AdminPage}/>
          <Redirect from="/main" to="/" />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </AppLoader>
      {/* <ToastContainer /> */}
    </>
  );
}
export default App;
