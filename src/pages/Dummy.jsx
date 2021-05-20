import { useAuth } from "../plugins/AuthContext";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const Dummy = (props) => {
  const { signout } = useAuth();
  const values = useAuth();
  const history = useHistory();
  const [userType, setuserType] = useState("Anoynomous");

  const handleSignOut = () => {
    signout();
    history.push("/");
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
            if (idTokenResult.claims.userType == "institute") {
              // Show admin UI.
              setuserType("Institute");
            } else if (idTokenResult.claims.userType == "student") {
              // Show regular user UI.
              setuserType("Student");
            }
          })
          .catch((error) => {
            console.log(error);
          });
    };
    checkUserType();
  }, []);

  return (
    <>
      <h1 className="text-center bg-success">
        {values.currentUser &&
          "Login Successfull " + values.currentUser.displayName + "!" + " "}
      </h1>
      <h2 className="text-center bg-success">
        Your Current Role is {userType}
      </h2>
      <button
        className="btn btn-sm btn-primary btn-block"
        type="submit"
        onClick={handleSignOut}
      >
        SignOut
      </button>
    </>
  );
};

export default Dummy;
