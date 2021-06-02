import { useContext, useState, useEffect, createContext } from "react";
import { auth, LOCAL_PERSISTENCE, SESSION_PERSISTENCE } from "./firebase";
import { afterSignUp } from "./firebase.routes";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState();

  const signup = async (email, password, fullName, signType) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((ref) => {
          ref.user.updateProfile({
            displayName: fullName,
          });
          afterSignUp(ref.user.uid, signType, email, password, fullName).then(
            (data) => {
              console.log(data);
              resolve(ref);
            }
          );
        })
        .catch((error) => reject(error));
    });
    return promise;
  };
  const signin = (email, password, remember) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((ref) => {
          auth.setPersistence(
            remember ? LOCAL_PERSISTENCE : SESSION_PERSISTENCE
          );
          resolve(ref);
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  };
  const signout = () => {
    return auth.signOut();
  };

  const passwordReset = (email) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve(`Password Reset Email sent to ${email}`);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  };

  const checkUserType = async (user) => {
    if (user) {
      await user
        .getIdTokenResult()
        .then((idTokenResult) => {
          console.log(idTokenResult);
          // Confirm the user is an Admin.
          if (idTokenResult.claims.userType === "institute") {
            console.log("institute");
            setUserType("institute");
            setCurrentUser(user);
            setLoading(false);
            // Show admin UI.
          } else if (idTokenResult.claims.userType === "student") {
            setUserType("student");
            setCurrentUser(user);
            setLoading(false);
            // Show regular user UI.
            console.log("student");
          } else {
            setLoading(false);
            console.log("User Signed In But No Claims inside token ID Result");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLoading(false);
      console.log("NO User Found");
    }
  };

  useEffect(() => {
    console.log("Use Effect");
    const unsubscribe = async () =>
      auth.onAuthStateChanged(async (user) => {
        console.log("onAuthStateChanged");
        checkUserType(user);
      });
    return unsubscribe();
  }, []);

  const value = {
    userType,
    currentUser,
    signup,
    signin,
    signout,
    passwordReset,
  };

  <auth className="currentUser"></auth>;
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
