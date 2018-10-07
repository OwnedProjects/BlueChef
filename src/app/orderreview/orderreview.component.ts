import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orderreview',
  templateUrl: './orderreview.component.html',
  styleUrls: ['./orderreview.component.css']
})
export class OrderreviewComponent implements OnInit {
  ordId: any;
  
  constructor(private _order: OrderService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(response => {
      this.ordId = response.oId;
    });
  }

}
