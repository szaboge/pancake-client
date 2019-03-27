import {Pancake} from './pancake.model';

export class Reservation {
  userid: string;
  name: string;
  room: string;
  time: string;
  pancakes: Array<Pancake>;
}
