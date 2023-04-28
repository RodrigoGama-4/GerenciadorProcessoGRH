import { getProcesso, getProcessos, excluir, getProcessoDestino, getProcessoInteressado, getProcessoNumeroProcesso } from "./firebase/funcFirebase.js"

var status = localStorage.getItem('status')

function ver(){
    if (status == "true") {
        console.log("Logado")
        main()
    } else {
        window.location = "../index.html"
    }
}

var lista_processos = []
var form = document.getElementById('formulario')
var t_busca = document.getElementById('busca')
var res = document.getElementById('resultado')
var texto_fim = document.getElementById('fim')
res.style.border = 'none'

ver()

// Fica sempre esperando que o evento de enviar (submit) occora para chamar as funções
form.addEventListener('submit', function(e) { 
    // impede o envio do form
    e.preventDefault();

    // Mostra no console o termo buscado
    console.log('Busca: ', t_busca.value)

    // Adiciona o termo buscado ao sessionStorage
    addDadosSessao('busca', t_busca.value)

    // Chama a função principal
    main();
})


// Função principal - irá verificar se a busca é para todos os processos ou para algum termo especifico
async function main() {

    if (getDadosSessao('busca')){
        t_busca.value = getDadosSessao('busca')

        if (t_busca.value == '*'){
            // lista recebe os dados da função de pesquisa
            lista_processos = await getProcessos()
            // Adiciona borda ao elemento resultado, exibi a quantidade de processos encontrados e exibe o copyright depois de chamar a função para construir os dados
            res.style.border = '2px solid black'
            texto_fim.style.visibility = 'visible'
            res.innerHTML = `<div class="resultado_quant"><p>Foram encontrados: ${lista_processos[0].length} processos.</p></div>`
            construirAll();
            texto_fim.style.visibility = 'visible'
            if (lista_processos[0].length >= 3){
                window.scroll(0, 350)
            }
        } else {
            // lista recebe os dados da função de pesquisa 
            lista_processos = await getProcesso(t_busca.value)
            // Adiciona borda ao elemento resultado, exibi a quantidade de processos encontrados e exibe o copyright depois de chamar a função para construir os dados
            res.style.border = '2px solid black'
            res.innerHTML = `<div class="resultado_quant"><p>Foram encontrados: ${lista_processos.length/2} processos.</p></div>`
            construir();
            texto_fim.style.visibility = 'visible'
            if (lista_processos.length > 4){
                window.scroll(0, 350)
            }
        }
    } else {
        console.log('Nenhum dado Salvo')
        res.innerHTML = ""
        res.style.border = 'none'
        texto_fim.style.visibility = 'hidden'
    }
}


// Função que irá construir na tela os dados obtidos com a pesquisa com parametros
function construir() {
    console.log('Constuindo processos pesquisados, tamanho: ', lista_processos.length/2)
    console.log(lista_processos)
    for (var i = 1; i < lista_processos.length; i+=2) {
        //INVERTENDO A ORDEM DA DATA PARA O PADRÃO PT-BR
        const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
        let dataRefatorada = lista_processos[i].data;


        if (regex.test(lista_processos[i].data)) {
            let data = lista_processos[i].data;
            let data_split = data.split('-');
            dataRefatorada = `${data_split[2]}-${data_split[1]}-${data_split[0]}`;
            //console.log('A string está no formato esperado');
        }  
        
        res.innerHTML += `<div>
            <button class="resultado_indi">
                <div class="resultado_indi_informacoes" id=${lista_processos[i-1]}>
                    <p class="resultado_nome">Interessado: ${lista_processos[i].interessado}</p>
                    <p class="resultado_numero">Nº Processo: ${lista_processos[i].numeroProcesso}</p>
                    <p class="resultado_data">Data de Entrada: ${dataRefatorada}</p>
                </div>
                <div class="resultado_indi_icone" id="${lista_processos[i-1]}excluir">
                    <img src="../assets/img/excluir.png" alt="Icone Seta">
                </div>
            </button>
        </div>`
    } 
    // Chamando as funções identificadoras
    identificandoDivs()
    identificandoIcones()
}


// Função que irá construir na tela os dados obtidos com a pesquisa de todos os elementos
function construirAll() {
    console.log('Constuindo todos os processos, tamanho: ', lista_processos[0].length)
    console.log(lista_processos)
    for (var i = 0; i < lista_processos.length; i++) {
        for (var j = 0; j < lista_processos[i].length; j++){
            //INVERTENDO A ORDEM DA DATA PARA O PADRÃO PT-BR
            const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
            let dataRefatorada = lista_processos[i][j].data;


            if (regex.test(lista_processos[i][j].data)) {
                let data = lista_processos[i][j].data;
                let data_split = data.split('-');
                dataRefatorada = `${data_split[2]}-${data_split[1]}-${data_split[0]}`;
                //console.log('A string está no formato esperado');
            }  
            
            
            res.innerHTML += `<div>
                <button class="resultado_indi">
                    <div class="resultado_indi_informacoes" id=${lista_processos[i][j].id}>
                        <p class="resultado_nome">Interessado: ${lista_processos[i][j].interessado}</p>
                        <p class="resultado_numero">Nº Processo: ${lista_processos[i][j].numeroProcesso}</p>
                        <p class="resultado_data">Data de Entrada: ${dataRefatorada}</p>
                    </div>
                    <div class="resultado_indi_icone" id="${lista_processos[i][j].id}excluir">
                        <img src="../assets/img/excluir.png" alt="Icone Seta">
                    </div>
                </button>
            </div>`
        }
    } 
    // Chamando as funções identificadoras
    identificandoDivs()
    identificandoIcones()
}


// Função responsavel por identificar as divs. Cria um evento de clique em cada uma - a cada clique retorna o id correspondente no banco de dados
function identificandoDivs() {
    var items = document.querySelectorAll('.resultado_indi_informacoes')

    items.forEach(function(item){
        item.addEventListener('click', function(event){
            var text = item.id;
            console.log(text.length)
            dadosNovaPagina(text)
        })
    })
}


//Função responsavel por identificar os icones. Cria um evento de clique em cada um - a cada clique retorna o id correspondente no banco de dados para que se possa fazer a exclusão
function identificandoIcones() {
    var items = document.querySelectorAll('.resultado_indi_icone')

    items.forEach(function(item){
        item.addEventListener('click', async function(event){
            confirmarExclusao(item)
        })
    })
}


// Redireciona para a pagina que contem as informações do processo - passa na url o id da div clicada
function dadosNovaPagina(dado) {
    window.location = "../views/info_processo.html?id="+dado;
}


// Função para confirmar a exclusão
function confirmarExclusao(item) {
    // Elemento que impede o usuario de clicar fora do popup
    let overlayBg = document.createElement('div');
    overlayBg.classList.add('overlay-bg');
    document.body.appendChild(overlayBg);

    // Cria o popup
    let overlay = document.getElementById('overlay')
    overlay.style.display = "block";
    let confirmButton = document.getElementById("excluir");
    let closeButton = document.getElementById("cancelar");

    confirmButton.addEventListener("click", async () =>{
        var text = item.id;
        var res = text.substring(0, 20)

        // Chamando função exluir
        await excluir(res)

        // Removendo background e tornando a janela invisivel
        document.body.removeChild(overlayBg)
        overlay.style.display = "none"

        // Chamando novamente a função main
        main()
    })
    

    // Fechar Janela de confirmação de exclusão
    closeButton.addEventListener("click", () => {
        overlay.style.display = "none";
        overlayBg = document.querySelector(".overlay-bg")
        if (overlayBg) {
            document.body.removeChild(overlayBg)
            console.log("Exclusão Cancelada!")
        }
    });
}


// Função para adicionar ao sessionStorage termo pesquisado
function addDadosSessao(key, value) {
    sessionStorage.setItem(key, value)
}


// Função para pegar o termo pesquisado do sessionStorage
function getDadosSessao(key) {
    if(sessionStorage.getItem(key) != "") {
        return sessionStorage.getItem(key)
    } else {
        return false
    }
}


// Função para selecionar o texto quando clicar no campo de pesquisa
function select() {
    t_busca.select()
}