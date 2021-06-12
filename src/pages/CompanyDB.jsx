import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import { faClock, faClipboard } from "@fortawesome/free-regular-svg-icons";
// import { faCode } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFireStore } from "../plugins/FireStoreContext";
import DriveCardScheduled from "../Components/DriveCardScheduled";
import DriveCardRunning from "../Components/DriveCardRunning";
import { useAuth } from "../plugins/AuthContext";
import { useEffect } from "react";

// import Navbar from "../Components/Navbar";

const CompanyDB = (props) => {
  const history = useHistory();
  const { RunningDrives, ScheduledDrives } = useFireStore();
  const { IsTestRunning } = useAuth();

  return (
    <>
      {/* {JSON.stringify(...Drives)} */}
      <div className="drives">
        <div className="row">
          <div className="col-9">
            <div className="row">
              <div className="col-10">
                <h1
                  style={{
                    fontWeight: 600,
                  }}
                >
                  Add New Drive{" "}
                </h1>
              </div>
              <div className="col-2 text-right">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    history.push("/AddDrive");
                  }}
                >
                  Add Drive
                </button>
              </div>
            </div>
            <hr className="m-0" />
            <h3
              className="mt-4 mb-3"
              style={{
                fontWeight: 600,
              }}
            >
              Running Drives
            </h3>
            {RunningDrives.length === 0 && (
              <p className="alert alert-warning text-center mt-4 mb-4">
                No Ongoing drives. Check below for scheduled drives.
              </p>
            )}
            {RunningDrives.map((drive, index) => (
              <DriveCardRunning key={index} drive={drive} />
            ))}
            <br />
            <h3
              className="mt-4 mb-3"
              style={{
                fontWeight: 600,
              }}
            >
              Scheduled Drives
            </h3>
            {ScheduledDrives.length === 0 && (
              <p className="alert alert-warning text-center">
                No Drives Scheduled. Please use the above button to Schedule a
                drive. It's really easy!
              </p>
            )}{" "}
            {ScheduledDrives.map((drive, index) => (
              <DriveCardScheduled key={index} drive={drive} />
            ))}
            {/* <div className=" d-flex flex-row-reverse p-2 mb-5">
              {" "}
            </div> */}
          </div>
          <div className="col-3">
            <div className="card quick-links rounded m-1 p-2">
              <h5 className="pt-2 text-center">Quick Links</h5>
              <hr className="m-0 p-0" />
              <div className="m-4">
                <a
                  className="text-decoration-none module-tag rounded p-2 m-2 "
                  href="/#"
                >
                  Add New Drive
                </a>
                <br />
                <a
                  className="text-decoration-none module-tag rounded p-2 m-2 "
                  href="/#"
                >
                  View Previous Drives
                </a>
                <br />
                <a
                  className="text-decoration-none module-tag rounded p-2 m-2 "
                  href="/#"
                >
                  View Upcoming Drives
                </a>
                <br />
                <a
                  className="text-decoration-none module-tag rounded p-2 m-2 "
                  href="/#"
                >
                  Account Settings
                </a>
                <br />
                <Link
                  className="text-decoration-none module-tag rounded p-2 m-2 "
                  to="/"
                >
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
    </>
  );
};

export default CompanyDB;
