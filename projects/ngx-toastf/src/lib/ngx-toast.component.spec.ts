import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgToastComponent } from './ngx-toast.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NgToastComponent', () => {
  let component: NgToastComponent;
  let fixture: ComponentFixture<NgToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgToastComponent ],
      imports: [
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
