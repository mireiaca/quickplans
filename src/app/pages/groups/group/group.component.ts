import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { Group, GroupService } from '../../../services/group/group.service'; 
import { environment } from '../../../../environments/environment'; 
import { User } from '../../../services/user/user.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  group!: Group;  
  members!: User[];  
  environment = environment; 

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute
  ) {}

  viewUserProfile(username: string): void {
    window.location.href = `/user-profile/${username}`;
  }

  ngOnInit(): void {
    const groupId = this.route.snapshot.paramMap.get('id');
    
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
