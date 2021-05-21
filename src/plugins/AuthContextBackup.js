import { useContext, useState, useEffect, createContext } from "react";
import { auth, firestore } from "./firebase";
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

          firestore
            .collection("users")
            .doc(ref.user.uid)
            .set({
              uid: ref.user.uid,
              userName: fullName,
              email: email,
              password: password,
              userType: signType,
            })
            .then(() => {
              afterSignUp(ref.user.uid, signType);
              resolve(ref);
            })
            .catch((error) => {
              console.log(
                "Something went wrong with added user to firestore: ",
                error
              );
              reject(error);
            });
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
