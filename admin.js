// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkHCfZjvZGKFXUN_rqGsxZC_gn50vMuE4",
  authDomain: "helloworld-9d5f8.firebaseapp.com",
  projectId: "helloworld-9d5f8",
  storageBucket: "helloworld-9d5f8.firebasestorage.app",
  messagingSenderId: "662219931479",
  appId: "1:662219931479:web:9dec7c5a31e0803f95c812",
  measurementId: "G-CVVDHWJY52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
document.getElementById('adminContent').style.display = "none";

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, "users", userId);
  
        getDoc(userDocRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();
              document.getElementById("firstName").textContent = userData.firstName;
              document.getElementById("lastName").textContent = userData.lastName;
              document.getElementById("emailName").textContent = userData.email;
              document.getElementById("phone").textContent = userData.phoneNo;
            } else {
              alert("No user data found.");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });

          document.getElementById('adminContent').style.display = "block";
          
      } else {
        window.location.href = 'login.html?alert=1';
        // alert("Access denied. Please log in first.");
        // window.location.href = "login.html";
      }
    });
  });

//check for key in local storage

// document.addEventListener('DOMContentLoaded', ()=>{
//     const loggedInUSer = localStorage.getItem('loggedInUser');
//     if(!loggedInUSer){
//         alert('Access denied. Please Log in First');
//         window.location.href = 'login.html';
//     }
// });

// Restrict access to the admin page
// document.addEventListener('DOMContentLoaded', () => {
//     const loggedInUser = localStorage.getItem('loggedInUser');
//     if (!loggedInUser) {
//         // Redirect to login page with an alert parameter
//         window.location.href = 'login.html?alert=1';
//     }
// });

const logOut = document.getElementById("logOutBtn");

logOut.addEventListener("click", (event) => {
  event.preventDefault();
  if (confirm("Are you sure you want to log out?")) {
  signOut(auth)
  .then(()=>{
    alert('Successfully logged out.');
    window.location.href = 'login.html';
    // localStorage.removeItem("loggedInUser");
  })
  .catch((error)=>{
    console.error('Error during logout', error);
  })
  // const user = localStorage.getItem('loggedInUSer');
    // window.location.href = "login.html";
  }
});
