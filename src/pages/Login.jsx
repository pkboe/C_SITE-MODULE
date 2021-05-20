import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../plugins/AuthContext";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const rememberRef = useRef(null);
  const choiceStudentRef = useRef(null);
  const choiceInstituteRef = useRef(null);

  const { signin } = useAuth();
  const history = useHistory();

  const handleSignin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    signin(email, password)
      .then((ref) => {
        setLoading(false);
        history.push("/Dummy");
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div>
      {/* Required meta tags */}
      <div className="wrapper">
        <form className="form-signin shadow rounded">
          <h2 className="form-signin-heading text-center">Login</h2>
          <div
            className="btn-group btn-group-toggle text-center"
            data-toggle="buttons"
          >
            <label className="btn btn-primary active">
              <input
                type="radio"
                name="options"
                id="option1"
                autoComplete="off"
                defaultChecked
                ref={choiceStudentRef}
              />{" "}
              Student
            </label>

            <label className="btn btn-primary">
              <input
                type="radio"
                name="options"
                id="option2"
                autoComplete="off"
                ref={choiceInstituteRef}
              />{" "}
              Institute
            </label>
          </div>
          <br />
          <br />
          <input
            type="text"
            className="form-control"
            name="Email"
            placeholder="Email Address"
            required
            autofocus
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
          <label className="checkbox">
            <div className="form-check form-switch">
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
          <button
            className="btn btn-sm btn-primary btn-block"
            disabled={loading}
            type="submit"
            onClick={handleSignin}
          >
            Login
          </button>
          {/* </Link> */}
          {error && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                color: "white",
                marginTop: "5px",
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
  );
};

export default Login;
