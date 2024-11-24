import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCandidatComponent } from './single-candidat.component';

describe('SingleCandidatComponent', () => {
  let component: SingleCandidatComponent;
  let fixture: ComponentFixture<SingleCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCandidatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
