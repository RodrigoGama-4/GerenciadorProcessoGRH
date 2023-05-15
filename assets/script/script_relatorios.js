import { getProcessos } from './firebase/funcFirebase.js'

document.addEventListener("DOMContentLoaded", function(){
    ver()
})

var status = localStorage.getItem('status')
var lista_processos = []

function ver(){
    if (status == "true") {
        console.log("Logado")
        main()
    } else {
        window.location = "../index.html"
    }
}


async function main() {
    lista_processos = await getProcessos()
    console.log(lista_processos[0])

    verPeriodo()
}


function verPeriodo() {
    let periodoInicial;
    let periodoFinal;
    
    for (var i = 0; i < lista_processos[0].length; i++) {
        if (lista_processos[0][i].data >= "2022-04-27" && lista_processos[0][i].data <= "2023-05-28") {
            console.log(`${lista_processos[0][i].data} Esta dentro do periodo`)
        } else {
            console.log(`${lista_processos[0][i].data} Não está dentro do periodo`)
        }
    }
    
}