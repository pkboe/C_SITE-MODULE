import { useAuth } from "../plugins/AuthContext";
// import { useEffect, useState } from "react";
import CompanyDB from "./CompanyDB";
import StudentDB from "./StudentDB";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import TestInfo from "./TestInfo";
// import Test from "../Components/Test";

const AfterLogin = (props) => {
  const { userType, IsTestRunning } = useAuth();
  const history = useHistory();
  // const [userType, setuserType] = useState("Anoynomous");
  // const [IsClaimSet, setIsClaimSet] = useState(false);

  useEffect(() => {
    if (IsTestRunning) history.push("/testinfo");
  }, []);

  const Switcher = () => {
    if (userType === "institute") return <CompanyDB />;
    else if (userType === "student") return <StudentDB />;
    else
      return (
        <>
          <Redirect to="/" />
        </>
      );
  };

  // useEffect(() => {
  //   const checkUserType = () => {
  //     console.log("called");
  //     if (currentUser) console.log(currentUser);
  //     if (currentUser)
  //       currentUser
  //         .getIdTokenResult()
  //         .then((idTokenResult) => {
  //           console.log(idTokenResult);
  //           // Confirm the user is an Admin.
  //           if (idTokenResult.claims.userType === "institute") {
  //             // Show admin UI.
  //             setuserType("institute");
  //             setIsClaimSet(true);
  //           } else if (idTokenResult.claims.userType === "student") {
  //             // Show regular user UI.
  //             setuserType("student");
  //             setIsClaimSet(true);
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //   };
  //   checkUserType();
  // }, [userType, currentUser]);
  return (
    <>
      {/* <h1 className="text-center bg-success">
        {values.currentUser &&
          "Login Successfull " + values.currentUser.displayName + "!" + " "}
      </h1>
      <h2 className="text-center bg-success">
        Your Current Role is {userType}
      </h2> */}
      <Switcher />
    </>
  );
};

export default AfterLogin;
