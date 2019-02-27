import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import 'rxjs/add/operator/catch';
import { Book } from './book';

@Injectable()
export class BookService{

    constructor(private _httpService: Http){}

    getAllBooks(): Observable<Response>{
        console.log("inside the service getAllBooks():::::::");
        return this._httpService.get("http://localhost:8080/weaselapi/book");
    }

    getBookById(bookId: string): Observable<Response>{
        console.log("Inside the getBookById() service::::::");
        return this._httpService.get("http://localhost:8080/weaselapi/book/"+bookId);
    }

    addBook(book: Book){
        let body = JSON.parse(JSON.stringify(book));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        if(book.id){
            console.log("Inside addBook update service():::::::");
            return this._httpService.put("http://localhost:8080/weaselapi/book/"+book.id, body, options);
        }else{
            console.log("Inside addBook add service():::::::");
            return this._httpService.post("http://localhost:8080/weaselapi/book", body, options);
        }
    }

    deleteBook(bookId: string){
        console.log("Inside the service deleteBook():::::book id:::"+bookId);
        return this._httpService.delete("http://localhost:8080/weaselapi/book/"+bookId);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error);
    }
}
