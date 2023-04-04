import { db, addDoc, collection, getDocs, doc, query, where } from '../firebase/firebase.js'

const bt_enviar = document.getElementById('enviar')
var lista_processos = []
//EVITA O ERRO DO DOM NÃO SER CARREGADO PRIMEIRO 
const form = document.getElementById('formulario');

if (form !== null){
    bt_enviar.addEventListener('click', () => {
        let num_processo = document.getElementById('numero_processo').value;
        let interessado = document.getElementById('interessado').value;
        let remetente = document.getElementById('remetente').value;
        let destinatario = document.getElementById('destinatario').value;
        let assunto =  document.getElementById('assunto').value;
        sendData(num_processo, interessado, remetente, destinatario, assunto);
    });
}

//enviar para o firebase na coleção processo
async function sendData(numero_processo, interessado, remetente, destinatario, assunto) {
    await addDoc(collection(db, "processo"), {
        numeroProcesso: numero_processo,
        interessado: interessado,
        remetente: remetente,
        destinatario: destinatario,
        assunto: assunto,
    });
}


//pega todos os dados do banco de dados
async function getProcessos() {
    const snapshot = await getDocs(collection(db, "processo"));
    /*
    snapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
      */
    const processos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(processos);
    
  }

async function getProcesso(numero_processo) {
    const q = query(collection(db, "processo"), where('numeroProcesso', '==', numero_processo)); 
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        lista_processos.unshift(doc.id, " => ", doc.data());
    }); 
}

