var form = document.getElementById('formulario')
var t_busca = document.getElementById('busca')

form.addEventListener('submit', function(e) { 
    // alerta o valor do t_busca
    alert(t_busca.value);

    // impede o envio do form
    e.preventDefault();
})