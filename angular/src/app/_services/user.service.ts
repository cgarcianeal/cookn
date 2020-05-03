
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';




@Injectable({ providedIn: 'root' })
export class UserService {


  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<User[]>(`http://localhost:3030/user/allusers`);
  }

  register(user: User) {
    return this.http.post(`http://localhost:3030/user/register`, user);
  }

  setGoals(goals) {
    return this.http.post(`http://localhost:3030/user/setgoals`, goals);
  }

  getGoals(username: string) {
    return this.http.get(`http://localhost:3030/user/getgoals/${username}`);
  }


}
