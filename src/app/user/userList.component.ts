import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { Router } from '@angular/router';


@Component({
    selector: 'user-list',
    templateUrl: './userList.component.html',
    styleUrls: ['./userList.component.css']
})
export class UserListComponent implements OnInit{
    user = new User();
    statusMessage: string;
    users: User[];
    constructor(private _userService: UserService,
                private _router: Router){}

    ngOnInit(): void {
        console.log("calling ngOnInit()::::");
        this.getUsers();
    }

    getUsers(): void{
        console.log("Inside getUsers():::::")
        this._userService.getAllUsers()
            .subscribe((userData) => this.users = userData.json(),
            (error) =>{
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            }
        );
        console.log("end of getUsers():::::");
    }
}
