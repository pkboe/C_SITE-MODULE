import { useAuth } from "../plugins/AuthContext";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import CompanyDB from "./CompanyDB";
import StudentDB from "./StudentDB";

const AfterLogin = (props) => {
  const values = useAuth();
  const [userType, setuserType] = useState("Anoynomous");
  const [IsAuthenticated, setIsAuthenticated] = useState(false);

  const Switcher = () => {
    if (userType.toLowerCase() === "institute") return <CompanyDB />;
    else if (userType.toLowerCase() === "student") return <StudentDB />;
    else
      return (
        <>
          <h1>Anoynomous</h1>
        </>
      );
  };

  useEffect(() => {
    const checkUserType = () => {
      console.log("called");
      if (values.currentUser)
        values.currentUser
          .getIdTokenResult()
          .then((idTokenResult) => {
            console.log(idTokenResult);
            // Confirm the user is an Admin.
            if (idTokenResult.claims.userType === "institute") {
              // Show admin UI.
              setuserType("Institute");
              setIsAuthenticated(true);
            } else if (idTokenResult.claims.userType === "student") {
              // Show regular user UI.
              setuserType("Student");
              setIsAuthenticated(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    };
    checkUserType();
  }, [userType, values.currentUser]);

  return (
    <>
      <Navbar Auth={IsAuthenticated} />
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
