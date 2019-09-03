import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Data {
  id: number | string;
  // createdAt: number;
  value: any;
}

@Injectable()
export class DataService {
  items: Observable<Data[]>;
  private _items: BehaviorSubject<Data[]>;
  private dataStore: {
    items: Data[]
  };

  constructor() {
    this.dataStore = { items: [] };
    this._items = <BehaviorSubject<Data[]>>new BehaviorSubject([]);
    this.items = this._items.asObservable();
  }

  loadAll() {
      this._items.next(Object.assign({}, this.dataStore).items);
  }

  load(id: number | string) {

      this.dataStore.items.forEach((item, index) => {
        if (item.id === id) {
          this.dataStore.items[index] = item;
        }
      });


      this._items.next(Object.assign({}, this.dataStore).items);
  }

  create(todo: Data) {
      this.dataStore.items.push(todo);
      this._items.next(Object.assign({}, this.dataStore).items);
  }

  update(todo: Data) {
      this.dataStore.items.forEach((t, i) => {
        if (t.id === todo.id) { this.dataStore.items[i] = todo; }
      });

      this._items.next(Object.assign({}, this.dataStore).items);
  }

  remove(todoId: number | string) {
      this.dataStore.items.forEach((t, i) => {
        if (t.id === todoId) { this.dataStore.items.splice(i, 1); }
      });

      this._items.next(Object.assign({}, this.dataStore).items);
  }
}
