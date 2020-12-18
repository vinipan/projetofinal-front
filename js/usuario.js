function exibirusuario() {
    var usuariostr = localStorage.getItem("userlogado");
    if (usuariostr == null) {
        window.location = "login.html";
    } else {
        var usuariojson = JSON.parse(usuariostr)
        document.getElementById("dados").innerHTML =
            "<h3>Usuário: " + usuariojson.nome + "<br>" +
            "Email: " + usuariojson.email + " (" + usuariojson.id + ")</h3>"

        document.getElementById("foto").innerHTML =
            "<img alt='Você não possui imagem' width='50%' height='60%' src=images/" + usuariojson.foto + ">";

    }
}



function cadastrar() {

    var newuserjson = {
        "nome": document.getElementById("newnome").value,
        "email": document.getElementById("newemail").value,
        "senha": document.getElementById("newsenha").value,
        "foto": document.getElementById("newfoto").value
    };

    window.alert(JSON.stringify(newuserjson));

    var pacote = {
        method: "POST",
        body: JSON.stringify(newuserjson),
        headers: {
            "Content-type": "application/json"
        }
    };

    fetch("http://localhost:8080/cadastrar", pacote)
        .then(res => res.json())
        .then(res => {
            localStorage.setItem("userlogado", JSON.stringify(res));
            window.alert("Usuário " + JSON.stringify(newuserjson.email) + " cadastrado com sucesso!!!");
            window.location = "novousuario.html";
        })
        .catch(err => {
            window.alert("Deu ruim.\nChora.");
        });


}



function logar() {

    if (document.getElementById("txtlogin").value.includes("@")) {
        var userjson = {
            "email": document.getElementById("txtlogin").value,
            "senha": document.getElementById("txtsenha").value
        };

        var pacote = {
            method: "POST",
            body: JSON.stringify(userjson),
            headers: {
                "Content-type": "application/json"
            }
        };
    
        fetch("http://localhost:8080/loginemail", pacote)
            .then(res => res.json())
            .then(res => {
                localStorage.setItem("userlogado", JSON.stringify(res));
                window.location = "agentes.html";
            })
            .catch(err => {
                window.alert("Login inválido.\nChora.");
            });

    } else {
        var userjson = {
            "racf": document.getElementById("txtlogin").value,
            "senha": document.getElementById("txtsenha").value
        };

        var pacote = {
            method: "POST",
            body: JSON.stringify(userjson),
            headers: {
                "Content-type": "application/json"
            }
        };
    
        fetch("http://localhost:8080/loginracf", pacote)
            .then(res => res.json())
            .then(res => {
                localStorage.setItem("userlogado", JSON.stringify(res));
                window.location = "agentes.html";
            })
            .catch(err => {
                window.alert("Login inválido. Verifique seu email/usuário e senha");
                window.location = "index.html";
            });  


    };


}