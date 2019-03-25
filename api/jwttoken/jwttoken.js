const express = require('express');
var app = express.Router();
const jwt = require('jsonwebtoken');

app.get('/',(req,res)=>{
    // 请求头获取
    let token = req.headers.token;
    let id = req.body.id;
    //生成token
    // let secretOrPrivateKey = 'mtylxjjlxn';
    // let content = 'sddf';
    // let token = jwt.sign(content, secretOrPrivateKey, {
    //  expiresIn: 60*60*24  // 1小时过期
    //  });
     // console.log(token)
    //  res.send(token)
    //解析token 
    jwt.verify(token, 'mtylxjjlxn',function(err,decoded){
        if(err || !decoded) res.send({data:null,status:false,msg:err})
        //解析内容
        let aset = decoded.id
    })
})