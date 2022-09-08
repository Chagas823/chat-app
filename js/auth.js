let email = document.getElementById("emailEntrada");
let senhaEntrada = document.getElementById("senhaEntrada");
let btnEntrar = document.getElementById("btnEntrar");


btnEntrar.onclick = function(){
    login(email, senhaEntrada);
};

function login(email, senha){
    firebase.auth().signInWithEmailAndPassword(email.value, senha.value).then(function (user){
        console.log("acessou com sucesso");
        console.log(user);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("senha", senha);
        sessionStorage.setItem("usuario", JSON.stringify(user));
        setTimeout(()=>{
            window.location.href = "../index.html";
        }, 500)
    }).catch(function (erro){
        console.error("falha ao logar");
        console.error(erro)
    })
};