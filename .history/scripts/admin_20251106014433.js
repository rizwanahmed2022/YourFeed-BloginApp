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


const userCard = document.querySelector('.dashboard-container');


let userId;
onAuthStateChanged(auth, (user) => {
  userId = user.uid

});


async function getDataFromDB(userId) {
  const q = query(
    collection(db, "users")   
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((user)=>{
    console.log(user.data().fullname)
    console.log(user.data().email)
    console.log(user.data().category)
    console.log(user.data().uid)
    console.log(user.data().profile)
    console.log(user.data().admin)
    userCard.innerHTML +=`
    
     <div class="user-card">
    <div class="user-left">
      <img src="${user.data().admin}" alt="Profile Picture">
      <div class="user-details">
        <p><strong>Full Name:</strong> ${user.data().fullname}</p>
        <p><strong>Email:</strong> ${user.data().admin}</p>
        <p><strong>Category:</strong> web-development</p>
        <p><strong>UID:</strong> q7l1mTBHykaUt8gFVYlwYT1NxCk1</p>
      </div>
    </div>

    <div class="user-right">
      <label for="adminCheck1">Admin</label>
      <label class="switch">
        <input type="checkbox" id="adminCheck">
        <span class="slider"></span>
      </label>
    </div>
  </div>
    `

  })

}

getDataFromDB(userId);