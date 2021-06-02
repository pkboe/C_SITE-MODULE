import axios from "axios";

export async function afterSignUp(uid, userType, email, password, userName) {
  try {
    await axios.post("http://127.0.0.1:5000", {
      email: email,
      password: password,
      uid: uid,
      userName: userName,
      userType: userType,
    });
  } catch {
    console.log("Error");
    return false;
  }
  console.log("Done");
  return true;
}
