import { auth } from "./firebaseConfig.js";
import { db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  orderBy,
  where,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";






let userId;
let userName;
let userProfile;

onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid;
    const userEmail = user.email;
    console.log("Logged in user ID:", userId);
    console.log("User email:", userEmail);
  } else {
    // No user is signed in
    window.location = 'login.html'
    console.log("No user is logged in.");
  }
});


// Get form and elements
const blogForm = document.querySelector(".blog-form");
const titleInput = document.getElementById("title");
const excerptInput = document.getElementById("excerpt");
const contentInput = document.getElementById("content");
const addPictureBtn = document.getElementById("addPicture");

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
addPictureBtn.addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);



blogForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  console.log(titleInput.value);
  console.log(userId);
  console.log(excerptInput.value);
  console.log(contentInput.value);
  const userData = {
    image: uploadImage,
    title: titleInput.value,
    author: "John Doe",
    date: Timestamp.fromDate(new Date()),
    descripation: excerptInput.value,
    moreDetails: contentInput.value
  };

  const docRef = await addDoc(collection(db, "posts"), userData);
  console.log("Document written with ID: ", docRef.id);
});





async function getDataFromDB(userId) {
  const q = query(
    collection(db, "users"),
    where("uid", "==", userId) // uid must be a string
  );
  const querySnapshot = await getDocs(q);
  const userInfo = querySnapshot.docs[0].data(); // data() is synchronous
  userName = userInfo.fullname;
  userProfile = userInfo.profile;


  return userInfo;
}
