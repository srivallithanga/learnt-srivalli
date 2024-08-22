import { Component } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrl: './hello-world.component.css'
})
export class HelloWorldComponent {
  msg: string;
  students:string[];
  showMsg: boolean;
  constructor(){
    this.msg="Why Angular?"
    this.students=["Madan","Revanth"];
    this.showMsg=true;
  }

  sayHello():void{
    alert("Hello from Angular");
  }

  toggleShowMsg(){
    this.showMsg=!this.showMsg;
  }

}
