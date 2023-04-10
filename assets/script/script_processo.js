// função pra ler querystring
function queryString() {  
    var loc = location.search.substring(1, location.search.length);   
    var param_value = false;   
    var params = loc.split("&");   
    for (i=0; i<params.length;i++) {   
        param_name = params[i].substring(0,params[i].indexOf('='));                                
        param_value = params[i].substring(params[i].indexOf('=')+1)
    }   
    alert(param_value)
}

var variavel = queryString();