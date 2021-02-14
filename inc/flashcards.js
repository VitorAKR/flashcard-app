let conn = require('./db');

module.exports = {

    getFlashcard(){
        return new Promise((resolve, reject) =>{
            let query;
            query = `SELECT * FROM tb_flashcards ORDER BY category`;
            conn.query(query,(err, results) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });       
    },

    getCategoryList(){
        return new Promise((resolve, reject) =>{
            conn.query(`
                SELECT name, lang FROM tb_categories ORDER BY name
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
            //se vier id maior que zero = UPDATE, senao eh INSERT
            let query, params;
            if(parseInt(fields.id) > 0){
                query = `
                    UPDATE tb_flashcards
                    SET category = ?,
                        lang = ?,
                        front = ?,
                        back = ?
                    WHERE id = ?
                `;
                params = [
                    fields.category,
                    fields.lang,
                    fields.front,
                    fields.back,
                    fields.id
                ];
            }else{
                query = `
                INSERT INTO tb_flashcards (category, lang, front, back)
                VALUES(?,?,?,?)
                `;

                params = [
                    fields.category,
                    fields.lang,
                    fields.front,
                    fields.back
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
                DELETE FROM tb_flashcards WHERE id = ?
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
}