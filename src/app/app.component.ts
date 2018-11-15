import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent
{
  title = 'Schools';
  showStudentInfo = true;
  showSchools = false;
  constructor (private httpService: HttpClient) { }
  private selectedState: string = '';
  private schoolList: Array<PASchools> = [];

  selectChangeHandler (event: any)
  {
    this.selectedState = event.target.value;
    var obserschoolList = this.httpService.get("./assets/data/schools.json");

   obserschoolList.subscribe((data: Array<PASchools>) => this.schoolList = data.filter(item => item.state == this.selectedState) );
   console.log(this.schoolList);
  }

  submitStudentInfo(studentInfo: any)
  {
    this.showStudentInfo = false;
    this.showSchools = true;
    console.log("pressed: " + studentInfo.greVerbal + studentInfo.greQuant);
  }

  storeSchool(schoolID: number)
  {
    console.log(this.schoolList[schoolID].name + " " + this.schoolList[schoolID].minCumulativeGPA);
  }

}
