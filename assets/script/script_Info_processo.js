import { getProcessoID, atualizarDocumento } from './firebase/funcFirebase.js'

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
    let data = processo.data;
    let data_split = data.split('-');
    let dataRefatorada = `${data_split[2]}-${data_split[1]}-${data_split[0]}`;

    corpo.innerHTML = `<div id="id">
                            <p>${variavel}</p>
                        </div>
                        <div id="info_pri" class="info">
                            <button class="editar_processo">EDITAR</button>
                            <p class="info_estilo">Nome do Interessado:<spam id ='textInteressado' class="bold"> ${processo.interessado}</spam></p>
                            <p class="info_estilo">Número do Processo:<spam id = 'textProcesso' class="bold"> ${processo.numeroProcesso}</spam></p>
                            <p class="info_estilo">Data de Entrada:<spam id = 'textData' class="bold"> ${dataRefatorada}</spam></p>
                            <p class="info_estilo">Destino:<spam id = 'textDestino' class="bold"> ${processo.destino}</spam></p>
                            <p class="info_estilo justificado"><spam id='textAssunto' class="semi-bold">Assunto:<br/><br/></spam>${processo.assunto}</p>
                            <p class="info_estilo justificado"><spam id = 'textOb' class="semi-bold">Observações: </spam>${processo.obs}</p>
                            <button class="editar_concluido" style="display: none;">ENVIAR EDIÇÕES</button>
                            <button class="cancelar_concluido" style="display: none;">CANCELAR</button>
                        </div>`
    editarProcesso()
}

// Adiciona um ouvinte de eventos para o botão "EDITAR"
function editarProcesso(){
    document.querySelector(".editar_processo").addEventListener("click", function() {
        // Seleciona os elementos <p> que deseja transformar em inputs
        const interessado = document.querySelector("#textInteressado");
        const numeroProcesso = document.querySelector("#textProcesso");
        const data = document.querySelector("#textData");
        const destino = document.querySelector("#textDestino");
        const assunto = document.querySelector("#textAssunto");
        const obs = document.querySelector("#textOb");
        
        // Cria novos elementos <input> com os valores dos elementos <p> selecionados
        const inputInteressado = document.createElement("input");
        inputInteressado.value = interessado.textContent;
        
        const inputNumeroProcesso = document.createElement("input");
        inputNumeroProcesso.value = numeroProcesso.textContent;
        
        const inputData = document.createElement("input");
        inputData.value = data.textContent;
        
        const inputDestino = document.createElement("input");
        inputDestino.value = destino.textContent;
        
        const inputAssunto = document.createElement("textarea");
        inputAssunto.value = assunto.textContent;
        
        const inputObs = document.createElement("textarea");
        inputObs.value = obs.textContent;

        // Substitui os elementos <p> pelos elementos <input>
        inputInteressado.id = "textInteressado"
        interessado.parentNode.replaceChild(inputInteressado, interessado);
        inputNumeroProcesso.id = "textProcesso"
        numeroProcesso.parentNode.replaceChild(inputNumeroProcesso, numeroProcesso);
        inputData.id = "textData"
        data.parentNode.replaceChild(inputData, data);
        inputDestino.id = "textDestino"
        destino.parentNode.replaceChild(inputDestino, destino);
        //assunto.parentNode.replaceChild(inputAssunto, assunto);
        //obs.parentNode.replaceChild(inputObs, obs);
        
        // Exibe o botão "ENVIAR EDIÇÕES", "CANCELAR" e oculta o botão "EDITAR"
        document.querySelector(".editar_concluido").style.display = "block";
        document.querySelector(".cancelar_concluido").style.display = "block";
        document.querySelector(".editar_processo").style.display = "none";

        //Ação do botão cancelar. Os dados vão ser reconstruidos.
        document.querySelector(".cancelar_concluido").addEventListener("click", function(){
            construir()
        })
        
        document.querySelector(".editar_concluido").addEventListener("click", function(event) {
            event.preventDefault()
            const inputInteressadoValor = document.querySelector("#textInteressado");
            const valorInputInteressado = inputInteressadoValor.value

            const inputProcessoValor = document.querySelector("#textProcesso");
            const valorProcesso = inputProcessoValor.value

            const inputDataValor = document.querySelector("#textData");
            const valorData = inputDataValor.value

            const inputDestinoValor = document.querySelector("#textDestino");
            const valorInputDestino = inputDestinoValor.value

            atualizarDocumento(variavel  ,valorInputInteressado, valorProcesso, valorInputDestino, valorData )
        });
          
    });

}