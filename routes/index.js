var express = require('express');
var registrations = require('./../inc/registrations');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  registrations.render(req, res);

});

router.post('/', function(req, res, next) {
  //validar usando express-validator
  req.assert('email', 'E-mail está inválido').isEmail();
  let error = req.validationErrors();
  //validar os campos
  if(!req.body.name){
    registrations.render(req, res, "Digite o Nome!");
  }else if(!req.body.email){
    registrations.render(req, res, "Digite o E-Mail!");
  }else if(error){
    registrations.render(req, res, "Digite um E-Mail válido!");
  }else if(!req.body.password){
    registrations.render(req, res, "Digite a Senha!");
  }else if(!req.body.password2){
    registrations.render(req, res, "Redigite a Senha!");
  }else if(req.body.password2 != req.body.password){
    registrations.render(req, res, "Senhas não correspondem!");
  }else{
    registrations.verifyUser(req.body.email).then(results1 =>{
      
      if (results1) {
        //se vier true ja foi inserido 
        registrations.render(req, res, "Email já cadastrado!");
      }else{
        //e estiver tudo correto, salva no bd
        registrations.save(req.body).then(results =>{
          //esvaziar os campos do form
          req.body = {};
          registrations.render(req, res, null, "Usuário cadastrado!");
        }).catch(err =>{
          registrations.render(req, res, err.message);
        });
      }
      
    });

    //res.send(req.body); //escreve na tela os dados (Muito Precioso!)
  }

});

/* GET contact page. */
router.get('/contact', function(req, res, next){
  res.render('contact',  { title: 'FlashCard App - Contato', background: 'images/img_bg_3.jpg', h1:'Diga um oi!'});
});

/* GET method page. */
router.get('/method', function(req, res, next){
  res.render('method',  { title: 'FlashCard App - Método', background: 'images/img_bg_2.jpg', h1:'Sobre o método de estudo..'});
});

module.exports = router;
