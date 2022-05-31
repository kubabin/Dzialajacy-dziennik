
class Enum {
  constructor(...keys) {
    keys.forEach((key, i) => {
      this[key] = i;
    });
    Object.freeze(this);
  }

  *[Symbol.iterator]() {
    for (let key of Object.keys(this)) yield key;
  }
}
class Data{
    static accounts = require("./data/accounts.json");
    static persons = require("./data/persons.json");
    static presence = require("./data/presence.json");
    static classes = require("./data/classes.json");
}
class AccountsService{
  constructor(){}
  static getAccounts(login, password){
    Data.accounts.forEach(element => {
      if(element.login == login && element.password == sha256(password)){
        document.cookie = "login=" + login;
        document.cookie = "password=" + sha256(password);
        return element.students;
      }
      else {
        return false;
      }
    });
  }
}
class DataService{
  constructor(){Object.freeze(ClassTypes)}
  static ClassTypes = new Enum("normal", "sport", "twolanguage", "ukrainian");
  static getStudentsByClass(studentClass){
    return Data.persons.students.filter(element => element.class == studentClass);
  }
  static getAllStudents(){
    return Data.persons.students;
  }
  static getTeachers(){
    return Data.persons.teachers;
  }
  static getTeachersByClass(className){
    return Data.persons.teachers.filter(element => element.class == className);
  }
  static getParents(){
    return Data.persons.parents;
  }
  static getParentByStudent(studentId){
    return Data.persons.parents.filter(element => element.studentId == studentId);
  }
  static getStudentClass(id){
    return Data.persons.students.filter(element => element.id == id)[0].class;
  }
  static getClasses(){
    return Data.persons.classes;
  }
  static addStudent(student){
    Data.persons.students.push(student);
  }
  static addTeacher(teacher){
    Data.persons.teachers.push(teacher);
  }
  static addParent(parent){
    Data.persons.parents.push(parent);
  }
  static createClass(level, team, studentIds, school, type){
    Data.persons.classes.push(className);
  }
  static getStudent(id){
    return Data.persons.students.find(student => student.id == id);
  }
  static getTeacher(id){
    return Data.persons.teachers.find(teacher => teacher.id == id);
  }
  static getParent(id){
    return Data.persons.parents.find(parent => parent.id == id);
  }

}

function sha256(input){
  return crypto.createHash('sha256').update(JSON.stringify(input)).digest('hex')
}
