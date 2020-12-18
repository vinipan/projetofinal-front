function logout() {
localStorage.removeItem("userlogado");
window.location = "index.html";
}


function carregarpagina() {
    var usuariostr = localStorage.getItem("userlogado");
    var parceirostr = localStorage.getItem("parceiro");
    if (usuariostr == null) {
        window.alert("Realize o login antes.");
        window.location = "index.html";
    } else {
        var usuariojson = JSON.parse(usuariostr)
        document.getElementById("dados").innerHTML =
            "<h6>" + usuariojson.nome + " (" + usuariojson.racf + ")</h6>"

        document.getElementById("foto").innerHTML =
            "<img alt='" + usuariojson.nome + "' class='rounded-circle imguser' src=img/" + usuariojson.foto + ">";

    }
    
    fetch("http://localhost:8080/agentes/" + parceirostr)
    .then(res => res.json())
    .then(res => {        
        document.getElementById("Parceiro").innerHTML = res.nomeAgente + " / " + res.volumeTransacional;
        
    });

    fetch("http://localhost:8080/status/sucesso/" + parceirostr)
    .then(res => res.json())
    .then(res => {
        qtdSucesso = res;
        document.getElementById("Sucesso").innerHTML = res;
        
    });

    fetch("http://localhost:8080/status/falha/" + parceirostr)
    .then(res => res.json())
    .then(res => {
        qtdFalha = res;
        document.getElementById("Falhas").innerHTML = res;
        
    });


    fetch("http://localhost:8080/status/fraude/" + parceirostr)
    .then(res => res.json())
    .then(res => {
        qtdFraude = res;
        document.getElementById("Fraudes").innerHTML = res;
        
    });  

}

function exibiragentes(){

}