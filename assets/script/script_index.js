import { db, addDoc, collection, getDocs, doc, query, where } from './firebase/firebase.js'

var lista_processos = []
var form = document.getElementById('formulario')
var t_busca = document.getElementById('busca')

const resultado = ''
var res = document.getElementById('resultado')
var texto_fim = document.getElementById('fim')
res.style.border = 'none'


form.addEventListener('submit', function(e) { 

    // impede o envio do form
    e.preventDefault();

    console.log('Busca: ', t_busca.value)
    main();
})

async function main() {

    if (t_busca.value.length == 0){
        await getProcessos()
        res.style.border = '2px solid black'
        texto_fim.style.visibility = 'visible'
        res.innerHTML = `<div class="resultado_quant"><p>Foram encontrados: ${lista_processos[0].length} processos.</p></div>`
        construirAll();
    } else {
        await getProcesso(t_busca.value)
        res.style.border = '2px solid black'
        texto_fim.style.visibility = 'visible'
        res.innerHTML = `<div class="resultado_quant"><p>Foram encontrados: ${lista_processos.length/2} processos.</p></div>`
        construir();
    }
    
}

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
                <div class="resultado_indi_icone">
                    <img src="./assets/img/seta-para-a-direita.png" alt="Icone Seta">
                </div>
            </button>
        </div>`
    } 

    identificandoDivs()
}

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
                    <div class="resultado_indi_icone">
                        <img src="./assets/img/seta-para-a-direita.png" alt="Icone Seta">
                    </div>
                </button>
            </div>`
        }
    } 

    identificandoDivs()
}


function identificandoDivs() {
    var items = document.querySelectorAll('.resultado_indi_informacoes')

    items.forEach(function(item){
        item.addEventListener('click', function(event){
            var text = item.id;

            console.log('Item clicado', text)
        })
    })
}


//TEMPORARIAMENTE FICA AQUI

async function getProcesso(data) {
    lista_processos = []
    const c = query(collection(db, "processo"), where('data', '==', data)); 
    const cSnapshot = await getDocs(c);
    cSnapshot.forEach((doc) => {
        lista_processos.unshift(doc.id, doc.data());
    }); 
  
    //PESQUISA POR SUBSTRING
    const snapshot = await getDocs(collection(db, "processo"));
    const processos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    processos.forEach((processo) => {
      const interessadoMinusculo = processo.interessado.toLowerCase();
      const numProcMinusculo = processo.numeroProcesso.toLowerCase();
      const destinoMinusculo = processo.destino.toLowerCase();
      const subStringMinusculo = data.toLowerCase();
      if (interessadoMinusculo.includes(subStringMinusculo) || numProcMinusculo.includes(subStringMinusculo) || destinoMinusculo.includes(subStringMinusculo)) {
        lista_processos.unshift(processo);
        lista_processos.unshift(processo.id);
      }
    });
}

async function getProcessos() {
    const snapshot = await getDocs(collection(db, "processo"));
    const processos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    lista_processos = []
    lista_processos.unshift(processos)
    
  }


