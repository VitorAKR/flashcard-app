class ImageFileReader{
    //classe para renderizar a imagens
    // você passa o input file que vc quer e o elemento imagem 
    constructor(inputEl, imgEl){
        this.inputEl = inputEl;
        this.imgEl = imgEl;

        this.initInputEvent();
    }

    initInputEvent(){
        document.querySelector(this.inputEl).addEventListener("change", e=>{

            this.reader(e.target.files[0]).then(result =>{
                document.querySelector(this.imgEl).src = result;
            });
        });
    }


    reader(file){
        return new Promise((resolve, reject) =>{
             
            let reader = new FileReader();
                
            reader.onload = function(){
                resolve(reader.result);
            }

            reader.onerror = function(){
                reject("Não foi possível ler a imagem.");
            }

            //ler o arquivo como URL
            reader.readAsDataURL(file);
        });   
    }
}