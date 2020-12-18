function logout() {
localStorage.removeItem("userlogado");
window.location = "home.html";
}


function carregarpagina() {
    var usuariostr = localStorage.getItem("userlogado");
    var parceirostr = localStorage.getItem("parceiro");
    if (usuariostr == null) {
        window.alert("Realize o login antes.");
        window.location = "home.html";
    } else {
        var usuariojson = JSON.parse(usuariostr)
        document.getElementById("dados").innerHTML =
            "<h6>" + usuariojson.nome + " (" + usuariojson.racf + ")</h6>"

        document.getElementById("foto").innerHTML =
            "<img alt='" + usuariojson.nome + "' class='rounded-circle imguser' src=img/" + usuariojson.foto + ">";

    }

    fetch("https://supergrupo-backend.herokuapp.com/agentes/" + parceirostr)
    .then(res => res.json())
    .then(res => {        
        document.getElementById("Parceiro").innerHTML = res.nomeAgente + " / " + res.volumeTransacional;
        
    });

    fetch("https://supergrupo-backend.herokuapp.com/status/sucesso/" + parceirostr)
    .then(res => res.json())
    .then(res => {
        document.getElementById("Sucesso").innerHTML = res;
        localStorage.setItem("qtdSucesso", res);
        var qtdFraudes =  parseInt(localStorage.getItem("qtdFraudes"));
        var qtdFalhas =  parseInt(localStorage.getItem("qtdFalhas"));
        var qtdSucesso =  parseInt(localStorage.getItem("qtdSucesso"));
        
        preencherProgresso(qtdFraudes,qtdFalhas,qtdSucesso);
    });

    fetch("https://supergrupo-backend.herokuapp.com/status/falha/" + parceirostr)
    .then(res => res.json())
    .then(res => {
        document.getElementById("Falhas").innerHTML = res;
        localStorage.setItem("qtdFalhas", res);
        var qtdFraudes =  parseInt(localStorage.getItem("qtdFraudes"));
        var qtdFalhas =  parseInt(localStorage.getItem("qtdFalhas"));
        var qtdSucesso =  parseInt(localStorage.getItem("qtdSucesso"));
        
        preencherProgresso(qtdFraudes,qtdFalhas,qtdSucesso);
    });


    fetch("https://supergrupo-backend.herokuapp.com/status/fraude/" + parceirostr)
    .then(res => res.json())
    .then(res => {
        
        document.getElementById("Fraudes").innerHTML = res;
        localStorage.setItem("qtdFraudes", res);

        var qtdFraudes =  parseInt(localStorage.getItem("qtdFraudes"));
        var qtdFalhas =  parseInt(localStorage.getItem("qtdFalhas"));
        var qtdSucesso =  parseInt(localStorage.getItem("qtdSucesso"));
        
        preencherProgresso(qtdFraudes,qtdFalhas,qtdSucesso);

    }); 


}

function exibiragentes(){

}

function preencherProgresso(qtdFraudes,qtdFalhas,qtdSucesso){
    var qtdTotal = qtdFraudes + qtdFalhas + qtdSucesso;
    
    document.getElementById("progSucesso").innerHTML="<div class='progress-bar progress-bar-striped bg-success' role='progressbar' style='width: "+ (qtdSucesso/qtdTotal*100)  +"%' aria-valuenow='"+ (qtdSucesso/qtdTotal*100)  +"' aria-valuemin='0' aria-valuemax='100'></div>";
    document.getElementById("progFalhas").innerHTML="<div class='progress-bar progress-bar-striped bg-warning' role='progressbar' style='width: "+ (qtdFalhas/qtdTotal*100)  +"%' aria-valuenow='"+ (qtdFalhas/qtdTotal*100)  +"' aria-valuemin='0' aria-valuemax='100'></div>";
    document.getElementById("progFraudes").innerHTML="<div class='progress-bar progress-bar-striped bg-danger' role='progressbar' style='width: "+ (qtdFraudes/qtdTotal*100)  +"%' aria-valuenow='"+ (qtdFraudes/qtdTotal*100)  +"' aria-valuemin='0' aria-valuemax='100'></div>";




}