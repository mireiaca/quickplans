import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickplanComponent } from './quickplan.component';

describe('QuickplanComponent', () => {
  let component: QuickplanComponent;
  let fixture: ComponentFixture<QuickplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickplanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuickplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
