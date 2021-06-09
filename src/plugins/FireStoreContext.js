import { useContext, useState, useEffect, createContext } from "react";
import { useAuth } from "./AuthContext";
import { firestore } from "./firebase";
export const db = firestore;
const FireStoreContext = createContext();

export function useFireStore() {
  return useContext(FireStoreContext);
}

export function FireStoreContextProvider({ children }) {
  const { userType } = useAuth();
  const [error, setError] = useState(false);
  const [fireLoading, setfireLoading] = useState(true);
  const [Drives, setDrives] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("drives").onSnapshot(
      (snapshot) => {
        const tempDrives = [];
        snapshot.forEach((doc) => {
          tempDrives.push(doc.data());
        });

        setDrives(tempDrives);
        setfireLoading(false);
      },
      (err) => {
        setError(err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [fireLoading]);

  useEffect(() => {
    console.log(Drives);
  }, [Drives]);

  let x = "sdfsdfdsfsfdsdf";
  const value = {
    Drives,
    error,
    fireLoading,
  };

  return (
    <FireStoreContext.Provider value={value}>
      {!fireLoading && children}
    </FireStoreContext.Provider>
  );
}
