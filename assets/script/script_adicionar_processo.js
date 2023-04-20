import { sendData } from "./firebase/funcFirebase.js"

var status = localStorage.getItem('status')


// Função para verificar se o status no localStorage é true - controle de login
function ver(){
    if (status == "true") {
        console.log("Logado")
    } else {
        window.location = "../index.html"
    }
}


ver()


// Pega todos os inputs
var form = document.getElementById('formulario')
var numero = document.getElementById('numero_processo')
var interessado = document.getElementById('interessado')
var data = document.getElementById('data')
var desti = document.getElementById('destino')
var assunto = document.getElementById('assunto')
var obs = document.getElementById('obs')


// Fica esperando que occora um evento de envio (submit) para que possa realizar as funções
form.addEventListener('submit', function(e){
    // Previne que a página não seja recarregada
    e.preventDefault();

    // Adcionar somente os valores a cada variavel
    let n = numero.value
    let i =interessado.value
    let d = data.value
    let de = desti.value
    let a = assunto.value
    let o = obs.value

    // Chama a função de verificação
    if (verificacao(n, i, d, de, a, o)) {
        // Chama a função enviar
        enviar()

        // Confirmação de envio
        alert('Enviado')
        limparCampos()
    } else {
        // Confirmação de erro
        alert("ERRO! Não é possivel adicionar. Verifique se adicionou todos os dados corretamente e tente novamente!")
    }
})


// Verifica as entradas do usuário
function verificacao(numProc, inte, dat, desti, assun) {
    //Verica o numero do processo
    const regexNumeroProcesso = /^23065\.\d{6}\/\d{4}-\d{2}$/;
    //Verifica inputs vazios e tags html
    const regexGeral = /^(?!\s*$)(?!.*(<|>))(?!.*\b(on\w+))/;
    

    if (regexGeral.test(numProc) && regexNumeroProcesso.test(numProc) && regexGeral.test(inte) && regexGeral.test(dat) && regexGeral.test(desti) && regexGeral.test(assun))  {
        return true
    } else {
        return false
    }
}


// Função chama a função enviar do firebase
async function enviar() {
    //Verifica o OBS tags html/js
    const regexTag = /^[^<>]+$/; 
    if (regexTag.test(obs.value)){
        await sendData(numero.value, interessado.value, data.value, desti.value, assunto.value, obs.value)
    }   
}

// Função para limpar os campos quando o processo for enviado com sucesso
function limparCampos() {
    form.value = ""
    numero.value = ""
    interessado.value = ""
    data.value = ""
    desti.value = ""
    assunto.value = ""
    obs.value = ""
}
