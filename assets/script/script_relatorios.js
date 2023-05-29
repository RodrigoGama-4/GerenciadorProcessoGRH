import { getProcessos } from './firebase/funcFirebase.js'

// Toda vez que o DOM carregar a função de verificação ira ser chamada
document.addEventListener("DOMContentLoaded", function(){
    ver()
})

// pegando o status de login do localstorage
var status = localStorage.getItem('status')

var res = document.getElementById('resultado')
var form = document.getElementById('form_data')
var lista_processos = []


// Função que faz a verificação de login
function ver(){
    if (status == "true") {
        console.log("Logado")
    } else {
        window.location = "../index.html"
    }
}


// Fica sempre esperando que o evento de enviar (submit) occora para chamar a função principal
form.addEventListener('submit', function(e) { 
    
    // impede o envio do form
    e.preventDefault();

    // Chama a função principal
    main();
})


// Função principal
async function main() {

    // Chama a função que pega todos os processos
    await dadosBanco()
    console.log(lista_processos[0])

    // Chama a função que verificar se está dentro do periodo
    verPeriodo()
}


// Função que pega todos os processos do banco
async function dadosBanco() {
    lista_processos = await getProcessos()
}


// Função que percorre a lista de processos verificando se o processo esta dentro do periodo
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

    // Chamando a função para construir processo passando as datas selecionadas e a lista dos processos do periodo
    construir(periodoInicial.value, periodoFinal.value, lista_relatorio)
}


// Função que vai construir os processos na tela
function construir(inicio, final, proc) {

    // Convertendo datas padrão br
    let datafinal_split = final.split('-');
    let datainicio_split = inicio.split('-');
    inicio = `${datainicio_split[2]}/${datainicio_split[1]}/${datainicio_split[0]}`;
    final = `${datafinal_split[2]}/${datafinal_split[1]}/${datafinal_split[0]}`;

    // Quantidade de processos encontrados no periodo
    var n_proc = proc.length
    res.style.border = '2px solid black'
    res.innerHTML = `<div class='resultado_quant'>
                        <p>No Periodo de <span style='font-weight: 800;'>${inicio} a ${final}</span> foram encontrados <span style='font-weight: 800;'>${n_proc} processo(s)</span></p>
                    </div>`

    // Constuindo processos quando a quantidade de processos é igual a 1
    if (n_proc == 1) {
         //Convertendo datas padrão br
         let data_split = proc[0].data.split('-');
         let dataRefatorada = `${data_split[2]}/${data_split[1]}/${data_split[0]}`;

        res.innerHTML += `
                            <div class='resultado_indi'>
                                <div class="resultado_indi_informacoes">
                                    <p>Data: ${dataRefatorada}</p>
                                    <p>Número do Processo: ${proc[0].numeroProcesso}</p>
                                    <p>Nome do Interessado: ${proc[0].interessado}</p>
                                    <p>Destino: ${proc[0].destino}</p>
                                    <p>Assunto: ${proc[0].assunto}</p>
                                    <p>Observacoes: ${proc[0].obs}</p>
                                </div>
                            </div>
                            `
    // Construindo processos quando a quantidade de processos é maior que 1
    } else if (n_proc > 1) {
        for (var i = 0; i < n_proc; i++) {
              //Convertendo datas padrão br
                let data_split = proc[i].data.split('-');
                let dataRefatorada = `${data_split[2]}/${data_split[1]}/${data_split[0]}`;
            res.innerHTML += `
                            <div class='resultado_indi'>
                                <div class="resultado_indi_informacoes">
                                    <p>Data: ${dataRefatorada}</p>
                                    <p>Número do Processo: ${proc[i].numeroProcesso}</p>
                                    <p>Nome do Interessado: ${proc[i].interessado}</p>
                                    <p>Destino: ${proc[i].destino}</p>
                                    <p>Assunto: ${proc[i].assunto}</p>
                                    <p>Observacoes: ${proc[i].obs}</p>
                                </div>
                            </div>
                            `
        }
    }

    // Tornando o botão que gera pdf visivel
    botao.classList.remove('notVisivel')
    botao.classList.add('visivel')
}


// pegando o botao que pede a geracao do relatorio pdf
var botao = document.getElementById('botao')


// adicionando evento de click a esse botao
botao.addEventListener('click', function(e){
    gerarPDF()
})


// funcao para gerar pdf
function gerarPDF() {

    // GERANDO PDF DA MANEIRA CORRETA COM TAMANHO PARA CADA DISPOSITIVO
    // https://pt.stackoverflow.com/questions/386213/jspdf-e-canvas-responsivo
    const deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    const html_source = document.getElementById('resultado');
    const filename = 'relatorioGRH.pdf';

    html2canvas(html_source).then(function(canvas) {

        let imgData = canvas.toDataURL('image/png');
        let imgWidth = 210;
        let pageHeight = 297;

        let imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        
        let pdf = new jsPDF('p', 'mm');
        let fix_imgWidth = 0; // Padrao
        let fix_imgHeight = 18; // Padrao

        if (deviceWidth < 600) { //  max-width: 600px -  Dispositivos extra pequenos
            fix_imgWidth = 0;
            fix_imgHeight = 18;
        } else if (deviceWidth > 600) { // min-width: 600px - Pequenos dispositivos
            fix_imgWidth = 0;
            fix_imgHeight = 18;
        } else if (deviceWidth > 768) { // min-width: 768px - Dispositivos médios
            fix_imgWidth = 0;
            fix_imgHeight = 18;
        } else if (deviceWidth > 992) { // min-width: 992px  - Dispositivos grandes
            fix_imgWidth = 0;
            fix_imgHeight = 18;

        } else if (deviceWidth > 1200) { // min-width: 1200px - Dispositivos extra grandes
            fix_imgWidth = 0;
            fix_imgHeight = 18;
        }

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth + fix_imgWidth, imgHeight + fix_imgHeight);
            heightLeft -= pageHeight;
        }
        pdf.save(filename);
    })
}