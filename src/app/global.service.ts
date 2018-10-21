import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  serverpath = "http://localhost/BlueChef/src/";
  constructor() { }
}
