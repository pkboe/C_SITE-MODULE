import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../plugins/AuthContext";

const SignUp = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const rememberRef = useRef(null);
  const choiceStudentRef = useRef(null);
  const choiceInstituteRef = useRef(null);

  const { signup } = useAuth();

  const history = useHistory();

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = usernameRef.current.value;
    const role = choiceStudentRef.current.checked ? "student" : "institute";
    signup(email, password, username, role)
      .then((ref) => {
        setLoading(false);
        // alert("Kindly Login ");
        // history.push("/Login");
        console.log(ref);
        setSuccess("You are registered successfully!");
      })
      .catch((err) => {
        setSuccess("");
        setError(err.message);
        setLoading(false);
      });
  };
  return (
    <div>
      {/* Required meta tags */}

      <div className="wrapper">
        <form
          className="form-signin shadow rounded"
          onSubmit={(e) => handleSignup(e)}
        >
          <h2 className="form-signin-heading text-center">Sign up</h2>
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
            name="username"
            placeholder="Username"
            required
            autofocus="true"
            ref={usernameRef}
          />
          <br />
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Email Address"
            required
            autofocus
            ref={emailRef}
          />
          <br />
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            required
            ref={passwordRef}
          />
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
              defaultChecked
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckChecked"
            >
              Remember Me
            </label>
          </div>
          <br />
          <button
            disabled={loading}
            className="btn btn-sm btn-primary btn-block"
            type="submit"
          >
            SignUp
          </button>
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
          {success && (
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
                textAlign: "center",
              }}
              className="bg-success pulse  "
            >
              {success}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
