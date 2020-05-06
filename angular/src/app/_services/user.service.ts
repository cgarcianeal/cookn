
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {


  constructor(private http: HttpClient) { }


  register(user: User) {
    return this.http.post(`http://localhost:3030/user/register`, user);
  }

  getUser(username) {
    return this.http.get(`http://localhost:3030/user/getUser/${username}`);
  }


}
