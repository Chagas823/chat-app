function criaMsg(classe, msg, hora) {
  
  let chatbox = document.getElementById("chatbox");
 
  let divMsg = document.createElement("div");
  divMsg.className = classe;
  chatbox.append(divMsg);
  let texto = document.createElement("p");
  texto.appendChild(document.createTextNode(msg))
  let horario = document.createElement("span");
  horario.innerHTML = hora;
  texto.appendChild(horario);
  divMsg.appendChild(texto);
  let br = document.createElement("br");
  texto.append(br);
}
//criaMsg("message my_msg", "oi");
//criaMsg("message friend_msg", "oi, tchau");

function mensagens(usuario, destinatario, senha) {
  console.log("carrega mensagens");
  const dbRef = firebase.database().ref("conversas");
  dbRef.child("individual").once('value').then(function(snapshot){
    document.getElementById("")
    snapshot.forEach(element => {
      if (senha == element.val().senha) {
        if (element.val().emissor == usuario) {
          criaMsg("message my_msg", element.val().message);
          
        } else if (element.val().emissor == destinatario) {
          criaMsg("message friend_msg", element.val().message);
        } else if (element.val().destinatario == usuario) {
          criaMsg("message my_msg", element.val().message);
        } else if (element.val().destinatario == destinatario) {
          criaMsg("message friend_msg", element.val().message);
        }
        
      }
    });
      
  
  })

}

function removerElementos() {
  var e = document.querySelector("chatbox");
  
  //e.firstElementChild can be used.
  var child = e.lastElementChild; 
  while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
  }
}