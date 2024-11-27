import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuickplanComponent } from './add-quickplan.component';

describe('AddQuickplanComponent', () => {
  let component: AddQuickplanComponent;
  let fixture: ComponentFixture<AddQuickplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddQuickplanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddQuickplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
