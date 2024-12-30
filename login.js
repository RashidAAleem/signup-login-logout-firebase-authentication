const emailId = document.getElementById('emailId')
const password = document.getElementById('password')
const form = document.querySelector('form')

form.addEventListener('submit',(event)=>{
    event.preventDefault()
const userData = localStorage.getItem('userData')

const storeduserData = JSON.parse(userData);

if(storeduserData.emailId === emailId.value){

    if(storeduserData.password === password.value){
    alert('Login Successful');
    console.log(userData);
    
    
    }else{
    alert('Password does not match')
    }
} else{
alert('no user data found in localStorage')
      }

})