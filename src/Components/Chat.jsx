import { useState, useRef, useEffect, useContext } from "react";
import { useChat } from "../plugins/ChatContext";
import { AuthContext } from "../plugins/AuthContext";

const Chat = ({ currentModule }) => {
  const { Questions } = useChat();
  const chatInputRef = useRef();
  const chatContainerRef = useRef();
  const chatButtonRef = useRef();
  const trueButtonRef = useRef();
  const falseButtonRef = useRef();

  const [ResponseSheet, setResponseSheet] = useState([]);
  const [currentQuestion, setcurrentQuestion] = useState(Questions[0]);
  const [DisplaySheet, setDisplaySheet] = useState([]);
  const { currentUser, userType, studentPRN, ModulesSolved, setModulesSolved } =
    useContext(AuthContext);
  // console.log(currentModule);

  const handleInputEnter = (answer, qid) => {
    if (ResponseSheet.length < Questions.length) {
      if (
        currentQuestion.qType === "true-false" &&
        qid - 100 === currentQuestion.id
      ) {
        setResponseSheet([
          ...ResponseSheet,
          {
            qtype: currentQuestion.qType,
            id: currentQuestion.id,
            question: currentQuestion.value,
            answer: answer,
          },
        ]);
        trueButtonRef.current.style.backgroundColor = "red";
        falseButtonRef.current.style.backgroundColor = "red";

        trueButtonRef.current.disabled = true;
        falseButtonRef.current.disabled = true;

        setcurrentQuestion(Questions[currentQuestion.id + 1]);
      } else if (chatInputRef.current.value !== "") {
        //   chatButtonRef.current.disabled = true;
        //   chatInputRef.current.disabled = true;
        setResponseSheet([
          ...ResponseSheet,
          {
            qtype: currentQuestion.qType,
            id: currentQuestion.id,
            question: currentQuestion.value,
            answer: chatInputRef.current.value,
          },
        ]);
        setDisplaySheet([
          ...DisplaySheet,
          {
            // qType: currentQuestion.qType,
            type: "me",
            value: chatInputRef.current.value,
            id: currentQuestion.id + 10000,
          },
        ]);
        //   let index = Questions.findIndex((todo) => todo.get("id") === id);

        //   setcurrentQuestion(Questions[length - (currentQuestion.id - 1)]);
        setcurrentQuestion(Questions[currentQuestion.id + 1]);
      } else if (chatInputRef.current.value === "") {
        chatInputRef.current.disabled = false;
        alert("Please Type Something");
        chatInputRef.current.focus();
      }
    } else if (ResponseSheet.length === Questions.length) {
      console.log("ResponseSheet : ", ResponseSheet);
      console.log("DisplaySheet : ", DisplaySheet);
      alert("Convo Ended ");
      chatInputRef.current.disabled = true;
      chatInputRef.current.placeholder = "";
    }
    chatInputRef.current.value = "";
  };

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  });

  useEffect(() => {
    // !DisplaySheet &&
    //   setDisplaySheet(() => [
    //     {
    //       qType: currentQuestion.qType,
    //       type: "you",
    //       value: currentQuestion.value,
    //       id: currentQuestion.id,
    //     },
    //   ]);

    currentQuestion &&
      setDisplaySheet((DisplaySheet) => [
        ...DisplaySheet,
        {
          qType: currentQuestion.qType,
          type: "you",
          value: currentQuestion.value,
          id: currentQuestion.id + 100,
        },
      ]);
  }, [currentQuestion]);

  // useEffect(() => {
  //   if (DisplaySheet && DisplaySheet[DisplaySheet.length - 1]) {
  //     if (DisplaySheet[DisplaySheet.length - 1].type == "you") {
  //       console.log(DisplaySheet[DisplaySheet.length - 1].type);
  //       chatInputRef.current.disabled = false;
  //       chatInputRef.current.focus();
  //     } else if (DisplaySheet[DisplaySheet.length - 1].type == "me") {
  //       console.log(DisplaySheet[DisplaySheet.length - 1].type);
  //       chatInputRef.current.disabled = true;
  //     }
  //   }
  // }, [DisplaySheet]);

  // useEffect(() => {
  //   console.log("ResponseSheet.length ", ResponseSheet.length);
  // }, [ResponseSheet]);

  useEffect(() => {
    if (
      ResponseSheet.length * 2 === DisplaySheet.length &&
      ResponseSheet.length === Questions.length
    ) {
      console.log("Module : ", currentModule.value, "Is Completed");
      setModulesSolved([...ModulesSolved, currentModule]);
      chatInputRef.current.disabled = true;
      chatInputRef.current.placeholder = "";
    }
  }, [ResponseSheet]);

  return (
    <>
      {/* partial:index.partial.html */}
      <div className="chatWrapper">
        <div className="chatContainer">
          <div className="right">
            <div className="chat active-chat" ref={chatContainerRef}>
              <div className="conversation-start"></div>
              {DisplaySheet &&
                DisplaySheet.map((element) => (
                  <div key={element.id}>
                    <div className={`bubble ${element.type}`}>
                      {/* <gg style={{ height: "1px" }}>{new Date().toLocaleString()}</gg> */}
                      {/* <p className={"messageContainer"}>{item.value.toString()}</p> */}
                      {element.value}
                    </div>
                    {element.qType === "true-false" && (
                      <div
                        className="TFContainer  me"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "10em",
                          alignSelf: "flex-end",
                        }}
                      >
                        <button
                          ref={trueButtonRef}
                          className="TFButton"
                          onClick={() => {
                            handleInputEnter(true, element.id);
                          }}
                        >
                          True
                        </button>
                        <button
                          ref={falseButtonRef}
                          className="TFButton"
                          onClick={() => {
                            handleInputEnter(false, element.id);
                          }}
                        >
                          False
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div className="write" style={{ display: "flex" }}>
              {/* <a href="#/" className="write-link attach" /> */}
              <input
                autoFocus
                ref={chatInputRef}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    handleInputEnter();
                  }
                }}
                type="text"
                placeholder="Type Here..."
                disabled={
                  currentQuestion && currentQuestion.qType === "true-false"
                }
              />
              {/* <a href=" " className="write-link smiley" /> */}
              <button
                className="write-link-send"
                id="send-btn"
                style={{
                  display: "flex",
                  outline: "none",
                  height: "100%",
                  width: "3em",
                }}
                ref={chatButtonRef}
                type="submit"
                onClick={handleInputEnter}
              ></button>
            </div>
          </div>
        </div>
      </div>
      {/* partial */}
      {/* <div className="inputBar"></div> */}
    </>
  );
};

export default Chat;
