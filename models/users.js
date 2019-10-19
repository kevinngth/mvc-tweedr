const sha256 = require('js-sha256');
const SALT = 'tweedr';

module.exports = (dbPoolInstance) => {

    let getAll = (callback) => {

        let query = 'SELECT * FROM users';

        dbPoolInstance.query(query,(err,res)=>{
            if (err) {
                callback(err,null);
            } else {
                if (res.rows.length>0) {
                    callback(null,res.rows);
                } else {
                    callback(null,null);
                };
            };
        });
    };

    let insertNew = (req,callback) => {
        let values = [req.body.username,sha256(req.body.password),req.body.email]
        let query = "INSERT INTO users (username,password,email) VALUES ($1,$2,$3)";
        dbPoolInstance.query(query,values,(err,res)=>{
            if (err) {
                callback(err,null);
            } else {
                if (res.rows.length>0) {
                    callback(null,res.rows);
                } else {
                    callback(null,null);
                };
            };
        });
    };

    let verifyLogin = (req,callback) => {
        let values = [req.body.username,sha256(req.body.password)];
        let query = `SELECT * FROM users WHERE username=$1 AND password=$2`;
        dbPoolInstance.query(query,values,(err,res)=>{
            if (err) {
                callback(err,null);
            } else {
                if (res.rows.length>0) {
                    callback(null,res.rows);
                } else {
                    callback(null,null);
                };
            };
        });
    };

    return {
        getAll,
        insertNew,
        verifyLogin
    };
};