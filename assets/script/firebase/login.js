import { auth, onAuthStateChanged } from "./firebase.js";

import {
    signInWithEmailAndPassword,
  } from './firebase.js';

const loginBtn = document.getElementById('botao_logar')
const emailLogin = document.getElementById('username')
const senhaLogin = document.getElementById('password')


auth.onAuthStateChanged((user) =>{
  if (user){
    localStorage.setItem('status', 'true')
    window.location.href = "views/inicio.html";
  }
})



loginBtn.addEventListener('click', (e)=>{
  e.preventDefault()
  const emailLoginValor = emailLogin.value;
  const senhaLoginValor = senhaLogin.value;
  signInWithEmailAndPassword(auth, emailLoginValor, senhaLoginValor)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      window.location.href = "views/inicio.html";
    } )
    .catch((error) => {
      alert('error: ' + error  );
    })

});
