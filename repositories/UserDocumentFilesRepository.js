var connection = require('../database/connection.js');


module.exports= class UserDocumentFiles{
    getuserdocumentfiles(){
     return new Promise((resolve,reject)=>{
            connection.query("select * from user_document_files",
            (err,results)=>{
                if(err){
                    console.log(err);
                    reject(null);
                }
                    resolve(results);
            });
        })
    }
    getUserDocumentFilesByCode(code){
        return new Promise((resolve,reject)=>{
            connection.query("select * from user_document_files where code = ? and deleted_at is null",code,
            (err,results)=>{
                if(err){
                    console.log(err);
                    reject(null);
                }
                    resolve(results[0]);
            });
        });
    }
    saveUserDocumentFilesRepository(userdocumentfiles){
        return new Promise((resolve,reject)=>{
            connection.query("insert into user_document_files set ?",userdocumentfiles,
            (err,results)=>{
                if(err){
                    console.log(err);
                    reject(null);
                }
                    resolve(results);
            });
        });
    }
    updateUserDocumentByCode(data,code){
        return new Promise((resolve,reject)=>{
            connection.query("update user_document_files set ? where code = ?",[data,code],
            (err,results)=>{
                if(err){
                    console.log(err);
                    reject(null);
                }
                    resolve(results);
            });
        });
    }
    deleteUserDocumentFilesByCode(code){
        return new Promise((resolve,reject)=>{
            connection.query("update user_document_files set deleted_at = current_timestamp where code = ?",code,
            (err,results)=>{
                if(err){
                    console.log(err);
                    reject(null);
                }
                    resolve(results);
            });
        });
    }

};