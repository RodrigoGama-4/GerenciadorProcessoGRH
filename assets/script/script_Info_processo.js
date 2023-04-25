import { getProcessoID, atualizarDocumento } from './firebase/funcFirebase.js'

var status = localStorage.getItem('status')


// Função para verificar se o status no localStorage é true - controle de login
function ver(){
    if (status == "true") {
        console.log("Logado")
        main()
    } else {
        window.location = "../index.html"
    }
}

var variavel;
var processo;
var corpo = document.getElementById('corpo')


ver()


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
    //INVERTENDO A ORDEM DA DATA PARA O PADRÃO PT-BR
    const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
    let dataRefatorada = processo.data


    if (regex.test(processo.data)) {
        let data = processo.data;
        let data_split = data.split('-');
        dataRefatorada = `${data_split[2]}-${data_split[1]}-${data_split[0]}`;
        //console.log('A string está no formato esperado');
      }     

    corpo.innerHTML = `<div id="id">
                            <p>${variavel}</p>
                        </div>
                        <div id="info_pri" class="info">
                            <button class="editar_processo"><img src="../assets/img/editar.png" alt="Icone de Edição"></button>
                            <p class="info_estilo">Nome do Interessado:<spam id ='textInteressado' class="bold"> ${processo.interessado}</spam></p>
                            <p class="info_estilo">Número do Processo:<spam id = 'textProcesso' class="bold"> ${processo.numeroProcesso}</spam></p>
                            <p class="info_estilo">Data de Entrada:<spam id = 'textData' class="bold"> ${dataRefatorada}</spam></p>
                            <p class="info_estilo">Destino:<spam id = 'textDestino' class="bold"> ${processo.destino}</spam></p>
                            <p class="info_estilo justificado"><spam class="semi-bold">Assunto:<br/><br/></spam><spam id='textAssunto'>${processo.assunto}</spam></p>
                            <p class="info_estilo justificado"><spam class="semi-bold">Observações:<br/><br/></spam><spam id='textObs'>${processo.obs}</spam></p>
                            <div id="botoes">
                                <button class="editar_concluido" style="display: none;">ENVIAR EDIÇÕES</button>
                                <button class="cancelar_concluido" style="display: none;">CANCELAR</button>
                            </div>
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
        const obs = document.querySelector("#textObs");

        console.log("Texto: "+assunto)
        console.log("Texto: "+obs)
        console.log(interessado)
        
        // Cria novos elementos <input> com os valores dos elementos <p> selecionados
        const inputInteressado = document.createElement("input");
        inputInteressado.classList.add('textarea_p', 'p70')
        inputInteressado.value = interessado.textContent;
        inputInteressado.maxLength = 150;
        
        const inputNumeroProcesso = document.createElement("input");
        inputNumeroProcesso.classList.add('textarea_p', 'p702')
        inputNumeroProcesso.value = numeroProcesso.textContent;
        inputNumeroProcesso.maxLength = 100;
        
        const inputData = document.createElement("input");
        inputData.classList.add('textarea_p', 'p728')
        inputData.value = data.textContent;
        inputData.maxLength = 15;
        
        const inputDestino = document.createElement("input");
        inputDestino.classList.add('textarea_p', 'p774')
        inputDestino.value = destino.textContent;
        inputDestino.maxLength = 100;
        
        const inputAssunto = document.createElement("textarea");
        inputAssunto.classList.add('textarea')
        inputAssunto.setAttribute('rows', '10')
        inputAssunto.value = assunto.textContent;
        inputAssunto.maxLength = 150;
        
        const inputObs = document.createElement("textarea");
        inputObs.classList.add('textarea')
        inputObs.setAttribute('rows', '5')
        inputObs.value = obs.textContent;
        inputObs.maxLength = 150;

        // Substitui os elementos <p> pelos elementos <input>
        inputInteressado.id = "textInteressado"
        interessado.parentNode.replaceChild(inputInteressado, interessado);
        inputNumeroProcesso.id = "textProcesso"
        numeroProcesso.parentNode.replaceChild(inputNumeroProcesso, numeroProcesso);
        inputData.id = "textData"
        data.parentNode.replaceChild(inputData, data);
        inputDestino.id = "textDestino"
        destino.parentNode.replaceChild(inputDestino, destino);
        inputAssunto.id = "textAssunto"
        assunto.parentNode.replaceChild(inputAssunto, assunto);
        inputObs.id = "textObs"
        obs.parentNode.replaceChild(inputObs, obs);
        
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

            const inputAssunto = document.querySelector("#textAssunto");
            const valorInputAssunto = inputAssunto.value

            const inputObs = document.querySelector("#textObs");
            const valorInputObs = inputObs.value

           if (verificacao(valorProcesso, valorInputInteressado,valorData  ,valorInputDestino, valorInputAssunto)){
                alert('Editado com sucesso')
                atualizarDocumento(variavel  ,valorInputInteressado, valorProcesso, valorInputDestino, valorData, valorInputAssunto, valorInputObs )
            }
            else{
                alert("ERRO! Não é possivel adicionar. Verifique se adicionou todos os dados corretamente e tente novamente!")
            }

        });
          
    });
 
}


// Verifica as entradas do usuário
function verificacao(numProc, inte, dat, desti, assun) {

    //Verica o numero do processo
    const regexNumeroProcesso = /^23065\.\d{6}\/\d{4}-\d{2}$/;
    //Verifica inputs vazios e tags html
    const regexGeral = /^(?!\s*$)(?!.*(<|>))(?!.*\b(on\w+))/;

    if (regexNumeroProcesso.test(numProc.trim()) && regexGeral.test(inte) && regexGeral.test(dat) && regexGeral.test(desti) && regexGeral.test(assun))  {
        return true
    } else {
        return false
    }
}