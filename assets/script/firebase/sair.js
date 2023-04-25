import { auth } from "./firebase.js"

let sair = document.getElementById('sair')

sair.addEventListener('click', () =>{
    localStorage.setItem('status', 'false')
    auth.signOut()
    window.location.href = "../index.html"
})


