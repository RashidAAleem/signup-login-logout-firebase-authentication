// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
//   createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
//   onAuthStateChanged,
//   sendEmailVerfication,
//   signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
    getFirestore,
    setDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "api key",
  authDomain: "helloworld-9d5f8.firebaseapp.com",
  projectId: "helloworld-9d5f8",
  storageBucket: "helloworld-9d5f8.firebasestorage.app",
  messagingSenderId: "662219931479",
  appId: "1:662219931479:web:9dec7c5a31e0803f95c812",
  measurementId: "G-CVVDHWJY52",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Display alert if redirected from admin page
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('alert')) {
        alert('Access denied. Please log in first.');
    }
});



//to display message for successfull signup
function showMessage (message, divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerText = message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    }, 5000)

}


// call the reference of the login btn.
const logInBtn = document.getElementById('logInBtn')

// call the event listener on click
logInBtn.addEventListener('click',(event)=>{
    //call the prevent default
    event.preventDefault();
// call the reference of the fields
const email = document.getElementById('emailId').value;
const password = document.getElementById('password').value;

// call the auth from firebase
const auth = getAuth();

// attempt for signin using promise

signInWithEmailAndPassword(auth, email, password)
.then((userCredential)=>{
    showMessage('login is Successful', 'signInMessage');
    const user = userCredential.user;
    //storing user uid in local storage
    localStorage.setItem('loggedInUser', user.uid);
    // on success redirect to admin page
    window.location.href='admin.html';
})
//if error then
.catch((error)=>{
    const errorCode = error.error.code;
    //conditionally show error
    if(errorCode ==='auth/invalid-credential'){
        showMessage('Incorrect Email or Password', signInMessage);
    }
    else{
        showMessage('Account does not Exist', 'signInMessage');
    }

})


})
