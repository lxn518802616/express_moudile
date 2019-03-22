const mysql = require('mysql');
// const promise = require('')

var mysqlpool = mysql.createPool({
    host: '',
    prot: '',
    protocol:'',
    user: '',
    password: '',
    database: '',
    connectionLimit:100 , //最大连接数
    multipleStatements: true
})
module.exports = {
    query : function(sql,params,callback){    
        mysqlpool.getConnection(function(err,connection){
            if(err){
                console.log('数据库链接失败');
                throw err;
            }
         //开始数据操作
         //传入三个参数，第一个参数sql语句，第二个参数sql语句中需要的数据，第三个参数回调函数
        connection.query( sql, params, function(err,results,fields ){
           if(err){
                console.log('数据操作失败');
                throw err;
            }
            //释放连接  
            connection.release();
            // mysqlpool.releaseConnection(connection)
            //将查询出来的数据返回给回调函数
            callback && callback(results, fields);
           });
       });
    }
};