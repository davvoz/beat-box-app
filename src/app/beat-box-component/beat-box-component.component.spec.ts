import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatBoxComponentComponent } from './beat-box-component.component';

describe('BeatBoxComponentComponent', () => {
  let component: BeatBoxComponentComponent;
  let fixture: ComponentFixture<BeatBoxComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatBoxComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeatBoxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

  
