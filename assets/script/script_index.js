var form = document.getElementById('formulario')
var t_busca = document.getElementById('busca')
var nome = document.getElementById('resultado_nome')
var num = document.getElementById('resultado_numero')
var data = document.getElementById('resultado_data')
var lista = {
    'nome': 'Gustavo',
    'numero_pro': '14052023',
    'data': '10/04/2022'
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
            nome.innerText = 'Nome Interessado: ' + lista.nome
            num.innerText = 'Numero Processo: ' + lista.numero_pro
            data.innerText = 'Data: ' + lista.data
    }
})
