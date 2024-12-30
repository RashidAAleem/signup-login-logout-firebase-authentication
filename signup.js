   //getting reference
   const userName = document.getElementById("userName");
   const phoneNo = document.getElementById("phoneNo");
   const emailId = document.getElementById("emailId");
   const password = document.getElementById("password");
   const form = document.querySelector("form");

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

   //form submission on enter key press after form is completely filled
   form.addEventListener("keydown", (event) => {
     if (event.key === "Enter") {
       event.preventDefault();
       if (validateForm()) {
         const userData = {
           userName: userName.value.toLowerCase(),
           phoneNo: phoneNo.value,
           emailId: emailId.value.toLowerCase(),
           password: password.value,
         };

         localStorage.setItem("userData", JSON.stringify(userData))
             alert("You have signed up successfully")
             console.log(userData);
         window.location.href = 'login.html'
             
         }else{
           console.log("Erro");

       }
     }
   });

   // form submission on submit
   form.addEventListener("submit", (e) => {
     e.preventDefault();
     if (validateForm()) {
       const userData = {
         userName: userName.value.toLowerCase(),
         phoneNo: phoneNo.value,
         emailId: emailId.value.toLowerCase(),
         password: password.value,
       };
       
             localStorage.setItem("userData", JSON.stringify(userData))
         
             alert("You have signed up successfully")
               console.log(userData);
                window.location.href = 'login.html'
         }else{

             console.log("Erro");
         }
     
   });

   //form validation
   const validateForm = () => {
     if (
       !userName.value ||
       !phoneNo.value ||
       !emailId.value ||
       !password.value
     ) {
       alert("Please fill all the fields");
       return false;
     }  
     if (password.value.length < 8) {
       alert("Password must be at least 8 characters long");
       return false;
     }
     return true;
   };