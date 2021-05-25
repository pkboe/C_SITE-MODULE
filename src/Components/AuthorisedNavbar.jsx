import navBrand from "../pages/nav-brand.png";
import { useAuth } from "../plugins/AuthContext";
import { Link } from "react-router-dom";

const AuthorisedNavbar = (props) => {
  const values = useAuth();
  const currentUser = values.currentUser;

  console.log(values);
  return (
    <div>
      <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand ml-2" href="#">
            &nbsp;&nbsp;
            <img src={navBrand} height="30px" className="align-text-top" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              {/* <li class="nav-item ">
                <a class="nav-link" href="#">Link</a>
              </li> */}
              {/* <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item " href="#">Something else here</a></li>
                </ul>
              </li> */}
              {/* <li class="nav-item">
                <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              </li> */}
            </ul>
            <form className="d-flex">
              <Link className="Nav__link" to="Login">
                <button
                  className="btn btn-outline-primary btn-sm"
                  type="submit"
                >
                  Login
                </button>
              </Link>
              &nbsp;&nbsp;
              <Link className="Nav__link" to="/Signup">
                <button className="btn btn-primary btn-sm" type="submit">
                  Sign up
                </button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AuthorisedNavbar;
