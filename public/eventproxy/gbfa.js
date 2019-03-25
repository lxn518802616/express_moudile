var  EventProxy = require('eventproxy');
const conn = require('../mysql/mysql');
var em =EventProxy.create("ast",'dst',function(ast,dst){

})
// 并发模快
var em =new EventProxy();

em.all("ast",'dst',function(ast,dst){

})

const sqlStr = 'INSERT INTO wxht_user (username,password,user_openid) VALUES(?,?,?)'
const sqlner = [username,password,decoded.open_id]
conn.query(sqlStr,sqlner,(err,results) => {
    console.log(results)
    console.log(err)
    if(err) return res.send('数据库错误')
        em.emit('ast',results)
})

const sqlStr = 'INSERT INTO wxht_user (username,password,user_openid) VALUES(?,?,?)'
const sqlner = [username,password,decoded.open_id]
conn.query(sqlStr,sqlner,(err,results) => {
    console.log(results)
    console.log(err)
    if(err) return res.send('数据库错误')
        em.emit('dst',results)
})
