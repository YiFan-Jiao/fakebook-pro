'use strict'

const myImg = document.querySelector('.my-img');
const userInfo = document.querySelector('.user-info');
const imgName = document.querySelector('.img-name');
const rbTitle = document.querySelector('.box-3');
const boxTwo = document.querySelector('.box-2');
const threeFlex = document.querySelector('.three-flex');

const postBtn = document.querySelector('.rel-post');
const textareaInput = document.querySelector('textarea');
const jsBox = document.querySelector('.js-box');
const whiteBox = document.querySelector('.white-box');
const postImg = document.querySelector('.post-img');
const iconImg = document.querySelector('.fa-image')

const uID = document.querySelector('.u-id');
const uName = document.querySelector('.u-name');
const uEmail = document.querySelector('.u-email');
const uPage = document.querySelector('.u-page');
const uGroup = document.querySelector('.u-group');
const uCanMonetize = document.querySelector('.u-canMonetize');

let inputInfo = [];
const contactsArray = [];
const gMonth = ((new Date()).getMonth()+1).toString().padStart(2, '0');
const gDay = (new Date()).getDate().toString().padStart(2, '0');
const gYear = (new Date()).getFullYear();
const dates = ` ${gMonth} ${gDay}, ${gYear}`

class User {
    #id;
    #name;
    #username;
    #email;
    #date;
    #text;
    #img;
    constructor(id,name,username,email,date,text,img) {
        this.#id = id;
        this.#name = name;
        this.#username = username;
        this.#email = email;
        this.#date = date;
        this.#text = text;
        this.#img = img;
    }

    get getid() {
        return this.#id
    }

    get getname() {
        return this.#name
    }

    get getusername() {
        return this.#username
    }

    get getemail() {
        return this.#email
    }

    get getdate() {
        return this.#date
    }

    get gettext() {
        return this.#text
    }

    get getimg() {
        return this.#img
    }

    getInfo () {
        return `${this.getid} ${this.getname} ${this.getusername} ${this.getemail} ${this.getdate} ${this.gettext} ${this.getimg}`
    }
}

class Subscriber extends User {
    #pages;
    #groups;
    #canMonetize;
    constructor(id,name,username,email,date,text,img,pages,groups,canMonetize) {
        super(id,name,username,email,date,text,img)
        this.#pages = pages;
        this.#groups = groups;
        this.#canMonetize = canMonetize;
    }

    get getpages() {
        return this.#pages
    }

    get getgroups() {
        return this.#groups
    }
    
    get getcanMonetize() {
        return this.#canMonetize
    }

    getInfo () {
        return `${this.getid} ${this.getusername} ${this.getemail} ${this.getpages} ${this.getgroups} ${this.getcanMonetize}`
    }

}

const reader = new FileReader();
let imgSrc = '';

iconImg.addEventListener('click', () => {
    postImg.click();
 });

 postImg.onchange = function() {
    const imgFile = this.files[0];
    imgName.innerHTML = this.files[0].name;
    reader.readAsDataURL(imgFile);
}

reader.onload = function () {
    imgSrc = this.result
}

function makediv(array) {
    jsBox.innerHTML = '';
    array.forEach(element => {
        const contactDiv = document.createElement("div");
        contactDiv.className = "white-box";
        contactDiv.innerHTML = `<div class="box-head">
                                    <div class="head-name">
                                        <img src="./assets/image/my-img.jpg" alt="">${element.getusername}
                                    </div>
                                    <div class="head-date">
                                        ${element.getdate}
                                    </div>
                                </div>
                                <div class="box-content">
                                    <div class="text-content">
                                        ${element.gettext}
                                    </div>
                                    <div class="img-content">
                                        <img src="${element.getimg}" alt="">
                                    </div>
                                </div>`
        jsBox.appendChild(contactDiv);
    });
}

postBtn.addEventListener('click', () => {
    if(textareaInput.value.trim() || imgSrc) {
        const user = new User('001','Yifan Jiao','Yifan','jiao1995cn@gmail.com',dates,textareaInput.value.trim(),imgSrc);
        contactsArray.unshift(user);
    }
    imgName.innerHTML = '';
    imgSrc = '';
    makediv(contactsArray);
});

const url = 'https://randomuser.me/api/?nat=CA&results=10';

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    mode: 'cors'
}

async function getUser() {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`${response.statusText}: ${response.status}`);
        }
        const data = await response.json();

        data.results.forEach(element => {
            const usertDiv = document.createElement("div");
            usertDiv.className = "fake-user";
            usertDiv.innerHTML = `<div class="fu-img">
                                    <img src="${element.picture.large}" alt="">
                                  </div>
                                  <div class="fu-text">
                                    <div class="fu-name">
                                        ${element.name.first}
                                    </div>
                                    <div class="fu-content">
                                    ${element.location.city}
                                    </div>
                                  </div>
                                  <div class="fu-plus">
                                    +
                                  </div>`
            rbTitle.appendChild(usertDiv);
        });
    } catch(error) {
        console.log(error.message);
    }
}

getUser()
