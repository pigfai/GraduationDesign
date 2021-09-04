module.exports = function(name, pw){
  let callback = {
    result: false,
    message:''
  }
  const reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/)

  if(name == ''|| name == null)
    callback.message = '请填写用户名'
  else if( pw == '' || pw == null)
    callback.message = '请填写密码'
  else if ( name.length < 3)
    callback.message = '用户名不得小于三个字符'
  else if ( pw.length < 6 || pw.length >= 16)
    callback.message = '密码长度6~16个字符'
  else if (!reg.test(pw))
    callback.message = '密码需包含数字和字母'
  else{
    callback.message = '用户名和密码合法！'
    callback.result = true 
  }

  return callback 
}

//注册时检测合法性
