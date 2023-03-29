var form = document.getElementById('formulario')
var numero = document.getElementById('numero_processo')
var nome = document.getElementById('interessado')
var remetente = document.getElementById('remetente')
var desti = document.getElementById('destinatario')
var assunto = document.getElementById('assunto')

form.addEventListener('submit', function(e){
    e.preventDefault();

    alert('Enviado')
})
