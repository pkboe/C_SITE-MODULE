import axios from "axios";

export async function afterSignUp(uid, userType) {
  await axios
    .post("http://127.0.0.1:5000", {
      uid: uid,
      userType: userType,
    })
    .then(console.log("Done"));
}
