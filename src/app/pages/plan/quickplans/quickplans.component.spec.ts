import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickplansComponent } from './quickplans.component';

describe('QuickplansComponent', () => {
  let component: QuickplansComponent;
  let fixture: ComponentFixture<QuickplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickplansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuickplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
