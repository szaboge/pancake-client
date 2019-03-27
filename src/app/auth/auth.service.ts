import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private datab: AngularFireDatabase) {
  }

  af() {
    return this.auth;
  }

  db() {
    return this.datab;
  }
}
