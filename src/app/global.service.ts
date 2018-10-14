import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  serverpath = "http://localhost/Projects/Assasa_Projects/BlueChef/src/";
  constructor() { }
}
