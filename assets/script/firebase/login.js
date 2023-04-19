import { auth, onAuthStateChanged, signInWithEmailAndPassword } from "./firebase.js";

const loginBtn = document.getElementById('botao_logar')
const emailLogin = document.getElementById('username')
const senhaLogin = document.getElementById('password')


// Verificando se o usuario está logado - caso esteja, irá adicionar ao localStorage o status com valor true
auth.onAuthStateChanged((user) =>{
  if (user){
    localStorage.setItem('status', 'true')
    window.location.href = "views/inicio.html";
  }
})


// Caso não tenha status true no localStorage, carregar as informações do input e tentar fazer o login
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
