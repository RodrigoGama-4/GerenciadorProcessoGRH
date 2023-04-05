var form = document.getElementById('formulario')
var numero = document.getElementById('numero_processo')
var nome = document.getElementById('interessado')
var data = document.getElementById('data')
var desti = document.getElementById('destino')
var assunto = document.getElementById('assunto')
var obs = document.getElementById('obs')

form.addEventListener('submit', function(e){
    e.preventDefault();
    
    var env = {
        'numero': numero.value,
        'nome': nome.value,
        'data': data.value,
        'desit': desti.value,
        'assunto': assunto.value,
        'obs':obs.value
    }

    console.log(env)
    
    alert('Enviado')
})
