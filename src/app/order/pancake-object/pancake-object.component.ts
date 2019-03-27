import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pancake} from '../../models/pancake.model';


@Component({
  selector: 'app-pancake-object',
  templateUrl: './pancake-object.component.html',
  styleUrls: ['./pancake-object.component.scss']
})
export class PancakeObjectComponent implements OnInit {

  @Input() item: Pancake;
  @Output() valueChange = new EventEmitter();

  constructor() {
  }

  add() {
    if (isNaN(+this.item.piece)) {
      this.item.piece = 0;
    } else {
      this.item.piece += 1;
    }
  }

  minus() {
    if (isNaN(+this.item.piece)) {
      this.item.piece = 0;
    } else if (+this.item.piece - 1 >= 0) {
      this.item.piece -= 1;
    }
  }

  ngOnInit() {
  }

}
