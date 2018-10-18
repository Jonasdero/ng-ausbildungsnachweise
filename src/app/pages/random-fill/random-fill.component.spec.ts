import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomFillComponent } from './random-fill.component';

describe('RandomFillComponent', () => {
  let component: RandomFillComponent;
  let fixture: ComponentFixture<RandomFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
