import { Link } from "react-router-dom";
// import Navbar from "../Components/Navbar";

const CompanyDB = (props) => {
  return (
    <>
      <div className="drives">
        <div className="row">
          <div className="col-9">
            <div className="row">
              <div className="col-10">
                <h3>Scheduled Drives</h3>
              </div>
              <div className="col-2 text-right">
                <button className="btn btn-primary btn-sm">Add Drive</button>
              </div>
            </div>
            <hr className="m-0" />
            <h5 className="mt-4 mb-3">Running Drives</h5>
            <div className="drive card shadow-sm rounded m-2 p-3 border-0 row">
              <div className="row">
                <div className="col-10">
                  <h6>Drive_20April_BE_Comp</h6>
                </div>
                <div className="col-2">
                  <button className="btn btn-success btn-sm">Running</button>
                </div>
              </div>
            </div>
            <div className="drive card shadow-sm rounded m-2 p-3 border-0 row">
              <div className="row">
                <div className="col-10">
                  <h6>Drive_20April_BE_ENTC</h6>
                </div>
                <div className="col-2">
                  <button className="btn btn-success btn-sm">Running</button>
                </div>
              </div>
            </div>
            <div className="drive card shadow-sm rounded m-2 p-3 border-0 row">
              <div className="row">
                <div className="col-10">
                  <h6>Drive_20April_BE_IT</h6>
                </div>
                <div className="col-2">
                  <button className="btn btn-success btn-sm">Running</button>
                </div>
              </div>
            </div>
            <br />
            <h5 className="mt-4 mb-3">Scheduled Drives</h5>
            <div className="drive card shadow-sm rounded m-2 p-3 border-0 row">
              <div className="row">
                <div className="col-10">
                  <h6>Drive_22April_BE_Comp</h6>
                </div>
                <div className="col-2">
                  <button className="btn btn-warning btn-sm">Scheduled</button>
                </div>
              </div>
            </div>
            <div className="drive card shadow-sm rounded m-2 p-3 border-0 row">
              <div className="row">
                <div className="col-10">
                  <h6>Drive_22April_BE_Comp</h6>
                </div>
                <div className="col-2">
                  <button className="btn btn-warning btn-sm">Scheduled</button>
                </div>
              </div>
            </div>
            <div className="drive card shadow-sm rounded m-2 p-3 border-0 row">
              <div className="row">
                <div className="col-10">
                  <h6>Drive_22April_BE_Comp</h6>
                </div>
                <div className="col-2">
                  <button className="btn btn-warning btn-sm">Scheduled</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card quick-links rounded m-1 p-2">
              <h5 className="pt-2 text-center">Quick Links</h5>
              <hr className="m-0 p-0" />
              <div className="m-4">
                <a className="text-decoration-none" href="/#">
                  Add New Drive
                </a>
                <br />
                <a className="text-decoration-none" href="/#">
                  View Previous Drives
                </a>
                <br />
                <a className="text-decoration-none" href="/#">
                  View Upcoming Drives
                </a>
                <br />
                <a className="text-decoration-none" href="/#">
                  Account Settings
                </a>
                <br />
                <Link className="Nav__link text-decoration-none" to="/">
                  Sign out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Optional JavaScript; choose one of the two! */}
      {/* Option 1: Bootstrap Bundle with Popper */}
      {/* Option 2: Separate Popper and Bootstrap JS */}
      {/*
    
    
    */}
      );
    </>
  );
};

export default CompanyDB;
