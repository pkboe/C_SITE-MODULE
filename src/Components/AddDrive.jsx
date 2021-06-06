import { faClock, faTimesCircle } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

const AddDrive = (propd) => {
  const [SelectedModules, setSelectedModules] = useState([]);
  const [DurationCount, setDurationCount] = useState(0);

  const currentModuleRef = useRef();

  const Modules = [
    {
      id: 1,
      type: "mcq",
      duration: 15,
      tech: "python",
    },
    {
      id: 2,
      type: "coding",
      duration: 30,
      tech: "python",
    },
    {
      id: 3,
      type: "mcq",
      duration: 15,
      tech: "java",
    },
    {
      id: 4,
      type: "coding",
      duration: 45,
      tech: "C",
    },
  ];

  const handleModuleTagDelete = (index) => {
    let x = SelectedModules.filter((item) => item !== SelectedModules[index]);
    setSelectedModules(x);
  };

  const handleModuleAdd = () => {
    {
      if (!SelectedModules)
        setSelectedModules([currentModuleRef.current.value]);
      else if (!SelectedModules.includes(currentModuleRef.current.value))
        setSelectedModules([
          ...SelectedModules,
          currentModuleRef.current.value,
        ]);
    }
  };

  const CapitalizeFirstWord = (word) => {
    if (word === "mcq") {
      return word.toUpperCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  useEffect(() => {
    let x = 0;
    SelectedModules.forEach((element) => {
      var numberPattern = /\d+/g;
      x += parseInt(element.match(numberPattern)[0]);
      //console.log(x);
    });
    let y = Math.floor(x / 60);

    if (y) {
      x = x % 60;
      if (!x) {
        setDurationCount(y + " Hr(s) ");
      } else {
        setDurationCount(y + " Hr. " + x + " Mins");
      }
    } else {
      setDurationCount(x + " Mins");
    }
  }, [SelectedModules]);

  return (
    <div className="" style={{ minHeight: 1300 }}>
      <div className="drives">
        <div className="row">
          <div className="col-9">
            <div className="row">
              <div className="col-10">
                <h3>Add New Drive</h3>
              </div>
            </div>
            <hr className="m-0" />
            <div className="row">
              <p className="text-muted pt-3">
                For quick creation, use one of the following presets:
              </p>

              <div className="col-3 p-3 mt-1 m-2 card shadow-sm">
                <h6>Python, Data Structures and Coding</h6>
                <p>
                  <small>
                    <FontAwesomeIcon icon={faClock} />
                    {"  "}
                    Time Duration: 1 Hr. 30 Mins
                  </small>
                </p>
              </div>

              <div className="col-3 p-3 mt-1 m-2 card shadow-sm">
                <h6>Java, C and C++ MCQs and Coding</h6>
                <p>
                  <small>
                    <FontAwesomeIcon icon={faClock} />
                    {"  "}Time Duration: 1 Hr. 30 Mins
                  </small>
                </p>
              </div>

              <div className="col-3 p-3 mt-1 m-2 card shadow-sm">
                <h6>Web Technologies and Web Frameworks</h6>
                <p>
                  <small>
                    <FontAwesomeIcon icon={faClock} />
                    {"  "}Time Duration: 1 Hr. 30 Mins
                  </small>
                </p>
              </div>
            </div>
            <form>
              <div className="row pt-3">
                <div className="col">
                  {" "}
                  <label className="form-label ">Test Start Date :</label>
                  <input
                    type="date"
                    className="form-control"
                    id="validationCustom01"
                    required
                  />
                  <label className="form-label pt-3">Test Start Time :</label>
                  <input
                    type="time"
                    className="form-control"
                    id="validationCustom01"
                    required
                  />
                  <label className="form-label pt-3">
                    Select Test Modules:
                  </label>
                  <div className="d-flex ">
                    <select
                      name="cars"
                      id="cars"
                      className="form-select"
                      ref={currentModuleRef}
                    >
                      {Modules.map((module) => (
                        <option
                          key={module.id}
                          value={
                            CapitalizeFirstWord(module.tech) +
                            "-" +
                            CapitalizeFirstWord(module.type) +
                            "-" +
                            module.duration.toString()
                          }
                        >
                          {CapitalizeFirstWord(module.tech) +
                            "-" +
                            CapitalizeFirstWord(module.type) +
                            "-" +
                            module.duration.toString()}
                        </option>
                      ))}
                    </select>
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-sm btn-primary "
                      type="button"
                      style={{ minWidth: 110 }}
                      onClick={() => handleModuleAdd()}
                    >
                      Add Module
                    </button>
                  </div>
                </div>

                <div className="col">
                  <label className="form-label">Test End Date :</label>
                  <input
                    type="date"
                    className="form-control"
                    id="validationCustom01"
                    required
                  />

                  <label className="form-label pt-3">Test End Time :</label>
                  <input
                    type="time"
                    className="form-control"
                    id="validationCustom01"
                    required
                  />

                  <label className="form-label pt-3">
                    Current Test Series:
                  </label>
                  <div
                    className="rounded p-3 tags"
                    style={{ backgroundColor: "#f5f5f5" }}
                  >
                    {SelectedModules &&
                      SelectedModules.map((module, index) => (
                        <div
                          style={{ backgroundColor: "#ffffff" }}
                          className="rounded  d-flex flex-row justify-content-between align-items-center"
                        >
                          <span
                            className="module-tag  p-2 m-1 text-muted "
                            style={{}}
                            key={index}
                          >
                            {module}{" "}
                          </span>
                          <FontAwesomeIcon
                            icon={faTimesCircle}
                            color="red"
                            onClick={() => handleModuleTagDelete(index)}
                            style={{ marginRight: 10, cursor: "pointer" }}
                          />
                        </div>
                      ))}
                    {/* 
                    <span
                      className="module-tag rounded p-2 m-1 text-muted"
                      style={{ backgroundColor: "white" }}
                    >
                      Python MCQ - 15 Min{" "}
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </span>
                    <span
                      className="module-tag rounded p-2 m-1 text-muted"
                      style={{ backgroundColor: "white" }}
                    >
                      Python MCQ - 15 Min{" "}
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </span>
                    <span
                      className="module-tag rounded p-2 m-1 text-muted"
                      style={{ backgroundColor: "white" }}
                    >
                      Python MCQ - 15 Min{" "}
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </span>
                    <span
                      className="module-tag rounded p-2 m-1 text-muted"
                      style={{ backgroundColor: "white" }}
                    >
                      Python MCQ - 15 Min{" "}
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </span> */}
                  </div>
                  <p className="mt-2">
                    Total Test Duration: <b>{DurationCount}</b>
                  </p>
                </div>

                <div className="valid-feedback">Looks good!</div>
              </div>
            </form>
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
    </div>
  );
};

export default AddDrive;
