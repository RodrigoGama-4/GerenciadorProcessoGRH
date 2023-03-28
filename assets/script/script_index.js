var form = document.getElementById('formulario')
var t_busca = document.getElementById('busca')
var nome = document.getElementById('resultado_nome')

form.addEventListener('submit', function(e) { 
    // alerta o valor do t_busca
    // alert(t_busca.value);

    // impede o envio do form
    e.preventDefault();

    console.log(t_busca.value)

    // altera texto caso não seja vazio
    if (t_busca.value != '') {
        nome.innerText = t_busca.value
    }
})
