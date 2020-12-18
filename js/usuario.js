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
    
        fetch("https://supergrupo-backend.herokuapp.com/loginemail", pacote)
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
    
        fetch("https://supergrupo-backend.herokuapp.com/loginracf", pacote)
            .then(res => res.json())
            .then(res => {
                localStorage.setItem("userlogado", JSON.stringify(res));
                window.location = "agentes.html";
            })
            .catch(err => {
                window.alert("Login inválido. Verifique seu email/usuário e senha");
                window.location = "home.html";
            });  


    };


}