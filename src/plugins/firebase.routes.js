import axios from "axios";

export async function afterSignUp(uid, userType, email, password, userName) {
  await axios
    .post("http://127.0.0.1:5000", {
      email: email,
      password: password,
      uid: uid,
      userName: userName,
      userType: userType,
    })
    .then((res) => console.info(res))
    .catch((err) => console.error(err));
}
