class Data{
    static accounts = require("./data/accounts.json");
    static persons = require("./data/persons.json");
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
    });
  }
}
class DataService{
  constructor(){}
  static getStudents(studentClass){
    return Data.persons.students;
  }
  static getTeachers(){
    return Data.persons.teachers;
  }
  static getParents(){
    return Data.persons.parents;
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
