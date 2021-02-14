var express = require('express');
var users = require("./../inc/users");
var admin = require("./../inc/admin");
var categories = require("./../inc/categories");
var flashcards = require("./../inc/flashcards");
const lessons = require('./../inc/lessons');
const revisions = require('./../inc/revisions');
var router = express.Router();

//criar middleware de roteador (pra impedir acesso restrito)
router.use(function(req, res, next){
    //se não tiver session redireciona pro login, senao manda pra rota
    if(['/login'].indexOf(req.url) === -1 && !req.session.user){
        res.redirect("/admin/login");
    }else{
        next();
    }
});

//criar middleware pra gerar menus
router.use(function(req, res, next){
    req.menus = admin.getMenus(req);

    next();
});

router.get("/logout", function(req,res, next){
    //se acessar a rota de logout, retira session de user
    delete req.session.user;

    res.redirect("/admin/login");
});

router.get("/", function(req, res, next){
    //res.render("admin/index", admin.getParams(req)); //jeitoAntigo

    admin.dashboard().then(data =>{
        res.render("admin/index", admin.getParams(req, {data}));
    }).catch(err =>{
        console.log(err);
    });

});

router.post("/login", function(req, res, next){

    if(!req.body.email){
        users.render(req, res, "Preencha o campo e-mail!");
    }else if(!req.body.password){
        users.render(req, res, "Preencha o campo senha!");
    }else{
        //validar o login

        users.login(req.body.email, req.body.password).then(user =>{
            //atribuir session
            req.session.user = user;

            //redirecionar pra tela principal
            res.redirect("/admin");

        }).catch(err =>{
            users.render(req, res, err.message || err);
        });
    }

});

router.get("/login", function(req, res, next){

/* só pra testar ID SESSION    if(!req.session.views) req.session.views = 0;

    console.log("SESSION:", req.session.views++); */

    users.render(req, res, null);
});

router.get("/category", function(req, res, next){
    
    categories.getCategories().then(data =>{
        res.render("admin/category", admin.getParams(req, {data}));
    });

});


router.post("/category", function(req, res, next){
    
    console.log(req.body);
    categories.save(req.fields).then(results =>{
        res.send(results);
    }).catch(err =>{
        res.send(err);
    }); 
    //res.send(req.fields);

});

router.delete("/category/:id", function(req, res, next){
    //passar na rota delete o id via params
    categories.delete(req.params.id).then(results =>{
        res.send(results);

    }).catch(err =>{
        res.send(err);
    });
});


router.get("/flashcards", function(req, res, next){
    
    flashcards.getCategoryList().then(listData =>{
        flashcards.getFlashcard().then(data =>{
            //console.log(listData);
            // console.log(data);
            res.render("admin/flashcards", admin.getParams(req, {data}, {listData}));
        });
    });
});

router.post("/flashcards", function(req, res, next){

    flashcards.save(req.fields).then(results =>{
        res.send(results);
    }).catch(err=>{
        res.send(err);
    });

});

router.delete("/flashcards/:id", function(req, res, next){
    flashcards.delete(req.params.id).then(results =>{
        res.send(results);
    }).catch(err =>{
        res.send(err);
    });
});

router.get("/lessons", function(req, res, next){
    lessons.getCategoryList().then(listData => {
        lessons.getFlashcards().then(cards =>{
            //console.log(cards);
            res.render("admin/lessons", admin.getParams(req, {listData}, {cards}));
        });
    });
});

router.post("/lessons", function(req, res, next){

    //console.log(req.body);
    lessons.saveLessons(req.body).then(results =>{
        res.send(results);
    }).catch(err =>{
        res.send(err);
    });
});

router.get("/revisions", function(req, res, next){
    revisions.getLessons().then(lessonsList =>{
        res.render("admin/revisions", admin.getParams(req, {lessonsList}));
    });
});

router.post("/revisions", function(req, res, next){
    console.log(req.body);
    revisions.saveRevisions(req.body).then(results =>{
        res.send(results);
    }).catch(err =>{
        res.send(err);
    });
});

router.get("/progress", function(req, res, next){
    res.render("admin/progress", admin.getParams(req));
});

router.get("/profile", function(req, res, next){
    res.render("admin/profile", admin.getParams(req));
});


router.post("/profile/change-password", function(req, res, next){

    users.changePassword(req).then(results =>{
        res.send(results);
    }).catch(err =>{
        res.send(err);
    });
});

module.exports = router;