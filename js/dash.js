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
        qtdSucesso = res;
        document.getElementById("Sucesso").innerHTML = res;
        
    });

    fetch("https://supergrupo-backend.herokuapp.com/status/falha/" + parceirostr)
    .then(res => res.json())
    .then(res => {
        qtdFalha = res;
        document.getElementById("Falhas").innerHTML = res;
        
    });


    fetch("https://supergrupo-backend.herokuapp.com/status/fraude/" + parceirostr)
    .then(res => res.json())
    .then(res => {
        qtdFraude = res;
        document.getElementById("Fraudes").innerHTML = res;
        
    });  

}

function exibiragentes(){

}