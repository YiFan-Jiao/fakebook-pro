'use strict'

const userName = document.querySelector('.user-name');
const userPw = document.querySelector('.user-pw');
const userLogin = document.querySelector('.login');
const tips = document.querySelector('.tips');

localStorage.clear()
localStorage.setItem("name",'aabb');
localStorage.setItem("pw",'123456');

userLogin.addEventListener('click', () => {
    //console.log(userPw.value.trim())
    if(userName.value.trim() === localStorage.name && 
       userPw.value.trim() === localStorage.pw) {
        window.location.replace('home.html')
    } else {
        tips.style.display = "block";
    }
});