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
  showUserRating = false;
  constructor (private httpService: HttpClient) { }
  private selectedState: string = '';
  private schoolList: Array<PASchools> = [];

  studentCumuGPA: number = 0;
  studentSciGPA: number = 0;
  studentGREVerbal: number = 0;
  studentGREQuant: number = 0;
  studentGREEssay: number = 0;
  studentHCE: number = 0;

  schoolName: string = '';
  schoolCumuGPA: number = 0;
  schoolSciGPA: number = 0;
  schoolHCE: number = 0;
  schoolGRE: boolean = false;

  score: number;
  rating: string;


  selectSchool(event: any)
  {
    this.selectedState = event.target.value;
    var obserschoolList = this.httpService.get("./assets/data/schools.json");

   obserschoolList.subscribe((data: Array<PASchools>) => this.schoolList = data.filter(item => item.state == this.selectedState) );
   console.log(this.schoolList);
  }

  submitStudentInfo(studentInfo: any)
  {
    this.showStudentInfo = false;
    console.log("pressed: " + studentInfo.cumuGPA + " " + studentInfo.sciGPA +  " " + studentInfo.greVerbal +
                    " " + studentInfo.greQuant + " " + studentInfo.greEssay +  " " + studentInfo.hce);

    this.studentCumuGPA = studentInfo.cumuGPA;
    this.studentSciGPA = studentInfo.sciGPA;
    this.studentGREVerbal = studentInfo.greVerbal;
    this.studentGREQuant = studentInfo.greQuant;
    this.studentGREEssay = studentInfo.greEssay;
    this.studentHCE = studentInfo.hce;
  }

  storeSchool(schoolID: number)
  {
    console.log(this.schoolList[schoolID].name + " " + this.schoolList[schoolID].minCumulativeGPA);

    this.schoolName = this.schoolList[schoolID].name;
    this.schoolCumuGPA = this.schoolList[schoolID].minCumulativeGPA;
    this.schoolSciGPA = this.schoolList[schoolID].minScienceGPA;
    this.schoolHCE = this.schoolList[schoolID].minRequiredHCE;
    this.schoolGRE = this.schoolList[schoolID].GRERequired;
  }

  calculateRating()
  {
    console.log("calculate");
    this.showUserRating = true;
    this.score = 0;
    this.rating = "";
    if (this.studentCumuGPA >= this.schoolCumuGPA)
    {
      this.score++;
    }
    if (this.studentSciGPA >= this.schoolSciGPA)
    {
      this.score++;
    }
    if (this.studentHCE >= this.schoolHCE)
    {
      this.score++;
    }
    if (this.schoolGRE == true)
    {
      if (this.studentGREQuant > 0 && this.studentGREVerbal > 0 && this.studentGREEssay > 0)
      {
        this.score += 3;
      }
    }
    if (this.schoolGRE == false)
    {
      this.score += 3;
    }

    if (this.score <= 2)
    {
      this.rating = "Poor";
    }
    else if (this.score <=4)
    {
      this.rating = "Average";
    }
    else
    {
      this.rating = "Good";
    }
  }

}
