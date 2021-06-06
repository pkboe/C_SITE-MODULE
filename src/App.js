// import Main from "./pages/Main";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./Components/Footer";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./plugins/AuthContext";
import AfterLogin from "./pages/AfterLogin";
import Navbar from "./Components/Navbar";
import AddDrive from "./Components/AddDrive";

function App() {
  return (
    <div className="container-xxxl">
      <div className="max-content">
        <AuthProvider>
          <Router>
            <Navbar />
            <Switch>
              {/* <Route component={Main} path="/" /> */}
              <Route component={SignUp} path="/Signup" />
              <Route component={Login} path="/Login" />
              {/* <Route component={CompanyDB} path="/Companydb" /> */}
              <Route exact component={AfterLogin} path="/" />
              <Route exact component={AddDrive} path="/AddDrive" />
            </Switch>
            <Footer />
          </Router>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
