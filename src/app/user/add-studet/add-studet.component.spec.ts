import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudetComponent } from './add-studet.component';

describe('AddStudetComponent', () => {
  let component: AddStudetComponent;
  let fixture: ComponentFixture<AddStudetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
