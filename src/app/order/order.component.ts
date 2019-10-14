import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import * as moment from 'moment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Pancake} from '../models/pancake.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(64)]),
    room: new FormControl('', [Validators.required, Validators.maxLength(64)])
  });

  loading = new BehaviorSubject<boolean>(false);
  pancakeLoading = new BehaviorSubject<boolean>(false);
  pancakes = new BehaviorSubject<Array<Pancake>>([]);

  valid = false;
  type = 1;

  destroy = new Subject<boolean>();

  constructor(private authService: AuthService, private router: Router) {
  }

  validateNumbers() {
    let validt = true;
    let count = 0;
    if (this.pancakes.getValue()) {
      this.pancakes.getValue().forEach((pancake: Pancake) => {
        if (pancake.piece < 0 || isNaN(+pancake.piece)) {
          validt = false;
        }
        if (pancake.piece === null) {
          pancake.piece = 0;
        }
        count += pancake.piece;
      });
    }
    this.valid = count > 0 && validt;
    return this.valid;
  }

  ngOnInit() {
    this.pancakeLoading.next(true);
    this.authService.af().authState.pipe(takeUntil(this.destroy)).subscribe((next) => {
        if (next) {
          this.authService.db().object('pancakes')
            .valueChanges()
            .pipe(takeUntil(this.destroy))
            .subscribe((value: Array<Pancake>) => {
              this.pancakes.next(value);
              this.pancakeLoading.next(false);
              this.validateNumbers();
            });
        } else {
          this.authService.af().auth.signInAnonymously();
        }
      }
    );
  }

  reserve() {
    this.loading.next(true);
    const reservations = {
      userid: this.authService.af().auth.currentUser.uid,
      name: this.form.controls['name'].value,
      room: this.form.controls['room'].value,
      time: moment().format('YYYY. MM. DD. HH:mm:ss'),
      pancakes: this.pancakes.getValue().filter(item => item.piece !== 0),
      done: false,
      type: this.type
    };

    this.authService.db().object('reservations/' + this.authService.db().createPushId()).set(reservations)
      .then(() => {
        this.router.navigate(['/main']);
        this.loading.next(false);
      })
      .catch(() => {

      });

  }

  ngOnDestroy(): void {
    this.destroy.next(true);
  }
}
