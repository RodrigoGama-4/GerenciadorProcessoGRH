import { auth } from "./firebase.js"

let sair = document.getElementById('sair')

sair.addEventListener('click', () =>{
    auth.signOut()
    window.location.href = "../index.html"
})


