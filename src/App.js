import Main from "./pages/Main";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./Components/Footer";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./Components/Navbar";
import CompanyDB from "./pages/CompanyDB";
import { AuthProvider } from "./plugins/AuthContext";
import Dummy from "./pages/Dummy";
import axios from "axios";

function App() {
  return (
    <div height="max-content">
      <AuthProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact component={Main} path="/" />
            <Route component={SignUp} path="/Signup" />
            <Route component={Login} path="/Login" />
            <Route component={CompanyDB} path="/Companydb" />
            <Route component={Dummy} path="/Dummy" />
          </Switch>
          <Footer />
        </Router>
      </AuthProvider>
      {/* <button
        onClick={() => {
          axios
            .post("http://127.0.0.1:5000", { uid: "sadsad", userType: "admin" })
            .then(console.log("Done"))
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        click me
      </button> */}
    </div>
  );
}

export default App;
