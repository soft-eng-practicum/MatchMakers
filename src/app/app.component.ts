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

 /**
 * Default values for student information
 */
  studentCumuGPA: number = 0;
  studentSciGPA: number = 0;
  studentGREVerbal: number = 0;
  studentGREQuant: number = 0;
  studentGREEssay: number = 0;
  studentHCE: number = 0;

/**
 * Default values for school information
 */
  schoolName: string = '';
  schoolCumuGPA: number = 0;
  schoolSciGPA: number = 0;
  schoolHCE: number = 0;
  schoolGRE: boolean = false;

/**
 * Creates score and rating for the user
 */
  score: number;
  rating: string;

/**
 * Reads schools.json and creates a list of all schools
 *
 * Filters school list based on state selected and state of each schoolList
 * and creates list of filtered schools
 */
  selectState(event: any)
  {
    this.selectedState = event.target.value;
    var obserschoolList = this.httpService.get("./assets/data/schools.json");

   obserschoolList.subscribe((data: Array<PASchools>) => this.schoolList = data.filter(item => item.state == this.selectedState) );
   console.log(this.schoolList);
  }

/**
 * Hides student information form
 *
 * Stores entered user information into variables for student information
 */
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

/**
 * Stores selected school information into variables for school information
 */
  storeSchool(schoolID: number)
  {
    console.log(this.schoolList[schoolID].name + " " + this.schoolList[schoolID].minCumulativeGPA);

    this.schoolName = this.schoolList[schoolID].name;
    this.schoolCumuGPA = this.schoolList[schoolID].minCumulativeGPA;
    this.schoolSciGPA = this.schoolList[schoolID].minScienceGPA;
    this.schoolHCE = this.schoolList[schoolID].minRequiredHCE;
    this.schoolGRE = this.schoolList[schoolID].GRERequired;
  }

 /**
 * Makes user rating information visible
 *
 * Calculates user rating based on point system:
 *
 * For Cumulative GPA, Science GPA, and HCE hours, a point is given
 * for each value in which the user information is greater than or
 * equal to the school information
 *
 * For GRE, if the GRE is required, the user gets three points,
 * one for each section of the GRE, if the score of all three
 * is greater than 0, but will receive zero points if all three
 * are not completed
 * If the GRE is not required, the user will automatically
 * receive all three points
 *
 * The rating is based on how many points the user receives out of six:
 * 0 - 2 points results in a POOR rating
 * 3 - 4 points results in an AVERAGE rating
 * 5 - 6 points results in a GOOD raing
 */
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
