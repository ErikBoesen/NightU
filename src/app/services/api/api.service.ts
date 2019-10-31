import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { User, Event_ } from './models';

import { AuthService } from '../auth/auth.service';
import { from } from 'rxjs';
import 'rxjs/add/operator/mergeMap'

@Injectable({
    providedIn: 'root'
})
export class APIService {
    root: string = "https://comethru.herokuapp.com/api";
    token: string = null;
    constructor(
        private httpClient: HttpClient,
        private storage: Storage,
    ) { }

    private get(path: string): Observable<any> {
        let storageObservable = from(this.storage.get('TOKEN'));

        return storageObservable.mergeMap(token => {
            return this.httpClient
                .get(this.root + path, {
                    params: new HttpParams().set('token', token),
                });
        });
    }

    private post(path: string, data: any): Observable<any> {
        let storageObservable = from(this.storage.get('TOKEN'));

        return storageObservable.mergeMap(token => {
            return this.httpClient
                .post(this.root + path, data, {
                    params: new HttpParams().set('token', token),
                });
        });
    }


    // Sending a GET request to /users
    // TODO broken
    /*
       public getUsers(){
       return this.httpClient
       .get(this.root + '/users')
       .map(users => {
       return users.map((user) => new User(user));
       })
       .catch((err)=>{
       console.error(err);
        });
       }
     */

    // Sending a POST request to /users
    /*
       public createUser(user: User) {

       }
     */

    // Sending a GET request to /users/:id
    public getUserById(userId: number): Observable<User> {
        return this.get('/users/' + userId)
        .map(response => {
            return new User(response);
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public getMe(): Observable<User> {
        return this.get('/users/me')
        .map(response => {
            return new User(response);
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    // Sending a PUT request to /users/:id
    public updateUser(user: User){

    }

    /*
    // Sending a DELETE request to /users/:id
    public deleteUserById(userId: number) {

    }
   */

    public getEvents(): Observable<Event_[]> {
        return this.get('/events')
        .map(response => {
            return response.map((event) => new Event_(event));
            return new Event_(response);
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public getEvent(eventId: number): Observable<Event_> {
        return this.get('/events/' + eventId)
        .map(response => {
            return new Event_(response);
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public createEvent(event: Event_): Observable<Event_> {
        return this.post('/events', event)
        .map(response => {
            return new Event_(response);
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }
}
