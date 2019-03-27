import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import * as moment from 'moment';
import {FormControl, FormGroup} from '@angular/forms';
import {Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(64)]),
    room: new FormControl('', [Validators.required, Validators.maxLength(64)]),
    type: new FormControl('')
  });

  loading = false;
  pancakeloading = true;

  pancakes;
  name: string;
  room: string;
  valid = false;
  type = 1;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.db().object('pancakes').valueChanges().subscribe((next) => {
      this.pancakes = next;
      this.pancakeloading = false;
      this.validateNumbers();
    });
  }

  validateNumbers() {
    let validt = true;
    let count = 0;
    if (this.pancakes) {
      for (const item of this.pancakes) {
        if (item.piece < 0 || isNaN(+item.piece)) {
          validt = false;
        }
        if (item.piece === null) {
          item.piece = 0;
        }
        count += item.piece;
      }
    }
    this.valid = count > 0 && validt;
    return this.valid;
  }

  ngOnInit() {
  }

  reserve() {
    this.loading = true;
    const reservations = {
      userid: this.authService.af().auth.currentUser.uid,
      name: this.name,
      room: this.room,
      time: moment().format('YYYY. MM. DD. HH:mm:ss'),
      pancakes: this.pancakes.filter(item => item.piece !== 0),
      done: false,
      type: this.form.controls['type'].value
    };
    console.log(reservations);
    /*this.authService.db().object('reservations/' + this.authService.db().createPushId()).set(reservations)
      .then(() => {
        this.router.navigate(['/main']);
        this.loading = false;
      })
      .catch(() => {

      });*/

  }

  matgroup(value) {
    console.log(value);
  }

}
