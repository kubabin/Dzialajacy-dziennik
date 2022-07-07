import { Component } from '@angular/core';
import { stringify } from 'querystring';
import * as sha256 from "fast-sha256";
import { accounts } require("./data/accounts.json");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dzialajacy-dziennik';
}
var textenc = new TextEncoder();
const hasher = new sha256.Hash();
function SHA256(input:string){
  var hashArray:Uint8Array = new Uint8Array();
  var hashhArray = [];
  for (var i = 0; i < input.length; i++) {
    hashhArray.push(input.charCodeAt(i));
  }
  hashArray.set(hashhArray);
  hasher.update(hashArray);
}
class Data{

  static presence = require("./data/presence.json");
  static classes = require("./data/classes.json");
}
class ActualData{}
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
  constructor(level:number, team:string){this.teachers = []; this.students = []; this.level = level; this.nameId = ""; this.team = team; this.id = 0}
  public teachers:string[];
  public students:string[];
  public id:number;
  public nameId:string;
  public team:string;
  public level:number;
}
class Student{
  constructor(name:string,password:string,username:string, surname:string, classId:number, studentId:number, motherId:number)
  {this.name = name;this.username = username; this.password = password; this.surname = surname; this.classId = classId; this.studentId = studentId; this.motherId = motherId;}
  public name:string;
  public surname:string;
  public username:string;
  public classId:number;
  public studentId:number; //id studenta w bazie danych
  public motherId:number; //id matki
  public password:string;
}

class Parent{
  constructor(name:string,password:string,username:string, surname:string, id:number, studentids:number[])
  {this.name = name;this.password = password;this.username = username; this.surname = surname; this.id = id; this.studentids = studentids;}
  public name:string;
  public username:string;
  public password:string
  public surname:string;
  public id:number; //id rodzica w bazie danych
  public studentids:number[]; //id studentów danego rodzica

}
class Teacher{
  constructor(name:string,username:string, surname:string,password:string, id:number, teachingClassesIds:number[]){
    this.name = name;this.username= username; this.password = password; this.surname = surname; this.id = id; this.teachingClassesIds = teachingClassesIds;}
  public name:string;
  public password:string;
  public surname:string;
  public username:string;
  public id:number; //id nauczyciela w bazie danych
  public teachingClassesIds:number[]; //id klas danego nauczyciela
}
class DataService{
  constructor(){}
  static getFreeClassIdNumber(){
    let id;
    Data.classes.forEach(function(i:number, idx:number, array:Array<number>){
      if (idx === array.length - 1){
          id = idx + 1;
      }
    });
    return id;
  }
static getStudentsByClass(className: string){
  let students:string[] = [];
  /*Data.accounts.forEach(function(i:object, idx:number, array:Array<number>){
    if(i.class == className){
      students.push(i.name);
    }
  }*/
}
static getStudents(){
  let returningArray = new Array<Student>();
  Data.accounts.students.forEach(function(i:Student, idx:number, array:Array<number>){
    returningArray.push(i);
  });
  return returningArray;
}
static getTeachers(){
  return Data.accounts.teachers;
}
/*static getTeachersByClass(className){
  return Data.accounts.teachers.filter(element => element.class == className);
}*/
static getParents(){
  return Data.accounts.parents;
}
static getParentByStudent(studentId: number){
  let id;
  Data.accounts.students.forEach(function(i:Student, idx:number, array:Array<number>){
    if(i.studentId == studentId){
      id = i.motherId;
    }
  })
  return id;
}
/*static getStudentClass(id: number){
  return Data.accounts.students.filter(element => element.id: number == id: number)[0].class;
}*/
static getClasses(){
  return Data.accounts.classes;
}
/*static addStudent(student){
  Data.accounts.students.push(student);
}*/
static addTeacher(teacher:Array<string>){
  Data.accounts.teachers.push(teacher);
}
static addParent(parent:Array<string>){
  Data.accounts.parents.push(parent);
}
static createClass(level: number, team:string, studentids: number, school: string[], type: string){
  Data.accounts.classes.push(level,team,studentids,school,type);
}
/*static getStudent(id: number){
  return Data.accounts.students.find(student => student.id: number == id: number);
}*/
/*static getTeacher(id: number){
  return Data.accounts.teachers.find(teacher => teacher.id: number == id: number);
}*/
/*static getParent(id: number){
  return Data.accounts.parents.find(parent => parent.id: number == id: number);
}*/
static getStudentAccount(username:string,password:string ){
  let account;

  hasher.update(textenc.encode(username));
  Data.accounts.students.forEach(function(i:Student, idx:number, array:Array<number>){

    if(i.username == username && i.password == hasher.digest().toString()){
      account = i;
    }
  })
  return account;
}
static getTeacherAccount(username:string,password:string){
  let account;
  hasher.update(textenc.encode(password));
  return Data.accounts.teachers.forEach(function(i:Teacher, idx:number, array:Array<number>){
    if (i.username == username && i.password == hasher.digest().toString()){
      account = i;
    }
  })
}
static getParentAccount(username:string,password:string){
  let account:Parent;
  return Data.accounts.parents.forEach(function(i:Parent, idx:number, array:Array<number>){
    if (i.username == username && i.password == hasher.digest().toString()){
      account = i;
    }
    return account;
  })

  }
}





