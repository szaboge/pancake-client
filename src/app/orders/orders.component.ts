import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Pancake} from '../models/pancake.model';
import {takeUntil} from 'rxjs/operators';

export interface Reservation {
  done: boolean;
  name: string;
  pancakes: Array<Pancake>;
  room: string;
  time: string;
  type: number;
  userid: string;
}

export interface Reservations {
  [key: string]: Reservation;
}

export interface Statistic {
  all: number;
  inprogress: number;
  done: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit, OnDestroy {
  destroy = new Subject<boolean>();
  statistics = new BehaviorSubject<Statistic>({all: 0, inprogress: 0, done: 0});
  loading = new BehaviorSubject<boolean>(false);
  reservations = new BehaviorSubject<Reservations>(null);

  count_statistic() {
    const reservations = this.reservations.getValue();
    if (!reservations) { return; }
    const statistics: Statistic = {all: 0, inprogress: 0, done: 0};
    Object.keys(reservations)
      .forEach((key: string) => {
        statistics.all += this.count(reservations[key].pancakes);
        if (reservations[key].done) {
          statistics.done += this.count(reservations[key].pancakes);
        } else {
          statistics.inprogress += this.count(reservations[key].pancakes);
        }
      });
    this.statistics.next(statistics);
  }

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.loading.next(true);
    this.authService.af().authState.pipe(takeUntil(this.destroy)).subscribe((next) => {
        this.loading.next(true);
        if (next) {
          this.authService.db().object('reservations')
            .valueChanges()
            .pipe(takeUntil(this.destroy))
            .subscribe((val: Reservations) => {
              this.reservations.next(val);
              this.count_statistic();
              this.loading.next(false);
            });
        } else {
          this.authService.af().auth.signInAnonymously();
          this.loading.next(false);
        }
      }
    );
  }

  count(pancakes: Array<Pancake>): number {
    let count = 0;
    if (pancakes) {
      pancakes.forEach((pancake: Pancake) => {
        count += pancake.piece;
      });
    }
    return count;
  }

  trackByFn(index, item) {
    return item.key || index;
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
  }
}
