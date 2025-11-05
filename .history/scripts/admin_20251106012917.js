import { onAuthStateChanged , signOut  } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {auth} from './firebaseConfig.js'
import {db} from './firebaseConfig.js'
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";



onAuthStateChanged(auth, (user) => {
  const profilePic = document.querySelector(".profile-pic");

  if (user) {
    userId = user.uid
    console.log(user.uid);
    signinBtn.style.display = 'none'
    logoutBtn.style.display = 'block'
    profilePic.style.display = 'block'
    userName.style.display = 'block'
    startWritin.style.display = 'block'
    
  } else {
    signinBtn.style.display = 'block'
    logoutBtn.style.display = 'none'
    profilePic.style.display = 'none'
    userName.style.display = 'none'
    startWritin.style.display = 'none'
    console.log("not logged in");
  }
});