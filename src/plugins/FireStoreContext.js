import axios from "axios";
import { useContext, useState, useEffect, createContext } from "react";
import { AuthContext } from "./AuthContext";
import { firestore } from "./firebase";
export const db = firestore;
const FireStoreContext = createContext();

export function useFireStore() {
  return useContext(FireStoreContext);
}

const hasStarted = (drive) => {
  // var today = new Date();

  //var time = today.getHours() + ":" + today.getMinutes();
  let startDate = String(drive.startDate);
  // let startTime = drive.startTime;

  // let endDate = drive.endDate;
  // let endTime = drive.endTime;
  let todayDate;
  let startYear = startDate.split("-");
  let startMonth = startDate.split("-")[1];
  let startDay = startDate.split("-")[2];
  // let startHour = startTime.split(":")[0];
  // let startMin = startTime.split(":")[1];
  // let endYear = endDate.split("-")[0];
  // let endMonth = endDate.split("-")[1];
  // let endDay = endDate.split("-")[2];
  // let endHour = endTime.split(":")[0];
  // let endMin = endTime.split(":")[1];

  let todayYear = String(
    (todayDate = new Date().toISOString().slice(0, 10))
  ).split("-")[0];
  let todayMonth = String(
    (todayDate = new Date().toISOString().slice(0, 10))
  ).split("-")[1];
  let todayDay = String(
    (todayDate = new Date().toISOString().slice(0, 10))
  ).split("-")[2];

  // console.log(
  //   parseInt(startYear) <= parseInt(todayYear) &&
  //     parseInt(startMonth) <= parseInt(todayMonth) &&
  //     parseInt(startDay) <= parseInt(todayDay)
  // );

  let hasStarted =
    parseInt(startYear) <= parseInt(todayYear) &&
    parseInt(startMonth) <= parseInt(todayMonth) &&
    parseInt(startDay) <= parseInt(todayDay);

  return hasStarted;
};

export function FireStoreContextProvider({ children }) {
  const [error, setError] = useState(false);
  const [fireLoading, setfireLoading] = useState(false);
  // const [Drives, setDrives] = useState([]);
  const [ScheduledDrives, setScheduledDrives] = useState([]);
  const [RunningDrives, setRunningDrives] = useState([]);
  // const [EndedDrives, setEndedDrives] = useState([]);

  const { currentUser, userType, studentPRN } = useContext(AuthContext);

  useEffect(() => {
    // const unsubscribe = db;
    // .collection("companies")
    // .doc(currentUser.uid)
    // .collection("drives")
    // .onSnapshot(
    //   (snapshot) => {
    //     let tempScheduledDrives = [];
    //     let tempRunningDrives = [];
    //     let tempEndedDrives = [];
    //     snapshot.forEach((doc) => {
    //       let tempCurrentDrive = doc.data();
    //       if (hasStarted(tempCurrentDrive))
    //         tempRunningDrives.push(tempCurrentDrive);
    //       //Started Drives
    //       else tempScheduledDrives.push(tempCurrentDrive); //ScheduledDrives
    //     });
    //     setScheduledDrives(tempScheduledDrives);
    //     setRunningDrives(tempRunningDrives);
    //     setfireLoading(false);
    //   },
    //   (err) => {
    //     setError(err);
    //   }
    // );
    const Fetcher = () => {
      console.log("Inside Fetcher");
      setfireLoading(true);
      if (currentUser && currentUser.uid && userType == "institute")
        return db
          .collection("companies")
          .doc(currentUser.uid)
          .collection("drives")
          .onSnapshot(
            (snapshot) => {
              let tempScheduledDrives = [];
              let tempRunningDrives = [];
              let tempEndedDrives = [];
              console.log("Inside firestore fetch");
              snapshot.forEach((doc) => {
                let tempCurrentDrive = doc.data();
                if (hasStarted(tempCurrentDrive))
                  tempRunningDrives.push(tempCurrentDrive);
                //Started Drives
                else tempScheduledDrives.push(tempCurrentDrive); //ScheduledDrives
              });
              setScheduledDrives(tempScheduledDrives);
              setRunningDrives(tempRunningDrives);
              setfireLoading(false);
            },
            (err) => {
              setError(err);
            }
          );
      else if (currentUser && currentUser.uid && userType == "student") {
        setfireLoading(false);
        return db.collection("drives").onSnapshot(
          async (snapshot) => {
            let tempScheduledDrives = [];
            let tempRunningDrives = [];
            let tempEndedDrives = [];
            console.log("Inside firestore fetch");
            snapshot.forEach(async (doc) => {
              let tempCurrentDrive = doc.data();

              let url =
                `http://127.0.0.1:5000/api/setfilename?drivename=${tempCurrentDrive.driveName}&email=${currentUser.email}&prn=${studentPRN}`.replace(
                  " ",
                  "%20"
                );

              // let x = await axios.get(
              //   `http://127.0.0.1:5000/api/setfilename?drivename=${tempCurrentDrive.driveName}&email=${currentUser.email}&prn=${studentPRN}`
              // );

              if (hasStarted(tempCurrentDrive))
                tempRunningDrives.push(tempCurrentDrive);
              //Started Drives
              else tempScheduledDrives.push(tempCurrentDrive); //ScheduledDrives
            });
            setScheduledDrives(tempScheduledDrives);
            setRunningDrives(tempRunningDrives);
            setfireLoading(false);
          },
          (err) => {
            setError(err);
          }
        );
      } else if (currentUser) {
        setfireLoading(true);
        return function () {
          console.log("Registration");
        };
      } else if (!currentUser) {
        setfireLoading(true);
        return function () {
          console.log("Public");
        };
      }
    };
    const unsubscribe = Fetcher();
    return () => {
      unsubscribe();
    };

    console.log("InSide Fetcher");
  }, [currentUser, userType]);

  // useEffect(() => {
  //   console.log(Drives);
  // }, [Drives]);

  const value = {
    ScheduledDrives,
    RunningDrives,
    error,
    fireLoading,
  };

  return (
    <FireStoreContext.Provider value={value}>
      {!fireLoading && children}
    </FireStoreContext.Provider>
  );
}
