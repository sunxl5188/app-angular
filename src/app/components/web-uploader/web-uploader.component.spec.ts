import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUploaderComponent } from './web-uploader.component';

describe('WebUploaderComponent', () => {
  let component: WebUploaderComponent;
  let fixture: ComponentFixture<WebUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
