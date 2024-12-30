// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
//   SingInWithEmailAndPassword,
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


// Initialize Firebase

//first get ref  of signup button to call function for submission
const signUp = document.getElementById("submitSignUp");
signUp.addEventListener("click", (event) => {

// add preventDefault event to prevent default submission of form
    event.preventDefault();
    
// call the references of the input fields required for signup.
  const firstName = document.getElementById("fName").value;
  const lastName = document.getElementById("lName").value;
  const emailId = document.getElementById("emailId").value;
  const phoneNo = document.getElementById("phoneNo").value;
  const password = document.getElementById("password").value;
  
  const auth = getAuth();
  const db = getFirestore();

// initiate promise for creating user with email and password
  createUserWithEmailAndPassword(auth, emailId, password)
  .then((userCredential) =>{
        const user = userCredential.user;
        //create object of the data for creating signup
        const userData = {
            email: emailId,
            firstName: firstName,
            lastName: lastName,
            phoneNo: phoneNo,
            // password: password,
        };
        // show message for sign up successfully

        showMessage('Account Create Successfully!','signUpMessage');

//store a ref in firestore prvided by the firestore
        const docRef=doc(db, "users", user.uid); //uid--> user unique identifier;
        //set setDoc is provided by the fireStore the userData in docRef
        setDoc(docRef, userData)
        //if promise is fullfilled
        .then(()=>{
            window.location.href='login.html'
        })
        //if there is an error writing document
        .catch((error)=>{
            console.error('error writing document', error);
        });
  })
// if there is an error while adding the account
.catch((error)=>{
    const errorCode = error.code;

//check for whether email exists already 

    if(errorCode=='auth/email-already-in-use'){
        showMessage('Email Address Already Exists !!!', 'signUpMessage')

    }  else{
        showMessage('unable to create User', 'signUpMessage');
    }

})
});
