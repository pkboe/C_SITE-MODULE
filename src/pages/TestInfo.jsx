import user from "../Components/user.png";
import React from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../plugins/AuthContext";
import { ChatProvider } from "../plugins/ChatContext";
import Pose from "../Components/Pose";
import Timer from "react-compound-timer";
import { Redirect } from "react-router-dom";
import Chat from "../Components/Chat";
import axios from "axios";

const TestInfo = (props) => {
  const {
    currentUser,
    userType,
    studentPRN,
    IsTestRunning,
    setIsTestRunning,
    testToBeAttempted,
    IsML5ModelLoaded,
    ModulesSolved,
  } = useContext(AuthContext);
  const history = useHistory();
  /* View in fullscreen */
  const [parentCounter, setParentCounter] = useState(0);

  const location = useLocation();
  const drive = location.drive;

  useEffect(() => {
    !drive && history.push("/");
  }, []);

  useEffect(() => {
    testToBeAttempted && setIsTestRunning(true);
  }, [location, IsTestRunning]);

  const [allModules, setAllModules] = useState(() => {
    if (testToBeAttempted && testToBeAttempted.modules)
      return testToBeAttempted.modules;
  });
  const [IsTimeUp, setIsTimeUp] = useState(false);
  const [currentModule, setcurrentModule] = useState(() => {
    if (testToBeAttempted && testToBeAttempted.modules)
      return testToBeAttempted.modules[0];
  });
  const [IsTestCompleted, setIsTestCompleted] = useState(false);

  // const [loading, setloading] = useState(false);
  // const [Questions, setQuestions] = useState([]);

  useEffect(() => {
    // const fetchQuestions = async () => {
    //   const URL = `http://127.0.0.1:5000/api/questions/python?totalquestions=15`;
    //   await axios.get(URL, {}).then((data) => {
    //     let questions = [];
    //     console.log(data);
    //     Object.keys(data.data).forEach((key) =>
    //       questions.push({
    //         id: key - 1,
    //         value: data.data[key].question,
    //         qType: data.data[key].type,
    //       })
    //     );
    //     setQuestions(questions);
    //     setloading(false);
    //   });
    // };
    // fetchQuestions();
    IsML5ModelLoaded && setIsTestRunning(true);
  }, [IsML5ModelLoaded]);

  const ModuleTypeSwitcher = ({ module }) => {
    // console.log(module);
    if (module.value.split("-")[1].toLowerCase() == "mcq") {
      return (
        <Chat
          currentModule={currentModule}
          setParentCounter={setParentCounter}
        />
      );
    } else if (module.value.split("-")[1].toLowerCase() == "coding")
      return <h1>{module.value.split("-")[0] + " "}Coding Module</h1>;
  };

  useEffect(() => {
    console.log(ModulesSolved);
    if (allModules)
      if (allModules.length == ModulesSolved.length) setIsTestCompleted(true);
      else setcurrentModule(allModules[ModulesSolved.length]);
  }, [ModulesSolved]);

  return (
    <ChatProvider>
      {!userType && <Redirect to="/" />}
      <div>
        <div className="row p-3-m-2">
          <div className="col-3 p-3 card ">
            {" "}
            <div className="col pt-3">
              <div className="row">
                <div className="col-sm-3">
                  <img
                    src={user}
                    height="80px"
                    alt="userIcon"
                    style={{
                      marginRight: 10,
                      marginLeft: 25,
                    }}
                  />
                </div>
                <div className="col" style={{ marginLeft: 10 }}>
                  <h4 className="m-0" style={{ fontWeight: 500 }}>
                    {currentUser && currentUser.displayName}
                  </h4>
                  <h6 className="m-1 p-0">
                    {" "}
                    <strong>Email : </strong>
                    {currentUser && currentUser.email}
                  </h6>
                  <h6 className="m-1 p-0">
                    <strong>PRN Number : </strong>
                    {studentPRN && studentPRN}
                  </h6>
                </div>
                <span
                  className="alert alert-warning text-center p-2"
                  role="alert"
                  style={{
                    marginLeft: 15,
                    marginTop: 15,
                    marginRight: 15,
                    width: 400,
                  }}
                >
                  Proctoring is Live!
                </span>
              </div>
              {/* <h4 className="m-0" style={{ fontWeight: 500 }}>
                <img
                  src={user}
                  height="80px"
                  alt="userIcon"
                  style={{
                    marginRight: 10,
                    marginLeft: 25,
                  }}
                />
                {currentUser && currentUser.displayName}
              </h4>
              <div style={{ marginLeft: 55 }}>
                <h6 className="m-1 p-0">
                  {" "}
                  <strong>Email : </strong>
                  {currentUser && currentUser.email}
                </h6>
                <h6 className="m-1 p-0">
                  <strong>PRN Number : </strong>
                  {studentPRN && studentPRN}
                </h6>
              </div> */}
            </div>
          </div>
          <div className="col-6 card text-center p-4">
            <h4 style={{ fontWeight: 600 }}>
              Time Left <br />
              <Timer
                initialTime={8000}
                lastUnit="m"
                direction="backward"
                startImmediately={true}
                checkpoints={[
                  {
                    time: 0,
                    callback: () => {
                      setIsTimeUp(true);
                      setIsTestRunning(false);
                    },
                  },
                ]}
              >
                <Timer.Minutes /> Min : <Timer.Seconds /> Secs{" "}
              </Timer>
            </h4>
            <br />
            <h5 style={{ fontWeight: 500 }}>Total Test Time: 45 Min</h5>
            <h6> Current Module: Python MCQ </h6>
          </div>
          <div className="col-3 card  p-4">
            {!IsTimeUp && IsTestRunning && testToBeAttempted && <Pose />}
          </div>
        </div>
        <div
          className="row p-3-m-2 bg-primary"
          style={{ height: "100%", minHeight: "100%" }}
        >
          <div className="col-3 card p-3" style={{ minHeight: "100%" }}>
            <h4 className="text-center">Test Modules</h4>
            {testToBeAttempted &&
              testToBeAttempted.modules &&
              testToBeAttempted.modules.map((module, index) => (
                <button
                  className={
                    index == ModulesSolved.length - 1
                      ? "btn btn-secondary p-2 m-2"
                      : "btn btn-outline-secondary p-2 m-2"
                  }
                  key={index}
                >
                  {module.value}
                </button>
              ))}
            {/* {JSON.stringify(drive)} */}
          </div>
          <div className="col card ">
            {currentModule && <ModuleTypeSwitcher module={currentModule} />}
          </div>
        </div>
      </div>
    </ChatProvider>
  );
};

export default TestInfo;
