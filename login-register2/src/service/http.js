let verify = require('../model/register.js')
let http = require('http');
let qs = require('querystring');
let models = require('./db/db')
let mysql = require('mysql')
let url = require("url")
let sql = require('./db/sqlMap')

let server = http.createServer(function (req, res) {
  //连接数据库
  let connection = mysql.createConnection(models.mysql)
  connection.connect()
  //获取前端代码发来的路由地址
  let pathName = url.parse(req.url).pathname;
  let body = '' // 一定要初始化为"" 不然是undefined
  req.on('data', function (data) {
    body += data;
  })
  req.on('end', function () {
    res.writeHead(200, { // 响应状态
      'Content-Type': 'text/html; charset=utf-8', // 响应数据类型
      'Access-Control-Allow-origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    })
    let params = [qs.parse(body).name, qs.parse(body).pw]
    if (pathName == '/register') {
      //注册
      let addUser = sql.user.addUser
      let selectAll = sql.user.selectAll
      connection.query(selectAll, params, function (err, result) {
        if (err) {
          console.log(err)
          return;
        } else {
          let cb = verify(qs.parse(body).name, qs.parse(body).pw)
          if (cb.result) {
            let flag = false
            result.forEach((item) => {
              if (qs.parse(body).name == item.name)
                flag = true
            })
            if (flag) {
              res.write("用户名已被占用")
              res.end()
              connection.end()
            } else {
              connection.query(addUser, params, function (err) {
                if (err) {
                  console.log(err)
                  res.write("出现错误，注册失败")
                  res.end()
                  connection.end()
                  return
                } else {
                  res.write("注册成功")
                  res.end()
                  connection.end()
                }
              })
            }
          } else {
            res.write("注册失败," + cb.message)
            res.write
            res.end()
            connection.end()
          }
        }
      })
    } else if (pathName == '/login') {
      let select = sql.user.select
      //登录
      connection.query(select, qs.parse(body).name, function (err, result) {
        if (err) {
          console.log(err)
          res.write('请求失败')
          res.end()
          connection.end()
          return
        } else {
          if (!result[0])
            res.write('无此用户')
          else if (result[0].password == qs.parse(body).pw) {
            res.write('登录成功')
          } else
            res.write('用户名或密码错误')
          res.end()
          connection.end()
        }
      })
    }
  })
})

server.listen(3021)