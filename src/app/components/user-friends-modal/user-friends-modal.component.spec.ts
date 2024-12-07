import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFriendsModalComponent } from './user-friends-modal.component';

describe('UserFriendsModalComponent', () => {
  let component: UserFriendsModalComponent;
  let fixture: ComponentFixture<UserFriendsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFriendsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFriendsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
