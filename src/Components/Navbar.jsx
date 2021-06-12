import user from "./user.png";
import navBrand from "../pages/nav-brand.png";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../plugins/AuthContext";
// import { useHistory } from "react-router-dom";

const Navbar = (props) => {
  const { currentUser, userType, IsTestRunning } = useAuth();
  // console.log(values);

  // if (values.currentUser) {
  //   history.push("/Dummy");
  // }

  const Avatar = () => {
    return (
      <>
        <h6
          className="d-flex align-items-center  m-0 p-1"
          style={{ marginRight: "12em" }}
        >
          <img
            src={user}
            height="30px"
            alt="userIcon"
            style={{
              marginRight: 10,
            }}
          />
          {currentUser && currentUser.displayName}
        </h6>
      </>
    );
  };

  const AuthNav = (props) => {
    // const history = useHistory();
    const { signout } = useAuth();

    const handleSignOut = () => {
      signout();
      return <Redirect to="/" />;
    };
    return (
      <>
        <Avatar />
        {"    "}
        <button
          className="btn btn-sm btn-primary btn-block"
          type="submit"
          onClick={handleSignOut}
          style={{ marginLeft: 10 }}
          disabled={IsTestRunning}
        >
          Sign out
        </button>
      </>
    );
  };

  const NoAuthNav = () => {
    return (
      <>
        <Link className="Nav__link" to="Login">
          <button className="btn btn-outline-primary btn-sm" type="submit">
            Login
          </button>
        </Link>
        &nbsp;&nbsp;
        <Link className="Nav__link" to="/Signup">
          <button className="btn btn-primary btn-sm" type="submit">
            Sign up
          </button>
        </Link>
      </>
    );
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand ml-2" href="/">
            &nbsp;&nbsp;
            <img
              src={navBrand}
              height="30px"
              className="align-text-top"
              alt="banner"
            />
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
              {!props.Auth && (
                <li className="nav-item">
                  {!IsTestRunning && (
                    <Link className="nav-link active" to="/Afterlogin">
                      Home
                    </Link>
                  )}
                </li>
              )}

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
              {userType ? <AuthNav /> : <NoAuthNav />}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
