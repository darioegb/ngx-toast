import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgToastService } from 'projects/ngx-toastf/src/public-api';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: NgToastService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        NgToastService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(NgToastService);
    fixture.detectChanges();
  });


  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'ngx-toastf-showcase'`, () => {
    expect(component.title).toEqual('ngx-toastf-showcase');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('ngx-toastf-showcase app is running!');
  });

  it('should create toast success', () => {
    const message = 'success message';
      component.showToastSuccess(message);
      fixture.detectChanges();
      const dbEl = <HTMLElement>fixture.debugElement.parent.nativeElement;
      expect(dbEl.querySelector('toast-component .toast-container-body span').textContent).toContain(message);
  });
});
