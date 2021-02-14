let conn = require('./db');

module.exports = {

    getLessons(){
        return new Promise((resolve, reject) =>{
            conn.query(`
                SELECT * FROM tb_lessons ORDER BY category
            `, (err, results) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });
    },

    saveRevisions(fields){
        return new Promise((resolve, reject) =>{
            console.log(fields.nextRevision);
            //transforma string date do array em date
            let stringDate = fields.nextRevision.split('T');
            let nextReviewDate = stringDate[0];
            console.log(nextReviewDate);
            let query, params;
            query = `
            UPDATE tb_lessons
                SET category = ?,
                    lang = ?,
                    front = ?,
                    back = ?,
                    timesRepeated = ?,
                    nextRevision = ?,
                    ef = ?
                WHERE id = ?
            `;
            params = [
                fields.category,
                fields.lang,
                fields.front,
                fields.back,
                fields.timesRepeated,
                nextReviewDate,
                fields.ef,
                fields.id
            ];
            conn.query(query,params, (err, results) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });
    }

}