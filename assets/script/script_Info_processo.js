import { db, doc, getDoc} from './firebase/firebase.js'

var variavel;
var processo;
var corpo = document.getElementById('corpo')

main()

function main() {
    comandos()
}

async function comandos() {
    variavel = queryString();
    await pesquisa(variavel)
    construir()
}

// função pra ler querystring
function queryString() {  
    var loc = location.search.substring(1, location.search.length);   
    var param_name;
    var param_value = false;   
    var params = loc.split("&");   
    for (var i=0; i<params.length; i++) {   
        param_name = params[i].substring(0,params[i].indexOf('='));                                
        param_value = params[i].substring(params[i].indexOf('=')+1)
    }
    return param_value
}

//criar função para pesquisar pelo id no banco de dados
async function pesquisa(variavel){
    const docRef = doc(db, "processo", variavel);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            processo = docSnap.data();
        } else {
            console.log('Documento não encontrado.');
        }
}
   


//implementar a função construir com base no resultado da busca no banco
function construir() {
    console.log('Constuindo processos pesquisados, tamanho: ', processo)

    corpo.innerHTML = `<div id="id">
                            <p>${variavel}</p>
                        </div>
                        <div id="info_pri" class="info">
                            <p class="info_estilo">Nome do Interessado:<spam class="bold"> ${processo.interessado}</spam></p>
                            <p class="info_estilo">Número do Processo:<spam class="bold"> ${processo.numeroProcesso}</spam></p>
                            <p class="info_estilo">Data de Entrada:<spam class="bold"> ${processo.data}</spam></p>
                            <p class="info_estilo">Destino:<spam class="bold"> ${processo.destino}</spam></p>
                            <p class="info_estilo justificado"><spam class="semi-bold">Assunto:<br/><br/></spam>${processo.assunto}</p>
                            <p class="info_estilo justificado"><spam class="semi-bold">Observações: </spam>${processo.obs}</p>
                        </div>`
}