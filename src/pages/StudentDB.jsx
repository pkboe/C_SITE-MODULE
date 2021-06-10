import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { faClock, faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFireStore } from "../plugins/FireStoreContext";
import DriveCardScheduled from "../Components/DriveCardScheduled";
import DriveCardRunning from "../Components/DriveCardRunning";
import { useAuth } from "../plugins/AuthContext";
import TestCardUpcoming from "../Components/TestCardUpcoming";
import TestCardRunning from "../Components/TestCardRunning";

// import Navbar from "../Components/Navbar";

const StudentDB = (props) => {
  const history = useHistory();
  const { studentPRN } = useAuth();
  const { RunningDrives, ScheduledDrives } = useFireStore();

  return (
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
                My Tests{" "}
              </h1>
            </div>
            <div className="col-2 text-right"></div>
          </div>
          <hr className="m-0" />
          <h3
            className="mt-4 mb-3"
            style={{
              fontWeight: 600,
            }}
          >
            Currently Live
          </h3>
          {RunningDrives.length === 0 && (
            <p className="alert alert-warning text-center mt-4 mb-4">
              No Tests are live. :)
            </p>
          )}
          {RunningDrives.map((drive, index) => (
            <TestCardRunning key={index} drive={drive} />
          ))}
          <br />
          <h3
            className="mt-4 mb-3"
            style={{
              fontWeight: 600,
            }}
          >
            Upcoming Tests
          </h3>
          {ScheduledDrives.length === 0 && (
            <p className="alert alert-warning text-center">
              You dont have any upcoming tests. :)
            </p>
          )}{" "}
          {ScheduledDrives.map((drive, index) => (
            <TestCardUpcoming key={index} drive={drive} />
          ))}
        </div>
        <div className="col-3">
          <div className="card quick-links rounded m-1 p-2">
            <h5 className="pt-2 text-center">Quick Links</h5>
            <hr className="m-0 p-0" />
            <div className="m-4 " style={{ width: "100%" }}>
              <a
                className=" module-tag rounded p-2 m-2  text-decoration-none"
                style={{
                  backgroundColor: "white",
                  width: "100%",
                }}
                href="/#"
              >
                Test History
              </a>
              <br />
              <p style={{ minWidth: 5 }}></p>
              <a
                className="text-decoration-none module-tag rounded p-2 m-2 "
                href="/#"
                style={{ backgroundColor: "white", minWidth: "100%" }}
              >
                View Scores
              </a>
              <br />
              <p style={{ minWidth: 5 }}></p>
              <a
                className="text-decoration-none module-tag rounded p-2 m-2  "
                href="/#"
                style={{ backgroundColor: "white", minWidth: "100%" }}
              >
                Raise Grievance
              </a>
              <br />
              <p style={{ minWidth: 5 }}></p>
              <a
                className="text-decoration-none module-tag rounded p-2 m-2 "
                href="/#"
                style={{ backgroundColor: "white", minWidth: "100%" }}
              >
                Account Settings
              </a>
              <br />
              <p style={{ minWidth: 5 }}></p>
              <Link
                className="Nav__link text-decoration-none module-tag rounded p-2 m-2 "
                to="/"
                style={{ backgroundColor: "white", minWidth: "100%" }}
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDB;
