import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth } from "./firebaseConfig.js";
import { db } from "./firebaseConfig.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const logoutBtn = document.querySelector("#logout-btn");
const signinBtn = document.querySelector("#signin-btn");
const profilePic = document.querySelector(".profile-pic");
const userName = document.querySelector(".user-name");
const startWritin = document.querySelector(".startwritin");
const navItem = document.querySelector(".nav-item");
const feed = document.querySelector(".feed");
var userId = " ";
const postsArray = [];

onAuthStateChanged(auth, (user) => {
  const profilePic = document.querySelector(".profile-pic");

  if (user) {
    userId = user.uid;
    console.log(userId);
    signinBtn.style.display = "none";
    logoutBtn.style.display = "block";
    profilePic.style.display = "block";
    userName.style.display = "block";
    startWritin.style.display = "block";
    navItem.style.display = "block";
    getDataFromDB(userId);
    renderPosts(postsArray);
  } else {
    signinBtn.style.display = "block";
    logoutBtn.style.display = "none";
    profilePic.style.display = "none";
    userName.style.display = "none";
    startWritin.style.display = "none";
    navItem.style.display = "none";
    console.log("not logged in");
  }
});

logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location = "index.html";
    })
    .catch((error) => {
      alert("error occured");
    });
});

//goto login bpage
signinBtn.addEventListener("click", () => {
  window.location = "login.html";
});

//functioin getting the logedin user's data name and profule
async function getDataFromDB(userId) {
  const q = query(
    collection(db, "users"),
    where("uid", "==", userId) // uid must be a string
  );
  const querySnapshot = await getDocs(q);
  const userInfo = querySnapshot.docs[0].data(); // data() is synchronous
  profilePic.src = userInfo.profile;
  userName.innerHTML = userInfo.fullname;

  const posts = query(
    collection(db, "posts"),
    where("uid", "==", userId),
    orderBy("date", "desc")
    // uid must be a string
  );

  const queryPosts = await getDocs(posts);
  // const userPosts = queryPosts.docs[0].data(); // data() is synchronous
  queryPosts.forEach((item) => {
    postsArray.push({
      author: item.data().author,
      date: item.data().date,
      description: item.data().descripation,
      image:
        item.data().image,
      moreDetails: item.data().moreDetails,
      title: item.data().title,
      uid: item.data().uid,
    });
  });

  return userInfo;
}
console.log(postsArray)

function renderPosts(array){
  feed.innerHTML = ''
  console.log(array)
  array.forEach((item)=>{

    feed.innerHTML += `
    <article class="blog-card">
      <img src="${item.image}">
      <div class="blog-content">
        <h3>${item.title}</h3>
        <p class="author">${item.auth} • ${item.date}</p>
        <p class="excerpt">${item.descripation}</p>
        <a href="#" class="read-more">Read More →</a>
      </div>
    </article>
    `
    });
}