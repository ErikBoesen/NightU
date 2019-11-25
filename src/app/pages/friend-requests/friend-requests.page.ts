import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';

@Component({
    selector: 'app-friend-requests',
    templateUrl: './friend-requests.page.html',
    styleUrls: ['./friend-requests.page.scss'],
})
export class FriendRequestsPage implements OnInit {
    requests: User[] = null;
    friends: User[] = null;

    constructor(
        private router: Router,
        private api: APIService,
    ) { }

    ngOnInit() {
        this.getData();
    }

    async getData() {
        this.api.getFriendRequests().subscribe(requests => {
            this.requests = requests;
        });
        this.api.getFriends().subscribe(friends => {
            this.friends = friends;
        });
    }

    searchUsers() {
        this.router.navigate(["/search-users"]);
    }

    acceptRequest(userId) {
        this.api.acceptRequest(userId).subscribe(response => {
            // TODO; change button
        });
    }
    rejectRequest(userId) {
        this.api.rejectRequest(userId).subscribe(response => {
            // TODO; change button
        });
    }

    unfriend(userId) {
        this.api.unfriend(userId).subscribe(response => {

        });
    }
}