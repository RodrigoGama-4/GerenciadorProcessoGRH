import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
  } from './firebase.js';

const loginBtn = document.getElementById('botao_logar')
const emailLogin = document.getElementById('username')
const senhaLogin = document.getElementById('password')





loginBtn.addEventListener('click', (e)=>{
  e.preventDefault()
  const emailLoginValor = emailLogin.value;
  const senhaLoginValor = senhaLogin.value;
  signInWithEmailAndPassword(auth, emailLoginValor, senhaLoginValor)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      window.location.href = "../index.html";
    } )
    .catch((error) => {
      alert('error: ' + error  );
    })

});
