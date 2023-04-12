import { getProcessoID } from './firebase/funcFirebase.js'

var variavel;
var processo;
var corpo = document.getElementById('corpo')


// Ao abrir a página a função principal será chamada
main()


// Função principal que chama a função com os comandos
function main() {
    comandos()
}


// Função que chamas as funções para adquirir o id da url e para pesquisar o processo. Em seguida chama a função para construir as informações
async function comandos() {
    variavel = queryString();
    processo = await getProcessoID(variavel)
    construir()
}


// Função pra ler a url e selecionar o id
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


// Função para construir com base no resultado da busca no banco
function construir() {
    console.log('Constuindo processo pesquisado: ', processo)

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