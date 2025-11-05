import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth } from "./firebaseConfig.js";

const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const btn = document.querySelector(".login-btn");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  

  console.log(email.value);
  console.log(password.value);

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location = "index.html"
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      alert("User Did't Exist")
      
    });
});
