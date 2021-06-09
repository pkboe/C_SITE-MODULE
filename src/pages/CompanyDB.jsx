import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { faClock, faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFireStore } from "../plugins/FireStoreContext";
import DriveCard from "../Components/DriveCardRunning";
import DriveCardScheduled from "../Components/DriveCardScheduled";
import DriveCardRunning from "../Components/DriveCardRunning";

// import Navbar from "../Components/Navbar";

const CompanyDB = (props) => {
  const history = useHistory();
  const { Drives } = useFireStore();

  console.log(Drives);

  const hasStarted = (drive) => {
    var today = new Date();

    //var time = today.getHours() + ":" + today.getMinutes();
    let startDate = String(drive.startDate);
    let startTime = drive.startTime;

    let endDate = drive.endDate;
    let endTime = drive.endTime;
    let todayDate;
    let startYear = startDate.split("-");
    let startMonth = startDate.split("-")[1];
    let startDay = startDate.split("-")[2];
    let startHour = startTime.split(":")[0];
    let startMin = startTime.split(":")[1];
    let endYear = endDate.split("-")[0];
    let endMonth = endDate.split("-")[1];
    let endDay = endDate.split("-")[2];
    let endHour = endTime.split(":")[0];
    let endMin = endTime.split(":")[1];

    let todayYear = String(
      (todayDate = new Date().toISOString().slice(0, 10))
    ).split("-")[0];
    let todayMonth = String(
      (todayDate = new Date().toISOString().slice(0, 10))
    ).split("-")[1];
    let todayDay = String(
      (todayDate = new Date().toISOString().slice(0, 10))
    ).split("-")[2];

    // console.log(
    //   parseInt(startYear) <= parseInt(todayYear) &&
    //     parseInt(startMonth) <= parseInt(todayMonth) &&
    //     parseInt(startDay) <= parseInt(todayDay)
    // );

    let hasStarted =
      parseInt(startYear) <= parseInt(todayYear) &&
      parseInt(startMonth) <= parseInt(todayMonth) &&
      parseInt(startDay) <= parseInt(todayDay);

    return hasStarted;
  };

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
                  Scheduled Drives
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
            <p className="alert alert-warning text-center mt-4 mb-4">
              No Ongoing drives. Check below for scheduled drives.
            </p>
            {Drives.map(
              (drive, index) =>
                hasStarted(drive) && <DriveCardRunning drive={drive} />
            )}
            <br />
            <h3
              className="mt-4 mb-3"
              style={{
                fontWeight: 600,
              }}
            >
              Scheduled Drives
            </h3>
            <p className="alert alert-warning text-center">
              No Drives Scheduled. Please use the above button to Schedule a
              drive. It's really easy!
            </p>{" "}
            {Drives.map(
              (drive, index) =>
                !hasStarted(drive) && <DriveCardScheduled drive={drive} />
            )}
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
    </>
  );
};

export default CompanyDB;
