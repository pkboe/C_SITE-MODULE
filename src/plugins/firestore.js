import { firestore } from "./firebase";
export const db = firestore;

export const storeCreatedDrive = async (currentUser, drive) => {
  try {
    if (currentUser && drive) {
      let y = [];
      let z = "";
      drive.modules.map((item, index) => {
        console.log(item);
        y = item.value.split("-");
        y.map((item) => (z += item.charAt(0)));

        return true; //warning de hota ha kahi return kel pahje mhnun return true takel hay.
      });
      // modules
      //     python-coding-15
      //     c-coding-15
      // s = 'python-coding15'
      // arr= s.split('-')
      // for x in arr x[0] PC1

      // gescoe_PM1CC3CC4;
      let dname = currentUser.displayName + "_" + z;

      db.collection("drives").doc().set({
        uid: currentUser.uid,
        driveName: dname,
        startDate: drive.startDate,
        endDate: drive.endDate,
        startTime: drive.startTime,
        endTime: drive.endTime,
        allowBy: drive.allowBy,
        modules: drive.modules,
        testDuration: drive.testDuration,
      });

      db.collection("companies")
        .doc(currentUser.uid)
        .collection("drives")
        .doc()
        .set({
          uid: currentUser.uid,
          driveName: dname,
          startDate: drive.startDate,
          endDate: drive.endDate,
          startTime: drive.startTime,
          endTime: drive.endTime,
          allowBy: drive.allowBy,
          modules: drive.modules,
          testDuration: drive.testDuration,
        });
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
