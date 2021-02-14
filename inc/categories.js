let conn = require('./db');

module.exports = {
    
    getCategories(){

        return new Promise((resolve, reject) =>{
            conn.query(`
                SELECT * FROM tb_categories ORDER BY name
            `, (err, results) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });

    },

    save(fields){
        return new Promise((resolve, reject) =>{
            //tratar se for INSERT ou UPDATE
            //se vier id maior que zero = UPDATE, senao eh INSERT
            let query, params;
            if(parseInt(fields.id) > 0){
                query = `
                    UPDATE tb_categories
                    SET name = ?,
                        description = ?,
                        lang = ?
                    WHERE id = ?
                `;
                params = [
                    fields.name,
                    fields.description,
                    fields.lang,
                    fields.id
                ];
            }else{
                query = `
                INSERT INTO tb_categories (name, description, lang)
                VALUES(?,?,?)
                `;

                params = [
                    fields.name,
                    fields.description,
                    fields.lang
                ];
            }

            conn.query(query,params, (err, results) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });
    },

    delete(id){
        return new Promise((resolve, reject) =>{
            conn.query(`
                DELETE FROM tb_categories WHERE id = ?
            `,[
                id
            ], (err, results)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });
    }

};