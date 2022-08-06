import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsDetailsComponent } from './assignments-details.component';

describe('AssignmentsDetailsComponent', () => {
  let component: AssignmentsDetailsComponent;
  let fixture: ComponentFixture<AssignmentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
