import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../plugins/AuthContext";
import ml5 from "ml5";

const Pose = (props) => {
  const { IsML5ModelLoaded, setIsML5ModelLoaded } = useContext(AuthContext);

  const [GlobalState, setGlobalState] = useState({
    HEIGHT: 400 * 0.35,
    WIDTH: 600 * 0.35,
  });
  const [detected, setdetected] = useState(false);
  const [Status, setStatus] = useState("Please Look Into The Camera");
  const camCanvas = useRef();
  const webCam = useRef();
  var poseNet = "";
  var poses = "";

  var stream;

  function initializeModel(camera) {
    poseNet = ml5.poseNet(camera, () => {
      console.log("Model Initilaized");
      setIsML5ModelLoaded(true);
      //Draw
      const ctx = camCanvas.current.getContext("2d");
      drawCameraIntoCanvas(webCam.current, ctx);
      poseNet.on("pose", (result) => {
        poses = result;
        if (result[0] !== undefined) {
          setStatus("Normal");
          if (result[0].pose.leftEye.x - result[0].pose.rightEye.x < 70 * 0.35)
            setStatus("Please Look Into The Camera");
          // setStatus("NOT LOOKING");
          // console.log("Not Looking");
          //Eyes sathi 66%
          else if (
            result[0].pose.nose.y -
              (result[0].pose.leftEye.y + result[0].pose.rightEye.y) / 2 <
            15 * 0.35
          )
            // console.log(
            //   (result[0].pose.leftEye.y + result[0].pose.rightEye.y) / 2 -
            //     result[0].pose.nose.y
            // );
            // console.log("Looking Up");
            setStatus("Looking Up");
          else if (
            result[0].pose.nose.y -
              (result[0].pose.leftEye.y + result[0].pose.rightEye.y) / 2 >
            59 * 0.35
          )
            //   console.log("Looking Down");
            setStatus("Looking Down");
          //25 15 60
          //1.66 - UP
          //2.4 - DOWN
          setdetected(result !== undefined && result.length > 0 ? true : false);
        } else setStatus("Please Look Into The Camera");
      });
    });
  }

  function drawKeypoints(ctx) {
    for (let i = 0; i < poses.length; i++) {
      for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
        let keypoint = poses[i].pose.keypoints[j];
        if (keypoint.score > 0.2) {
          ctx.fillStyle = "#c82124";
          ctx.beginPath();
          ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }
  }

  function drawSkeleton(ctx) {
    for (let i = 0; i < poses.length; i++) {
      for (let j = 0; j < poses[i].skeleton.length; j++) {
        let partA = poses[i].skeleton[j][0];
        let partB = poses[i].skeleton[j][1];
        ctx.beginPath();
        ctx.moveTo(partA.position.x, partA.position.y);
        ctx.lineTo(partB.position.x, partB.position.y);
        ctx.stroke();
      }
    }
  }

  function drawCameraIntoCanvas(camera, ctx) {
    if (true) {
      //   console.log(modelLoaded);
      ctx &&
        webCam.current &&
        ctx.drawImage(
          webCam.current,
          0,
          0,
          GlobalState.WIDTH,
          GlobalState.HEIGHT
        );
    }
    if (poses !== undefined) {
      //   drawKeypoints(ctx);
      //   drawSkeleton(ctx);
    }
    requestAnimationFrame(() => drawCameraIntoCanvas(camera, ctx));
  }

  useEffect(() => {
    const ctx = camCanvas.current.getContext("2d");
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        "Browser API navigator.mediaDevices.getUserMedia not available"
      );
    }
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
          width: GlobalState.WIDTH,
          height: GlobalState.HEIGHT,
          frameRate: 15, // Reduce if there's a stuttering in feed
        },
      })
      .then((res) => {
        if (res != null) {
          stream = res;
          webCam.current.srcObject = stream;
          webCam.current.play();
          initializeModel(webCam.current, ctx);
        }
      })
      .catch((err) => alert(err));

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <div>
        {" "}
        <canvas
          ref={camCanvas}
          width={GlobalState.WIDTH}
          height={GlobalState.HEIGHT}
          data-id={324324}
          key={"sdsdf"}
        />{" "}
        <video
          style={{ display: "none" }}
          playsInline
          ref={webCam}
          width={GlobalState.WIDTH}
          height={GlobalState.HEIGHT}
        />
        {/* <h4>{detected ? "Found You!!!" : "Show yourself"}</h4> */}
        <h5>{Status ? Status : "Please Look Into The Camera"}</h5>
      </div>
    </div>
  );
};

export default Pose;
