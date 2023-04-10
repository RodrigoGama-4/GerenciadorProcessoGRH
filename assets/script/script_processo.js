import { db, addDoc, collection, getDocs, doc, query, where } from './firebase/firebase'

lista_processos = []

async function main() {
    var variavel = queryString();
    await getProcesso()
    //construir()
    console.log(lista_processos)
}

// função pra ler querystring
function queryString() {  
    var loc = location.search.substring(1, location.search.length);   
    var param_value = false;   
    var params = loc.split("&");   
    for (i=0; i<params.length;i++) {   
        param_name = params[i].substring(0,params[i].indexOf('='));                                
        param_value = params[i].substring(params[i].indexOf('=')+1)
    }   
    alert(param_value)
    return param_value
}

//criar função para pesquisar pelo id no banco de dados
async function getProcesso(data) {
    lista_processos = []
    const c = query(collection(db, "processo"), where('id', '==', data)); 
    const cSnapshot = await getDocs(c);
    cSnapshot.forEach((doc) => {
        lista_processos.unshift(doc.id, doc.data());
    }); 
    console.log(lista_processos)
}


//implementar a função construir com base no resultado da busca no banco
function construir() {
    console.log('Constuindo processos pesquisados, tamanho: ', lista_processos.length/2)
    console.log(lista_processos)
    for (var i = 1; i < lista_processos.length; i+=2) {
        
        res.innerHTML += `<div>
            <div class="resultado_indi">
                <div class="resultado_indi_informacoes" id=${lista_processos[i-1]}>
                    <p class="resultado_nome">Interessado: ${lista_processos[i].interessado}</p>
                    <p class="resultado_numero">Nº Processo: ${lista_processos[i].numeroProcesso}</p>
                    <p class="resultado_data">Data de Entrada: ${lista_processos[i].data}</p>
                </div>
                <div class="resultado_indi_icone" id="${lista_processos[i-1]}excluir">
                    <img src="./assets/img/excluir.png" alt="Icone Seta">
                </div>
            </button>
        </div>`
    } 
}