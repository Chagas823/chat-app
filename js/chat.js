let usuario = "Chagas";
let destinatario = "Sales";
console.log(JSON.parse(sessionStorage.getItem("usuario")));

let entradaMsg = document.getElementById("entradaMsg");
let enviar = document.getElementById("btnEntrar");
enviar.onclick = (()=>{
    let data = new Date();
    criaMsg("message my_msg", entradaMsg.value, data.getMinutes() + ':' + data.getSeconds());
    salvarNoBanco(destinatario, usuario, entradaMsg, senha);
    setTimeout(()=>{
      enviar.value = "";
    }, 1000)
});
let senha ;
procurarConversas(usuario, destinatario);
function procurarConversas(usuario, destinatario) {
  console.log("função chamada");
  let senha = "";
  
  let contador = 0;
  const dbRef = firebase.database().ref("conversas");
  
  dbRef.child("individual").on('value', function(snapshot){
    
    document.getElementById("chatbox").innerHTML = "";
    snapshot.forEach(element => {
      if (
        (element.val().emissor == usuario &&
          element.val().destinatario == destinatario) ||
        (element.val().emissor == destinatario &&
          element.val().destinatario == usuario)
      ) {
        password = element.val().senha;
        
        if (element.val().emissor == usuario) {
          criaMsg("message my_msg", element.val().message, element.val().hora);
          
        } else if (element.val().emissor == destinatario) {
          criaMsg("message friend_msg", element.val().message, element.val().hora);
        } else if (element.val().destinatario == usuario) {
          criaMsg("message my_msg", element.val().message, element.val().hora);
        } else if (element.val().destinatario == destinatario) {
          criaMsg("message friend_msg", element.val().message, element.val().hora);
        }
        
    
    }})
    });
    



}


  
  function gerarSenhaAleatoria() {
    var stringAleatoria = "";
    var caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 20; i++) {
      stringAleatoria += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    console.log("gerou")
    return stringAleatoria;
  }
  console.log(senha)
  function salvarNoBanco(destinatario, usuario, entrada, senha){
    if (senha == "" || senha == undefined) {
    let promessa = new Promise((resolve, reject) => {
        const dbRef = firebase.database().ref("conversas");
        dbRef.child("individual").once('value').then(function(snapshot){
          snapshot.forEach(element => {
            if (
              (element.val().emissor == usuario &&
                element.val().destinatario == destinatario) ||
              (element.val().emissor == destinatario &&
                element.val().destinatario == usuario)
            ) {
              senha = element.val().senha;
              resolve(senha);
            }
          });
          if (senha == "" || senha == undefined) {
            senha = gerarSenhaAleatoria();
            reject("")
          }
      })

      
    }
      )
    
    promessa.then((data)=>{
      console.log(data)
      senha = data;
      console.log(senha);
    })
    }
    console.log(senha)
    if (senha == "" || senha == undefined) {
      senha = gerarSenhaAleatoria();
      
    }
    
    setTimeout(()=>{
      var dataMsg = new Date();
      let data = { destinatario: destinatario,
        emissor: usuario,
        message: entrada.value,
        dataMsg: dataMsg.getDate() + '/' + (dataMsg.getMonth() + 1) + '/' + dataMsg.getFullYear(),
        hora: dataMsg.getMinutes() + ':' + dataMsg.getSeconds(),
        senha: senha}
        console.log(data)
      firebase.database().ref("conversas").child("individual").push(data).then(function (){
        console.log("adicionada com sucesso  \n a senha é igual a ="+senha)
      }).catch(function (error) {
        console.log('erro ', error)
      })
    },2000)
}

  let carrega = new Promise((resolve, reject) => {
    let vetorIds = [];
    const dbRef = firebase.database().ref("conversas");
    dbRef.child("individual").once('value').then(function(snapshot){
      snapshot.forEach(element => {
        if (
          (element.val().emissor == usuario &&
            element.val().destinatario == destinatario) ||
          (element.val().emissor == destinatario &&
            element.val().destinatario == usuario)
        ) {
          vetorIds.push(element.key);
          
        }
        
      });
      if(vetorIds.length){
        resolve(vetorIds);
      }else{
        reject("não deu certo")
      }
  })
  })
  carrega.then((data)=>{
    console.log(data)
   mensagensEmTemporeal
  })
  
  

