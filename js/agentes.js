function logout() {
    localStorage.removeItem("userlogado");
    window.location = "index.html";
}

function carregardash() {
    localStorage.setItem("parceiro", document.getElementById("cmbagentes").value);
    window.location = "dash.html";
}


function carregarpagina() {
    var usuariostr = localStorage.getItem("userlogado");
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
    exibiragentes();
    top10();
}



function exibiragentes() {
    fetch("http://localhost:8080/agentes")
        .then(res => res.json())
        .then(res => preenchercombo(res));
}

function preenchercombo(lista) {
    var saida = "<option hidden>Selecione o Parceiro</option>";
    for (contador = 0; contador < lista.length; contador++) {
        saida +=
            "<option value='" + lista[contador].idAgente + "'>" + lista[contador].nomeAgente + "</option>";
    }
    document.getElementById("cmbagentes").innerHTML = saida;
}



function top10() {
    fetch("http://localhost:8080/topagentes")
        .then(res => res.json())
        .then(res => preenchertabela(res));

}

function preenchertabela(lista) {
    var saida =
        "<table class='table'> " +
        "<thead class='thead-light'>" +
        "<tr>" +
        "<th class='align-middle' scope='col'>Parceiro</th>" +
        "<th class='align-middle textcenter' scope='col'>Volume Transacional</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>";

    for (contador = 0; contador < lista.length; contador++) {
        saida +=
            "<tr>" +
            "<td>" + lista[contador].nomeAgente + " </td>" +
            "<td class='textcenter'>" + lista[contador].volumeTransacional + "</td>" +
            "</tr>";
    }

    saida += "</tbody></table>";
    document.getElementById("topagentes").innerHTML = saida;

}