const phoneNo = document.getElementById('phoneNo')
const emailId = document.getElementById('emailId')
const password = document.getElementById('password')
const form = document.querySelector('form')

  // restricting to phone to digits only
  phoneNo.addEventListener("keydown", (event) => {
    if (
      event.key === "Tab"||
      event.key === "Backspace" ||
      event.key === "Delete" ||
      /[0-9]/.test(event.key) 
    ) {
      return;
    }
    event.preventDefault();
  });

form.addEventListener('submit',(event)=>{
    event.preventDefault()
const userData = localStorage.getItem('userData')

const storeduserData = JSON.parse(userData);

if(storeduserData.phoneNo === phoneNo.value && storeduserData.emailId === emailId.value.toLowerCase()){

   storeduserData.password = password.value;
   localStorage.setItem('userData', JSON.stringify(storeduserData));
   const newUserdata = localStorage.getItem('userData')
   alert('Congratulations! Password updated successfully')
   console.log("password updated successfully", JSON.parse(newUserdata));

} else {
    alert('Phone Number or email does not match')
} 
  //   alert('No user found in local storage')



})


// const phoneNo = document.getElementById('phoneNo');
// const emailId = document.getElementById('emailId');
// const password = document.getElementById('password');
// const form = document.querySelector('form');

// // Restrict phone number input to digits only
// phoneNo.addEventListener("keydown", (event) => {
//   if (
//     event.key === "Tab" ||
//     event.key === "Backspace" ||
//     event.key === "Delete" ||
//     /^[0-9]$/.test(event.key)
//   ) {
//     return;
//   }
//   event.preventDefault();
// });

// // Handle form submission
// form.addEventListener('submit', (event) => {
//   event.preventDefault();

//   // Retrieve user data from local storage
//   const userData = localStorage.getItem('userData');
//   if (!userData) {
//     alert('No user found in local storage.');
//     return;
//   }

//   try {
//     const storedUserData = JSON.parse(userData);

//     // Validate user input
//     const phoneInput = phoneNo.value.trim();
//     const emailInput = emailId.value.trim().toLowerCase();
//     const passwordInput = password.value.trim();

//     if (!phoneInput || !emailInput || !passwordInput) {
//       alert('All fields are required.');
//       return;
//     }

//     if (storedUserData.phoneNo === phoneInput && storedUserData.emailId === emailInput) {
//       // Update password
//       storedUserData.password = passwordInput;
//       localStorage.setItem('userData', JSON.stringify(storedUserData));
      
//       alert('Congratulations! Password updated successfully.');
//       console.log("Password updated successfully:", storedUserData);
//     } else {
//       alert('Phone number or email does not match.');
//     }
//   } catch (error) {
//     console.error("Error parsing user data:", error);
//     alert('An error occurred. Please try again.');
//   }
// });
