import { sendData } from "./firebase/sendFirebase.js"

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
    } else {
        // Confirmação de erro
        alert("ERRO! Não é possivel adicionar. Verifique se adicionou todos os dados e tente novamente!")
    }
})

// Verifica se existe campos vazios
function verificacao(n, i, d, de, a) {
    if (n == "" || i == "" || d == "" || de == "" || a == "") {
        return false
    } else {
        return true
    }
}

// Função chama a função enviar do firebase
async function enviar() {
    await sendData(numero.value, interessado.value, data.value, desti.value, assunto.value, obs.value)
}
