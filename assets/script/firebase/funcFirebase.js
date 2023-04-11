import { db, addDoc, collection, getDocs, doc, query, where, deleteDoc } from './firebase.js'


//enviar para o firebase na coleção processo
async function sendData(num_processo, interessado, data, destino, assunto, obs) {
    await addDoc(collection(db, "processo"), {
        numeroProcesso: num_processo,
        interessado: interessado,
        data: data,
        destino: destino,
        assunto: assunto,
        obs: obs,
    });
}


// Pesquisa por processos atraves do dado passado na entrada
async function getProcesso(data) {
    let lista_processos = []

    // Procura pela data de maneira especifica
    const c = query(collection(db, "processo"), where('data', '==', data)); 
    const cSnapshot = await getDocs(c);

    cSnapshot.forEach((doc) => {
        lista_processos.unshift(doc.id, doc.data());
    }); 
  
    // Procura por substrings
    const snapshot = await getDocs(collection(db, "processo"));
    const processos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    processos.forEach((processo) => {
      const interessadoMinusculo = processo.interessado.toLowerCase();
      const numProcMinusculo = processo.numeroProcesso.toLowerCase();
      const destinoMinusculo = processo.destino.toLowerCase();
      const subStringMinusculo = data.toLowerCase();
      if (interessadoMinusculo.includes(subStringMinusculo) || numProcMinusculo.includes(subStringMinusculo) || destinoMinusculo.includes(subStringMinusculo)) {
        lista_processos.unshift(processo);
        lista_processos.unshift(processo.id);
      }
    });

    return lista_processos;
}


// Pesquisa por todos os processos
async function getProcessos() {
    const snapshot = await getDocs(collection(db, "processo"));
    const processos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    let lista_processos = []
    lista_processos.unshift(processos)
    return lista_processos;
}


// Excluir documento
async function excluir(res) {
    const docRef = doc(collection(db, "processo"), res);
    await deleteDoc(docRef);  
}


export {sendData, getProcesso, getProcessos, excluir};