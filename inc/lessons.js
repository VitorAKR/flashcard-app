let conn = require('./db');

module.exports = {
    getCategoryList(){
        return new Promise((resolve, reject) =>{
            conn.query(`
                SELECT name FROM tb_categories ORDER BY name
            `, (err, results) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });
    },

    getFlashcards(){
        return new Promise((resolve, reject) =>{
            conn.query(`
            SELECT * from tb_flashcards where tb_flashcards.id NOT IN(SELECT tb_lessons.id from tb_lessons) order by category
            `, (err, results) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });
    },

    saveLessons(fields){
        return new Promise((resolve, reject) =>{
            let ef = 2.5;
            let repetitions = 0;
            let currentDate = new Date();
            let formatDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDay()}`;
            conn.query(`INSERT INTO tb_lessons (id, category, lang, front, back, timesRepeated, nextRevision, ef)
            VALUES(?,?,?,?,?,?,?,?)`, 
                [fields.id, 
                fields.category,
                fields.lang,
                fields.front,
                fields.back,
                repetitions,
                formatDate,
                ef],
             (err, results) =>{
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    console.log(results);
                    resolve(results);
                }
            });
        });
    }
}