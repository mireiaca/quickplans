import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { Group, GroupService } from '../../../services/group/group.service'; 
import { UserService } from '../../../services/user/user.service';
import { environment } from '../../../../environments/environment'; 
import { User } from '../../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFriendsModalComponent } from '../../../components/user-friends-modal/user-friends-modal.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  group!: Group;  
  idGroup!: string;
  userFriends: User[] = [];
  members!: User[];  
  environment = environment; 

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  viewUserProfile(username: string): void {
    window.location.href = `/user-profile/${username}`;
  }

  editGroup(): void {
    window.location.href = `/edit-group/${this.idGroup}`;
  }

  openUserFriendsModal(idGroup: string): void {
    this.dialog.open(UserFriendsModalComponent, {
      width: '400px',
      data: { idGroup }
    });
  }

  ngOnInit(): void {
    const groupId = this.route.snapshot.paramMap.get('id');
    this.idGroup = groupId || '';
    
    if (groupId) {
      this.groupService?.getMappedGroupInfo(groupId).subscribe(group => {
        this.group = group;
      });

      this.groupService?.getUsersFromGroup(groupId).subscribe(members => {
        this.members = members;
      });
    }
  }
}
