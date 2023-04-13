import { db, addDoc, collection, getDocs, getDoc, doc, query, where, deleteDoc, updateDoc } from './firebase.js'


// Envia os dados do processo para o firebase
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


// Pesquisa por processos atraves do dado passado na entrada - retorna uma lista
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


// Pesquisa por todos os processos - retorna uma lista
async function getProcessos() {
    const snapshot = await getDocs(collection(db, "processo"));
    const processos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    let lista_processos = []
    lista_processos.unshift(processos)
    return lista_processos;
}


// Pesquisa por ID - retorna o processo
async function getProcessoID(id){
    let processo
    const docRef = doc(db, "processo", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            processo = docSnap.data();
        } else {
            console.log('Documento não encontrado.');
        }
    return processo
}


// Excluir documento - 
async function excluir(res) {
    const docRef = doc(collection(db, "processo"), res);
    await deleteDoc(docRef);  
}

// Editar Documento. Falta colocar os parametros Desejados
function atualizarDocumento(id) {
    const docRef = doc(db, "processo", id);
  
    // Obter os dados do documento
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          console.log("Dados do documento:", doc.data());
  
          // Atualizar os campos do documento
          return updateDoc(docRef, {
            interessado: "Rodrigo",
            numeroProcesso: "103892183948"
          }, {merge: true}); //merge é preciso
        } else {
          console.log("O documento não existe!");
        }
      })
      .then(() => {
        console.log("Documento atualizado com sucesso!");
      })
      .catch((error) => {
        console.log("Erro ao atualizar documento:", error);
      });
  }

export {sendData, getProcesso, getProcessos, getProcessoID,excluir, atualizarDocumento};