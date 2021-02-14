var conn = require('./db');
const { TIMESTAMP } = require('mysql2/lib/constants/types');

module.exports = {
    render(req, res, error, success){
        res.render('index', { title: 'FlashCard App', body: req.body, error, success });
    },

    verifyUser(email){

        return new Promise((resolve, reject) =>{
            conn.query(`
            SELECT * FROM tb_users WHERE email = ?
            `,[
                email
            ], (err, results) =>{
                if(err){
                    reject(err);
                }else{
                    let registered = false;
                    if (!results.length == 0) {
                        registered = true;
                    }
                    resolve(registered);
                }
            });
        });
        
    },

    save(fields){
        return new Promise((resolve, reject)=>{
            conn.query(`
                INSERT INTO tb_users (name, email, password)
                VALUES(?, ?, ?)
            `, [
                fields.name,
                fields.email,
                fields.password 
            ], (err, results) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });

    }
    
};