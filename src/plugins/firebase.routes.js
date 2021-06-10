import axios from "axios";

export async function afterSignUp(
  uid,
  userType,
  email,
  password,
  userName,
  studentPRN
) {
  try {
    await axios.post("http://127.0.0.1:5001", {
      email: email,
      password: password,
      uid: uid,
      userName: userName,
      userType: userType,
      studentPRN: studentPRN,
    });
  } catch {
    console.log("Error");
    return false;
  }
  console.log("Done");
  return true;
}
