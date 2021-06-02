// import { useAuth } from "../plugins/AuthContext";
// import { Redirect } from "react-router-dom";
// import Navbar from "../Components/Navbar";
import banner from "./banner.png";

const Main = (props) => {
  // const { currentUser } = useAuth();

  // if (currentUser && currentUser.displayName) {
  //   console.log(currentUser);
  //   return <Redirect to={"/AfterLogin"} />;
  // }

  return (
    <div>
      <title>Hello, world!</title>
      {/* <link rel="stylesheet" href="style.css" /> */}
      <div className=" banner container">
        <div className="row pt-5 pl-5">
          <div className="text col pt-5">
            <h1 className="heading">
              Onine Evaluation, <br /> Simplified.
            </h1>
            <p className="text-muted">
              {" "}
              AI driven Fast and Easy Assesment exams and pseudo-interviews.
            </p>
            <br />
            <button className="btn rounded btn-outline-primary">
              {" "}
              Get Started{" "}
            </button>
          </div>
          <div className="vec col text-center">
            <img src={banner} height="80%" alt="banner" />
          </div>
        </div>
      </div>
      <div className="features text-center p-5">
        <h1 className="heading">What we offer</h1>
        <p className="text-muted">
          {" "}
          AI driven Fast and Easy Assesment exams and pseudo-interviews.
        </p>
        <div className="row mt-5">
          <div className="col card shadow-sm rounded p-5 m-3">
            <h4>AI Driven System</h4>
          </div>
          <div className="col card shadow-sm rounded p-5 m-3">
            <h4>Camera Proctored</h4>
          </div>
          <div className="col card shadow-sm rounded p-5 m-3">
            <h4>Detailed Evaluation</h4>
          </div>
          <div className="col card shadow-sm rounded p-5 m-3">
            <h4>Quick Results</h4>
          </div>
        </div>
        <br />
      </div>
      <div className="features text-center p-5">
        <h1 className="heading">Log-in Now</h1>
        <p className="text-muted"> </p>
        <div className="row mt-5">
          <div className="col card shadow-sm rounded p-5 m-3">
            <h4>Student</h4>
          </div>
          <div className="col card shadow-sm rounded p-5 m-3">
            <h4>Company</h4>
          </div>
        </div>
        <br />
      </div>

      {/* Optional JavaScript; choose one of the two! */}
      {/* Option 1: Bootstrap Bundle with Popper */}
      {/* Option 2: Separate Popper and Bootstrap JS */}
      {/*
    
    
    */}
    </div>
  );
};

export default Main;
