import { faClock, faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Redirect, useHistory } from "react-router";
import { AuthContext } from "../plugins/AuthContext";
import swal from "sweetalert";

const TestCardRunning = ({ drive }) => {
  const history = useHistory();
  function formatDDMMM(s) {
    var months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
    var b = s.split(/\D/);
    return months[b[1] - 1] + " " + b[2];
  }
  function tConvert(time) {
    // Check correct time format and split into components
    time = time.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
  const { settestToBeAttempted } = useContext(AuthContext);
  var elem = document.documentElement;

  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }

  const showAlert = () => {
    swal({
      title: "Sure to attempt the test ? ",
      text: "You Need to Ensure ...\n 1)Stable Internet Connection \n 2)Camera Permission Required \n 3) DO NOT Press Refresh. \n All The Best",
      icon: "warning",
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        openFullscreen();
        settestToBeAttempted(drive);
        history.push({
          pathname: "/TestInfo",
          drive: drive,
        });
      }
    });
  };

  return (
    <>
      <div className="drive card shadow-sm rounded m-2 p-3 border-0 row">
        <div className="row">
          <div className="col-10 ">
            <h4
              style={{
                fontWeight: 600,
              }}
            >
              {drive.driveName}
            </h4>
            <br />
            <p className="mb-2 ">
              <FontAwesomeIcon icon={faCode} />
              <b>Test Pattern</b> :{" "}
              {drive.modules.map((module) => {
                let x = module.value;
                x = x.split("-");
                return x[0] + " " + x[1] + " " + x[2] + " Mins | ";
              })}
            </p>
            <p className="mb-2">
              <FontAwesomeIcon icon={faClock} /> {"  "}
              <b>Started At</b> :{" "}
              {formatDDMMM(drive.startDate) + ", " + tConvert(drive.startTime)}
            </p>
            <p className="mb-2">
              <FontAwesomeIcon icon={faClock} /> {"  "}
              <b>Ends At</b> :{" "}
              {formatDDMMM(drive.endDate) + ", " + tConvert(drive.endTime)}
            </p>
            <p>
              <FontAwesomeIcon icon={faClipboard} />
              {"  "}
              &nbsp;
              <b>Negative Marking :</b> No
            </p>
          </div>
          <div className="col-2 text-center  d-flex flex-column justify-content-around">
            <p>
              <FontAwesomeIcon icon={faClock} /> {drive.testDuration}
            </p>
            <br />
            <button
              className="btn btn-success btn-sm"
              style={{ minWidth: 110 }}
              onClick={showAlert}
            >
              Attempt
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestCardRunning;
