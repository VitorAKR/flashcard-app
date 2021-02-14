var conn = require('./db');

module.exports = {

    render(req, res, error){
        res.render("admin/login", {
            body: req.body,
            error
        });
    },

    login(email, password){
        return new Promise((resolve, reject) =>{
            conn.query(`
                SELECT * FROM tb_users WHERE email = ?
            `,[
                email
            ], (err,results)=>{
                if(err){
                    reject(err);
                }else{
                    if(!results.length > 0){
                        reject("Usuário ou senha incorretos.");
                    }else{
                        //passar registro de busca do bd
                        let row = results[0];
                        if(row.password !== password){
                            reject("Usuário ou senha incorretos.");
                        }else{
                            resolve(row);
                        }
                    }
                }
            });
        });
    },

    changePassword(req){
        return new Promise((resolve, reject) =>{
            if(!req.fields.password){
                reject("Preencha o campo da senha!");
            }else if(req.fields.password !== req.fields.passwordConfirm){
                reject("Confirme a senha corretamente!");
            }else{
                //se passar pelas verificações podemos alterar a senha do BD
                conn.query(`
                    UPDATE tb_users
                    SET password = ?
                    WHERE id = ?
                `, [
                    req.fields.password,
                    req.fields.id
                ], (err, results)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(results);
                    }
                });

            }
        });
    }
};