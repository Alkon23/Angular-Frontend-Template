import {Component, OnInit, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {User} from './user';

@Component({
    selector: 'app-weasel',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnChanges{

    users: User[];
    statusMessage: string;
    user = new User();

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

    addUser(): void{
        console.log("inside the addUser()::::::")
        this._userService.addUser(this.user)
            .subscribe((response) => {console.log(response); this.getUsers();this.reset();},
            (error) =>{
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            }
        );

        console.log("end of addUser()::::");
        //this._router.navigate(['/users']);
    }

    private reset(){
        console.log("inside the reset():::::::");
        this.user.id = null;
        this.user.nick = null;
        this.user.password = null;
        this.user.email = null;
        this.user.tags = null;
        this.user.lists = null;
        console.log("end of reset():::::::");
    }

    ngOnChanges(changes:any) {
        console.log("calling ngOnChanges()::::::::");
    }

    deleteUser(userId: string){
        console.log("Inside the deleteUser()::::User id::::"+userId);
        this._userService.deleteUser(userId)
            .subscribe((response) => {console.log(response); this.getUsers();},
            (error) =>{
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            });
            this.reset();
            console.log("end of deleteUser():::::::");
    }

    getUser(userId: string){
        console.log("Inside the updateUser()::::::User id::::"+userId);
        this._userService.getUserById(userId)
            .subscribe((userData) => {this.user = userData.json(); this.getUsers(); }),
            (error) => {
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            }
        this.reset();
        console.log("end of updateUser()::::::");
    }
}
