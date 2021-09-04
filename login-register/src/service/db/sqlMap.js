const sqlMap = {
  user: {
    //增
      addUser: 'INSERT INTO  users ( name, password) VALUES (?,?)',
    //删
      deleteUser : 'DELETE FROM users WHERE id = ?',
    //改
      updateUser_name : 'UPDATE users SET name = ? WHERE id = ?',
      updateUser_pw : 'UPDATE users SET password = ? WHERE id = ?',
    //查
      select: 'SELECT * FROM users WHERE name = ? ',
      selectAll: 'SELECT * FROM users'
  }
}

module.exports = sqlMap;