let chatHistory = document.getElementById("chatHistoria");

//lógica mensagem usuario logado
function mensagemUsuarioLogado() {
  let li = document.createElement("li");
  li.className = "clearfix";
  chatHistory.appendChild(li);
  let divMessage = document.createElement("div");
  divMessage.className = "message-data text-right";
  li.appendChild(divMessage);
  let spanHora = document.createElement("span");
  spanHora.className = "message-data-time";
  spanHora.innerHTML = "22:49";
  divMessage.appendChild(spanHora);
  let divTxtMessage = document.createElement("div");
  divTxtMessage.className = "message other-message float-right";
  divTxtMessage.innerHTML = "gfjbdsfgs";
  li.appendChild(divTxtMessage);
}

function mensagemUsuarioReceptor(){
    let li = document.createElement("li");
    li.className = "clearfix";
    chatHistory.appendChild(li);
    let divMessage = document.createElement("div");
    divMessage.className = "message-data text-right";
    li.appendChild(divMessage);
    let spanHora = document.createElement("span");
    spanHora.className = "message-data-time";
    spanHora.innerHTML = "22:49";
    divMessage.appendChild(spanHora);
    let divTxtMessage = document.createElement("div");
    divTxtMessage.className = "message my-message";
    divTxtMessage.innerHTML = "gfjbdsfgs";
    li.appendChild(divTxtMessage);
}
mensagemUsuarioLogado();
mensagemUsuarioReceptor();