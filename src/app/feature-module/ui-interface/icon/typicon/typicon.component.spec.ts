import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypiconComponent } from './typicon.component';

describe('TypiconComponent', () => {
  let component: TypiconComponent;
  let fixture: ComponentFixture<TypiconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypiconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
