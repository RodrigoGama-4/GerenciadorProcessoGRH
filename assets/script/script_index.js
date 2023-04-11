import { getProcesso, getProcessos, excluir } from "./firebase/funcFirebase.js"

var lista_processos = []
var form = document.getElementById('formulario')
var t_busca = document.getElementById('busca')
var res = document.getElementById('resultado')
var texto_fim = document.getElementById('fim')
res.style.border = 'none'


// Fica sempre esperando que o evento de enviar (submit) occora para chamar as funções
form.addEventListener('submit', function(e) { 
    // impede o envio do form
    e.preventDefault();

    // Mostra no console o termo buscado
    console.log('Busca: ', t_busca.value)

    // Chama a função principal
    main();
})


// Função principal - irá verificar se a busca é para todos os processos ou para algum termo especifico
async function main() {

    if (t_busca.value.length == 0){
        // lista recebe os dados da função de pesquisa
        lista_processos = await getProcessos()
        // Adiciona borda ao elemento resultado, exibi a quantidade de processos encontrados e exibe o copyright depois de chamar a função para construir os dados
        res.style.border = '2px solid black'
        texto_fim.style.visibility = 'visible'
        res.innerHTML = `<div class="resultado_quant"><p>Foram encontrados: ${lista_processos[0].length} processos.</p></div>`
        construirAll();
        texto_fim.style.visibility = 'visible'
    } else {
        // lista recebe os dados da função de pesquisa 
        lista_processos = await getProcesso(t_busca.value)
        // Adiciona borda ao elemento resultado, exibi a quantidade de processos encontrados e exibe o copyright depois de chamar a função para construir os dados
        res.style.border = '2px solid black'
        res.innerHTML = `<div class="resultado_quant"><p>Foram encontrados: ${lista_processos.length/2} processos.</p></div>`
        construir();
        texto_fim.style.visibility = 'visible'
    }
    
}


// Função que irá construir na tela os dados obtidos com a pesquisa com parametros
function construir() {
    console.log('Constuindo processos pesquisados, tamanho: ', lista_processos.length/2)
    console.log(lista_processos)
    for (var i = 1; i < lista_processos.length; i+=2) {
        
        res.innerHTML += `<div>
            <button class="resultado_indi">
                <div class="resultado_indi_informacoes" id=${lista_processos[i-1]}>
                    <p class="resultado_nome">Interessado: ${lista_processos[i].interessado}</p>
                    <p class="resultado_numero">Nº Processo: ${lista_processos[i].numeroProcesso}</p>
                    <p class="resultado_data">Data de Entrada: ${lista_processos[i].data}</p>
                </div>
                <div class="resultado_indi_icone" id="${lista_processos[i-1]}excluir">
                    <img src="./assets/img/excluir.png" alt="Icone Seta">
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
            res.innerHTML += `<div>
                <button class="resultado_indi">
                    <div class="resultado_indi_informacoes" id=${lista_processos[i][j].id}>
                        <p class="resultado_nome">Interessado: ${lista_processos[i][j].interessado}</p>
                        <p class="resultado_numero">Nº Processo: ${lista_processos[i][j].numeroProcesso}</p>
                        <p class="resultado_data">Data de Entrada: ${lista_processos[i][j].data}</p>
                    </div>
                    <div class="resultado_indi_icone" id="${lista_processos[i][j].id}excluir">
                        <img src="./assets/img/excluir.png" alt="Icone Seta">
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
function dadosNovaPagina(dado){
    window.location = "/views/info_processo.html?id="+dado;
}


//CONFIRMAÇÃO DE EXCLUSÃO
function confirmarExclusao(item){
    //ELEMENTO PARA IMPEDIR O USUARIO DE CLICAR FORA
    const overlayBg = document.createElement('div');
    overlayBg.classList.add('overlay-bg');
    document.body.appendChild(overlayBg);

    //DIV PARA CONFIRMAR ELEMENTO EM SI
    const overlay = document.getElementById('overlay')
    overlay.style.display = "block";
    const confirmButton = document.getElementById("excluir");
    const closeButton = document.getElementById("cancelar");

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
    

    // ESTA DANDO ERRO QUANDO FECHA A JANELA PELA SEGUNDA VEZ SEGUIDA
    closeButton.addEventListener("click", () => {
        overlay.style.display = "none";
        if (document.body.removeChild(overlayBg)){
            console.log("removido")
        }
    });
  }