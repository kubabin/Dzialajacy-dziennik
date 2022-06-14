import { Component } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dzialajacy-dziennik';
}
class Data{
  static accounts = require("./data/accounts.json");
  static presence = require("./data/presence.json");
  static classes = require("./data/classes.json");
}
class AccountsService{
constructor(){}
static login(login:string, password:string){
  let account = Data.accounts.search(login);
  console.log("Found login, checking password");
  if(account.password == password){
    console.log("Login successful");
    document.cookie = "login=" + login;
    document.cookie = "password=" + password;
    return account;
  }
  return null;
}
static checkLogIn()
{
  if(document.cookie.indexOf("login") != -1 && document.cookie.indexOf("password") != -1){
    return true;
  }
  else {
    return false;
  }
}
static isLoggedIn = false;

}
class SchoolClass{
  constructor(level:number, team:string){this.teachers = []; this.students = []; this.level = level; this.nameId = "" this.team = team; this.id = 0}
  public teachers:string[];
  public students:string[];
  public id:number;
  public nameId:string;
  public team:string;
  public level:number;
}
class DataService{
  constructor(){}
  static getFreeClassIdNumber(){
    Data.classes.forEach(function(i:number, idx:number, array:Array<number>){
      if (idx === array.length - 1){
          return idx + 1;
      }
   });
  }
static getStudentsByClass(className){
  let students:string[] = [];
  Data.accounts.forEach(function(i:Array, idx:number, array:Array<number>){
    if(i.class == className){
      students.push(i);
    }
  }
  return students;
}

static getTeachers(){
  return Data.accounts.teachers;
}
static getTeachersByClass(className){
  return Data.accounts.teachers.filter(element => element.class == className);
}
static getParents(){
  return Data.accounts.parents;
}
static getParentByStudent(studentid: number){
  return Data.accounts.parents.filter(element => element.studentid: number == studentid: number);
}
static getStudentClass(id: number){
  return Data.accounts.students.filter(element => element.id: number == id: number)[0].class;
}
static getClasses(){
  return Data.accounts.classes;
}
static addStudent(student){
  Data.accounts.students.push(student);
}
static addTeacher(teacher){
  Data.accounts.teachers.push(teacher);
}
static addParent(parent){
  Data.accounts.parents.push(parent);
}
static createClass(level: number, team:string, studentids: number, school: string[], type){
  Data.accounts.classes.push(level,team,studentids: numbers,school,type);
}
static getStudent(id: number){
  return Data.accounts.students.find(student => student.id: number == id: number);
}
static getTeacher(id: number){
  return Data.accounts.teachers.find(teacher => teacher.id: number == id: number);
}
static getParent(id: number){
  return Data.accounts.parents.find(parent => parent.id: number == id: number);
}
static getStudentAccount(phone,password){
  return Data.accounts.students.find(student => student.phone == phone && student.password == sha256(password));
}
static getTeacherAccount(phone,password){
  return Data.accounts.teachers.find(teacher => teacher.phone == phone && teacher.password == sha256(password));
}
static getParentAccount(phone,password){
  return Data.accounts.parents.find(parent => parent.phone == phone && parent.password == sha256(password));
}

}



