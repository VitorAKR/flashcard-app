HTMLFormElement.prototype.save = function(){

    let form = this;

    return new Promise((resolve, reject) =>{
        form.addEventListener('submit', e => {

            //cancelar envio padrao 
            e.preventDefault();
            //pegar os dados dele
            let formData = new FormData(form);
            console.log(formData);
    
            //usar o form action pra definir URL, o mesmo pro metodo
            fetch(form.action, {
              method: form.method,
              body: formData
            }).then(response => response.json())
              .then(json => {
                //retornar o JSON
                resolve(json);
            }).catch(err =>{
                reject(err);
            });
        });
    });

    

}