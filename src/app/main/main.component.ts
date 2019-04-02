import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  reservations;

  authSub: Subscription;
  changeSub: Subscription;

  loading = true;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authSub = this.authService.af().authState.subscribe((next) => {
        if (next) {
          this.changeSub = this.authService.db()
            .object('reservations').valueChanges().subscribe(() => {
              this.authService.db()
                .object('reservations')
                .query.orderByChild('userid')
                .equalTo(this.authService.af().auth.currentUser.uid)
                .once('value').then((val) => {
                this.reservations = val.val();
                this.loading = false;
              });
            });
        } else {
          this.authService.af().auth.signInAnonymously();
        }
      }
    );
  }

  count(pancakes) {
    let count = 0;
    for (const item of pancakes) {
      count += item.piece;
    }
    return count;
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    this.changeSub.unsubscribe();
  }

}
