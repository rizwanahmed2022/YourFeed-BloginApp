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
   
    userCard.innerHTML +=`
    
     <div class="user-card">
    <div class="user-left">
      <img src="${user.data().profile}" alt="Profile Picture">
      <div class="user-details">
        <p><strong>Full Name:</strong> ${user.data().fullname}</p>
        <p><strong>Email:</strong> ${user.data().email}</p>
        <p><strong>Category:</strong> ${user.data().category}</p>
        <p><strong>UID:</strong> ${user.data().uid}</p>
      </div>
    </div>

    <div class="user-right">
      <label for="adminCheck1">Admin</label>
      <label class="switch">
        <input type="checkbox" id="adminCheck" ${user.data().admin}>
        <span class="slider"></span>
      </label>
    </div>
  </div>
    `

  })

}

getDataFromDB(userId);