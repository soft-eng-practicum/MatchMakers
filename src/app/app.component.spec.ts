import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'PA-Matcher'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('PA-Matcher');
  }));

  it('should render title in a h2 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('What Are My Chances?');
  }));

  it('should take in user information', function () {
    elem.find('[name="GPA"]').val("").trigger('input');
    elem.find('[name="SGPA"]').val("").trigger('input');
    elem.find('[name="Verbal"]').val("").trigger('input');
    elem.find('[name="Quantitative"]').val("").trigger('input');
    elem.find('[name="Essay"]').val("").trigger('input');
    elem.find('[name="number"]').val("").trigger('input');
    elem.blur();
    isolatedScope.$digest();

    var result  = elem.find("[analytics-event='wup submit button']");
    expect(result.attr('disabled')).not.toBe("disabled");
});

it('should show drop down of schools for selection', function () {
  var dropdownCategories = element(by.css('button.btn-select.dropdown-toggle'));
  expect(dropdownCategories.toBe('SchoolsByState');
  dropdownCategories.click().then(function(){
      });
    });
  });
});
});
