import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import 'rxjs/add/operator/catch';
import { User } from './user';

@Injectable()
export class UserService{

    constructor(private _httpService: Http){}

    getAllUsers(): Observable<Response>{
        console.log("inside the service getAllUsers():::::::");
        return this._httpService.get("http://localhost:8080/weaselapi/user");
    }

    getUserById(userId: string): Observable<Response>{
        console.log("Inside the getUserById() service::::::");
        return this._httpService.get("http://localhost:8080/weaselapi/user/"+userId);
    }

    addUser(user: User){
        let body = JSON.parse(JSON.stringify(user));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        if(user.id){
            console.log("Inside addUser update service():::::::");
            return this._httpService.put("http://localhost:8080/weaselapi/user/"+user.id, body, options);
        }else{
            console.log("Inside addUser add service():::::::");
            return this._httpService.post("http://localhost:8080/weaselapi/user", body, options);
        }
    }

    deleteUser(userId: string){
        console.log("Inside the service deleteUser():::::user id:::"+userId);
        return this._httpService.delete("http://localhost:8080/weaselapi/user/"+userId);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error);
    }
}
