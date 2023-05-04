var estatus = localStorage.getItem('status')

function ver(){
    if (estatus == "true") {
        console.log("Logado")
    } else {
        window.location = "../index.html"
    }
}

ver()