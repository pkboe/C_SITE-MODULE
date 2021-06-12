import AceEditor from "react-ace";
import axios from "axios";
// import Participents from "./Components/Participents.jsx";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
// import ChatOverlay from "./Components/ChatOverlay.jsx";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/snippets/c_cpp";
import "ace-builds/src-noconflict/snippets/java";

import { useEffect, useState } from "react";
////////////////////////////////////////////////////////////
const CLIENT_ID = "99122d0aa958b08d0b22438887528695";
const CLIENT_SECRET =
  "a4ccd14cd72e85c9bc12b7096c910430c9ba4d99df9d50abb3981103e85e7a06";
const URL =
  "https://pkay-observablehq.herokuapp.com/https://api.jdoodle.com/v1/execute"; //LocalHost Working Good

const Coding = ({ currentModule }) => {
  const [Code, setCode] = useState();
  const [Output, setOutput] = useState("😀");
  const [isOutputLoading, setIsOutputLoading] = useState(false);

  let tech = currentModule.value.split("-")[0].toLowerCase();
  console.log(tech);
  if (tech === "c" || tech === "c++") tech = "c_cpp";

  useEffect(() => {
    console.log(Code);
  }, [Code]);

  const handleCodeSubmit = async () => {
    setIsOutputLoading(true);
    const body = {
      script: Code,
      language: "cpp",
      versionIndex: "0",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      stdin: "abc",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    await axios
      .post(URL, body, {
        crossDomain: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          crossdomain: "true",
          crossorigin: "true",
        },
      })
      .then((res) => {
        setIsOutputLoading(false);
        console.log(res);
        setOutput(res.data.output);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="App" sty>
        <div
          className="App shadow"
          style={{
            border: "10px solid lime",
            padding: "0px",
            borderRadius: "20px",
            width: "60%",
          }}
        >
          <AceEditor
            value={Code}
            onChange={(value) => {
              setCode(value);
            }}
            mode={tech}
            theme="terminal"
            style={{ width: "100%" }}
            fontFamily="monospace"
            fontSize={20}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
          />

          <button
            id="codeSubmitButton"
            className="codeSubmitButton"
            disabled={isOutputLoading}
            onClick={() => {
              console.log(Code);
              handleCodeSubmit();
            }}
            style={{
              backgroundColor: "yellow",
              color: "black",
              height: 45,
              width: "100%",
              transition: "1s",
              fontSize: 22,
              textAlign: "center",
              outline: "none",
            }}
          >
            {isOutputLoading && "Please Wait"}
            {!isOutputLoading && "Execute"}
          </button>
          {/* <Participents /> */}
          <div
            style={{
              backgroundColor: "black",
              overflowWrap: "break-word",
              width: "100%",
              height: "auto",
              padding: "10px",
              border: "2px solid green",
            }}
          >
            <p
              style={{
                color: "lime",
                fontFamily: "monospace",
                textAlign: "left",
                fontSize: 17,
              }}
            >
              {" "}
              Code OutPutt `Configured In Python For Testing Purpose ` : <br />{" "}
              {">" + Output}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coding;
