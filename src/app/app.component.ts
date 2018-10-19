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
  constructor (private httpService: HttpClient) { }
  private selectedState: string = '';
  private schoolList;

  selectChangeHandler (event: any)
  {
    this.selectedState = event.target.value;
    this.schoolList = this.httpService.get("./assets/data/schools.json");
  }

}
