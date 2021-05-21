import { useContext, useState, useEffect, createContext } from "react";
import { auth } from "./firebase";
import { afterSignUp } from "./firebase.routes";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const signup = (email, password, fullName, signType) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((ref) => {
          ref.user.updateProfile({
            displayName: fullName,
          });
          afterSignUp(ref.user.uid, signType, email, password, fullName);
          resolve(ref);
        })
        .catch((error) => reject(error));
    });
    return promise;
  };
  const signin = (email, password) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((ref) => {
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
  useEffect(() => {
    const unsubscribe = () =>
      auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setLoading(false);
      });
    return unsubscribe();
  }, [currentUser]);

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    passwordReset,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
