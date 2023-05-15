import { getProcessos } from './firebase/funcFirebase.js'

document.addEventListener("DOMContentLoaded", function(){
    ver()
})

var status = localStorage.getItem('status')
var lista_processos = []

var form = document.getElementById('form_data')

function ver(){
    if (status == "true") {
        console.log("Logado")
    } else {
        window.location = "../index.html"
    }
}

// Fica sempre esperando que o evento de enviar (submit) occora para chamar as funções
form.addEventListener('submit', function(e) { 
    // impede o envio do form
    e.preventDefault();

    // Chama a função principal
    main();
})


async function main() {
    await dadosBanco()
    console.log(lista_processos[0])

    verPeriodo()
}


async function dadosBanco() {
    lista_processos = await getProcessos()
}


function verPeriodo() {
    let periodoInicial = document.getElementById('data_inicial')
    let periodoFinal = document.getElementById('data_final')
    let lista_relatorio = []

    console.log(periodoInicial.value)
    console.log(periodoFinal.value)
    
    for (var i = 0; i < lista_processos[0].length; i++) {
        if (lista_processos[0][i].data >= periodoInicial.value && lista_processos[0][i].data <= periodoFinal.value) {
            console.log(`${lista_processos[0][i].data} Esta dentro do periodo`)
            lista_relatorio.unshift(lista_processos[0][i])
        } else {
            console.log(`${lista_processos[0][i].data} Não está dentro do periodo`)
        }
    }

    console.log(lista_relatorio.length)
    
}