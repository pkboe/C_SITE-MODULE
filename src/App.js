import Main from "./pages/Main";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./Components/Footer";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./plugins/AuthContext";
import AfterLogin from "./pages/AfterLogin";

function App() {
  return (
    <div className="container-xxxl">
      <div className="max-content">
        <AuthProvider>
          <Router>
            <Switch>
              <Route exact component={Main} path="/" />
              <Route component={SignUp} path="/Signup" />
              <Route component={Login} path="/Login" />
              {/* <Route component={CompanyDB} path="/Companydb" /> */}
              <Route component={AfterLogin} path="/AfterLogin" />
            </Switch>
            <Footer />
          </Router>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
