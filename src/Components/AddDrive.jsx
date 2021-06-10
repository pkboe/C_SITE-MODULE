import { faClock, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ReactSortable } from "react-sortablejs";

import swal from "sweetalert";
import { useAuth } from "../plugins/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router";
import { storeCreatedDrive } from "../plugins/firestore";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AddDrive = (props) => {
  const [SelectedModules, setSelectedModules] = useState([]);
  const [DurationCount, setDurationCount] = useState(0);
  const [FileUploadError, setFileUploadError] = useState("");
  const [FileUploadSuccess, setFileUploadSuccess] = useState("");
  // const [CreateDriveStatus, setCreateDriveStatus] = useState();
  // const [CreateDriveStatusError, setCreateDriveStatusError] = useState(false);
  // const [Preset, setPreset] = useState({});
  const [Data, setData] = useState();
  const history = useHistory();
  const fileInputRef = useRef();
  const allowStudentsByRef = useRef();
  const currentModuleRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();
  const { userType, currentUser } = useAuth();
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
      type: "coding",
      duration: 15,
      tech: "java",
    },
    {
      id: 4,
      type: "coding",
      duration: 45,
      tech: "C",
    },
    {
      id: 5,
      type: "coding",
      duration: 30,
      tech: "c++",
    },
    {
      id: 6,
      type: "mcq",
      duration: 15,
      tech: "java",
    },
    {
      id: 7,
      type: "mcq",
      duration: 45,
      tech: "C",
    },
    {
      id: 8,
      type: "mcq",
      duration: 30,
      tech: "c++",
    },
  ];

  let Modules = AllModules;
  const handleClickOnPreset = () => {};
  const handleFileUpload = async () => {
    setFileUploadError();
    setFileUploadSuccess();
    const data = new FormData();

    let y = [];
    let z = "";
    SelectedModules.map((item) => {
      console.log(item);
      y = item.value.split("-");
      y.map((item) => (z += item.charAt(0)));
      return true;
    });
    z = currentUser.displayName + "_" + z;

    data.append("file", fileInputRef.current.files[0]);
    console.log(fileInputRef.current.files[0]);

    await axios
      .post("http://127.0.0.1:5000/api/get-excel-data", data)
      .then((res) => {
        setData(res.data);
        setFileUploadSuccess("File Uploaded Successfully!");
        console.log({ ...res });
        axios.get(`http://127.0.0.1:5000/api/setfilename?drivename=${z}`);
      })
      .catch((err) => {
        err.response
          ? setFileUploadError("Error! : " + err.response.data.message)
          : setFileUploadError("Backend Offline");
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

  useEffect(
    (Modules) => {
      console.log(Modules);
      console.log(SelectedModules);
    },
    [SelectedModules]
  );

  useEffect(() => {
    // console.log(currentUser.uid);
    if (
      !(
        endDateRef.current.value &&
        startDateRef.current.value &&
        startTimeRef.current.value &&
        endTimeRef.current.value
      )
    )
      console.log(
        (endDateRef.current.value = new Date().toISOString().slice(0, 10)),
        (startDateRef.current.value = new Date().toISOString().slice(0, 10)),
        (startTimeRef.current.value = "09:00"),
        (endTimeRef.current.value = "11:30")
      );
  }, []);

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

  // useEffect(() => {
  //   if (CreateDriveStatus && !CreateDriveStatusError)
  //     Swal.fire(
  //       {
  //         title: "Drive Creation Succefull!",
  //         text: "Go to Home",
  //         icon: "success",
  //         confirmButtonText: "Go to Dashboard",
  //       },
  //       function () {
  //         window.location = "http://localhost:3000/";
  //       }
  //     );

  //   // history.push({
  //   //   pathname: "/AfterLogin",
  //   //   state: { status: CreateDriveStatus },
  //   // });
  // }, [CreateDriveStatus]);

  const showAlert = (flag) => {
    let msg = flag
      ? "Drive created successfully"
      : "Something is not right.Please try again!";
    let icon = flag ? "success" : "error";
    let btnClass = flag ? "primary" : "danger";
    let buttonMsg = flag ? "Go to Dashboard" : "Okay :(";
    swal({
      title: msg,
      icon: icon,
      button: {
        text: buttonMsg,
        value: flag,
        visible: true,
        className: `btn btn-${btnClass}`,
        closeModal: true,
      },
    }).then((value) => value && history.push("/"));
  };

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

                <div
                  className="col-3 p-3 mt-1 m-2 card shadow-sm unselectable "
                  onClick={handleClickOnPreset}
                  style={{ cursor: "pointer" }}
                >
                  <h6>Python, Data Structures and Coding</h6>
                  <p>
                    <small>
                      <FontAwesomeIcon icon={faClock} />
                      {"  "}
                      Time Duration: 1 Hr. 30 Mins
                    </small>
                  </p>
                </div>

                <div
                  className="col-3 p-3 mt-1 m-2 card shadow-sm unselectable "
                  style={{ cursor: "pointer" }}
                >
                  <h6>Java, C and C++ MCQs and Coding</h6>
                  <p>
                    <small>
                      <FontAwesomeIcon icon={faClock} />
                      {"  "}Time Duration: 1 Hr. 30 Mins
                    </small>
                  </p>
                </div>

                <div
                  className="col-3 p-3 mt-1 m-2 card shadow-sm unselectable "
                  style={{ cursor: "pointer" }}
                >
                  <h6>Web Technologies and Web Frameworks</h6>
                  <p>
                    <small>
                      <FontAwesomeIcon icon={faClock} />
                      {"  "}Time Duration: 1 Hr. 30 Mins
                    </small>
                  </p>
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  storeCreatedDrive(currentUser, {
                    startDate: startDateRef.current.value,
                    endDate: endDateRef.current.value,
                    startTime: startTimeRef.current.value,
                    endTime: endTimeRef.current.value,
                    modules: SelectedModules,
                    allowBy: allowStudentsByRef.current.value,
                    file: fileInputRef.current.files[0],
                    testDuration: DurationCount,
                  })
                    .then((flag) => showAlert(flag))
                    .catch((err) => console.error(err));
                }}
              >
                <div className="row pt-3">
                  <div className="col">
                    {" "}
                    <label className="form-label ">Test Start Date :</label>
                    <input
                      ref={startDateRef}
                      type="date"
                      className="form-control"
                      id="validationCustom01"
                      required
                    />
                    <label className="form-label pt-3">Test Start Time :</label>
                    <input
                      ref={startTimeRef}
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
                          // console.log(
                          //   SelectedModules.some(
                          //     (element) => element.value !== value
                          //   )
                          // );
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
                      ref={endDateRef}
                      type="date"
                      className="form-control"
                      id="validationCustom01"
                      defaultValue=""
                      required
                    />

                    <label className="form-label pt-3">Test End Time :</label>
                    <input
                      ref={endTimeRef}
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
                          required={true}
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
                    <select
                      name=""
                      id=""
                      className="form-select"
                      ref={allowStudentsByRef}
                      required
                    >
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
