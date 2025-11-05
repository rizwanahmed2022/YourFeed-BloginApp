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


const userId;
onAuthStateChanged(auth, (user) => {
  userId = user.uid

});


async function getDataFromDB(userId) {
  const q = query(
    collection(db, "users")   
  );
  const querySnapshot = await getDocs(q);
  const userInfo = await querySnapshot.docs[0].data()
  console.log(userId.fullname)

}

  getDataFromDB(userId);