import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent
// {
//   title = 'PA-Matcher';
// }

export class AppComponent
{
  private dataFile: string = "/assets/data/schools.json";

  selectedState: string = '';

  selectChangeHandler (event: any)
  {
    this.selectedState = event.target.value;
  }

}
