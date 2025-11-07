import { auth } from "./firebaseConfig.js";
import { db } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const form = document.querySelector("#form");
const fullName = document.querySelector("#fullname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const category = document.querySelector("#category");
const fileUpload = document.querySelector(".file-upload");
const btn = document.querySelector("#btn");



///Saving a Profile's Url in ulpadImage
let uploadImage;
var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "deex2hwgz",
    uploadPreset: "yourFeed",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ");
      uploadImage = result.info.secure_url;
      console.log(uploadImage);
    }
  }
);
fileUpload.addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

form.addEventListener("submit", async (event) => {
      btn.innerHTML = 'Loading...'

  event.preventDefault();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user.uid);
      console.log(fullName.value);
      console.log(email.value);
      console.log(password.value);
      console.log(category.value);

      try {
        const docRef = await addDoc(collection(db, "users"), {
          fullname: fullname.value,
          email: email.value,
          profile: uploadImage,
          category: category.value,
          uid: user.uid,
          admin: false
        });
        console.log("Document written with ID: ", docRef.id);
        window.location = "login.html";
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      btn.innerHTML = 'Register'

    });
});
