var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');

var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err');
    } else {
        console.log(ret);
        res.send(ret);
    }
}

var dateStr = function(str) {
    return new Date(str.slice(0,7));
}



//获取用户信息
router.get('/getdata', (req, res) => {
    var sqlselect = $sql.user.select;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
    console.log(params);
    
    conn.query(sqlselect, params.name, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
         else {
            jsonWrite(res, result);
        }
    })
});

//更新用户信息
router.post('/updateUser', (req, res) => {
    var sqlupdate1 = $sql.user.updateUser_pw;
    var sqlupdate2 = $sql.user.updateCard;
    var sqlupdate3 = $sql.user.updateSex
    var params = req.body;
    console.log(params);
    
    conn.query(sqlupdate1, params.name, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);     
            res.send('ok'); 
        
    })

    conn.query(sqlupdate2, params.name, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);     
            res.send('ok'); 
        
    })

    conn.query(sqlupdate3, params.name, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);     
            res.send('ok'); 
        
    })
});

//更改密码
module.exports = router;
