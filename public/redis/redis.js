const redis = require('redis');

client = redis.createClient('端口号','地址',{});
client.auth('密码');

module.exports = client;