var form = document.getElementById('formulario')
var t_busca = document.getElementById('busca')
var nome = document.getElementsByClassName('resultado_nome')
var num = document.getElementsByClassName('resultado_numero')
var data = document.getElementsByClassName('resultado_data')
var lista = {
    'nome': 'Gustavo',
    'numero_pro': '19442023',
    'data': '10/02/2023'
}

form.addEventListener('submit', function(e) { 
    // alerta o valor do t_busca
    // alert(t_busca.value);

    // impede o envio do form
    e.preventDefault();

    console.log(t_busca.value)  

    // altera texto caso não seja vazio
    if (t_busca.value != '') {
        if (t_busca.value == lista.nome || t_busca.value == lista.numero_pro || t_busca.value == lista.data)
            nome[0].innerText = 'Nome Interessado: ' + lista.nome
            num[0].innerText = 'Numero Processo: ' + lista.numero_pro
            data[0].innerText = 'Data: ' + lista.data
    }

})
