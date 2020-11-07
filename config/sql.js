/**
 * Created by Walker on 2020/11/06.
 * 对操作不同表，sql语句的封装
 */
let fa_admin = {
  insert: "INSERT INTO fa_admin(id, name, age) VALUES(?,?,?)",
  update: "UPDATE fa_admin SET name=?, age=? WHERE id=?",
  delete: "DELETE FROM fa_admin WHERE id=?",
  queryById: "SELECT * FROM fa_admin WHERE id=?",
  queryAll: "SELECT * FROM fa_admin",
};
let teacher = {
  insert: "INSERT INTO teacher(id, name) VALUES(?,?)",
  update: "UPDATE teacher SET name=? WHERE id=?",
  delete: "DELETE FROM teacher WHERE id=?",
  queryById: "SELECT * FROM teacher WHERE id=?",
  queryAll: "SELECT * FROM teacher",
};

module.exports = {
  teacher,
  fa_admin,
};