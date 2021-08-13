import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPayrollComponent } from './board-payroll.component';

describe('BoardPayrollComponent', () => {
  let component: BoardPayrollComponent;
  let fixture: ComponentFixture<BoardPayrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardPayrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
