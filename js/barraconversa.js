function carregaBarraDeConversas(){

  
    let usuario;
    let carregarUsuario = new Promise((resolve, reject)=>{
      firebase.auth().onAuthStateChanged((user) =>{
        if(user){
            console.log(user);
            resolve(user);
            const dbRef = firebase.database().ref("usuarios");
            dbRef.child(firebase.auth().currentUser.uid).once('value').then(function(snapshot){
              snapshot.forEach(element => {
                console.log(element)
                
              });
             
          })
        }else{
            reject(null);
        }
      });
    });
    carregarUsuario.then((data)=>{
      console.log(data);
      usuario = data.email;
      console.log(usuario);
    }).catch((data)=>{
      console.log(data);
    });
   
    const dbRef = firebase.database().ref("conversas");
    let vetor = [] ;
   setTimeout(()=>{
    dbRef.child("individual").once('value').then( function(snapshot){
      
      
      snapshot.forEach(element => {
        if (
          (element.val().emissor == usuario) ||
          (
            element.val().destinatario == usuario)
        ) {
          vetor.push(element.val())
          password = element.val().senha;
          /** 
          if (element.val().emissor == usuario) {
            conversasRecentes(null, element.val().destinatario, null, null);
            
          } else {
            conversasRecentes(null, element.val().emissor, null, null);
          } */
          
      
      }})
      });
      //lógica para deicar apenas como se tivesse uma conversa com cada pessoa
      setTimeout(()=>{
        console.log(vetor.length)
        for (let i = 0; i < vetor.length; i++) {
            for (let j = 0; j < vetor.length; j++) {
               
                if(vetor[i].senha == vetor[j].senha && i != j){
                    
                    vetor[j] = 0
                }
                if(vetor[j] != 0){
                    
                }
            }
            
        }
        if(vetor[1] == 0){
            console.log("é zero")
        }
        for (let index = 0; index < vetor.length; index++) {
            if(vetor[index] != 0){
                if (vetor[index].emissor == usuario ) {
                    conversasRecentes(null, vetor[index].destinatario, vetor[index].dataMsg, vetor[index].message);
                    
                  } else {
                    conversasRecentes(null, vetor[index].emissor, vetor[index].dataMsg, vetor[index].message);
                  }
                  
            }
            
        }
        console.log(vetor);
        
        
      },100)
      
      
      
   }, 2000)
  }