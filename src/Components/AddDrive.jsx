import { faClock, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { ReactSortable } from "react-sortablejs";
import { useAuth } from "../plugins/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router";
import axios from "axios";

const AddDrive = (propd) => {
  const [SelectedModules, setSelectedModules] = useState([]);
  const [DurationCount, setDurationCount] = useState(0);
  const [FileUploadError, setFileUploadError] = useState("");
  const [FileUploadSuccess, setFileUploadSuccess] = useState("");
  const [Data, setData] = useState();

  const fileInputRef = useRef();
  const currentModuleRef = useRef();

  const { userType } = useAuth();

  const AllModules = [
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

  let Modules = AllModules;

  const handleFileUpload = async () => {
    setFileUploadError();
    setFileUploadSuccess();
    const data = new FormData();
    data.append("file", fileInputRef.current.files[0]);
    console.log(fileInputRef.current.files[0]);
    await axios
      .post("http://127.0.0.1:5000/api/get-excel-data", data)
      .then((res) => {
        setData(res.data);
        setFileUploadSuccess("File Uploaded Successfully!");

        console.log({ ...res });
      })
      .catch((err) => {
        setFileUploadError("Error! : " + err.response.data.message);
        console.log({ ...err });
      });
  };

  const handleModuleTagDelete = (index) => {
    let x = SelectedModules.filter(
      (item) => item.value !== SelectedModules[index].value
    );
    setSelectedModules(x);
  };

  const handleModuleAdd = () => {
    if (!SelectedModules)
      setSelectedModules([
        { id: 1, value: currentModuleRef.current.value, key: 1 },
      ]);
    else if (
      !SelectedModules.some(
        (item) => item.value === currentModuleRef.current.value
      )
    )
      setSelectedModules([
        ...SelectedModules,
        {
          id: SelectedModules.length + 1,
          value: currentModuleRef.current.value,
          key: SelectedModules.length + 1,
        },
      ]);
  };
  const CapitalizeFirstWord = (word) => {
    if (word === "mcq") {
      return word.toUpperCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  useEffect(() => {
    console.log(Modules);
    console.log(SelectedModules);
  }, [SelectedModules]);

  useEffect(() => {
    let x = 0;
    SelectedModules.forEach((element) => {
      var numberPattern = /\d+/g;
      x += parseInt(element.value.match(numberPattern)[0]);
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
    <>
      {userType !== "institute" && <Redirect to="/login" />}
      <div className="" style={{ minHeight: 1300 }}>
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
                    Create New Drive
                  </h1>
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
                        {Modules.map((module) => {
                          let value =
                            CapitalizeFirstWord(module.tech) +
                            "-" +
                            CapitalizeFirstWord(module.type) +
                            "-" +
                            module.duration.toString();
                          console.log(
                            SelectedModules.some(
                              (element) => element.value !== value
                            )
                          );
                          return (
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
                          );
                        })}
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
                    <label className="form-label pt-3">
                      Current Test Series:
                    </label>
                    <div
                      className="rounded p-3 tags"
                      style={{ backgroundColor: "#f5f5f5" }}
                    >
                      <ReactSortable
                        list={SelectedModules}
                        setList={setSelectedModules}
                        animation={200}
                      >
                        {SelectedModules &&
                          SelectedModules.map((module, index) => (
                            <div
                              style={{ backgroundColor: "#ffffff" }}
                              className="rounded  d-flex flex-row justify-content-between align-items-center mb-1"
                              key={index}
                            >
                              {" "}
                              {"  "}
                              <span
                                className="module-tag  p-2 m-1 text-muted "
                                style={{}}
                              >
                                <FontAwesomeIcon icon={faBars} /> {"  "}{" "}
                                &nbsp;&nbsp;
                                {module.value}{" "}
                              </span>
                              <FontAwesomeIcon
                                icon={faTimesCircle}
                                color="red"
                                onClick={() => handleModuleTagDelete(index)}
                                style={{ marginRight: 10, cursor: "pointer" }}
                              />
                            </div>
                          ))}
                      </ReactSortable>
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
                      <p className="text-muted">
                        <small>
                          <br />
                          Drag the modules to alter the sequence. The same
                          sequence will be followed in the test.
                        </small>
                      </p>
                    </div>
                    <p className="mt-2">
                      Total Test Duration: <b>{DurationCount}</b>
                    </p>
                  </div>
                  {/* Right side of the form */}
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
                    <form id="FileUpload">
                      <label className="form-label pt-3">
                        Upload Student Details :
                      </label>
                      <div className="d-flex">
                        <input
                          type="file"
                          className="form-control"
                          id="validationCustom01"
                          required
                          ref={fileInputRef}
                        />
                        &nbsp;&nbsp;
                        <button
                          className="btn btn-sm btn-primary "
                          type="button"
                          style={{ minWidth: 110 }}
                          onClick={() => handleFileUpload()}
                        >
                          Upload
                        </button>
                      </div>
                    </form>

                    {FileUploadError && (
                      <p className="alert alert-warning mt-2" role="alert">
                        {FileUploadError}
                      </p>
                    )}

                    {FileUploadSuccess && (
                      <p className="alert alert-success mt-2" role="alert">
                        {FileUploadSuccess}
                      </p>
                    )}
                    <label className="form-label pt-3">
                      Allow Students By :
                    </label>
                    <select name="" id="" className="form-select">
                      {Data &&
                        Data.rows &&
                        Data.rows.map((item, index) => (
                          <option value={item} key={index}>
                            {CapitalizeFirstWord(item)}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="text-center mt-5 ">
                  {" "}
                  <button className="btn  btn-lg btn-primary text-center ">
                    Create Drive
                  </button>
                </div>
              </form>
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
    </>
  );
};

export default AddDrive;
