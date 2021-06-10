import { useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../plugins/AuthContext";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const rememberRef = useRef(null);
  // const choiceStudentRef = useRef(null);
  // const choiceInstituteRef = useRef(null);
  const { signin, userType, currentUser } = useAuth();

  const handleSignin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const remember = rememberRef.current.checked;
    signin(email, password, remember)
      .then((ref) => {
        // setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        // setLoading(false);
      });
  };

  return (
    <>
      {userType && <Redirect to="/AfterLogin" />}
      <div>
        {/* Required meta tags */}
        <div className="wrapper">
          <form className="form-signin shadow rounded">
            <h2 className="form-signin-heading text-center">Login</h2>
            {/* <div
            className="btn-group btn-group-toggle text-center"
            data-toggle="buttons"
          >
            <label className="btn btn-primary active ">
              <input
                type="radio"
                name="options"
                id="option1"
                autoComplete="off"
                defaultChecked
                ref={choiceStudentRef}
                // onChange={() => alert("checked")}
              />{" "}
              Student
            </label>

            <label className="btn btn-primary ">
              <input
                type="radio"
                name="options"
                id="option2"
                autoComplete="off"
                ref={choiceInstituteRef}
                // onChange={() => alert("checked")}
                className="active"
              />{" "}
              Institute
            </label>
          </div> */}
            {/* <br /> */}

            <br />
            <input
              type="text"
              className="form-control"
              name="Email"
              placeholder="Email Address"
              required
              autoFocus
              ref={emailRef}
            />
            <br />
            <input
              ref={passwordRef}
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              required
            />
            <label className="checkbox primary">
              <div className="form-check primary form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  defaultChecked
                  ref={rememberRef}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked"
                >
                  Remember Me
                </label>
              </div>
            </label>
            <br />
            {/* <Link className="Nav__link" to="/Companydb"> */}
            <div className="text-center">
              <button
                className="btn btn-sm btn-primary btn-block loginButton "
                // disabled={currentUser}
                type="submit"
                onClick={handleSignin}
              >
                Login
              </button>
            </div>

            {/* </Link> */}
            {error && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  color: "white",
                  borderRadius: "15px",
                  padding: "10px",
                  marginTop: "20px",
                }}
                className="bg-danger"
              >
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Optional JavaScript; choose one of the two! */}
        {/* Option 1: Bootstrap Bundle with Popper */}
        {/* Option 2: Separate Popper and Bootstrap JS */}
        {/*
    
    
    */}
      </div>
    </>
  );
};

export default Login;
