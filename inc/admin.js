var conn = require('./db');

module.exports = {

    dashboard(){
        return new Promise((resolve, reject) =>{
            conn.query(`
                    SELECT
                        (SELECT 
                                COUNT(*)
                            FROM
                                tb_lessons where nextRevision <= date(now())) AS nrrevisions,
                        (SELECT 
                                COUNT(*)
                            FROM
                                tb_lessons) AS nrlessons,
                        (SELECT 
                                COUNT(*)
                            FROM
                                tb_flashcards) AS nrflashcards,
                        (SELECT 
                                COUNT(*)
                            FROM
                                tb_categories) AS nrcategories,
                        (SELECT 
                                COUNT(*)
                            FROM
                                tb_users) AS nrusers 
           `,(err, results) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results[0]);
                }
           });
        });
    },

    getParams(req, params, params2){
        return Object.assign({}, {
            menus: req.menus,
            user: req.session.user
        }, params, params2);
    },

    getMenus(req){
        let menus = [
            {
                text: "Tela Inicial",
                href: "/admin/",
                icon: "home",
                active: false
            },
            {
                text: "Categorias",
                href: "/admin/category",
                icon: "book",
                active: false
            },
            {
                text: "Flashcards",
                href: "/admin/flashcards",
                icon: "clone",
                active: false
            },
            {
                text: "Revisões",
                href: "/admin/revisions",
                icon: "calendar-check-o",
                active: false
            },
            {
                text: "Lições",
                href: "/admin/lessons",
                icon: "pencil-square-o",
                active: false
            },
            /*{
                text: "Progresso",
                href: "/admin/progress",
                icon: "area-chart",
                active: false
            },*/
            {
                text: "Perfil",
                href: "/admin/profile",
                icon: "user-circle-o",
                active: false
            }
        ];
        menus.map(menu =>{
            if(menu.href === `/admin${req.url}`) menu.active = true;
        });
        return menus;
    }
};