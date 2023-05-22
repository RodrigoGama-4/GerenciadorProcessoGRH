import { getProcessos } from './firebase/funcFirebase.js'

document.addEventListener("DOMContentLoaded", function(){
    ver()
})

var status = localStorage.getItem('status')
var res = document.getElementById('resultado')
var form = document.getElementById('form_data')
var lista_processos = []


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
    construir(periodoInicial.value, periodoFinal.value, lista_relatorio)
}


function construir(inicio, final, proc) {

    var n_proc = proc.length
    res.style.border = '2px solid black'
    res.innerHTML = `<div class='resultado_quant'>
                        <p>No Periodo de ${inicio} a ${final} foram encontrados ${n_proc} processo(s)</p>
                    </div>`

    if (n_proc == 1) {
        res.innerHTML += `
                            <div class='resultado_indi'>
                                <div class="resultado_indi_informacoes">
                                    <p>Número do Processo: ${proc[0].numeroProcesso}</p>
                                    <p>Nome do Interessado: ${proc[0].interessado}</p>
                                    <p>Destino: ${proc[0].destino}</p>
                                </div>
                            </div>
                            `
    } else if (n_proc > 1) {
        for (var i = 0; i < n_proc; i++) {
            res.innerHTML += `
                            <div class='resultado_indi'>
                                <div class="resultado_indi_informacoes">
                                    <p>Número do Processo: ${proc[i].numeroProcesso}</p>
                                    <p>Nome do Interessado: ${proc[i].interessado}</p>
                                    <p>Destino: ${proc[i].destino}</p>
                                </div>
                            </div>
                            `
        }
    }
}

var botao = document.getElementById('botao')

botao.addEventListener('click', function(e){
    gerarPDF()
})


function gerarPDF() {
    var ht = window.document.body
    console.log(ht)
    var doc = new jsPDF() 

    doc.html(ht, {
        callback: function (doc) {
            doc.save()
        }
    })
}