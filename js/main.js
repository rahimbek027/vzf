import { USERS } from "../db/server.js"

// POPUP start
const btnOpen = document.querySelector(".btn__open")
const btnClose = document.querySelector(".btn__close")
const popap = document.querySelector(".popap")
const overlay = document.querySelector(".overlay")
// POPUP end


// MODEL start
const model  = document.querySelector(".model")
const modelName  = document.querySelector(".model__name")
const modelUsername  = document.querySelector(".model__username")
const modelPassword  = document.querySelector(".model__password")
const modelPasswordConfirm  = document.querySelector(".model__password-confirm")
const eyePassword = document.querySelector(".eye__password")
// MODEL end

// CARD start
const wrapper = document.querySelector(".wrapper")
// CARD end

model.addEventListener("submit", (event) =>{
    event.preventDefault()
    let name = modelName.value
    let username = modelUsername.value
    let password = modelPassword.value
    let PasswordConfirm = modelPasswordConfirm.value
    if (password !== PasswordConfirm) {
        modelPassword.style.border = "1px solid red"
        modelPasswordConfirm.style.border = "1px solid red"
        return
    }
    let existUser = USERS.findIndex(user => user.username === username)
    if(existUser >= 0) {
        return alert("username avval olingan")
    }
    modelPassword.style.border = "1px solid #989898"
    modelPasswordConfirm.style.border = "1px solid #989898"
    let newUser = {
        id: new Date().getTime(),
        name,
        username,
        password
    }
    USERS.push(newUser);
    console.log(USERS);
    model.reset()
    popupState("none")
    createCard(USERS)
})

eyePassword.addEventListener("click", ()=>{
    if(modelPassword.type === "text") {
        modelPassword.type = "password"
        eyePassword.textContent = "show"
    }else{
        modelPassword.type = "text"
        eyePassword.textContent = "hide"
    }
})

modelPassword.addEventListener("input", (e)=>{
    let val = e.target.value
    if(val){
        eyePassword.style.display = "block"
    }else {
        eyePassword.style.display = "none"
    }
})

function createCard(data) { 
    while(wrapper.firstChild) {
        wrapper.firstChild.remove()
    }
    data.forEach(user => {
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
        <div class="card__circle"></div>
        <h3>${user.name}</h3>
        <p>${user.username}</p>
        <p>${user.password}</p>
        `
        wrapper.appendChild(card)
    })
}
createCard(USERS)


console.log(USERS);

btnOpen.addEventListener("click", ()=>{
    popupState("flex")
})

btnClose.addEventListener("click", ()=>{
    popupState("none")
})

overlay.addEventListener("click", ()=>{
    popupState("none")
})

function popupState(state) {
    popap.style.display = state
}