import { useRef, useState } from "react";
import { useAuth } from "../plugins/AuthContext";
import { Redirect } from "react-router-dom";

const SignUp = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPRNInput, setShowPRNInput] = useState(false);

  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const choiceStudentRef = useRef(null);
  const choiceInstituteRef = useRef(null);
  const PRNRef = useRef(null);

  const { signup, userType } = useAuth();

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = usernameRef.current.value;
    const role = choiceStudentRef.current.checked ? "student" : "institute";
    const studentPRN =
      PRNRef.current && PRNRef.current ? PRNRef.current.value : "";
    console.log(studentPRN);
    signup(email, password, username, role, studentPRN)
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
      {userType && <Redirect to="/" />}
      {/* Required meta tags */}

      <div className="wrapper">
        <form
          className="form-signin shadow rounded"
          onSubmit={(e) => handleSignup(e)}
        >
          <h2 className="form-signin-heading text-center">Sign up</h2>
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
              className="bg-danger alert msg"
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
                borderRadius: "15px",
                padding: "10px",
                marginTop: "20px",
                textAlign: "center",
              }}
              className="bg-success  alert msg "
            >
              {success}
            </div>
          )}

          <div
            className="btn-group btn-group-toggle text-center"
            data-toggle="buttons"
            style={{ width: "-webkit-fill-available" }}
          >
            <label className="btn btn-primary active">
              <input
                type="radio"
                name="options"
                id="option1"
                autoComplete="off"
                ref={choiceStudentRef}
                onChange={() => setShowPRNInput(true)}
              />{" "}
              Student
            </label>
            <label className="btn btn-primary">
              <input
                type="radio"
                name="options"
                id="option2"
                autoComplete="off"
                defaultChecked
                ref={choiceInstituteRef}
                onChange={(x) => setShowPRNInput(false)}
              />{" "}
              Organization
            </label>
          </div>
          <br />
          <br />
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Full Name"
            required
            autoFocus={true}
            ref={usernameRef}
          />
          <br />
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Email Address"
            required
            ref={emailRef}
          />
          <br />
          {showPRNInput && (
            <>
              <input
                type="text"
                className="form-control"
                name="PRN"
                placeholder="PRN"
                required
                ref={PRNRef}
              />
              <br />
            </>
          )}

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
          <div className="text-center">
            <button
              disabled={loading}
              className="btn btn-sm btn-primary btn-block loginButton"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
